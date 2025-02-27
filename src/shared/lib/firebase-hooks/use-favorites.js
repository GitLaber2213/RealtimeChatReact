import { doc, updateDoc, arrayUnion, setDoc, arrayRemove, getDoc } from "firebase/firestore"
import { FirebaseConstants } from "../../../shared"
import { useAuth } from "./use-auth"
import { firestoreDB } from "../../firebase/firebase-config"
import { useEffect, useState } from "react"


const checkDocExists = async (docRef, paramObj) => {
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        updateDoc(docRef, paramObj)
    } else {
        setDoc(docRef, paramObj)
    }
}


export const useFavorites = (userId) => {
    const { uid } = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(undefined)
    const [isFavorite, setIsFavorite] = useState(false)
    
    useEffect(() => {
        setLoading(true)
        getDoc(doc(firestoreDB, FirebaseConstants.FIREBASE_COLLECTION_FAVORITES, uid))
        .then(docSnap => {
            const favorite = docSnap.data().favorites.find(el => el.userId === userId)

            if (favorite) {
                setIsFavorite(favorite.favorite)
            } else {
                setIsFavorite(false)
            }
        })
        .catch(error => setError(error.message))
        .finally(() => setLoading(false))
    }, [userId])


    const addFavorite = async (userId) => {
        setError(undefined)
        setLoading(true)

        try {
            const docRef = doc(firestoreDB, FirebaseConstants.FIREBASE_COLLECTION_FAVORITES, uid)
            await checkDocExists(docRef, {
                uid: uid,
                favorites: arrayUnion({ uid: uid, favorite: true, userId: userId })
            })
            setIsFavorite(true)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const deleteFavorite = async (userId) => {
        setError(undefined)
        setLoading(true)
        try {
            const docRef = doc(firestoreDB, FirebaseConstants.FIREBASE_COLLECTION_FAVORITES, uid)
            await checkDocExists(docRef, {
                uid: uid,
                favorites: arrayRemove({ uid: uid, favorite: true, userId: userId })
            })
            setIsFavorite(false)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }


    return { loading, error, addFavorite, deleteFavorite, isFavorite }
}
