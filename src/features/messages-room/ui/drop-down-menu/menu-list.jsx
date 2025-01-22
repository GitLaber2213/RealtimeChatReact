import React, { useState } from "react";
import classes from './menu-list.module.css'
import MenuItem from "./menu-item";

import starPhoto from '../../../../shared/assets/star.png'
import deletePhoto from '../../../../shared/assets/delete.png'
import { useChangeFavorite } from "../../../../shared";
import { useDispatch } from "react-redux";
import { messageRoomSlice } from "../../model/messages-room.slice";
import { useParams } from "react-router-dom";


export const MenuList = ({ openWindow }) => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const { handleUpdateFavorite } = useChangeFavorite()
    const [favorite, setFavorite] = useState(false)


    const handleDeleteMessages = () => {
        dispatch(messageRoomSlice.actions.deleteMessages())
    }


    const handleChangeFavorite = async () => {
        setFavorite(!favorite)
        await handleUpdateFavorite(id, favorite)
    }

    return (
        <div className={classes.menuList}>
            <MenuItem handleClick={handleChangeFavorite} image={starPhoto} text={"Add in favorite"} imgHeight={25} imgWidth={25} />
            <MenuItem handleClick={handleDeleteMessages} image={deletePhoto} text={"Delete chat"} imgHeight={25} imgWidth={25} />
        </div>
    )
}

export default MenuList