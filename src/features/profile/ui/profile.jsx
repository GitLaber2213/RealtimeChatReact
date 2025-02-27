import React from 'react'
import classes from './profile.module.css'
import { AddImageIcon, EmailIcon, Loader, PhoneIcon, UserIcon } from '../../../shared'
import ProfileContent from './profileContent'
import { OptionalMenu } from './optional-menu'
import { useProfileHandler } from '../hooks/use-profile-handler'
import { ProfileAvatar } from './profile-avatar'

export const Profile = ({ uid = null, setIsActive }) => {
    const { loading, userInfo, handleChangeInput, setUserInfo, handleImageClick, editAvatar } = useProfileHandler(uid)
    if (loading) return <Loader />

    return (
        <div>
            <div className={uid !== null ? classes.profileHeader + ' ' + classes.active : classes.profileHeader} style={{ "--add-image-icon": `url(${AddImageIcon})` }}>
                <ProfileContent
                    img={!userInfo.avatar ? UserIcon : userInfo.avatar}
                    imgHeight={50}
                    imgWidth={50}
                    placeholder={"Display name"}
                    handleImageClick={() => handleImageClick(true)}
                    onEdit={uid !== null}
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
                onEdit={uid !== null}
                value={userInfo.email}
                handleChangeInput={handleChangeInput("email")}
            />
            <ProfileContent
                inputType={"tel"}
                img={PhoneIcon}
                imgHeight={25}
                imgWidth={25}
                placeholder={"Phone number"}
                onEdit={uid !== null}
                value={userInfo.phone}
                handleChangeInput={handleChangeInput("phone")}
            />

            {uid !== null && <OptionalMenu setIsActive={setIsActive} userInfo={userInfo} />}
        </div>
    )
}

export default Profile
