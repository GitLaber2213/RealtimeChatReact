import React from "react"
import classes from './users-and-groups-content-list-item.module.css'
import { Chat } from "../../../../entites"
import { useNavigate, useParams } from "react-router-dom"
import { RouteConstants } from "../../../../shared/constants/constants"
import { useDispatch } from "react-redux"
import { usersAndGroupsSlice } from "../../model/users-and-groups.slice"


export const UsersAndGroupsContentListItem = ({ userName, userId, avatar, favorite, lastMessage, countNotReadedMessage, minWidth }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()


    const handleClick = (userId) => {
        navigate(`${RouteConstants.CHATS}${userId}`, { relative: "path" })
        dispatch(usersAndGroupsSlice.actions.searchUsers(''))
    }


    return (
        <div className={userId === id ? classes.usersAndGroupsContentListItem + ' ' + classes.active : classes.usersAndGroupsContentListItem} onClick={() => handleClick(userId)}>
            <Chat avatar={avatar}
                userName={userName}
                activeChat={userId === id}
                favorite={favorite}
                lastMessage={lastMessage}
                countNotReadedMessage={countNotReadedMessage}
                minWidth={minWidth} />
        </div>
    )
}

export default UsersAndGroupsContentListItem