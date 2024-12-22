import React, { useState } from "react";
import classes from './Profile.module.css'
import { FormInput, ItemInList, UserIcon } from "../../../shared";


export const ProfileContent = ({ img, text, imgHeight, imgWidth, placeholder, handleChangeInput }) => {
    const [edit, setEdit] = useState(false)

    return (
        <div className={classes.profileContent}>
            <div className={classes.profileContentUnContainer} onClick={() => setEdit(true)}>

                <div className={text === undefined ? classes.editBtn + ' ' + classes.editBtnActive : classes.editBtn}>edit?</div>
                
                {edit ? <FormInput type="text" placeholder={placeholder} img={img} imgHeight={imgHeight} imgWidth={imgWidth} onChange={handleChangeInput}/> :
                    <ItemInList image={!img ? UserIcon : img} text={text} imgHeight={imgHeight} imgWidth={imgWidth} />}
            </div>
        </div>
    )
}

export default ProfileContent