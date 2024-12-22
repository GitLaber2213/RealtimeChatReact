import React, { useEffect, useState } from "react";
import UsersAndGroupsContentListItem from './users-and-groups-content-list-item'
import { onValue, query, ref } from "firebase/database";
import { db } from "../../../../shared/firebase/firebase-config";
import { Loader, useAuth } from "../../../../shared";
import { useSelector } from "react-redux";
import { useDebounce } from "use-debounce";

export const UsersAndGroupsContentList = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([]);
    const { uid } = useAuth()

    const searchInputValue = useSelector((state) => state.usersAndGroups.searchInputValue)
    const debounceSearchValue = useDebounce(searchInputValue, 200)

    useEffect(() => {
        const refdb = ref(db, 'Chats/')
        const unSubscribe = onValue(refdb, (snapshot) => {
            const fetchedData = snapshot.val();
            if (fetchedData) {
                setData(Object.values(fetchedData).filter((user) => 
                    user.uid !== uid &&
                    ["displayName"].some((key) => user[key]?.toLowerCase().includes(debounceSearchValue[0].toLowerCase()))
                ))
            }
            setLoading(false)
        })

        return () => unSubscribe()
    }, [debounceSearchValue[0]])

    if (loading) {
        return <Loader />
    }

    return (
        <div>
            {data.map((user) => <UsersAndGroupsContentListItem
                key={user.uid}
                avatar={user.img}
                userName={user.displayName}
                userId={user.uid}
                favorite={user.favorite} />)}
        </div>
    )
}

export default UsersAndGroupsContentList