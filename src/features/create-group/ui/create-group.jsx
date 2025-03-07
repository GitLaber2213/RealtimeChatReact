import React from "react"
import { SuccessConstants, SuccessConstantsKey } from "../../../shared"
import classes from './create-group.module.css'
import { useCreateGroupHandlers } from "../hooks/use-create-group-handler"
import { AvatarLoader, OptionalMenu } from "../../../entites"
import { CreateGroupList } from "./create-group-list"
import CreateGroupHeader from "./create-group-header"


export const CreateGroup = ({ setIsActive, groupAdminId, displayName, avatar, groupUsers }) => {
    const { handleChangeInfo, handleClickUser, handleImageClick, handleSubmit,
        groupInfo, selectedUsers, editAvatar, isEdit, loading, data, info, loadingCreateGroup } = useCreateGroupHandlers(setIsActive, groupAdminId, displayName, avatar, groupUsers)

    return (
        <div className={classes.container}>
            <form onSubmit={(event) => handleSubmit(event)}>

                <div className={classes.createGroupItem}>
                    <CreateGroupHeader handleChangeInfo={handleChangeInfo} isEdit={isEdit} handleImageClick={handleImageClick} groupInfo={groupInfo} />
                </div>

                <AvatarLoader handleImageClick={handleImageClick} setImage={handleChangeInfo("groupImage")} editAvatar={editAvatar} />

                <CreateGroupList
                    data={data}
                    handleClickUser={handleClickUser}
                    selectedUsers={selectedUsers}
                    isEdit={isEdit}
                    loading={loading}
                    loadingCreateGroup={loadingCreateGroup} />


                {isEdit && <div className={classes.createGroupItem}>
                    <OptionalMenu
                        info={info}
                        successKey={SuccessConstantsKey.SUCCESS}
                        successMessage={displayName ? SuccessConstants.UPDATE_PROFILE_SUCCESSFULLY : SuccessConstants.CREATE_GROUP_SUCCESSFULLY}
                        textSubmitBtn={displayName ? "Update" : "Create"}
                        textCancelBtn={"Cancel"}
                        handleClickForCancelBtn={() => setIsActive(false)} />
                </div>}
            </form>
        </div>
    )
}

export default CreateGroup 