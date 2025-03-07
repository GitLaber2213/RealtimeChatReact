import { Loader, ScrollBar } from "../../../shared"
import CreateGroupItem from "./create-group-item"
import classes from './create-group-list.module.css'


export const CreateGroupList = ({ loading, data, handleClickUser, selectedUsers, isEdit, loadingCreateGroup }) => {
    return (
        <div className={classes.usersList}>
            {loading || loadingCreateGroup
                ?
                <Loader />
                :
                (
                    <ScrollBar>
                        {data.map((user) => <CreateGroupItem key={user.uid} isEdit={isEdit} user={user} handleClick={handleClickUser} selectedUsers={selectedUsers} />)}
                    </ScrollBar>
                )}
        </div>
    )
}

export default CreateGroupList