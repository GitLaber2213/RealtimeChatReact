import React from "react";
import classes from './side-bar-wrapper.module.css'
import { SideBarHeader } from "../side-bar-header/side-bar-header";
import { SideBarContent } from "../side-bar-content/side-bar-content";

export const SideBar = () => {

    return (
        <div className={classes.siteBarContainer}>
            <div className={classes.siteBarContent}>
                <SideBarHeader />
                <SideBarContent />
            </div>
        </div>
    )
}

export default SideBar