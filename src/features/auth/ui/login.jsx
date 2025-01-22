import React, { useState } from "react";
import { AuthSwitch, Form } from "../../../entites";
import { RouteConstants } from "../../../shared/constants/constants";
import { Button, EmailIcon, FormInput, Loader, PasswordIcon, useAuth } from "../../../shared";
import { useHandleSignIn } from "../hooks/use-handle-sign-in";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const navigate = useNavigate()
  const { handleSignIn, error, loading } = useHandleSignIn("login")

  const handleClick = async (event, email, password) => {
    event.preventDefault()
    await handleSignIn(email, password)
  }

  if (loading) {
    return <Loader />
  }

  return (
    <Form error={error} title="Login">
      <FormInput type="email" placeholder={'Email'} img={EmailIcon} imgHeight={25} imgWidth={25} value={email} onChange={setEmail} />
      <FormInput type="password" placeholder={'Password'} img={PasswordIcon} imgHeight={25} imgWidth={25} value={pass} onChange={setPass} />
      <Button handleClick={(e) => handleClick(e, email, pass)} text="Login" />
      <AuthSwitch btnText={"Sign Up"} handleNavigate={() => navigate(RouteConstants.SIGN_UP, { relative: 'path' })} text={"Don't have account?"} />
    </Form>
  )
}


export default Login