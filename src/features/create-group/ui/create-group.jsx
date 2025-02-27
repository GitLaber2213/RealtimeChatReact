import React from "react"
import { Button, FormInput, GroupIcon } from "../../../shared"
import classes from './create-group.module.css'


export const CreateGroup = ({ setIsActive }) => {
    return (
        <div className={classes.container}>
            <img className={classes.underDevelopment} src="https://www.fas10.in/wp-content/uploads/2021/04/underdevelpoment.png" alt="" height={50} width={50} />
            <FormInput placeholder={'Group name'} img={GroupIcon} imgHeight={25} imgWidth={25} />
            <Button text={"Create"} />
            <Button handleClick={() => setIsActive(false)} text={"Cancel"} />
        </div>
    )   
}

export default CreateGroup 