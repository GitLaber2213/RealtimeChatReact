import React, { useState } from "react";
import classes from './Profile.module.css'
import { FormInput, ItemInList, UserIcon } from "../../../shared";


export const ProfileContent = ({ inputType = "text", img, imgHeight, imgWidth, placeholder, value, handleChangeInput }) => {
    const [edit, setEdit] = useState(false)
    

    return (
        <div className={classes.profileContent}>
            <div className={classes.profileContentUnContainer} onClick={() => setEdit(true)}>

                <div className={value === '' ? classes.editBtn + ' ' + classes.editBtnActive : classes.editBtn}>edit?</div>
                
                {edit ? <FormInput type={inputType} placeholder={placeholder} img={img} imgHeight={imgHeight} imgWidth={imgWidth} value={value} onChange={handleChangeInput} /> :
                    <ItemInList image={!img ? UserIcon : img} text={value} imgHeight={imgHeight} imgWidth={imgWidth} />}
            </div>
        </div>
    )
}

export default ProfileContent