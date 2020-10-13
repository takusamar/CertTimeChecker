import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../molecules/Auth"

export const SignUp: React.FC = (props: any) => {
  const { currentUser } = useContext(AuthContext)
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

  useEffect(() => {
    currentUser && props.history.push("/")
  }, [currentUser])

  return <div>Sign Up</div>
}
