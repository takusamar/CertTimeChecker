import React, { useEffect, useState } from "react"
import { Box, Typography } from "@material-ui/core"
import { TUser } from "../../models/Users"
import { db } from "../../firebase"
import { TCertTimes } from "../../models/CertTimes"
import { StickyHeadTable, Column } from "../molecules/StickyHeadTable"
import { firestore } from "firebase"
import dayjs from "dayjs"

interface OwnProps {
  currentUser: TUser
  totalHours(hours: number): void
}

export const CertTimeList: React.FC<OwnProps> = (props) => {
  const [certTimes, setCertTimes] = useState<TCertTimes[]>()

  const columns: Column[] = [
    {
      id: "date",
      label: "日付",
      minWidth: 40,
      align: "center",
      format: (value: firestore.Timestamp) =>
        dayjs(new Date(value.seconds * 1000)).format("YYYY-MM-DD"),
    },
    {
      id: "certMinutes",
      label: "認定時間",
      minWidth: 30,
      align: "center",
      format: (value: number) => dayjs().hour(0).minute(value).format("H:mm"),
    },
    {
      id: "title",
      label: "講座名",
      minWidth: 60,
      align: "left",
    },
    {
      id: "instructor",
      label: "講師",
      minWidth: 40,
      align: "left",
    },
  ]

  const getCertTimes = () => {
    if (props.currentUser && props.currentUser.uid) {
      db.collection("users")
        .doc(props.currentUser.uid)
        .collection("certTimes")
        .orderBy("date", "desc")
        .onSnapshot((snapshots) => {
          const docs = snapshots.docs.map((doc) => {
            return doc.data() as TCertTimes
          })
          setCertTimes(docs)
        })
    }
  }

  useEffect(() => {
    const unsubscribe = getCertTimes
    return unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  useEffect(() => {
    if (certTimes) {
      const totalMinutes = certTimes.reduce((arr, cur) => {
        return arr + cur!.certMinutes
      }, 0)
      props.totalHours(totalMinutes / 60)
    }
  }, [certTimes, props])
  return (
    <Box>
      <Typography variant="body1">実績詳細</Typography>
      <StickyHeadTable columns={columns} rows={certTimes} />
    </Box>
  )
}
