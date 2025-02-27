import React, { useState } from "react"
import classes from './login.module.css'
import { AuthSwitch, Form } from "../../../../entites"
import { RouteConstants } from "../../../../shared"
import { Button, EmailIcon, FormInput, Loader, PasswordIcon, useAuth } from "../../../../shared"
import { useHandleSignIn } from "../../hooks/use-handle-sign-in"

export const Login = () => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const { handleSignIn, error, loading, navigate } = useHandleSignIn("login")

  const handleSubmit = async (event, email, password) => {
    event.preventDefault()
    await handleSignIn(email, password)
  }

  if (loading) {
    return <Loader />
  }

  return (
    <Form error={error} title="Login" handleSubmit={(e) => handleSubmit(e, email, pass)}>
      <div className={classes.inputContainer}>
        <FormInput type="email" placeholder={'Email'} img={EmailIcon} imgHeight={25} imgWidth={25} value={email} onChange={setEmail} />
      </div>
      <div className={classes.inputContainer}>
        <FormInput type="password" placeholder={'Password'} img={PasswordIcon} imgHeight={25} imgWidth={25} value={pass} onChange={setPass} />
      </div>
      <div className={classes.inputContainer}>
        <Button text="Login" />
      </div>
      <AuthSwitch btnText={"Sign Up"} handleNavigate={() => navigate(RouteConstants.SIGN_UP, { relative: 'path' })} text={"Don't have account?"} />
    </Form>
  )
}


export default Login