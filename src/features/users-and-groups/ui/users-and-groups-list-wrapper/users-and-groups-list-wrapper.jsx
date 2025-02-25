import React, { useState } from "react"
import classes from './users-and-groups-list-wrapper.module.css'
import { ResizableElement, ScrollBar } from "../../../../shared"
import UsersAndGroupsHeader from "../users-and-groups-header/users-and-groups-header"
import UsersAndGroupsContentList from "../users-and-groups-content/users-and-groups-content-list"



export const UsersAndGroupsList = () => {
    const [width, setWidth] = useState(400)
    const triggerWidth = 300
    const minWidth = 68


    return (
        <div className={classes.chatsContainer} style={{ "--width": `${width}px`  }}>
            <ResizableElement setWidth={setWidth} width={width} triggerWidth={triggerWidth} minWidth={minWidth}/>
            <ScrollBar shouldScroll={false}>
                <UsersAndGroupsHeader  minWidth={minWidth === width} />
                <UsersAndGroupsContentList minWidth={minWidth === width} />
            </ScrollBar>
        </div>
    )
}


export default UsersAndGroupsList