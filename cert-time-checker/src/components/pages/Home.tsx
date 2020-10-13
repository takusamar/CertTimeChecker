import { Box, Typography } from "@material-ui/core"
import React, { useContext, useEffect, useState } from "react"
import { app, db } from "../../firebase"

import { AuthContext } from "../molecules/Auth"
import { CertTimeList } from "../organisms/CertTimeList"
import { MyAppBar } from "../molecules/MyAppBar"
import { TUser } from "../../models/Users"

export const Home = () => {
  const { loginUser } = useContext(AuthContext)
  const [user, setUser] = useState<TUser>()
  const [totalHours, setTotalHours] = useState<number>(0)

  const getUserInfo = async (uid: string) => {
    const doc = await db.collection("users").doc(uid).get()
    setUser({ ...doc.data(), uid } as TUser)
  }
  useEffect(() => {
    loginUser && getUserInfo(loginUser.uid)
  }, [loginUser])

  const onLogout = () => {
    app.auth().signOut()
  }

  return (
    <Box>
      <MyAppBar title="認定時間チェッカー" onExitApp={onLogout} />
      {user && (
        <Box>
          <Box pt={1}>
            <Typography variant="body1">
              ユーザー：{user.displayName}（{user.email}）
            </Typography>
          </Box>
          <Box pt={1}>
            <Typography variant="body1">
              認定時間合計：{Math.floor(totalHours)} 時間
            </Typography>
          </Box>
          <Box pt={1}>
            <CertTimeList currentUser={user} totalHours={setTotalHours} />
          </Box>
        </Box>
      )}
    </Box>
  )
}
