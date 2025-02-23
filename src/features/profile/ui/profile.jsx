import React, { useEffect, useState } from 'react';
import classes from './Profile.module.css';
import { EmailIcon, Loader, PhoneIcon, useFetchUserByUid, UserIcon } from '../../../shared';
import ProfileContent from './profileContent';
import { OptionalMenu } from './optional-menu';
import { useParams } from 'react-router-dom';

export const Profile = ({ uid = null, setIsActive }) => {
    const { id } = useParams()
    const { loading, data } = useFetchUserByUid(uid !== null ? uid : id)

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

    if (loading) return <Loader />

    return (
        <div>
            <div className={classes.profileHeader}>
                <ProfileContent
                    img={!data.img && UserIcon}
                    imgHeight={50}
                    imgWidth={50}
                    placeholder={"Display name"}
                    onEdit={uid !== null}
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
