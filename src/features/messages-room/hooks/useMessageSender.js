import { useDispatch, useSelector } from "react-redux";
import { messageRoomSlice } from "../model/messages-room.slice";

export const useMessageSender = () => {
    const dispatch = useDispatch()
    const messageSenderText = useSelector((state) => state.messagesRoom.messageSenderText)

    const handleChange = (event) => {
        dispatch(messageRoomSlice.actions.setMessageSenderText(event.target.value))
    }

    const handleSendMessage = () => {
        dispatch(messageRoomSlice.actions.addMessage({ message: messageSenderText, timeStamp: '10:10' }))
        dispatch(messageRoomSlice.actions.setMessageSenderText(''))
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            dispatch(messageRoomSlice.actions.addMessage({ message: messageSenderText, timeStamp: '10:10' }))
            dispatch(messageRoomSlice.actions.setMessageSenderText(''))
        }
    }
 
    return {handleChange, handleSendMessage, handleKeyDown, messageSenderText}
}