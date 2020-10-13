import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core"
import React from "react"
import { ExitToApp, Menu } from "@material-ui/icons"

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
  },
}))

interface OwnProps {
  title: string
  onExitApp(): void
}
export const MyAppBar: React.FC<OwnProps> = (props) => {
  const classes = useStyles()

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <Menu />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          {props.title}
        </Typography>
        <IconButton
          edge="end"
          className={classes.exitButton}
          color="inherit"
          aria-label="account"
          onClick={props.onExitApp}
        >
          <ExitToApp />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
