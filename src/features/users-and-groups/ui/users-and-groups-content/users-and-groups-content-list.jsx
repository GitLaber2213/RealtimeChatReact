import React from "react";
import UsersAndGroupsContentListItem from './users-and-groups-content-list-item'
import { Loader, useAuth, useFetchChats } from "../../../../shared";
import { useSelector } from "react-redux";

export const UsersAndGroupsContentList = () => {
    const searchInputValue = useSelector((state) => state.usersAndGroups.searchInputValue)
    const { uid } = useAuth()
    const { data, loading } = useFetchChats(uid, searchInputValue)

    
    if (loading) {
        return <Loader />
    }

    return (
        <div>
            {data.map((user) => <UsersAndGroupsContentListItem
                key={user.uid}
                avatar={user.photoURL}
                userName={user.displayName}
                userId={user.uid} 
                favorite={user.favorite}/>)}
        </div>
    )
}

export default UsersAndGroupsContentList