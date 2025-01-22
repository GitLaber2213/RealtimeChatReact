import React from "react";
import classes from './side-bar-content-list.module.css'
import SideBarContentListItem from "./side-bar-content-list-item";
import profilePhoto from '../../../../shared/assets/userName.png'
import groupPhoto from '../../../../shared/assets/group.png'
import logoutPhoto from '../../../../shared/assets/logout.png'
import { Constants, useAuth } from "../../../../shared";
import { useNavigate } from "react-router-dom";
import { RouteConstants } from "../../../../shared/constants/constants";

export const SideBarContentList = ({ openWindow }) => {
    const navigate = useNavigate()
    const { doSignOut } = useAuth()

    

    const logoutHandleClick = () => {
        doSignOut()
    }

    return (
        <div className={classes.sideBarContentList}>
            <SideBarContentListItem handleClick={() => openWindow(Constants.PROFILE_WINDOW)} image={profilePhoto} text={"My profile"} imgHeight={25} imgWidth={25} />
            <SideBarContentListItem handleClick={() => openWindow(Constants.CREATE_GROUP_WINDOW)} image={groupPhoto} text={"Create group"} imgHeight={25} imgWidth={25} />
            <div className={classes.signOut}>
                <SideBarContentListItem handleClick={logoutHandleClick} image={logoutPhoto} text={"Exit"} imgHeight={25} imgWidth={25} />
            </div>
        </div>
    )
}


export default SideBarContentList