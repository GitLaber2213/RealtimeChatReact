import { onValue, ref } from "firebase/database"
import { db } from "../../firebase/firebase-config"
import { useEffect, useState } from "react"



export const useFetchUserByUid = (uid) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([]);


    useEffect(() => {
            const unSubscribe = onValue(ref(db, `Chats/${uid}`), (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val()
                    setData(data)
                }
                setLoading(false)
            })

            return () => unSubscribe()
        }, [uid])


    return { loading, data }

}