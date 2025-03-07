import React from "react"
import classes from './create-group-item.module.css'
import { ItemInList } from "../../../shared"


export const CreateGroupItem = ({ user, handleClick, isEdit, selectedUsers }) => {
    const userItemClass = isEdit ? (selectedUsers.has(user.uid) ? classes.userItem + ' ' + classes.edit + ' ' + classes.selected : classes.userItem + ' ' + classes.edit) 
    : (classes.userItem) 

    return (
        <div className={userItemClass}>
            <ItemInList handleClick={() => handleClick(user.uid)} image={user.avatar} imgHeight={40} imgWidth={40} text={user.displayName} />
            {isEdit && <div className={classes.whiteDot}></div>}
        </div>
    )
}


export default CreateGroupItem