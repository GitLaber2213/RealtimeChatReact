import { useNavigate } from "react-router-dom"
import { FirebaseConstants, RouteConstants } from "../../../shared"
import { useAuth } from "../../../shared"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useState } from "react"
import { doc, setDoc} from "firebase/firestore"
import { firestoreDB } from "../../../shared/firebase/firebase-config"

export const useHandleSignIn = (authType) => {
    const { auth } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState(undefined)
    const [loading, setLoading] = useState(false)

    const handleSignIn = async (email, password, displayName) => {
        setError(undefined)
        try {
            setLoading(true)
            switch (authType) {
                case "login":
                    await signInWithEmailAndPassword(auth, email, password)
                    break
                case "signup":
                    const user = await createUserWithEmailAndPassword(auth, email, password)
                    await updateProfile(user.user, { displayName: displayName })
                    await setDoc(doc(firestoreDB, FirebaseConstants.FIREBASE_COLLECTION_USERS, user.user.uid), {
                        displayName: user.user.displayName,
                        email: user.user.email,
                        photoURL: user.user.photoURL,
                        uid: user.user.uid,
                        phone: "",
                        type: FirebaseConstants.FIREBASE_DOC_TYPE_USER,
                        avatar: null,
                    })
                    break
            }
            navigate(RouteConstants.CHATS, { relative: "path" })
        } catch (signInError) {
            setError(signInError.message)
        } finally {
            setLoading(false)
        }
    }

    return { error, loading, handleSignIn, navigate }
}


export default useHandleSignIn