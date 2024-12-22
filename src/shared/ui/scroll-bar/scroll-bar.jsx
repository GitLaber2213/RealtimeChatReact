import React, { useEffect, useRef } from "react";
import classes from './scroll-bar.module.css'


export const ScrollBar = ({ children, shouldScroll = false }) => {
    const ref = useRef(null)

    useEffect(() => {
        const { scrollHeight, clientHeight } = ref.current;

        if (ref.current && shouldScroll && scrollHeight > clientHeight) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    }, [children, shouldScroll])

    return (
        <div ref={ref} className={classes.scrollBar}>
            {children}
        </div>
    )
}


export default ScrollBar