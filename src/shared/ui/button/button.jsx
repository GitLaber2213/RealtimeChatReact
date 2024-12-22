import React from "react"
import classes from './button.module.css'


export const Button = ({handleClick, text}) => {
    return (
        <div className={classes.optionContainer}>
            <div onClick={handleClick}>{text}</div>
        </div>
    )
}


export default Button