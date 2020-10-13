import { Button, Typography, Box } from "@material-ui/core"
import React, { useContext, useEffect, useState } from "react"
import { auth, db } from "../../firebase"
import firebase from "firebase"

import { AuthContext } from "../molecules/Auth"
import { CertTimeList } from "../organisms/CertTimeList"

export const Home = () => {
  const { loginUser } = useContext(AuthContext)
  const [user, setUser] = useState<any>()

  const getUserInfo = async (uid: string) => {
    console.log(uid)
    const doc = await db.collection("users").doc(uid).get()
    console.log(doc.data())
    setUser(doc.data())
  }
  useEffect(() => {
    loginUser && getUserInfo(loginUser.uid)
  }, [loginUser])

  return (
    <Box pl={2}>
      <Typography variant="h5">認定時間チェッカー</Typography>
      <Box mt={2}>
        <Button variant="contained" onClick={() => auth.signOut()}>
          ログアウト
        </Button>
      </Box>
      {user && (
        <Box>
          <Box>{user.email}</Box>
          <Box>{user.displayName}</Box>
        </Box>
      )}
      <CertTimeList />
    </Box>
  )
}
