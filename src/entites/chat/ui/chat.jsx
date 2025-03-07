import React from "react"
import classes from './chat.module.css'
import { FirebaseConstants, GroupIcon, ItemInList, useFormatNumber, UserIcon } from "../../../shared"


export const Chat = ({ avatar, userName, activeChat, favorite, lastMessage, countNotReadedMessage, minWidth, type }) => {
    const { formatNumber } = useFormatNumber()

    const className = activeChat
        ? (!minWidth ? `${classes.notReadedMessagesCount} ${classes.active}` : `${classes.notReadedMessagesCount} ${classes.active} ${classes.minimized}`)
        : (minWidth ? `${classes.notReadedMessagesCount} ${classes.minimized}` : `${classes.notReadedMessagesCount}`)

    const DefaultAvatar = type === FirebaseConstants.FIREBASE_DOC_TYPE_USER ? UserIcon : GroupIcon

    return (
        <div className={classes.container}>
            <div className={classes.lastMessageContainer}>
                <ItemInList image={!avatar ? DefaultAvatar : avatar} imgHeight={45} imgWidth={45} text={userName} favorite={favorite}>
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
                            {formatNumber(countNotReadedMessage)}
                        </div>
                        : <div>&nbsp;</div>}
                </div>
            </div>
        </div>
    )
}

export default Chat