import React from "react";
import classes from "./Profile.module.css";
import { Button, useAuth } from "../../../shared";
import { updateProfile } from "firebase/auth";
import { ref, update } from "firebase/database";
import { db } from "../../../shared/firebase/firebase-config";
import { use } from "react";


export const OptionalMenu = (userInfo) => {
    const { uid } = useAuth()

    const handleUpdateProfileClick = async (userInfo) => {
        try {

            //Проблема в userInfo.displayName и userInfo.email
            
            await update(ref(db, `Chats/${uid}`), {
                displayName: "userInfo.displayName",
                email: "userInfo.email",
            });
            console.log("Profile updated successfully");
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    }

    return (
        <div className={classes.optionalMenu}>
            <Button text={"Save"} handleClick={() => handleUpdateProfileClick(userInfo)}/>
            <Button text={"Cancel"} />
        </div>
    );
};