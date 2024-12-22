import React, { useState } from "react"
import classes from './users-and-groups-list-wrapper.module.css'
import { ResizableElement, ScrollBar } from "../../../../shared"
import UsersAndGroupsHeader from "../users-and-groups-header/users-and-groups-header"
import UsersAndGroupsContent from "../users-and-groups-content/users-and-groups-content"



export const UsersAndGroupsList = () => {
    const [width, setWidth] = useState(400)


    return (
        <div className={classes.chatsContainer} style={{ width: `${width}px` }}>
            <ResizableElement setWidth={setWidth} width={width} />
            <ScrollBar shouldScroll={false}>
                <UsersAndGroupsHeader />
                <UsersAndGroupsContent />
            </ScrollBar>
        </div>
    )
}


export default UsersAndGroupsList