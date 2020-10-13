import React from "react"
import "./App.css"
import { AuthProvider } from "./components/molecules/Auth"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Login from "./components/pages/Login"
import { Home } from "./components/pages/Home"
import { PrivateRoute } from "./components/molecules/PrivateRoute"
import { SignUp } from "./components/pages/SignUp"

function App() {
  return (
    <AuthProvider>
      <Router>
        <PrivateRoute path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
      </Router>
    </AuthProvider>
  )
}

export default App
