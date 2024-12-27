import React, { useState } from 'react'
import classes from './Profile.module.css'

import { Constants, EmailIcon, Loader, PhoneIcon, useFetchUserByUid, UserIcon, UserNameIcon, WebSiteIcon } from '../../../shared'
import ProfileContent from './profileContent'
import { ModalWindow } from '../../../entites'
import { OptionalMenu } from './optional-menu'


export const Profile = ({ uid, activeWindow, closeWindowHandler }) => {

    const { loading, data } = useFetchUserByUid(uid)
    const [userInfo, setUserInfo] = useState({
        displayName: '',
        uid: '',
        email: '',
        phone: '',
        website: ''
    })

    const handleChangeInput = (key) => (value) => {
        setUserInfo(prev => ({ ...prev, [key]: value }))
    }


    if (loading) {
        return (
            <ModalWindow activeWindow={activeWindow} windowType={Constants.PROFILE_WINDOW} closeWindowHandler={closeWindowHandler} windowHeader={"Profile"}>
                <Loader />
            </ModalWindow>
        )
    }


    return (
        <ModalWindow activeWindow={activeWindow} windowType={Constants.PROFILE_WINDOW} closeWindowHandler={closeWindowHandler} windowHeader={"Profile"}>
            <div className={classes.profileHeader}>
                <ProfileContent img={data.img && UserIcon} text={data.displayName} imgHeight={50} imgWidth={50} placeholder={"Display name"} handleChangeInput={handleChangeInput("displayName")} />
            </div>

            <ProfileContent img={UserNameIcon} text={data.uid} imgHeight={25} imgWidth={25} placeholder={"User id"} handleChangeInput={handleChangeInput("uid")} />
            <ProfileContent img={EmailIcon} text={data.email} imgHeight={25} imgWidth={25} placeholder={"Email"} value={userInfo.email} handleChangeInput={handleChangeInput("email")} />
            <ProfileContent img={PhoneIcon} text={data.phone} imgHeight={25} imgWidth={25} placeholder={"Phone number"} value={userInfo.phone} handleChangeInput={handleChangeInput("phone")} />
            <ProfileContent img={WebSiteIcon} text={data.website} imgHeight={25} imgWidth={25} placeholder={"Website"} value={userInfo.website} handleChangeInput={handleChangeInput("website")} />

            <OptionalMenu userInfo={userInfo} />
        </ModalWindow>
    )
}


export default Profile