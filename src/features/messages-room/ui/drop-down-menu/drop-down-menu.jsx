import React from "react"
import classes from './drop-down-menu.module.css'
import MenuList from "./menu-list"



const DropDownMenu = ({ isActive, setIsActive, isAdmin }) => {
    return (
        <div className={isActive ? classes.menuContainer + ` ` + classes.active : classes.menuContainer} onClick={() => setIsActive(false)}>
            <div className={isActive ? classes.menu + ' ' + classes.active : classes.menu } onClick={e => e.stopPropagation()}>
                <MenuList groupChatEdit={isAdmin}/>
            </div>
        </div>
    )
}

export default DropDownMenu