import React from "react";
import classes from './message.module.css'


const Message = ({ message, timeStamp, myMessage, userName }) => {
    return (
        <div className={classes.messageContainer}>
            <div className={myMessage ? classes.messageUnContainer + ' ' + classes.active : classes.messageUnContainer}>
                <div>
                    {message}
                </div>
                <div className={classes.timeStamp}>
                    {timeStamp}
                </div>
            </div>
        </div>
    )
}

export default Message