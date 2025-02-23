import React from "react";
import classes from './menu-list.module.css'
import MenuItem from "./menu-item";

import starPhoto from '../../../../shared/assets/star.png'
import deletePhoto from '../../../../shared/assets/delete.png'
import { useFavorites } from "../../../../shared";
import { useParams } from "react-router-dom";


export const MenuList = () => {
    const { id } = useParams()
    const { loading, addFavorite, deleteFavorite, isFavorite } = useFavorites(id)

    const handleDeleteMessages = () => {
    }

    const handleAddFavorite = async () => {
        if(!loading) await addFavorite(id) 
    }

    const handleDeleteFavorite = async () => {
        if(!loading) await deleteFavorite(id)
    }

    return (
        <div className={classes.menuList}>
            <MenuItem
                handleClick={isFavorite ? handleDeleteFavorite : handleAddFavorite}
                image={starPhoto}
                text={isFavorite ? "Delete from favorite" : "Add in favorite"}
                imgHeight={25}
                imgWidth={25}
                loading={loading} />
                
            <MenuItem handleClick={handleDeleteMessages}
                image={deletePhoto}
                text={"Delete chat"}
                imgHeight={25}
                imgWidth={25} />
        </div>
    )
}

export default MenuList