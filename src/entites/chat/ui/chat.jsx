import React from "react";
import classes from './chat.module.css'
import { FavoriteIcon, ItemInList, UserIcon } from "../../../shared";


export const Chat = ({ avatar, userName, favorite }) => {
    return (
        <div className={classes.container}>
            <div className={classes.lastMessageContainer}>
                <ItemInList image={!avatar ? UserIcon : avatar} imgHeight={45} imgWidth={45} text={userName}>
                    <div className={classes.lastMessage}>
                        Loremipsumdolorsitamet,consecteturadi pisicingelit.Loremipsumdolorsitamet,consecteturadipisici ngelit.Loremipsumdolorsitamet,con cteturadipisicingelit.
                    </div>
                </ItemInList>
            </div>
            <div className={classes.timeAndMessageCount}>
                <div>
                    10:10
                </div>
                <div>
                    {favorite && <img src={FavoriteIcon} height={15} width={15} />}
                </div>
            </div>
        </div>
    )
}

export default Chat