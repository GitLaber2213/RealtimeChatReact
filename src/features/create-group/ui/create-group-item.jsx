import React from "react"
import classes from './create-group-item.module.css'
import { ItemInList } from "../../../shared"


export const CreateGroupItem = ({ user, handleClick, selectedUsers }) => {
    return (
        <div className={selectedUsers.has(user) ? classes.userItem + ' ' + classes.selected : classes.userItem}>
            <ItemInList handleClick={() => handleClick(user)} image={user.avatar} imgHeight={40} imgWidth={40} text={user.displayName} />
            <div className={classes.whiteDot}></div>
        </div>
    )
}


export default CreateGroupItem