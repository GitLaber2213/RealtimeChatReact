import React from "react"
import classes from './item-in-list.module.css'
import Loader from "../loader/loader"
import { FavoriteIcon } from "../.."

export const ItemInList = ({ handleClick, handleImageClick, image, text, imgHeight, imgWidth, children, loading = false, favorite = false }) => {
    return (
        <div onClick={handleClick} className={classes.container}>
            {loading ?
                <div className={classes.loader}>
                    <Loader />
                </div>
                : <img src={image} height={imgWidth} width={imgHeight}  onClick={handleImageClick}/>}

            <div className={classes.textContainer}>
                <div>
                    {text}
                    {favorite && <img src={FavoriteIcon} height={15} width={15} />}
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}



export default ItemInList