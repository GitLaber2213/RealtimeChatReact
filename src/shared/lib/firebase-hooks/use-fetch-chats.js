import { useDebounce } from "use-debounce"
import { firestoreDB } from "../../firebase/firebase-config"
import { useEffect, useState } from "react"
import { and, collection, limit, onSnapshot, orderBy, where } from "firebase/firestore"
import { query } from "firebase/database"
import { FirebaseConstants } from "../../constants/constants";
import { useAuth } from "./use-auth";



export const useFetchChats = (searchInputValue) => {
    const { uid } = useAuth()
    const debounceSearchValue = useDebounce(searchInputValue, 500)


    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])


    useEffect(() => {
        setLoading(true)

        let usersArray = []

        const usersQuery = query(collection(firestoreDB, FirebaseConstants.FIREBASE_COLLECTION_USERS), where("uid", "!=", uid))

        const unsubscribeUsers = onSnapshot(usersQuery, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                usersArray.push({ id: doc.id, lastMessage: {}, countNotReadedMessage: 0, ...doc.data() })


                getLastMessage(doc.data().uid, (lastMessage) => {
                    const userIndex = usersArray.findIndex(user => user.id === doc.id);

                    if (userIndex >= 0) {
                        usersArray[userIndex].lastMessage = lastMessage;
                    }
                    filteredData(usersArray)
                })

                getFavoriteStatus(doc.data().uid, (favorite) => {
                    const userIndex = usersArray.findIndex(user => user.id === doc.id)
                    if (userIndex >= 0) {
                        usersArray[userIndex].favorite = favorite
                    }
                    filteredData(usersArray)
                })

                getCountNotReadedMessages(doc.data().uid, (count) => {
                    const userIndex = usersArray.findIndex(user => user.id === doc.id)

                    if (userIndex >= 0) {
                        usersArray[userIndex].countNotReadedMessage = count
                        console.log(usersArray[userIndex].countNotReadedMessage)
                    }
                    filteredData(usersArray)
                })
            })


            setLoading(false)
        }, (error) => {
            setLoading(false)
        })

        return () => unsubscribeUsers()

    }, [debounceSearchValue[0], uid])


    const filteredData = (array) => {
        const filteredUsers = array.filter(user =>
            ["displayName", "email"].some((key) =>
                user[key]?.toLowerCase().includes(debounceSearchValue[0]?.toLowerCase())
            ))

        setData(filteredUsers)
    }

    const getLastMessage = (userId, callback) => {
        const lastMessageQuery = query(
            collection(firestoreDB, FirebaseConstants.FIREBASE_COLLECTION_MESSAGES),
            where("participants", "array-contains-any", [userId]),
            orderBy("timestamp", "desc"), limit(1))

        const unsubscribe = onSnapshot(lastMessageQuery, (doc) => {
            doc.forEach((message) => {
                if (message.data().participants.includes(uid)) {
                    callback({ messageId: message.id, ...message.data() })
                }
            })
        }, (error) => {
            setLoading(false)
        })

        return () => unsubscribe()
    }

    const getFavoriteStatus = (userId, callback) => {
        const favoritesQuery = query(
            collection(firestoreDB, FirebaseConstants.FIREBASE_COLLECTION_FAVORITES),
            where("uid", "==", uid),
            limit(1))

        const unsubscribe = onSnapshot(favoritesQuery, (doc) => {
            doc.forEach((favorite) => {
                callback(favorite.data().favorites.some(favoriteUser => favoriteUser.userId === userId))
            })
        }, (error) => {
            setLoading(false)
        })

        return () => unsubscribe()
    }


    const getCountNotReadedMessages = (userId, callback) => {
        const countNotReadedMessageQuery = query(
            collection(firestoreDB, FirebaseConstants.FIREBASE_COLLECTION_MESSAGES),
            and(
                where("participants", "array-contains-any", [userId]),
                where("readed", "==", false),
            ),
            orderBy("timestamp", "desc"))

        let a = 0
        const unsubscribe = onSnapshot(countNotReadedMessageQuery, (doc) => {

            doc.forEach((message) => {
                if (message.data().participants.includes(uid)) {
                    callback(doc.size)
                }
            })
            callback(doc.size)
        }, (error) => {
            setLoading(false)
        })

        return () => unsubscribe()
    }

    return { loading, data }
}