import React from "react"
import classes from './form-input.module.css'


export const FormInput = ({ placeholder, handleImageClick, img, imgHeight, imgWidth, value, required=true, onChange, type = 'text'}) => {
    return (
        <div className={classes.loginUnContainer}>
            <img src={img} height={imgHeight} width={imgWidth} onClick={handleImageClick} />
            <input type={type} required={required} placeholder={placeholder} value={value} onChange={(event) => onChange(event.target.value)}/>
        </div>
    )
}

export default FormInput