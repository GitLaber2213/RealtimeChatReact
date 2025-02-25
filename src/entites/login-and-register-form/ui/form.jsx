import React from "react"
import classes from './form.module.css'
import { ErrorInfo } from "../../../shared"


export const Form = ({ error, title, children, submit }) => {

    return (
        <div className={classes.container}>
            <div className={classes.unContainer}>
                <div className={classes.title}>{title}</div>
                <form onSubmit={submit}>
                    {children}
                    {error !== undefined && <ErrorInfo errorText={error} />}
                </form>
            </div>
        </div>
    )
}