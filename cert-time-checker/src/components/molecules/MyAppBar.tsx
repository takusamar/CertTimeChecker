import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core"
import React, { useContext } from "react"
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
  name: {
    flexGrow: 1,
    fontSize: 16,
    color: "#FFFFFF",
  },
}))

interface OwnProps {
  title: string
}
export const MyAppBar: React.FC<OwnProps> = (props) => {
  const { user } = useContext(AuthContext)

  const classes = useStyles()

  const onLogout = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("ログアウトしますか？")) {
      app.auth().signOut()
    }
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="subtitle1" className={classes.title}>
          {props.title}
        </Typography>
        {user && (
          <Button variant="contained" color="secondary" onClick={onLogout}>
            {user.displayName}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}
