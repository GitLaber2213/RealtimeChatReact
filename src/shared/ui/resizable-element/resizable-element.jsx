import React, { useRef } from "react"
import classes from './resizable-element.module.css'

export const ResizableElement = ({ width, setWidth, triggerWidth, minWidth }) => {
    const containerRef = useRef(null)

    const handleMouseDown = (event) => {
        event.preventDefault()

        const startX = event.clientX
        const startWidth = width
        const sensitivityFactor = 2

        const onMouseMove = (moveEvent) => {
            const newWidth = startWidth + (moveEvent.clientX - startX) * sensitivityFactor
            setWidth(newWidth)

            if(newWidth < triggerWidth) {
                setWidth(minWidth)
            }
        }

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseup', onMouseUp)
        }

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
    }

    return (
        <div className={classes.resizableElement} ref={containerRef} onMouseDown={handleMouseDown} ></div>
    )
}


export default ResizableElement