import React from "react"
import classes from './error-info.module.css'


export const ErrorInfo = ({errorText}) => {
    return (
        <div className={classes.container}>
            <div>
                {errorText}
            </div>
        </div>
    )
}