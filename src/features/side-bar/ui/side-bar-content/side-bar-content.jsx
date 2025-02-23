import React from "react";
import classes from './side-bar-content.module.css'
import SideBarContentList from "./side-bar-content-list";

export const SideBarContent = () => {
    return (
        <div className={classes.sideBarContent}>
            <SideBarContentList />
        </div>
    )
}

export default SideBarContent