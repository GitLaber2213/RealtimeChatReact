import React, { useState } from "react"
import { Button, FormInput, GroupIcon, Loader, ScrollBar, useFetchChats } from "../../../shared"
import classes from './create-group.module.css'
import { CreateGroupItem } from "./create-group-item"


export const CreateGroup = ({ setIsActive }) => {
    const [name, setName] = useState('')
    const { loading, data } = useFetchChats('')

    const [selectedUsers, setSelectedUsers] = useState(new Set())

    const handleClick = (item) => {
        setSelectedUsers(prevSelected => {
            const newSelected = new Set(prevSelected)
            if (newSelected.has(item)) {
                newSelected.delete(item)
            } else {
                newSelected.add(item)
            }
            return newSelected
        })
    }


    if (loading) {
        return (
            <div className={classes.container}>
                <Loader />
            </div>
        )
    }

    return (
        <div className={classes.container}>
            <div className={classes.createGroupItem}>
                <FormInput placeholder={'Group name'} onChange={setName} value={name} img={GroupIcon} imgHeight={25} imgWidth={25} />
            </div>

            <div className={classes.usersList}>
                <ScrollBar>
                    {data.map((user) => <CreateGroupItem key={user.uid} user={user} handleClick={handleClick} selectedUsers={selectedUsers} />)}
                </ScrollBar>
            </div>

            <div className={classes.createGroupItem}>
                <Button text={"Create"} />
                <Button handleClick={() => setIsActive(false)} text={"Cancel"} />
            </div>
        </div>
    )
}

export default CreateGroup 