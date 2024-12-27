import React, { useState } from "react";
import classes from "./Profile.module.css";
import { Button, ErrorInfo, useAuth } from "../../../shared";
import { ref, update } from "firebase/database";
import { db } from "../../../shared/firebase/firebase-config";


export const OptionalMenu = ({userInfo}) => {
    const { uid } = useAuth()
    const [error, setError] = useState(undefined)

    const handleUpdateProfileClick = async (userInfo) => {
        try {

            await update(ref(db, `Chats/${uid}`), {
                displayName: userInfo.displayName,
                email: userInfo.email,
            })
            setError(undefined)
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className={classes.optionalMenu}>
            { error !== undefined && <ErrorInfo errorText={error}/>}
            <Button text={"Save"} handleClick={() => handleUpdateProfileClick(userInfo)}/>
            <Button text={"Cancel"} />
        </div>
    );
};