import { User } from "firebase"
import React, { createContext, useEffect, useState } from "react"

import { app } from "../../firebase"

interface IAuthContext {
  login: any
  loginUser: User | null | undefined
}

export const AuthContext = createContext<IAuthContext>({
  login: undefined,
  loginUser: undefined,
})

export const AuthProvider: React.FC = (props: any) => {
  const [loginUser, setLoginUser] = useState<User | null | undefined>(undefined)

  const login = async (email: string, password: string, history: string[]) => {
    try {
      await app.auth().signInWithEmailAndPassword(email, password)
      history.push("/")
    } catch (error) {
      alert(error.message)
    }
  }
  useEffect(() => {
    app.auth().onAuthStateChanged((user: User | null | undefined) => {
      setLoginUser(user)
    })
  }, [])

  return (
    <AuthContext.Provider value={{ login, loginUser }}>
      {props.children}
    </AuthContext.Provider>
  )
}
