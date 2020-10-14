import { Box, Button, TextField, Typography } from "@material-ui/core"
import dayjs, { Dayjs } from "dayjs"
import React, { useState } from "react"
import { TCertTimes } from "../../models/CertTimes"
import { TUser } from "../../models/Users"
import { db } from "../../firebase"
import { firestore } from "firebase"

const customParseFormat = require("dayjs/plugin/customParseFormat")
dayjs.extend(customParseFormat)

interface OwnProps {
  currentUser: TUser
}

export const CertTimeForm: React.FC<OwnProps> = (props) => {
  const [certMinutes, setCertMinutes] = useState("00:00")
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"))
  const [instructor, setInstructor] = useState("")
  const [title, setTitle] = useState("")

  const onSubmit = () => {
    if (props.currentUser) {
      const hourMin = dayjs(certMinutes, "HH:mm")
      db.collection("users")
        .doc(props.currentUser.uid)
        .collection("certTimes")
        .add({
          certMinutes: hourMin.hour() * 60 + hourMin.minute(),
          date: new Date(date),
          instructor,
          title,
        })
    }
  }
  return (
    <Box>
      <Typography variant="body1">実績を登録</Typography>
      <Box display="flex">
        <Box width={150}>
          <TextField
            fullWidth
            id="date"
            label="日付"
            type="date"
            defaultValue={date}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setDate(e.target.value)}
          />
        </Box>
        <Box pl={2} />
        <Box width={100}>
          <TextField
            fullWidth
            id="time"
            type="time"
            name="certMinutes"
            label="認定時間"
            value={certMinutes}
            InputLabelProps={{ shrink: true }}
            inputProps={{ step: 300 }}
            onChange={(e) => setCertMinutes(e.target.value)}
          />
        </Box>
      </Box>
      <Box display="flex">
        <Box width={150}>
          <TextField
            fullWidth
            id="standard-basic"
            name="title"
            label="講座名"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>
        <Box pl={2} />
        <Box width={100}>
          <TextField
            fullWidth
            id="standard-basic"
            name="instructor"
            label="講師"
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
          />
        </Box>
      </Box>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={onSubmit}>
          実績登録
        </Button>
      </Box>
    </Box>
  )
}
