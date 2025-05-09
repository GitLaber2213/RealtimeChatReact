import React from "react"
import { Loader, ScrollBar, useMessages } from "../../../../shared"
import Message from "./message"
import { useParams } from "react-router-dom"

export const MessagesList = () => {
    const { messages, loadingMessages, loading } = useMessages()

    if (loadingMessages || loading) return <Loader />

    return (
        <ScrollBar shouldScroll={true}>
            {messages.map(message => <Message
                key={message.messageId}
                messageId={message.messageId}
                message={message.message}
                displayName={message.displayName}
                timeStamp={message.timestamp}
                myMessage={message.myMessage}
                readed={message.readed} />)}
        </ScrollBar>
    )
}

export default MessagesList