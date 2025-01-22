import React, { useState } from "react";
import { AuthSwitch, Form } from "../../../entites";
import { RouteConstants } from "../../../shared/constants/constants";
import { Button, EmailIcon, FormInput, Loader, PasswordIcon, UserNameIcon } from "../../../shared";
import { useHandleSignIn } from "../hooks/use-handle-sign-in";
import { useNavigate } from "react-router-dom";


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
        <Form error={error} title="Sign Up">
        
            <FormInput type="text" placeholder={'Display name'} img={UserNameIcon} imgHeight={25} imgWidth={25} value={displayName} onChange={setDisplayName} />
            <FormInput type="email" placeholder={'Email'} img={EmailIcon} imgHeight={25} imgWidth={25} value={email} onChange={setEmail} />
            <FormInput type="password" placeholder={'Password'} img={PasswordIcon} imgHeight={25} imgWidth={25} value={pass} onChange={setPass} />
            
            <Button handleClick={(event) => handleClick(event, email, pass)} text="Sign Up" />
            <AuthSwitch btnText={"Login"} handleNavigate={() => navigate(RouteConstants.LOGIN, { relative: 'path' })} text={"Back to"} />
        
        </Form>
    )
}

export default SignUp