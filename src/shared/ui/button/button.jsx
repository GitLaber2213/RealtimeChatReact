import React from "react"
import classes from './button.module.css'


export const Button = ({handleClick, text}) => {
    return (
        <div className={classes.optionContainer}>
            <button onClick={handleClick}>{text}</button>
        </div>
    )
}


export default Button