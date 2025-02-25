import React, { useEffect, useState } from 'react'
import classes from './Profile.module.css'
import { AddImageIcon, EmailIcon, Loader, PhoneIcon, useFetchUserByUid, UserIcon } from '../../../shared'
import ProfileContent from './profileContent'
import { OptionalMenu } from './optional-menu'
import { useParams } from 'react-router-dom'
import Avatar from 'react-avatar-edit'

export const Profile = ({ uid = null, setIsActive }) => {
    const { id } = useParams()
    const { loading, data } = useFetchUserByUid(uid !== null ? uid : id)

    const [prewiew, setPreview] = useState(null)
    const [editAvatar, setEditAvatar] = useState(false)

    const [userInfo, setUserInfo] = useState({
        displayName: "",
        email: "",
        phone: "",
        avatar: ""
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

    const handleImageClick = (isActive) => {
        if (uid !== null) {
            setEditAvatar(isActive)
        }
    }

    if (loading) return <Loader />

    return (
        <div>
            <div className={uid !== null ? classes.profileHeader + ' ' + classes.active : classes.profileHeader} style={{ "--add-image-icon": `url(${AddImageIcon})` }}>
                <ProfileContent
                    img={!prewiew ? UserIcon : prewiew}
                    imgHeight={50}
                    imgWidth={50}
                    placeholder={"Display name"}
                    handleImageClick={() => handleImageClick(true)}
                    onEdit={uid !== null}
                    value={userInfo.displayName}
                    handleChangeInput={handleChangeInput("displayName")}
                />
            </div>

            <div className={editAvatar ? classes.changeAvatar + ' ' + classes.active : classes.changeAvatar}>
                <Avatar
                    width={295}
                    height={280}
                    onCrop={(view) => setPreview(view)}
                    onClose={() => handleImageClick(false)}
                    
                    borderStyle={{
                        border: '1px solid rgb(80, 255, 133)',
                        borderRadius: '10px',
                        textAlign: 'center',
                        backgroundColor: 'rgb(29, 41, 31)',
                        color: 'rgb(80, 255, 133)'
                    }}
                    cropColor={"rgb(80, 255, 133)"}
                    closeIconColor={"rgb(80, 255, 133)"}
                    labelStyle={{
                        width: '100%',
                        height: '100%',
                        color: 'rgb(80, 255, 133)',
                        fontSize: '20px',
                        cursor: 'pointer'
                    }}
                    label="Choose avatar"
                />
            </div>

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
