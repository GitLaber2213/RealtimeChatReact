import React from "react"
import classes from './form.module.css'
import { Info } from "../../../shared"


export const Form = ({ error, title, children, handleSubmit }) => {

    return (
        <div className={classes.container}>
            <div className={classes.unContainer}>
                <div className={classes.title}>{title}</div>
                <form onSubmit={handleSubmit}>
                    {children}
                    {error !== undefined && <Info text={error} />}
                </form>
            </div>
        </div>
    )
}

export default Form