import React from 'react'
import classes from './profile.module.css'
import { AddImageIcon, EmailIcon, Loader, PhoneIcon, UserIcon } from '../../../shared'
import { useProfileHandler } from '../hooks/use-profile-handler'
import ProfileContent from './profile-content'
import { AvatarLoader, OptionalMenu } from '../../../entites'
import { SuccessConstants, SuccessConstantsKey } from '../../../shared'

export const Profile = ({ uid = null, setIsActive }) => {
    const { loading, loadingUpdateProfile, userInfo, handleChangeUserInfo, handleImageClick, handleSubmit, info, editAvatar } = useProfileHandler(uid)

    const myProfile = uid !== null


    if (loading || loadingUpdateProfile) {
        return (
            <div className={classes.loaderContainer}>
                <Loader />
            </div>
        )
    }

    return (
        <div>
            <form onSubmit={(event) => handleSubmit(event)}>
                <div className={myProfile ? classes.profileHeader + ' ' + classes.active : classes.profileHeader} style={{ "--add-image-icon": `url(${AddImageIcon})` }}>
                    <ProfileContent
                        img={!userInfo.avatar ? UserIcon : userInfo.avatar}
                        imgHeight={50}
                        imgWidth={50}
                        placeholder={"Display name"}
                        required={true}
                        handleImageClick={() => handleImageClick(!editAvatar)}
                        onEdit={myProfile}
                        value={userInfo.displayName}
                        handleChangeInput={handleChangeUserInfo("displayName")}
                    />
                </div>

                <AvatarLoader setImage={handleChangeUserInfo("avatar")} editAvatar={editAvatar} handleImageClick={handleImageClick} />

                <ProfileContent
                    inputType={"email"}
                    img={EmailIcon}
                    imgHeight={25}
                    imgWidth={25}
                    placeholder={"Email"}
                    onEdit={myProfile}
                    required={true}
                    value={userInfo.email}
                    handleChangeInput={handleChangeUserInfo("email")}
                />
                <ProfileContent
                    inputType={"tel"}
                    img={PhoneIcon}
                    imgHeight={25}
                    imgWidth={25}
                    placeholder={"Phone number"}
                    onEdit={myProfile}
                    required={false}
                    value={userInfo.phone}
                    handleChangeInput={handleChangeUserInfo("phone")}
                />

                {myProfile && <OptionalMenu
                    info={info}
                    successKey={SuccessConstantsKey.SUCCESS}
                    successMessage={SuccessConstants.UPDATE_PROFILE_SUCCESSFULLY}
                    textCancelBtn={"Cancel"}
                    textSubmitBtn={"Save"}
                    handleClickForCancelBtn={() => setIsActive(false)} />}
            </form>
        </div>
    )
}

export default Profile
