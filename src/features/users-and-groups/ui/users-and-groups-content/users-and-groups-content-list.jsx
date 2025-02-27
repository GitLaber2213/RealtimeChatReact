import React from "react"
import UsersAndGroupsContentListItem from './users-and-groups-content-list-item'
import { Loader, useFetchChats } from "../../../../shared"
import { useSelector } from "react-redux"

export const UsersAndGroupsContentList = ({ minWidth }) => {
    const searchInputValue = useSelector((state) => state.usersAndGroups.searchInputValue)
    const { data, loading } = useFetchChats(searchInputValue)


    if (loading) {
        return <Loader />
    }

    return (
        <div>
            {data.map((user) => <UsersAndGroupsContentListItem
                key={user.uid}
                avatar={user.avatar}
                userName={user.displayName}
                userId={user.uid}
                favorite={user.favorite}
                lastMessage={user.lastMessage}
                countNotReadedMessage={user.countNotReadedMessage} 
                minWidth={minWidth} />)}
        </div>
    )
}

export default UsersAndGroupsContentList