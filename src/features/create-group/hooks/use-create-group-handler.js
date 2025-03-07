import { useEffect, useState } from "react"
import { RouteConstants, useAuth, useCreateGroup, useFetchChats } from "../../../shared"
import { useNavigate, useParams } from "react-router-dom"



export const useCreateGroupHandlers = (setIsActive, groupAdminId, displayName, avatar, groupUsers) => {
    const { uid } = useAuth()
    const isEdit = groupAdminId === uid
    const [groupInfo, setGroupInfo] = useState({
        groupName: '',
        groupImage: ''
    })
    const { id } = useParams()
    const { loading, data } = useFetchChats('', true, isEdit, groupUsers)
    const { createGroup, updateGroup, info, loading: loadingCreateGroup } = useCreateGroup()
    const [selectedUsers, setSelectedUsers] = useState(new Set(groupUsers))
    const [editAvatar, setEditAvatar] = useState(false)
    const navigate = useNavigate()



    useEffect(() => {
        if (!displayName && !avatar) return
        setGroupInfo({
            groupName: displayName,
            groupImage: avatar
        })
    }, [displayName, avatar])


    const handleClickUser = (item) => {
        setSelectedUsers(prevSelected => {
            const newSelected = new Set(prevSelected)
            if (newSelected.has(item)) {
                newSelected.delete(item)
            } else {
                newSelected.add(item)
            }
            return newSelected
        })
    }

    const handleImageClick = () => {
        setEditAvatar(!editAvatar)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        let newId
        displayName ?
            await updateGroup(id, [...selectedUsers], groupInfo.groupName, groupInfo.groupImage)
            :
            newId = await createGroup(groupInfo.groupName, groupInfo.groupImage, [...selectedUsers], uid)

        if (newId) {
            navigate(`${RouteConstants.CHATS}${newId}`, { relative: "path" })
            setIsActive(false)
        }
    }

    const handleChangeInfo = (key) => (value) => {
        setGroupInfo(prev => ({ ...prev, [key]: value }))
    }

    return { groupInfo, selectedUsers, editAvatar, isEdit, handleClickUser, handleImageClick, handleSubmit, handleChangeInfo, loading, data, info, loadingCreateGroup }
}