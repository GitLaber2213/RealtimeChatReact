import React from "react"
import classes from './layout.module.css'


export const Layout = ({ children }) => {
    return (
        <div className={classes.container}>
            {children}
        </div>
    )
}

export default Layout