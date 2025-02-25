import React, { useState } from "react"
import classes from './Profile.module.css'
import { FormInput, ItemInList, UserIcon } from "../../../shared"


export const ProfileContent = ({ inputType = "text", img, imgHeight, imgWidth, placeholder, onEdit, value, handleChangeInput, handleImageClick }) => {
    const [edit, setEdit] = useState(false)


    return (
        <div className={classes.profileContent} style={onEdit ? {} : { cursor: 'default' }}>
            <div className={classes.profileContentUnContainer}
                onClick={() => onEdit && setEdit(true)}
                onMouseLeave={() => onEdit && setEdit(false)}>

                {onEdit && <div className={value === '' ? classes.editBtn + ' ' + classes.editBtnActive : classes.editBtn}>edit?</div>}

                {edit ? <FormInput type={inputType} handleImageClick={handleImageClick} placeholder={placeholder} img={img} imgHeight={imgHeight} imgWidth={imgWidth} value={value} onChange={handleChangeInput} /> :
                    <ItemInList image={img} handleImageClick={handleImageClick} text={value} imgHeight={imgHeight} imgWidth={imgWidth} />}
            </div>
        </div>
    )
}

export default ProfileContent