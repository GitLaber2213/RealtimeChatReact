import React from "react"
import classes from './users-and-groups-header.module.css'
import { FindUsers } from "../../../../entites"
import { useDispatch, useSelector } from "react-redux"
import { usersAndGroupsSlice } from "../../model/users-and-groups.slice"


export const UsersAndGroupsHeader = () => {
    const dispatch = useDispatch()
    const searchInputValue = useSelector((state) => state.usersAndGroups.searchInputValue)
    
    const handleChange = (event) => {
        dispatch(usersAndGroupsSlice.actions.searchUsers(event.target.value))
    }
    return (
        <div className={classes.chatsHeader}>
            <FindUsers handleChange={handleChange} searchInputValue={searchInputValue}/>
        </div>
    )
}

export default UsersAndGroupsHeader
