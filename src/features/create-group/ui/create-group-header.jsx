import React from "react"
import classes from './create-group-header.module.css'
import { AddImageIcon, FormInput, GroupIcon, ItemInList } from "../../../shared"

export const CreateGroupHeader = ({ handleChangeInfo, isEdit, handleImageClick, groupInfo }) => {

    return (
        <div className={isEdit ? classes.createGroupHeader + ' ' + classes.active : classes.createGroupHeader} style={{ "--add-image-icon": `url(${AddImageIcon})` }}>
            {isEdit ? <FormInput
                placeholder={'Group name'}
                handleImageClick={handleImageClick}
                onChange={handleChangeInfo("groupName")}
                value={groupInfo.groupName}
                img={!groupInfo.groupImage ? GroupIcon : groupInfo.groupImage}
                required={true}
                imgHeight={50}
                imgWidth={50} />
                :
                <ItemInList
                    image={!groupInfo.groupImage ? GroupIcon : groupInfo.groupImage}
                    text={groupInfo.groupName}
                    imgHeight={50}
                    imgWidth={50} />
            }
        </div>
    )
}

export default CreateGroupHeader