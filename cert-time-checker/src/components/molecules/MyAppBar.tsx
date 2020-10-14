import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core"
import React, { useContext } from "react"
import { ExitToApp, Menu } from "@material-ui/icons"
import { AuthContext } from "./Auth"
import { app } from "../../firebase"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  exitButton: {
    marginLeft: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontSize: 16,
    color: "#FFFFFF",
  },
}))

interface OwnProps {
  title: string
}
export const MyAppBar: React.FC<OwnProps> = (props) => {
  const { loginUser } = useContext(AuthContext)

  const classes = useStyles()

  const onLogout = () => {
    app.auth().signOut()
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          {props.title}
        </Typography>
        {loginUser && (
          <Typography variant="caption" className={classes.title}>
            {loginUser.displayName}
          </Typography>
        )}
        {loginUser && (
          <IconButton
            edge="end"
            className={classes.exitButton}
            color="inherit"
            aria-label="account"
            onClick={onLogout}
          >
            <ExitToApp />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  )
}
