import { doc, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { auth, firestoreDB } from "../../firebase/firebase-config"
import { updateEmail } from "firebase/auth"
import { FirebaseConstants } from "../../constants/constants"



export const useUpdateProfile = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(undefined)

    const handleUpdateProfile = async (userInfo, uid) => {
        try {
            setLoading(true)
            const userRef = doc(firestoreDB, FirebaseConstants.FIREBASE_COLLECTION_USERS, uid)

            await updateEmail(auth.currentUser, userInfo.email)
            await updateDoc(userRef, userInfo)

            setError(undefined)
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, handleUpdateProfile }
}