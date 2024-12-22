import React from "react";
import classes from './drop-down-menu.module.css'
import { Constants } from "../../../../shared";
import MenuList from "./menu-list";



const DropDownMenu = ({ activeWindow, closeWindow, openWindow }) => {
    return (
        <div className={activeWindow === Constants.DROPDOWN_MENU_WINDOW ? classes.menuContainer + ` ` + classes.active : classes.menuContainer} onClick={closeWindow}>
            <div className={activeWindow === Constants.DROPDOWN_MENU_WINDOW ? classes.menu + ' ' + classes.active : classes.menu } onClick={e => e.stopPropagation()}>
                <MenuList openWindow={openWindow}/>
            </div>
        </div>
    )
}

export default DropDownMenu