import { useState } from "react"
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore"
import { FirebaseConstants, SuccessConstantsKey } from "../../constants/constants"
import { firestoreDB } from "../../firebase/firebase-config"



export const useCreateGroup = () => {
    const [info, setInfo] = useState(undefined)
    const [loading, setLoading] = useState(false)
    

    const createGroup = async (displayName, avatar, usersIDS, uid) => {
        setLoading(true)

        const docRef = await addDoc(collection(firestoreDB, FirebaseConstants.FIREBASE_COLLECTION_USERS), {
            favorite: false,
            avatar: avatar,
            displayName: displayName,
            admin: uid,
            type: FirebaseConstants.FIREBASE_DOC_TYPE_GROUP,
            users: arrayUnion(...usersIDS, uid)
        })

        await updateDoc(docRef, { uid: docRef.id })        
        .then(() => setInfo(SuccessConstantsKey.SUCCESS))
        .catch(error => setInfo(error.message))
        .finally(() => {setLoading(false)})

        return docRef.id

    }

    const updateGroup = async (id, usersIDS, displayName, avatar) => {
        setLoading(true)

        const docRef = doc(firestoreDB, FirebaseConstants.FIREBASE_COLLECTION_USERS, id)
        await updateDoc(docRef, {
                avatar: avatar,
                displayName: displayName,
                users: usersIDS 
            })
        .then(() => setInfo(SuccessConstantsKey.SUCCESS))
        .catch(error => setInfo(error.message))
        .finally(() => setLoading(false))
    }

    return { createGroup, updateGroup, info, loading }
}