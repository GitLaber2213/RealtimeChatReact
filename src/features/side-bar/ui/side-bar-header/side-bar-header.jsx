import React from "react"
import classes from './side-bar-header.module.css'
import { ItemInList, useAuth, useFetchUserByUid, UserIcon } from "../../../../shared"


export const SideBarHeader = () => {
    const { uid } = useAuth()
    const { loading, data } = useFetchUserByUid(uid)

    return (
        <div className={classes.sideBarHeader} onClick={e => e.stopPropagation()}>
            <ItemInList image={!data.avatar ? UserIcon : data.avatar} imgHeight={35} imgWidth={35} text={loading ? "loading..." : data.displayName} />
        </div>
    )
}


export default SideBarHeader