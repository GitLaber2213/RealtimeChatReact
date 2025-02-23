import React from "react";
import classes from './menu-item.module.css'
import { ItemInList } from "../../../../shared";

export const MenuItem = ({ text, image, imgHeight, imgWidth, handleClick, loading }) => {
    return (
        <div className={classes.menuItem}>
            <ItemInList handleClick={handleClick} image={image} text={text} imgHeight={imgHeight} imgWidth={imgWidth} loading={loading} />
        </div>
    )
}

export default MenuItem