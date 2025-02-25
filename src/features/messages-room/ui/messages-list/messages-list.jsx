import React from "react"
import { ScrollBar, useMessages } from "../../../../shared"
import Message from "./message"
import { useParams } from "react-router-dom"


export const MessagesList = () => {
    const { id } = useParams()
    const { messages } = useMessages()


    return (
        <ScrollBar shouldScroll={true}>
            {messages.map(message => <Message key={message.messageId} messageId={message.messageId} message={message.message} timeStamp={message.timestamp} myMessage={message.uid !== id} readed={message.readed}/>)}
        </ScrollBar>
    )
}

export default MessagesList