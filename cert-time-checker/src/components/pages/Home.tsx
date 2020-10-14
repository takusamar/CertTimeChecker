import { Box, Typography } from "@material-ui/core"
import React, { useContext, useState } from "react"

import { AuthContext } from "../molecules/Auth"
import { CertTimeList } from "../organisms/CertTimeList"
import { CertTimeForm } from "../organisms/CertTimeForm"
import { SpaceDivider } from "../atoms/SpaceDivider"

export const Home = () => {
  const { user } = useContext(AuthContext)
  const [totalHours, setTotalHours] = useState<number>(0)

  return (
    <Box>
      {user && (
        <Box>
          <SpaceDivider />
          <Box pt={1}>
            <CertTimeForm currentUser={user} />
          </Box>
          <SpaceDivider />
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
