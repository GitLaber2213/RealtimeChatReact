import React from "react";
import classes from "./Profile.module.css";
import { Button, useAuth } from "../../../shared";
import { updateProfile } from "firebase/auth";


export const OptionalMenu = (userInfo) => {

    const { user } = useAuth()

    const handleUpdateProfileClick = async (user, userInfo) => {
        await updateProfile(user, userInfo)
    }

    return (
        <div className={classes.optionalMenu}>
            <Button text={"Save"} handleClick={() => handleUpdateProfileClick(user, userInfo)}/>
            <Button text={"Cancel"} />
        </div>
    );
};