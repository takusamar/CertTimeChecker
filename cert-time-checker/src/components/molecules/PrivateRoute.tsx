import React, { useContext } from "react"
import { Route, RouteComponentProps } from "react-router"
import Login from "../pages/Login"
import { AuthContext } from "./Auth"

interface OwnProps {
  component: React.FC
  path: string
}

export const PrivateRoute: React.FC<OwnProps> = (props) => {
  const { loginUser } = useContext(AuthContext)
  const component = loginUser ? props.component : Login
  return <Route exact path={props.path} component={component} />
}
