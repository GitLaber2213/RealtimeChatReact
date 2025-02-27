import React from "react"
import classes from './find-user.module.css'
import { SearchInput } from "../../../shared"




export const FindUsers = ({searchInputValue, handleChange}) => {
    return (
        <div className={classes.findUsersContainer}>
            <div className={classes.findUsersUnContainer}>
                <SearchInput placeholder={"Search"} value={searchInputValue} onChange={handleChange} />
            </div>
        </div>
    )
}


export default FindUsers
