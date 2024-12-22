import React from "react";
import classes from './side-bar-header.module.css'
import userPhoto from '../../../../shared/assets/user.png'
import { ItemInList, Loader, useAuth } from "../../../../shared";


export const SideBarHeader = () => {
    const { user } = useAuth()

    return (
        <div className={classes.sideBarHeader} onClick={e => e.stopPropagation()}>
            <ItemInList image={userPhoto} imgHeight={35} imgWidth={35} text={!user ? "loading..." : user.displayName} />
        </div>
    )
}


export default SideBarHeader