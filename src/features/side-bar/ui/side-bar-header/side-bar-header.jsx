import React from "react"
import classes from './side-bar-header.module.css'
import userPhoto from '../../../../shared/assets/user.png'
import { ItemInList, useAuth, useFetchUserByUid } from "../../../../shared"


export const SideBarHeader = () => {
    const { uid } = useAuth()
    const { loading, data } = useFetchUserByUid(uid)

    return (
        <div className={classes.sideBarHeader} onClick={e => e.stopPropagation()}>
            <ItemInList image={!data.avatar ? userPhoto : data.avatar} imgHeight={35} imgWidth={35} text={loading ? "loading..." : data.displayName} />
        </div>
    )
}


export default SideBarHeader