import React, { useState } from 'react'
import classes from './Profile.module.css'

import { Constants, EmailIcon, PhoneIcon, UserIcon, UserNameIcon, WebSiteIcon } from '../../../shared'
import ProfileContent from './profileContent'
import { ModalWindow } from '../../../entites'
import { OptionalMenu } from './optional-menu'


export const Profile = ({ user, activeWindow, closeWindowHandler }) => {
    const [userInfo, setUserInfo] = useState({
        displayName: '',
        uid: '',
        email: '',
        phone: '',
        website: ''
    })
    
    const handleChangeInput = (key) => (value) => {
        setUserInfo(prev => ({...prev, [key]: value}))
    }


    if(!user) {
        return <div></div>
    }


    return (
        <ModalWindow activeWindow={activeWindow} windowType={Constants.PROFILE_WINDOW} closeWindowHandler={closeWindowHandler} windowHeader={"Profile"}>
            <div className={classes.profileHeader}>
                <ProfileContent img={!user.img && UserIcon} text={user.displayName} imgHeight={50} imgWidth={50} placeholder={"Display name"} handleChangeInput={handleChangeInput("displayName")}/>
            </div>

            <ProfileContent img={UserNameIcon} text={user.uid} imgHeight={25} imgWidth={25} placeholder={"User id"} handleChangeInput={handleChangeInput("uid")}/>
            <ProfileContent img={EmailIcon} text={user.email} imgHeight={25} imgWidth={25} placeholder={"Email"} handleChangeInput={handleChangeInput("email")}/>
            <ProfileContent img={PhoneIcon} text={user.phone} imgHeight={25} imgWidth={25} placeholder={"Phone number"} handleChangeInput={handleChangeInput("phone")}/>
            <ProfileContent img={WebSiteIcon} text={user.website} imgHeight={25} imgWidth={25} placeholder={"Website"} handleChangeInput={handleChangeInput("website")}/>

            <OptionalMenu userInfo={userInfo}/>
        </ModalWindow>
    )
}


export default Profile