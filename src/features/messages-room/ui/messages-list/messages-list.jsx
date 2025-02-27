import React from "react"
import { Loader, ScrollBar, useMessages } from "../../../../shared"
import Message from "./message"

export const MessagesList = () => {
    const { messages, loadingMessages } = useMessages()

    if (loadingMessages) return <Loader />

    return (
        <ScrollBar shouldScroll={true}>
            {messages.map(message => <Message
                key={message.messageId}
                messageId={message.messageId}
                message={message.message}
                timeStamp={message.timestamp}
                myMessage={message.myMessage}
                readed={message.readed} />)}
        </ScrollBar>
    )
}

export default MessagesList