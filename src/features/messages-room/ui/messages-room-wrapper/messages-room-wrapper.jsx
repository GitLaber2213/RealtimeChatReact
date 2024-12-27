import React, { useEffect, useRef, useState } from "react";
import classes from './messages-room-wrapper.module.css'
import DropDownMenu from "../drop-down-menu/drop-down-menu";
import ChatInfoBar from "../chat-info-bar/chat-info-bar";
import { Loader, useFetchUserByUid, useModalWindowState } from "../../../../shared";
import { Profile } from "../../../../features";
import MessageSender from "../message-sender/message-sender";
import MessagesList from "../messages-list/messages-list";
import { useParams } from "react-router-dom";
import EnterChat from "../enter-chat/enter-chat";

export const MessagesRoom = () => {
    const { activeWindow, openWindow, closeWindow } = useModalWindowState()
    const { id } = useParams()
    const { loading, data } = useFetchUserByUid(id)


    if (!id) {
        return (
            <div className={classes.messagesRoomContainer}>
                <EnterChat />
            </div>
        )
    }

    if (loading) {
        return (
            <div className={classes.messagesRoomContainer}>
                <Loader />
            </div>
        )
    }

    return (
        <>
            <div className={classes.messagesRoomContainer}>
                <ChatInfoBar user={data} openWindow={openWindow} />
                <MessagesList />
                <MessageSender />
            </div>

            <DropDownMenu activeWindow={activeWindow} closeWindow={closeWindow} openWindow={openWindow} />
            <Profile uid={id} activeWindow={activeWindow} closeWindowHandler={closeWindow} />
        </>
    )
}
export default MessagesRoom