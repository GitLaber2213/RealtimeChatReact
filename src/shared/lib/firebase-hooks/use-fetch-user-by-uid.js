import { firestoreDB } from "../../firebase/firebase-config"
import { useEffect, useState } from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { FirebaseConstants } from "../../constants/constants"

export const useFetchUserByUid = (uid) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!uid) return
        
        setLoading(true)
        const unSubscribe = onSnapshot(doc(firestoreDB, FirebaseConstants.FIREBASE_COLLECTION_USERS, uid), (doc) => {
            setData(doc.data())
        })

        setLoading(false)

        return () => unSubscribe()

    }, [uid])

    return { loading, data }
}
