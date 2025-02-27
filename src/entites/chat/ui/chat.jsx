import React from "react"
import classes from './chat.module.css'
import { ItemInList, UserIcon } from "../../../shared"


export const Chat = ({ avatar, userName, activeChat, favorite, lastMessage, countNotReadedMessage, minWidth }) => {

    const className = activeChat 
    ? (!minWidth ? `${classes.notReadedMessagesCount} ${classes.active}` : `${classes.notReadedMessagesCount} ${classes.active} ${classes.minimized}`)
    : (minWidth ? `${classes.notReadedMessagesCount} ${classes.minimized}` : `${classes.notReadedMessagesCount}`)

    return (
        <div className={classes.container}>
            <div className={classes.lastMessageContainer}>
                <ItemInList image={!avatar ? UserIcon : avatar} imgHeight={45} imgWidth={45} text={userName} favorite={favorite}>
                    <div className={activeChat ? classes.lastMessage + ' ' + classes.active : classes.lastMessage}>
                        {lastMessage.message} &nbsp;
                    </div>
                </ItemInList>
            </div>
            <div className={minWidth ? classes.timeAndMessageCount + ' ' + classes.disable : classes.timeAndMessageCount}>
                <div className={activeChat ? classes.timeStamp + ' ' + classes.active : classes.timeStamp}>
                    {lastMessage.timestamp ? String(lastMessage.timestamp.toDate().getHours()).padStart(2, '0') + ':' + String(lastMessage.timestamp.toDate().getMinutes()).padStart(2, '0') : <div>&nbsp;</div>}
                </div>
                <div>
                    {countNotReadedMessage > 0 ?
                        <div className={className}>
                            {countNotReadedMessage} 
                        </div>
                        : <div>&nbsp;</div>}
                </div>
            </div>
        </div>
    )
}

export default Chat