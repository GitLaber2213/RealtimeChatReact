import React from "react"
import classes from "./Profile.module.css"
import { Button, ErrorInfo, Loader, useAuth } from "../../../shared"
import { useUpdateProfile } from "../../../shared/lib/firebase-hooks/use-update-profile"


export const OptionalMenu = ({userInfo, setIsActive}) => {
    const { uid } = useAuth()
    const {error, loading, handleUpdateProfile} = useUpdateProfile()
    
    const handleUpdateProfileClick = (userInfo) => {
        handleUpdateProfile(userInfo, uid)
    }

    if(loading) {
        <Loader />
    }

    return (
        <div className={classes.optionalMenu}>
            { error !== undefined && <ErrorInfo errorText={error}/>}
            <Button text={"Save"} handleClick={() => handleUpdateProfileClick(userInfo)}/>
            <Button text={"Cancel"}  handleClick={() => setIsActive(false)}/>
        </div>
    )
}