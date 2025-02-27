import React from "react"
import classes from './info.module.css'


export const Info = ({ text, error = true }) => {
    return (
        <div className={error ? classes.container + ' ' + classes.error : classes.container}>
            <div>
                {text}
            </div>
        </div>
    )
}