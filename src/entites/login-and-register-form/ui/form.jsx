import React from "react"
import classes from './form.module.css'
import { ErrorInfo } from "../../../shared"


export const Form = ({ error, title, children, handleSubmit }) => {

    return (
        <div className={classes.container}>
            <div className={classes.unContainer}>
                <div className={classes.title}>{title}</div>
                <form onSubmit={handleSubmit}>
                    {children}
                    {error !== undefined && <ErrorInfo errorText={error} />}
                </form>
            </div>
        </div>
    )
}