import React, { useEffect, useState } from 'react';
import classes from './Profile.module.css';
import { Constants, EmailIcon, Loader, PhoneIcon, useFetchUserByUid, UserIcon } from '../../../shared';
import ProfileContent from './profileContent';
import { ModalWindow } from '../../../entites';
import { OptionalMenu } from './optional-menu';

export const Profile = ({ uid, activeWindow, closeWindowHandler }) => {
    const { loading, data } = useFetchUserByUid(uid)
    const [userInfo, setUserInfo] = useState({
        displayName: "",
        email: "",
        phone: "",
    })

    useEffect(() => {
        if (data) {
            setUserInfo({
                displayName: data.displayName,
                email: data.email,
                phone: data.phone,
            })
        }
    }, [data])

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
                <ProfileContent
                    img={!data.img && UserIcon}
                    imgHeight={50}
                    imgWidth={50}
                    placeholder={"Display name"}
                    value={userInfo.displayName}
                    handleChangeInput={handleChangeInput("displayName")}
                />
            </div>

            <ProfileContent
                inputType={"email"}
                img={EmailIcon}
                imgHeight={25}
                imgWidth={25}
                placeholder={"Email"}
                value={userInfo.email}
                handleChangeInput={handleChangeInput("email")}
            />
            <ProfileContent
                inputType={"phone"}
                img={PhoneIcon}
                imgHeight={25}
                imgWidth={25}
                placeholder={"Phone number"}
                value={userInfo.phone}
                handleChangeInput={handleChangeInput("phone")}
            />

            <OptionalMenu userInfo={userInfo} />
        </ModalWindow>
    )
}

export default Profile
