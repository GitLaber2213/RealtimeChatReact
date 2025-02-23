import React from "react";
import classes from './messages-room-wrapper.module.css'
import ChatInfoBar from "../chat-info-bar/chat-info-bar";
import { useModalWindowState } from "../../../../shared";
import MessageSender from "../message-sender/message-sender";
import MessagesList from "../messages-list/messages-list";

export const MessagesRoom = () => {

    return (
        <div className={classes.messagesRoomContainer}>
            <ChatInfoBar />
            <MessagesList />
            <MessageSender />
        </div>
    )
}
export default MessagesRoom