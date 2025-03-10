import { useState } from "react"
import { useAuth, useFetchUserByUid, useMessages } from "../../../shared"
import { useParams } from "react-router-dom"

export const useMessageSender = () => {
    const [messageSenderText, setMessageSenderText] = useState('')
    const { sendMessage, loadingSendMessage } = useMessages()
    const { uid } = useAuth()
    const { id } = useParams()
    const { data, loading } = useFetchUserByUid(uid)
    const { data: groupData, loading: groupDataLoading } = useFetchUserByUid(id)


    const handleChange = (event) => {
        setMessageSenderText(event.target.value)
    }

    const handleSendMessage = async () => {
        setMessageSenderText("")
        await sendMessage(messageSenderText, data.displayName, groupData.users)
    }

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter' && messageSenderText.trim().length !== 0) {
            event.preventDefault()
            setMessageSenderText("")
            await sendMessage(messageSenderText, data.displayName, groupData.users)
        }
    }

    return { handleChange, handleSendMessage, handleKeyDown, messageSenderText, loadingSendMessage, loading, groupDataLoading }
}

export default useMessageSender