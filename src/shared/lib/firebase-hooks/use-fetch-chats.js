import { useDebounce } from "use-debounce"
import { firestoreDB } from "../../firebase/firebase-config"
import { useEffect, useState } from "react"
import { and, collection, limit, onSnapshot, orderBy, where } from "firebase/firestore"
import { query } from "firebase/database"
import { FirebaseConstants } from "../../../shared"
import { useAuth } from "./use-auth"



export const useFetchChats = (searchInputValue, onlyUsers = false, isEditGroup = false, groupUsers) => {
    const { uid } = useAuth()
    const [debounceSearchValue] = useDebounce(searchInputValue, 500)

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    useEffect(() => {

        const usersArray = new Map()
        let usersQuery
        const usersCollection = collection(firestoreDB, FirebaseConstants.FIREBASE_COLLECTION_USERS)

        if (onlyUsers) {
            if (isEditGroup) {
                usersQuery = query(
                    usersCollection,
                    where("type", "==", FirebaseConstants.FIREBASE_DOC_TYPE_USER)
                )
            } else {
                usersQuery = query(
                    usersCollection,
                    and(
                        where("type", "==", FirebaseConstants.FIREBASE_DOC_TYPE_USER),
                        where("uid", "in", groupUsers)
                    )
                )
            }
        } else {
            usersQuery = query(usersCollection)
        }

        const unsubscribeUsers = onSnapshot(usersQuery, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const userData = { id: doc.id, lastMessage: {}, countNotReadedMessage: 0, favorite: false, ...doc.data() }
                usersArray.set(userData.id, userData)
                getLastMessage(userData.id, usersArray)
                getFavoriteStatus(userData.id, usersArray)
                getCountNotReadedMessages(userData.id, usersArray)
            })

            filteredData(Array.from(usersArray.values()))

        }, (error) => {
        })

        return () => unsubscribeUsers()

    }, [debounceSearchValue, uid])

    const filteredData = (array) => {
        setLoading(true)
        const filteredUsers = array.filter(user => {
            const matchesSearch = ["displayName"].some(key =>
                user[key]?.toLowerCase().includes(debounceSearchValue?.toLowerCase())
            )

            let shouldIncludeUser = true

            if (user.type === FirebaseConstants.FIREBASE_DOC_TYPE_GROUP) {
                shouldIncludeUser = user.users && user.users.includes(uid)
            } else if (user.type === FirebaseConstants.FIREBASE_DOC_TYPE_USER) {
                shouldIncludeUser = onlyUsers && !isEditGroup ? true : user.uid !== uid
            }

            return matchesSearch && shouldIncludeUser
        })

        setData(filteredUsers)
        setLoading(false)
    }

    const getLastMessage = (userId, usersArray) => {
        const lastMessageQuery = query(
            collection(firestoreDB, FirebaseConstants.FIREBASE_COLLECTION_MESSAGES),
            where("participants", "array-contains-any", [userId]),
            orderBy("timestamp", "desc"),
            limit(1)
        )

        return onSnapshot(lastMessageQuery, (doc) => {
            const userIndex = usersArray.get(userId)
            doc.forEach((message) => {
                if(userIndex && userIndex.type === FirebaseConstants.FIREBASE_DOC_TYPE_GROUP && !message.data().readed.includes(userIndex.id)) {
                    userIndex.lastMessage = { messageId: message.id, ...message.data() }
                }
                else if (userIndex && userIndex.type === FirebaseConstants.FIREBASE_DOC_TYPE_USER && message.data().participants.includes(uid)) {
                    userIndex.lastMessage = { messageId: message.id, ...message.data() }
                }
            })
            filteredData(Array.from(usersArray.values()))
        })
    }

    const getFavoriteStatus = (userId, usersArray) => {
        const favoritesQuery = query(
            collection(firestoreDB, FirebaseConstants.FIREBASE_COLLECTION_FAVORITES),
            where("uid", "==", uid),
            limit(1)
        )
        return onSnapshot(favoritesQuery, (doc) => {
            doc.forEach((favorite) => {
                const isFavorite = favorite.data().favorites.some(favoriteUser => favoriteUser.userId === userId)
                const userIndex = usersArray.get(userId)
                if (userIndex) {
                    userIndex.favorite = isFavorite
                    filteredData(Array.from(usersArray.values()))
                }
            })
        })
    }

    const getCountNotReadedMessages = (userId, usersArray) => {
        const countNotReadedMessageQuery = query(
            collection(firestoreDB, FirebaseConstants.FIREBASE_COLLECTION_MESSAGES),
            and(
                where("participants", "array-contains-any", [userId]),
                where("uid", "!=", uid)
            ),
            orderBy("timestamp", "desc")
        )

        return onSnapshot(countNotReadedMessageQuery, (doc) => {
            let count = 0
            const userIndex = usersArray.get(userId)
            doc.forEach((message) => {
                if (userIndex && userIndex.type === FirebaseConstants.FIREBASE_DOC_TYPE_GROUP && !message.data().readed.includes(uid)) {
                    count++
                }
                else if (userIndex && userIndex.type === FirebaseConstants.FIREBASE_DOC_TYPE_USER && message.data().participants.includes(uid) && !message.data().readed.includes(uid)) {
                    count++
                }
            })
            userIndex.countNotReadedMessage = count
            filteredData(Array.from(usersArray.values()))
        })
    }

    return { loading, data }
}

export default useFetchChats