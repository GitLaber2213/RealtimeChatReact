import React from "react";
import { ScrollBar } from "../../../../shared";
import Message from "./message";
import { useSelector } from "react-redux";


export const MessagesList = () => {
    const messages = useSelector((state) => state.messagesRoom.messages)

    return (
        <ScrollBar shouldScroll={true}>
            {messages.map(message => <Message key={message.message} message={message.message} timeStamp={message.timeStamp} myMessage={false} />)}
        </ScrollBar>
    )
}

export default MessagesList