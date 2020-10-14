import { User } from "firebase"
import React, { createContext, useEffect, useState } from "react"

import { app, db } from "../../firebase"
import { TUser } from "../../models/Users"

interface IAuthContext {
  login: any
  loginUser: User | null | undefined
  user: TUser
}

export const AuthContext = createContext<IAuthContext>({
  login: undefined,
  loginUser: undefined,
  user: undefined,
})

export const AuthProvider: React.FC = (props: any) => {
  const [loginUser, setLoginUser] = useState<User | null | undefined>(undefined)
  const [user, setUser] = useState<TUser>()

  const login = async (email: string, password: string, history: string[]) => {
    try {
      await app.auth().signInWithEmailAndPassword(email, password)
      history.push("/")
    } catch (error) {
      alert(error.message)
    }
  }

  const getUserInfo = async (uid: string) => {
    const doc = await db.collection("users").doc(uid).get()
    setUser({ ...doc.data(), uid } as TUser)
  }
  useEffect(() => {
    if (loginUser) {
      getUserInfo(loginUser.uid)
    } else {
      setUser(undefined)
    }
  }, [loginUser])

  useEffect(() => {
    app.auth().onAuthStateChanged((user: User | null | undefined) => {
      setLoginUser(user)
    })
  }, [])

  return (
    <AuthContext.Provider value={{ login, loginUser, user }}>
      {props.children}
    </AuthContext.Provider>
  )
}
