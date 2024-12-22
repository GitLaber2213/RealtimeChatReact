import React from "react";
import classes from './side-bar-wrapper.module.css'
import { CreateGroup, Profile } from "../../../../features";
import { useAuth, useModalWindowState } from "../../../../shared";
import { SideBarHeader } from "../side-bar-header/side-bar-header";
import { SideBarContent } from "../side-bar-content/side-bar-content";

export const SideBar = () => {
    const { activeWindow, openWindow, closeWindow } = useModalWindowState()
    const { user } = useAuth()

    return (
        <>
            <div className={classes.siteBarContainer}>
                <div className={classes.siteBarContent}>
                    <SideBarHeader />
                    <SideBarContent openWindow={openWindow}/>
                </div>
            </div>


            <Profile user={user} activeWindow={activeWindow} closeWindowHandler={closeWindow}/>
            <CreateGroup activeWindow={activeWindow} closeWindowHandler={closeWindow}/>
        </>
    )
}

export default SideBar