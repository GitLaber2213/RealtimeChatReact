import { useDebounce } from "use-debounce"
import { firestoreDB } from "../../firebase/firebase-config"
import { useEffect, useState } from "react"
import { collection, query, getDocs, where, onSnapshot } from "firebase/firestore"
import { FirebaseConstants } from "../../constants/constants";



export const useFetchChats = (uid, searchInputValue) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([]);
    const debounceSearchValue = useDebounce(searchInputValue, 200)


    useEffect(() => {
        if (!uid) return

        setLoading(true)
        const usersQuery = query(collection(firestoreDB, FirebaseConstants.FIREBASE_COLLECTION_USERS), where("uid", "!=", uid))
        const favoritesQuery = query(collection(firestoreDB, FirebaseConstants.FIREBASE_COLLECTION_FAVORITES))

        const unsubscribeUsers = onSnapshot(usersQuery, (querySnapshot) => {
            const usersArray = []
            querySnapshot.forEach((doc) => {
                usersArray.push({ id: doc.id, ...doc.data() })
            });

            const filteredUsers = usersArray.filter(user =>
                ["displayName", "email"].some((key) =>
                    user[key]?.toLowerCase().includes(debounceSearchValue[0]?.toLowerCase())
                )
            );

            setData(filteredUsers)
            setLoading(false)
        }, (error) => {
            //
            setLoading(false)
        });

        const unsubscribeFavorites = onSnapshot(favoritesQuery, (querySnapshot) => {
            const favoritesArray = []
            querySnapshot.forEach((doc) => {
                favoritesArray.push({ id: doc.id, ...doc.data() })
            });
            console.log(favoritesArray)
            setData((prevData) => prevData.map((user) => ({
                ...user,
                favorite: favoritesArray.some((favorite) => favorite.userId === user.id)
            })));
            setLoading(false)
        }, (error) => {
            //
            setLoading(false)
        });


        return () => {
            unsubscribeUsers()
            unsubscribeFavorites()
        }
        
    }, [debounceSearchValue[0], uid]);
    
    return { loading, data };
};