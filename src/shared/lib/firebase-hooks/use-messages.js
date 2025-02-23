import { addDoc, and, arrayUnion, collection, doc, getDoc, getDocs, onSnapshot, orderBy, Timestamp, updateDoc, where } from "firebase/firestore"
import { FirebaseConstants } from "../../constants/constants"
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
    const [lastMessage, setLastMessage] = useState({})
    const [countNotReadedMessage, setCountNotReadedMessage] = useState(0)


    const messagesQuery = query(
        collection(firestoreDB, FirebaseConstants.FIREBASE_COLLECTION_MESSAGES),
        where("participants", "array-contains-any", [uid]),
        orderBy("timestamp", "desc"))

    const notReadedMessagesQuery = query(
        collection(firestoreDB, FirebaseConstants.FIREBASE_COLLECTION_MESSAGES),
        and(where("readed", "==", false)),
        orderBy("timestamp", "desc"))

    useEffect(() => {
        const unsubscribe = onSnapshot(messagesQuery, (doc) => {
            const messageArray = []
            doc.forEach((message) => {
                if (message.data().participants.includes(id)) {
                    messageArray.push({ messageId: message.id, ...message.data() })
                }
            })

            if (JSON.stringify(messageArray) !== JSON.stringify(messages)) {
                setMessages(messageArray)
                if (messageArray.length > 0) {
                    setLastMessage(messageArray[0])
                }
            }
        })



        const unsubscribeNotReadedMessage = onSnapshot(notReadedMessagesQuery, (doc) => {
            setCountNotReadedMessage(doc.size)
        })


        return () => {
            unsubscribe()
            unsubscribeNotReadedMessage()
        }
    }, [id])


    const sendMessage = async (message) => {
        setLoadingSendMessage(true);
        try {
            const messagesCollection = collection(firestoreDB, FirebaseConstants.FIREBASE_COLLECTION_MESSAGES);

            await addDoc(messagesCollection, {
                message: message,
                timestamp: Timestamp.now(),
                participants: arrayUnion(id, uid),
                uid: uid,
                readed: false
            });
        } catch (error) {
            //console.log(error);
        } finally {
            setLoadingSendMessage(false);
        }
    }


    const readingMessage = async (readStatus, messageId) => {
        try {
            const docRef = doc(firestoreDB, FirebaseConstants.FIREBASE_COLLECTION_MESSAGES, messageId)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists() && uid !== docSnap.data().uid) {
                updateDoc(docRef, {
                    readed: readStatus
                })
            }
        } catch (error) {
            // console.log(error)
        }
    }

    return { sendMessage, readingMessage, messages, loadingSendMessage, lastMessage, countNotReadedMessage }
}