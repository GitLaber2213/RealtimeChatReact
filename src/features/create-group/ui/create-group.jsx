import React from "react"
import { Button, FormInput } from "../../../shared"
import classes from './create-group.module.css'
import groupPhoto from '../../../shared/assets/group.png'


export const CreateGroup = ({ setIsActive }) => {
    return (
        <div className={classes.container}>
            <FormInput placeholder={'Group name'} img={groupPhoto} imgHeight={25} imgWidth={25} />
            <Button text={"Create"} />
            <Button handleClick={() => setIsActive(false)} text={"Cancel"} />
        </div>
    )   
}

export default CreateGroup 