import { Button, Typography, Box } from "@material-ui/core"
import React from "react"
import { auth } from "../../firebase"

export const Home = () => {
  return (
    <Box pl={2}>
      <Typography variant="h5">認定時間チェッカー</Typography>
      <Box mt={2}>
        <Button variant="contained" onClick={() => auth.signOut()}>
          ログアウト
        </Button>
      </Box>
    </Box>
  )
}
