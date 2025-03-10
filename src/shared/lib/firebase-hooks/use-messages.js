import { addDoc, arrayUnion, collection, doc, getDoc, onSnapshot, orderBy, Timestamp, updateDoc, where, writeBatch } from "firebase/firestore"
import { FirebaseConstants, useFetchUserByUid } from "../../../shared"
import { firestoreDB } from "../../firebase/firebase-config"
import { useAuth } from "./use-auth"
import { query } from "firebase/database"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"



export const useMessages = () => {
    const { uid } = useAuth()
    const { id } = useParams()
    const { data, loading } = useFetchUserByUid(id)
    const [messages, setMessages] = useState([])
    const [loadingSendMessage, setLoadingSendMessage] = useState(false)
    const [loadingMessages, setLoadingMessages] = useState(false)



    useEffect(() => {
        if(!id) return
        setLoadingMessages(true)
        const messagesQuery = query(
            collection(firestoreDB, FirebaseConstants.FIREBASE_COLLECTION_MESSAGES),
            where("participants", "array-contains-any", [id]),
            orderBy("timestamp", "desc"))

        const unsubscribe = onSnapshot(messagesQuery, (doc) => {
            const messageArray = []
            doc.forEach((message) => {

                if (data.type === FirebaseConstants.FIREBASE_DOC_TYPE_USER && message.data().participants.includes(uid)) {
                    messageArray.push({
                        messageId: message.id,
                        myMessage: message.data().uid === uid,
                        messageRef: message.ref,
                        ...message.data()
                    })
                } else if (data.type === FirebaseConstants.FIREBASE_DOC_TYPE_GROUP) {
                    messageArray.push({
                        messageId: message.id,
                        myMessage: message.data().uid === uid,
                        messageRef: message.ref,
                        ...message.data()
                    })
                }
            })

            setMessages(messageArray)
            setLoadingMessages(false)
        })

        return () => {
            unsubscribe()
        }
    }, [id, uid, data])


    const sendMessage = async (message, displayName, usersInGroup = []) => {

        setLoadingSendMessage(true)
        try {
            const messagesCollection = collection(firestoreDB, FirebaseConstants.FIREBASE_COLLECTION_MESSAGES)

            await addDoc(messagesCollection, {
                message: message,
                timestamp: Timestamp.now(),
                participants: usersInGroup.length > 0 ? arrayUnion(id) : arrayUnion(id, uid),
                uid: uid,
                displayName: displayName,
                readed: arrayUnion()
            })
        } catch (error) {
            // console.log(error)
        } finally {
            setLoadingSendMessage(false)
        }
    }


    const readingMessage = async (messageId) => {
        try {
            const docRef = doc(firestoreDB, FirebaseConstants.FIREBASE_COLLECTION_MESSAGES, messageId)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists() && uid !== docSnap.data().uid) {
                updateDoc(docRef, {
                    readed: arrayUnion(uid)
                })
            }
        } catch (error) {
            // console.log(error)
        }
    }

    const deleteChat = async () => {
        try {
            setLoadingSendMessage(true)
            const batch = writeBatch(firestoreDB)

            messages.forEach((message) => {
                if (message.participants.includes(id)) {
                    batch.delete(message.messageRef)
                }
            })

            await batch.commit()
        } catch (error) {
            // console.log(error)
        } finally {
            setLoadingSendMessage(false)
        }
    }

    return { sendMessage, readingMessage, deleteChat, messages, loadingSendMessage, loadingMessages, id, loading }
}

export default useMessages