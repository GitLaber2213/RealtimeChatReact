import React, { useRef } from "react"
import classes from './message.module.css'
import { useObserver } from "../../../../shared"


const Message = ({ message, messageId, timeStamp, myMessage, readed, displayName }) => {
    const messageRef = useRef()

    useObserver(messageRef, messageId, readed)

    const readedMessageStyle = readed ? classes.readItem + ' ' + classes.active : classes.readItem

    return (
        <div className={classes.messageContainer} ref={messageRef}>
            <div className={myMessage ? classes.messageUnContainer + ' ' + classes.active : classes.messageUnContainer}>

                <div className={classes.messageContent}>
                    <div className={myMessage ? classes.displayName + ' ' + classes.active : classes.displayName}>
                        {displayName}
                    </div>


                    <div className={classes.message}>
                        {message}
                    </div>
                </div>


                <div className={classes.messageInfo}>
                    <div className={myMessage ? classes.readed : classes.readed + ' ' + classes.disable}>
                        <div className={readedMessageStyle}></div>
                        <div className={readedMessageStyle}></div>
                    </div>
                    <div className={classes.timeStamp}>
                        {String(timeStamp.toDate().getHours()).padStart(2, '0') + ':' + String(timeStamp.toDate().getMinutes()).padStart(2, '0')}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Message