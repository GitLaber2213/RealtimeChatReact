import { doc, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { auth, firestoreDB } from "../../firebase/firebase-config"
import { updateEmail } from "firebase/auth"
import { FirebaseConstants } from "../../../shared"



export const useUpdateProfile = () => {
    const [loading, setLoading] = useState(false)
    const [info, setInfo] = useState(undefined)

    const handleUpdateProfile = async (userInfo, uid) => {
        try {
            setLoading(true)
            const userRef = doc(firestoreDB, FirebaseConstants.FIREBASE_COLLECTION_USERS, uid)

            await updateEmail(auth.currentUser, userInfo.email)
            await updateDoc(userRef, userInfo)

            setInfo(undefined)
        } catch (error) {
            setInfo(error.message)
        } finally {
            setLoading(false)
            setInfo("success")
        }
    }

    return { loading, info, handleUpdateProfile }
}

export default useUpdateProfile