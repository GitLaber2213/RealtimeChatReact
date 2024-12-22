import React from "react";
import classes from './menu-list.module.css'
import MenuItem from "./menu-item";

import viewProfilePhoto from '../../../../shared/assets/userName.png'
import starPhoto from '../../../../shared/assets/star.png'
import deletePhoto from '../../../../shared/assets/delete.png'
import { Constants } from "../../../../shared";
import { useDispatch } from "react-redux";
import { messageRoomSlice } from "../../model/messages-room.slice";


export const MenuList = ({ openWindow }) => {
    const dispatch = useDispatch()

    const handleDeleteMessages = () => {
        dispatch(messageRoomSlice.actions.deleteMessages())
    }

    
    return (
        <div className={classes.menuList}>
            <MenuItem handleClick={() => openWindow(Constants.PROFILE_WINDOW)} image={viewProfilePhoto} text={"View profile"} imgHeight={25} imgWidth={25} />
            <MenuItem handleClick={null} image={starPhoto} text={"Add in favorite"} imgHeight={25} imgWidth={25} />
            <MenuItem handleClick={handleDeleteMessages} image={deletePhoto} text={"Delete chat"} imgHeight={25} imgWidth={25} />
        </div>
    )
}

export default MenuList