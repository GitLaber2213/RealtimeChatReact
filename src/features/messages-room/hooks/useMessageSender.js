import { useState } from "react"
import { useMessages } from "../../../shared"

export const useMessageSender = () => {
    const [messageSenderText, setMessageSenderText] = useState('')
    const { sendMessage, loadingSendMessage } = useMessages()


    const handleChange = (event) => {
        setMessageSenderText(event.target.value)
    }

    const handleSendMessage = async () => {
        setMessageSenderText("")
        await sendMessage(messageSenderText)
    }

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter' && messageSenderText.trim().length !== 0) {
            event.preventDefault()
            setMessageSenderText("")
            await sendMessage(messageSenderText)
        }
    }

    return { handleChange, handleSendMessage, handleKeyDown, messageSenderText, loadingSendMessage }
}

export default useMessageSender