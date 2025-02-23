import React, { useState } from "react";
import classes from './side-bar-content-list.module.css'
import SideBarContentListItem from "./side-bar-content-list-item";
import profilePhoto from '../../../../shared/assets/userName.png'
import groupPhoto from '../../../../shared/assets/group.png'
import logoutPhoto from '../../../../shared/assets/logout.png'
import { useAuth } from "../../../../shared";
import { ModalWindow } from "../../../../entites";
import Profile from "../../../profile/ui/profile";
import CreateGroup from "../../../create-group/ui/create-group";

export const SideBarContentList = () => {
    const { doSignOut } = useAuth()
    const { uid } = useAuth()
    const [isActiveProfile, setIsActiveProfile] = useState(false)
    const [isActiveCreateGroup, setIsActiveCreateGroup] = useState(false)


    const logoutHandleClick = async () => {
        await doSignOut()
    }

    return (
        <>
            <div className={classes.sideBarContentList}>
                <SideBarContentListItem handleClick={() => setIsActiveProfile(true)} image={profilePhoto} text={"My profile"} imgHeight={25} imgWidth={25} />
                <SideBarContentListItem handleClick={() => setIsActiveCreateGroup(true)} image={groupPhoto} text={"Create group"} imgHeight={25} imgWidth={25} />
                <div className={classes.signOut}>
                    <SideBarContentListItem handleClick={logoutHandleClick} image={logoutPhoto} text={"Exit"} imgHeight={25} imgWidth={25} />
                </div>
            </div>

            <ModalWindow isActive={isActiveProfile} setIsActive={setIsActiveProfile} windowHeader={"Profile"}>
                {isActiveProfile && <Profile setIsActive={setIsActiveProfile} uid={uid}/>}
            </ModalWindow>

            <ModalWindow isActive={isActiveCreateGroup} setIsActive={setIsActiveCreateGroup} windowHeader={"Create group"}>
                {isActiveCreateGroup && <CreateGroup setIsActive={setIsActiveCreateGroup} />}
            </ModalWindow>
        </>
    )
}


export default SideBarContentList