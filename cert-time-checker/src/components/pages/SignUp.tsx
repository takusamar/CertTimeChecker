import { Box, Button, TextField, Typography } from "@material-ui/core"
import React, { useContext, useEffect, useState } from "react"
import { app, db } from "../../firebase"
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

  const onSubmit = async () => {
    try {
      await app.auth().createUserWithEmailAndPassword(email, password)
      alert("登録されました")
    } catch (error) {
      alert(error.message)
    }
  }

  const onBack = () => {
    props.history.push("/")
  }

  useEffect(() => {
    if (loginUser) {
      setUserInfo(loginUser.uid)
      props.history.push("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginUser])

  return (
    <Box>
      <Box mt={2}>
        <Typography variant="h6">新規ユーザー登録</Typography>
      </Box>
      <Box mt={2}>
        <TextField
          fullWidth
          id="standard-basic"
          name="displayName"
          label="表示名"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </Box>
      <Box mt={2}>
        <TextField
          fullWidth
          id="standard-basic"
          name="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Box>
      <Box mt={2}>
        <TextField
          fullWidth
          id="standard-password-input"
          type="password"
          name="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>
      <Box mt={2} display="flex">
        <Button variant="contained" color="primary" onClick={onSubmit}>
          登録
        </Button>
        <Box pl={2} />
        <Button variant="contained" color="primary" onClick={onBack}>
          戻る
        </Button>
      </Box>
    </Box>
  )
}
