import React from 'react'
import classes from './profile.module.css'
import { AddImageIcon, EmailIcon, Loader, PhoneIcon, UserIcon } from '../../../shared'
import { OptionalMenu } from './optional-menu'
import { useProfileHandler } from '../hooks/use-profile-handler'
import { ProfileAvatar } from './profile-avatar'
import ProfileContent from './profile-content'

export const Profile = ({ uid = null, setIsActive }) => {
    const { loading, userInfo, handleChangeInput, setUserInfo, handleImageClick, editAvatar } = useProfileHandler(uid)
    const myProfile = uid !== null


    if (loading) return <Loader />

    return (
        <div>
            <div className={myProfile ? classes.profileHeader + ' ' + classes.active : classes.profileHeader} style={{ "--add-image-icon": `url(${AddImageIcon})` }}>
                <ProfileContent
                    img={!userInfo.avatar ? UserIcon : userInfo.avatar}
                    imgHeight={50}
                    imgWidth={50}
                    placeholder={"Display name"}
                    handleImageClick={() => handleImageClick(!editAvatar)}
                    onEdit={myProfile}
                    value={userInfo.displayName}
                    handleChangeInput={handleChangeInput("displayName")}
                />
            </div>

            <ProfileAvatar setUserInfo={setUserInfo} editAvatar={editAvatar} userInfo={userInfo} handleImageClick={handleImageClick} />

            <ProfileContent
                inputType={"email"}
                img={EmailIcon}
                imgHeight={25}
                imgWidth={25}
                placeholder={"Email"}
                onEdit={myProfile}
                value={userInfo.email}
                handleChangeInput={handleChangeInput("email")}
            />
            <ProfileContent
                inputType={"tel"}
                img={PhoneIcon}
                imgHeight={25}
                imgWidth={25}
                placeholder={"Phone number"}
                onEdit={myProfile}
                value={userInfo.phone}
                handleChangeInput={handleChangeInput("phone")}
            />

            {myProfile && <OptionalMenu setIsActive={setIsActive} userInfo={userInfo} />}
        </div>
    )
}

export default Profile
