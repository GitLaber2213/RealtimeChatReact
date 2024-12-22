import React from "react";
import classes from './loader.module.css'

export const Loader = () => {
    return (
        <div className={classes.container}>
            <span className={classes.loader}></span>
        </div>
    ) 
}

export default Loader