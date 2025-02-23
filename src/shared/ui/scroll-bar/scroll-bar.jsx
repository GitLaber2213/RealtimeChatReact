import React from "react";
import classes from './scroll-bar.module.css'


const shouldScrollStyle = {
    height: "100vh",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column-reverse"
}


export const ScrollBar = ({ children, shouldScroll = false }) => {
    return (
        <div className={classes.scrollBar} style={shouldScroll ? shouldScrollStyle : {}}>
            {children}
        </div>
    )
}


export default ScrollBar