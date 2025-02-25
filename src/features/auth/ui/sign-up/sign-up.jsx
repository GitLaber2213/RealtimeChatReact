import React, { useState } from "react"
import { Button, EmailIcon, FormInput, Loader, PasswordIcon, UserNameIcon } from "../../../../shared"
import { useNavigate } from "react-router-dom"
import { RouteConstants } from "../../../../shared/constants/constants"
import { AuthSwitch, Form } from "../../../../entites"
import { useHandleSignIn } from "../../hooks/use-handle-sign-in"
import classes from './sign-up.module.css'


export const SignUp = () => {
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const navigate = useNavigate()
    const { handleSignIn, error, loading } = useHandleSignIn("signup")


    const handleClick = async (event, email, password) => {
        event.preventDefault()
        await handleSignIn(email, password, displayName)
    }

    if (loading) {
        return <Loader />
    }

    return (
        <Form error={error} title="Sign Up" handleSubmit={(e) => handleClick(e, email, pass)}>
            <div className={classes.inputContainer}>
                <FormInput type="text" placeholder={'Display name'} img={UserNameIcon} imgHeight={25} imgWidth={25} value={displayName} onChange={setDisplayName} />
            </div>
            <div className={classes.inputContainer}>
                <FormInput type="email" placeholder={'Email'} img={EmailIcon} imgHeight={25} imgWidth={25} value={email} onChange={setEmail} />
            </div>
            <div className={classes.inputContainer}>
                <FormInput type="password" placeholder={'Password'} img={PasswordIcon} imgHeight={25} imgWidth={25} value={pass} onChange={setPass} />
            </div>
            <div className={classes.inputContainer}>
                <Button text="Sign Up" />
            </div>
            <AuthSwitch btnText={"Login"} handleNavigate={() => navigate(RouteConstants.LOGIN, { relative: 'path' })} text={"Back to"} />
        </Form>
    )
}

export default SignUp