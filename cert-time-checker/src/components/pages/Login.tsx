import { Box, Button, TextField, Typography } from "@material-ui/core"
import React, { useContext, useState } from "react"
import { withRouter } from "react-router"
import { AuthContext } from "../molecules/Auth"

const Login: React.FC = (props: any) => {
  const { login } = useContext(AuthContext)

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const handleSubmit = () => {
    login(email, password, props.history)
  }

  return (
    <Box pl={2}>
      <Typography variant="h5">認定時間チェッカー</Typography>
      <Box mt={2}>
        <Typography variant="h6">ユーザー登録済み</Typography>
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
        <Button variant="contained" onClick={handleSubmit}>
          ログイン
        </Button>
      </Box>
      <Box mt={4}>
        <Typography variant="h6">新規ユーザー</Typography>
        <Button variant="contained" onClick={handleSubmit}>
          新規ユーザー登録
        </Button>
      </Box>
    </Box>
  )
}

export default withRouter(Login)
