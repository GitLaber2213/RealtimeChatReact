import React from "react";
import classes from './side-bar-content.module.css'
import SideBarContentList from "./side-bar-content-list";

export const SideBarContent = ({ openWindow }) => {
    return (
        <div className={classes.sideBarContent}>
            <SideBarContentList openWindow={openWindow}/>
        </div>
    )
}

export default SideBarContent