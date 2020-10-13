import { app, User } from "firebase"
import React, { createContext, useEffect, useState } from "react"

import { auth } from "../../firebase"

type TUser = User | null | undefined
interface IAuthContext {
  login: any
  loginUser: TUser
}

export const AuthContext = createContext<IAuthContext>({
  login: undefined,
  loginUser: undefined,
})

export const AuthProvider: React.FC = (props: any) => {
  const [loginUser, setLoginUser] = useState<TUser>(undefined)

  const login = async (email: string, password: string, history: string[]) => {
    try {
      await auth.signInWithEmailAndPassword(email, password)
      history.push("/")
    } catch (error) {
      alert(error.message)
    }
  }
  useEffect(() => {
    auth.onAuthStateChanged((user: TUser) => {
      setLoginUser(user)
    })
  }, [])

  return (
    <AuthContext.Provider value={{ login, loginUser }}>
      {props.children}
    </AuthContext.Provider>
  )
}
