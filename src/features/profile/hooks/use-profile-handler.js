import { useParams } from "react-router-dom"
import { useFetchUserByUid } from "../../../shared"
import { useEffect, useState } from "react"




export const useProfileHandler = (uid) => {
    const { id } = useParams()
    const { loading, data } = useFetchUserByUid(uid !== null ? uid : id)

    const [editAvatar, setEditAvatar] = useState(false)

    const [userInfo, setUserInfo] = useState({
        displayName: "",
        email: "",
        phone: "",
        avatar: null
    })

    useEffect(() => {
        if (data) {
            setUserInfo({
                displayName: data.displayName,
                email: data.email,
                phone: data.phone,
                avatar: data.avatar
            })
        }
    }, [data])

    const handleChangeInput = (key) => (value) => {
        setUserInfo(prev => ({ ...prev, [key]: value }))
    }

    const handleImageClick = (isActive) => {
        if (uid !== null) {
            setEditAvatar(isActive)
        }
    }

    return { loading, data, userInfo, setUserInfo, setEditAvatar, handleChangeInput, handleImageClick, editAvatar }
}