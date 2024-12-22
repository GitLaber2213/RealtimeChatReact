import React, { useEffect, useRef, useState } from "react";
import classes from './messages-room-wrapper.module.css'
import DropDownMenu from "../drop-down-menu/drop-down-menu";
import ChatInfoBar from "../chat-info-bar/chat-info-bar";
import { Loader, useModalWindowState } from "../../../../shared";
import { Profile } from "../../../../features";
import MessageSender from "../message-sender/message-sender";
import MessagesList from "../messages-list/messages-list";
import { useParams } from "react-router-dom";
import EnterChat from "../enter-chat/enter-chat";
import { db } from "../../../../shared/firebase/firebase-config";
import { get, ref } from "firebase/database";

export const MessagesRoom = () => {
    const { activeWindow, openWindow, closeWindow } = useModalWindowState()
    const { id } = useParams()

    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchUser = async () => {
            if(!id) {
                return;
            }

            try {
                setLoading(true);
                const userRef = ref(db, `Chats/${id}`);
                const snapshot = await get(userRef);

                setUser(snapshot.val() || null);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    

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
                <ChatInfoBar user={user} openWindow={openWindow} />
                <MessagesList />
                <MessageSender />
            </div>

            <DropDownMenu activeWindow={activeWindow} closeWindow={closeWindow} openWindow={openWindow} />
            <Profile user={user} activeWindow={activeWindow} closeWindowHandler={closeWindow} />
        </>
    )
}
export default MessagesRoom