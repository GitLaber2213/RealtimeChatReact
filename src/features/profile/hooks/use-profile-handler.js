import { useParams } from "react-router-dom"
import { useFetchUserByUid, useUpdateProfile } from "../../../shared"
import { useEffect, useState } from "react"




export const useProfileHandler = (uid) => {
    const { id } = useParams()
    const { loading, data } = useFetchUserByUid(uid !== null ? uid : id)
    const { info, loading: loadingUpdateProfile, handleUpdateProfile } = useUpdateProfile()

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

    const handleChangeUserInfo = (key) => (value) => {
        setUserInfo(prev => ({ ...prev, [key]: value }))
    }

    const handleImageClick = (isActive) => {
        if (uid !== null) {
            setEditAvatar(isActive)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await handleUpdateProfile(userInfo, uid)
    }

    return { loading, loadingUpdateProfile, data, userInfo, setUserInfo, setEditAvatar, handleChangeUserInfo, handleImageClick, handleSubmit, info, editAvatar }
}

export default useProfileHandler