import React from "react"
import classes from "./profile.module.css"
import { Button, Info, Loader, SuccessConstants, useAuth, useUpdateProfile } from "../../../shared"


export const OptionalMenu = ({ userInfo, setIsActive }) => {
    const { uid } = useAuth()
    const { info, loading, handleUpdateProfile } = useUpdateProfile()

    const handleUpdateProfileClick = async (userInfo) => {
        await handleUpdateProfile(userInfo, uid)

    }

    if (loading) {
        return <Loader />
    }

    return (
        <div className={classes.optionalMenu}>
            {info !== undefined && info !== "success" && <Info text={info} />}
            {info === "success" && <Info text={SuccessConstants.UPDATE_PROFILE_SUCCESSFULLY} error={false} />}
            <Button text={"Save"} handleClick={() => handleUpdateProfileClick(userInfo)} />
            <Button text={"Cancel"} handleClick={() => setIsActive(false)} />
        </div>
    )
}

export default OptionalMenu