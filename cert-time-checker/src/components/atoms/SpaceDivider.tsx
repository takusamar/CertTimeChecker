import { Box, Divider } from "@material-ui/core"
import React from "react"

export const SpaceDivider: React.FC = () => {
  return (
    <Box my={2}>
      <Divider variant="middle" />
    </Box>
  )
}
