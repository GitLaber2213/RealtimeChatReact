import React, { useState } from "react"
import classes from './message-room-header.module.css'
import dropDownMenuPhoto from '../../../../shared/assets/dropDownMenu.png'
import { ItemInList, useFetchUserByUid, UserIcon } from "../../../../shared"
import { useParams } from "react-router-dom"
import EnterChat from "../enter-chat/enter-chat"
import DropDownMenu from "../drop-down-menu/drop-down-menu"
import Profile from "../../../profile/ui/profile"
import { ModalWindow } from "../../../../entites"


const ChatInfoBar = () => {
    const { id } = useParams()
    const { data } = useFetchUserByUid(id)

    const [isActiveProfile, setIsActiveProfile] = useState(false)
    const [isActiveMenu, setIsActiveMenu] = useState(false)


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
                    <ItemInList handleClick={() => setIsActiveProfile(true)} image={UserIcon} text={data.displayName} imgHeight={40} imgWidth={40} />
                </div>
                <div className={isActiveMenu ? classes.openMenuBtn + ' ' + classes.active : classes.openMenuBtn}>
                    <ItemInList handleClick={() => setIsActiveMenu(true)} image={dropDownMenuPhoto} imgHeight={20} imgWidth={20} />
                </div>
            </div>

            <DropDownMenu isActive={isActiveMenu} setIsActive={setIsActiveMenu} />

            <ModalWindow isActive={isActiveProfile} setIsActive={setIsActiveProfile} windowHeader={"Profile"}>
                {isActiveProfile && <Profile />}
            </ModalWindow>
        </>
    )
}

export default ChatInfoBar