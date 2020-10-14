import React from "react"
import "./App.css"
import { AuthProvider } from "./components/molecules/Auth"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Login from "./components/pages/Login"
import { Home } from "./components/pages/Home"
import { PrivateRoute } from "./components/molecules/PrivateRoute"
import { SignUp } from "./components/pages/SignUp"
import { Box, ThemeProvider } from "@material-ui/core"
import { theme } from "./theme"
import { MyAppBar } from "./components/molecules/MyAppBar"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box p={2}>
        <AuthProvider>
          <MyAppBar title="認定時間チェッカー" />
          <Router>
            <PrivateRoute path="/" component={Home} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login} />
          </Router>
        </AuthProvider>
      </Box>
    </ThemeProvider>
  )
}

export default App
