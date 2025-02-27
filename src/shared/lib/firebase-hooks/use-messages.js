import { addDoc, arrayUnion, collection, doc, getDoc, onSnapshot, orderBy, Timestamp, updateDoc, where, writeBatch } from "firebase/firestore"
import { FirebaseConstants } from "../../../shared"
import { firestoreDB } from "../../firebase/firebase-config"
import { useAuth } from "./use-auth"
import { query } from "firebase/database"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"



export const useMessages = () => {
    const { uid } = useAuth()
    const { id } = useParams()

    const [messages, setMessages] = useState([])
    const [loadingSendMessage, setLoadingSendMessage] = useState(false)


    useEffect(() => {
        const messagesQuery = query(
            collection(firestoreDB, FirebaseConstants.FIREBASE_COLLECTION_MESSAGES),
            where("participants", "array-contains-any", [uid]),
            orderBy("timestamp", "desc"))

        const unsubscribe = onSnapshot(messagesQuery, (doc) => {
            const messageArray = []
            doc.forEach((message) => {
                if (message.data().participants.includes(id)) {
                    messageArray.push({ messageId: message.id, messageRef: message.ref, ...message.data() })
                }
            })

            setMessages(messageArray)
        })
        return () => {
            unsubscribe()
        }
    }, [id, uid])


    const sendMessage = async (message) => {
        setLoadingSendMessage(true)
        try {
            const messagesCollection = collection(firestoreDB, FirebaseConstants.FIREBASE_COLLECTION_MESSAGES)

            await addDoc(messagesCollection, {
                message: message,
                timestamp: Timestamp.now(),
                participants: arrayUnion(id, uid),
                uid: uid,
                readed: false
            })
        } catch (error) {
            //console.log(error)
        } finally {
            setLoadingSendMessage(false)
        }
    }


    const readingMessage = async (readStatus, messageId) => {
        try {
            const docRef = doc(firestoreDB, FirebaseConstants.FIREBASE_COLLECTION_MESSAGES, messageId)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists() && uid !== docSnap.data().uid && !docSnap.data().readed) {
                updateDoc(docRef, {
                    readed: readStatus
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

    return { sendMessage, readingMessage, deleteChat, messages, loadingSendMessage }
}