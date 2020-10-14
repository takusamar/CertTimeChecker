import { Box, Button, TextField, Typography } from "@material-ui/core"
import React, { useContext, useState } from "react"
import { withRouter } from "react-router"
import { SpaceDivider } from "../atoms/SpaceDivider"
import { AuthContext } from "../molecules/Auth"

const Login: React.FC = (props: any) => {
  const { login } = useContext(AuthContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onSubmitLogin = async () => {
    login(email, password, props.history)
  }

  const onSubmitSignUp = async () => {
    props.history.push("/signup")
  }

  return (
    <Box>
      <Box mt={2}>
        <Typography variant="h6">ログイン</Typography>
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
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={onSubmitLogin}>
          ログイン
        </Button>
      </Box>
      <SpaceDivider />
      <Box mt={2}>
        <Typography variant="h6">新規ユーザー</Typography>
        <Button variant="contained" color="primary" onClick={onSubmitSignUp}>
          新規ユーザー登録
        </Button>
      </Box>
    </Box>
  )
}

export default withRouter(Login)
