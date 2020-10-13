import { app, User } from "firebase"
import React, { createContext, useEffect, useState } from "react"

import { auth } from "../../firebase"

type TUser = User | null | undefined
interface IAuthContext {
  login: any
  currentUser: TUser
}

export const AuthContext = createContext<IAuthContext>({
  login: undefined,
  currentUser: undefined,
})

export const AuthProvider: React.FC = (props: any) => {
  const [currentUser, setCurrentUser] = useState<TUser>(undefined)

  const login = async (email: string, password: string, history: string[]) => {
    try {
      await auth.signInWithEmailAndPassword(email, password)
      history.push("/")
    } catch (error) {
      alert(error)
    }
  }
  useEffect(() => {
    auth.onAuthStateChanged((user: TUser) => {
      setCurrentUser(user)
    })
  }, [])

  return (
    <AuthContext.Provider value={{ login: login, currentUser: currentUser }}>
      {props.children}
    </AuthContext.Provider>
  )
}
