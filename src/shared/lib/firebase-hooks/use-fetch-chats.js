import { onValue, ref } from "firebase/database"
import { useDebounce } from "use-debounce"
import { db } from "../../firebase/firebase-config"
import { useEffect, useState } from "react"



export const useFetchChats = (uid, searchInputValue) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([]);
    const debounceSearchValue = useDebounce(searchInputValue, 200)

    useEffect(() => {
        const refdb = ref(db, 'Chats/')
        const unSubscribe = onValue(refdb, (snapshot) => {
            const fetchedData = snapshot.val();
            if (fetchedData) {
                setData(Object.values(fetchedData).filter((user) =>
                    user.uid !== uid &&
                    ["displayName"].some((key) => user[key]?.toLowerCase().includes(debounceSearchValue[0].toLowerCase()))
                ))
            }
            setLoading(false)
        })

        return () => unSubscribe()
    }, [debounceSearchValue[0]])

    return { loading, data }

}