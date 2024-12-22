import React from "react";
import classes from './form-input.module.css'


export const FormInput = ({ placeholder, img, imgHeight, imgWidth, value, onChange, type = 'text' }) => {
    return (
        <div className={classes.loginUnContainer}>
            <img src={img} height={imgHeight} width={imgWidth} />
            <input type={type} placeholder={placeholder} value={value} onChange={(event) => onChange(event.target.value)}/>
        </div>
    )
}

export default FormInput