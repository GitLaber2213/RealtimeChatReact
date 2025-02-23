import React from "react";
import classes from './message-sender.module.css'
import { useMessageSender } from "../../hooks/useMessageSender";
import { Loader, SendMessageIcon } from "../../../../shared";

export const MessageSender = () => {
    const { handleChange, handleSendMessage, handleKeyDown, messageSenderText, loadingSendMessage } = useMessageSender()

    const checkFilledTextArea = messageSenderText ? classes.senderMessageImg + ' ' + classes.active : classes.senderMessageImg

    return (
        <div className={classes.container}>
            <div className={classes.unContainer}>
                <textarea type="text" onKeyDown={handleKeyDown} onChange={handleChange} value={messageSenderText} placeholder="Write a message..." />
                {loadingSendMessage ? <Loader /> : <img className={checkFilledTextArea} src={SendMessageIcon} onClick={handleSendMessage} height={30} width={30} />}
            </div>
        </div>
    )
}

export default MessageSender