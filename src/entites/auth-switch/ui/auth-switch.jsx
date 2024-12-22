import React from "react";
import classes from "./auth-switch.module.css"
import { Button } from "../../../shared";



export const AuthSwitch = ({ text, handleNavigate, btnText }) => {
    return (
        <div className={classes.navContainer}>
            <div className={classes.textBlock}>
                {text}
            </div>
            <div className={classes.btnBlock}>
                <Button handleClick={handleNavigate} text={btnText} />
            </div>
        </div>
    )
}

export default AuthSwitch