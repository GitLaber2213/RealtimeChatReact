import React from "react"
import classes from './side-bar-content-list-item.module.css'
import { ItemInList } from "../../../../shared"


export const SideBarContentListItem = ({ handleClick, image, text, imgHeight, imgWidth }) => {
    return (
        <div className={classes.sideBarContentListItem}>
            <ItemInList handleClick={handleClick} image={image} text={text} imgHeight={imgHeight} imgWidth={imgWidth} />
        </div>
    )
}

export default SideBarContentListItem