import React, { useRef } from "react";
import classes from './message-sender.module.css'
import { useMessageSender } from "../../hooks/useMessageSender";
import { SendMessageIcon } from "../../../../shared";

export const MessageSender = () => {
    const { handleChange, handleSendMessage, handleKeyDown, messageSenderText } = useMessageSender()

    const checkFilledTextArea = messageSenderText ? classes.senderMessageImg + ' ' + classes.active : classes.senderMessageImg
    //Вынести в кастомный хук 
    // const ref = useRef(null)

    // if(ref.current) {
    //     ref.current.focus()
    //     ref.current.addEventListener('blur', () => {
    //         ref.current.focus()
    //     })
    // }

    return (
        <div className={classes.container}>
            <div className={classes.unContainer}>
                <textarea type="text" onKeyDown={handleKeyDown} onChange={handleChange} value={messageSenderText} placeholder="Write a message..." />
                <img className={checkFilledTextArea} src={SendMessageIcon} onClick={handleSendMessage} height={30} width={30} />
            </div>
        </div>
    )
}

export default MessageSender