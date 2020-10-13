import { Box, Button, TextField, Typography } from "@material-ui/core"
import React, { useContext, useEffect, useState } from "react"
import { auth, db } from "../../firebase"
import { AuthContext } from "../molecules/Auth"

export const SignUp: React.FC = (props: any) => {
  const { loginUser } = useContext(AuthContext)

  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const setUserInfo = async (uid: string) => {
    await db.collection("users").doc(uid).set({
      displayName,
      email,
    })
  }

  useEffect(() => {
    if (loginUser) {
      setUserInfo(loginUser.uid)
      props.history.push("/")
    }
  }, [loginUser])

  return (
    <Box pl={2}>
      <Typography variant="h5">認定時間チェッカー</Typography>
      <Box mt={2}>
        <Typography variant="h6">新規ユーザー</Typography>
      </Box>
      <Box mt={2}>
        <TextField
          id="standard-basic"
          name="displayName"
          label="表示名"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </Box>
      <Box mt={2}>
        <TextField
          id="standard-basic"
          name="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Box>
      <Box mt={2}>
        <TextField
          id="standard-password-input"
          type="password"
          name="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>
      <Box mt={2}>
        <Button
          variant="contained"
          onClick={async () => {
            try {
              await auth.createUserWithEmailAndPassword(email, password)
              alert("登録されました")
            } catch (error) {
              alert(error.message)
            }
          }}
        >
          登録
        </Button>
      </Box>
    </Box>
  )
}
