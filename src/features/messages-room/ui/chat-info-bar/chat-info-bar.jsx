import React, { useState } from "react"
import classes from './message-room-header.module.css'
import { DropDownMenuIcon, FirebaseConstants, GroupIcon, ItemInList, useAuth, useFetchUserByUid, UserIcon } from "../../../../shared"
import { useParams } from "react-router-dom"
import EnterChat from "../enter-chat/enter-chat"
import DropDownMenu from "../drop-down-menu/drop-down-menu"
import Profile from "../../../profile/ui/profile"
import { ModalWindow } from "../../../../entites"
import CreateGroup from "../../../create-group/ui/create-group"


const ChatInfoBar = () => {
    const { id } = useParams()
    const { uid } = useAuth()
    const { data } = useFetchUserByUid(id)

    const [isActiveProfile, setIsActiveProfile] = useState(false)
    const [isActiveMenu, setIsActiveMenu] = useState(false)

    const DefaultAvatar = data.type === FirebaseConstants.FIREBASE_DOC_TYPE_GROUP ? GroupIcon : UserIcon
    const isGroupChat = data.type === FirebaseConstants.FIREBASE_DOC_TYPE_GROUP
    const isUserChat = data.type === FirebaseConstants.FIREBASE_DOC_TYPE_USER
    const isAdmin = data.admin === uid

    
    if (!id) {
        return (
            <div className={classes.enterChatContainer}>
                <EnterChat />
            </div>
        )
    }


    return (
        <>
            <div className={classes.messagesRoomHeader}>
                <div className={classes.profileInfo}>
                    <ItemInList handleClick={() => setIsActiveProfile(true)} image={data.avatar ? data.avatar : DefaultAvatar} text={data.displayName} imgHeight={40} imgWidth={40} />
                </div>
                <div className={isActiveMenu ? classes.openMenuBtn + ' ' + classes.active : classes.openMenuBtn}>
                    <ItemInList handleClick={() => setIsActiveMenu(true)} image={DropDownMenuIcon} imgHeight={20} imgWidth={20} />
                </div>
            </div>

            <DropDownMenu isActive={isActiveMenu} isAdmin={isAdmin && isGroupChat || isUserChat} setIsActive={setIsActiveMenu} />

            <ModalWindow isActive={isActiveProfile} setIsActive={setIsActiveProfile} windowHeader={isGroupChat ? "Group info" : "Profile"}>
                {isActiveProfile && isGroupChat ?
                    <CreateGroup displayName={data.displayName} groupUsers={data.users} avatar={data.avatar} groupAdminId={data.admin} setIsActive={setIsActiveProfile} />
                    :
                    <Profile />
                }
            </ModalWindow>
        </>
    )
}

export default ChatInfoBar