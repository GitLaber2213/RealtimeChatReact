import Avatar from "react-avatar-edit"
import React from "react"
import classes from './avatar-loader.module.css'


const colorStyle = {
    color: 'rgb(80, 255, 133)',
}

const borderStyle = {
    border: '1px solid rgb(80, 255, 133)',
    borderRadius: '10px',
    textAlign: 'center',
    backgroundColor: 'rgb(29, 41, 31)',
}

const labelStyle = {
    width: '100%',
    height: '100%',
    fontSize: '20px',
    cursor: 'pointer'
}

export const AvatarLoader = ({ handleImageClick, setImage, editAvatar }) => {
    return (
        <div className={editAvatar ? classes.changeAvatar + ' ' + classes.active : classes.changeAvatar}>

            <Avatar
                width={248}
                height={280}
                onCrop={(view) => setImage(view)}
                onClose={() => handleImageClick(false)}

                borderStyle={{
                    ...borderStyle,
                    ...colorStyle
                }}
                cropColor={colorStyle.color}
                closeIconColor={colorStyle.color}
                labelStyle={{
                    ...labelStyle,
                    ...colorStyle
                }}
                label="Choose avatar"
                onBeforeFileLoad={(file) => {
                    if (file.size > 2000000) {
                        alert("File size cannot exceed 2MB");
                        return
                    }
                }}
            />
        </div>
    )
}


export default AvatarLoader