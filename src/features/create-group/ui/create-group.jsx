import React from "react"
import { Button, Constants, FormInput } from "../../../shared"
import classes from './create-group.module.css'
import groupPhoto from '../../../shared/assets/group.png'
import { ModalWindow } from "../../../entites"


export const CreateGroup = ({ activeWindow, closeWindowHandler }) => {
    return (
        <ModalWindow activeWindow={activeWindow} windowType={Constants.CREATE_GROUP_WINDOW} closeWindowHandler={closeWindowHandler} windowHeader={"Create group"}>
            <div className={classes.container}>
                <FormInput placeholder={'Group name'} img={groupPhoto} imgHeight={25} imgWidth={25} />
                <Button text={"Create"} />
                <Button handleClick={closeWindowHandler} text={"Cancel"} />
            </div>
        </ModalWindow>
    )
}

export default CreateGroup 