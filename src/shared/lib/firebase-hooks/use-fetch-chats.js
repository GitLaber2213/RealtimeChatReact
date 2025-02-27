import { useDebounce } from "use-debounce"
import { firestoreDB } from "../../firebase/firebase-config"
import { useEffect, useState } from "react"
import { and, collection, limit, onSnapshot, orderBy, where } from "firebase/firestore"
import { query } from "firebase/database"
import { FirebaseConstants } from "../../../shared"
import { useAuth } from "./use-auth"



export const useFetchChats = (searchInputValue) => {
    const { uid } = useAuth()
    const [debounceSearchValue] = useDebounce(searchInputValue, 500)

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    useEffect(() => {
        setLoading(true)

        const usersArray = new Map() 

        const usersQuery = query(collection(firestoreDB, FirebaseConstants.FIREBASE_COLLECTION_USERS), where("uid", "!=", uid))

        const unsubscribeUsers = onSnapshot(usersQuery, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const userData = { id: doc.id, lastMessage: {}, countNotReadedMessage: 0, favorite: false, ...doc.data() }
                usersArray.set(userData.id, userData)

                getLastMessage(userData.id, usersArray)
                getFavoriteStatus(userData.id, usersArray)
                getCountNotReadedMessages(userData.id, usersArray)
            })

            filteredData(Array.from(usersArray.values()))

            setLoading(false)
        }, (error) => {
            setLoading(false)
        })

        return () => unsubscribeUsers()

    }, [debounceSearchValue, uid])

    const filteredData = (array) => {
        const filteredUsers = array.filter(user =>
            ["displayName", "email"].some((key) =>
                user[key]?.toLowerCase().includes(debounceSearchValue?.toLowerCase())
            )
        )

        setData(filteredUsers)
    }

    const getLastMessage = (userId, usersArray) => {
        const lastMessageQuery = query(
            collection(firestoreDB, FirebaseConstants.FIREBASE_COLLECTION_MESSAGES),
            where("participants", "array-contains-any", [userId]),
            orderBy("timestamp", "desc"),
            limit(1)
        )

        return onSnapshot(lastMessageQuery, (doc) => {
            doc.forEach((message) => {
                const userIndex = usersArray.get(userId)
                if (userIndex && message.data().participants.includes(uid)) {
                    userIndex.lastMessage = { messageId: message.id, ...message.data() }
                    filteredData(Array.from(usersArray.values()))
                }
            })
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
                if (userIndex && favorite.data().favorites.includes(uid)) {
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
                where("readed", "==", false),
                where("uid", "!=", uid)
            ),
            orderBy("timestamp", "desc")
        )

        return onSnapshot(countNotReadedMessageQuery, (doc) => {
            const userIndex = usersArray.get(userId)
            
            doc.forEach((message) => {
                if (userIndex && message.data().participants.includes(uid)) {
                    userIndex.countNotReadedMessage = doc.size
                    filteredData(Array.from(usersArray.values()))
            }
            })
        })
    }

    return { loading, data }
}