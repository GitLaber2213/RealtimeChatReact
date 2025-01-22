import { doc, setDoc } from "firebase/firestore"
import { FirebaseConstants } from "../../constants/constants"
import { useAuth } from "./use-auth"
import { firestoreDB } from "../../firebase/firebase-config"
import { useState } from "react"



export const useChangeFavorite = () => {
    const { uid } = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(undefined)

    const handleUpdateFavorite = async (userId, favorite) => {
        setError(undefined)
        setLoading(true)
        try {
            await setDoc(doc(firestoreDB, FirebaseConstants.FIREBASE_COLLECTION_FAVORITES, userId), {
                uid: uid,
                favorite: favorite,
                userId: userId
            })
        } catch (error) {
            setError(error.message)
            console.log(error.message)
        } finally {
            setLoading(false)
        }
    }


    return { loading, error, handleUpdateFavorite }
}