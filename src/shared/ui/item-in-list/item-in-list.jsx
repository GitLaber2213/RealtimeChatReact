import React from "react"
import classes from './item-in-list.module.css'

export const ItemInList = ({ handleClick, image, text, imgHeight, imgWidth, children }) => {
    return (
        <div onClick={handleClick} className={classes.container}>
            <img src={image} height={imgWidth} width={imgHeight} />
            <div className={classes.textContainer}>
                <div>
                    {text}
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}



export default ItemInList