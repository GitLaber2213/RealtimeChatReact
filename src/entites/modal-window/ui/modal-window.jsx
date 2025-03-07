import React from "react"
import classes from './modal-window.module.css'
import { createPortal } from "react-dom"
import { ScrollBar } from "../../../shared"

export const ModalWindow = ({ isActive, setIsActive, children, windowHeader }) => {

    const modalContainerClass = isActive ? `${classes.modalWindowContainer} ${classes.active}` : classes.modalWindowContainer
    const modalContentClass = isActive ? `${classes.modalWindowUnContainer} ${classes.active}` : classes.modalWindowUnContainer

    if (!isActive) return null

    return createPortal(
        <div className={modalContainerClass} onMouseDown={() => setIsActive(false)}>
            <div className={modalContentClass} onMouseDown={e => e.stopPropagation()}>
                <div className={classes.windowHeadContainer}>

                    <div className={classes.windowHead}>{windowHeader}</div>

                    <div className={classes.closeWindowBtnContainer} onClick={() => setIsActive(false)}>
                        <div className={classes.closeWindowBtn}></div>
                    </div>

                </div>
                <ScrollBar>
                    <div className={classes.childrenBlock}>
                        {children}
                    </div>
                </ScrollBar>
            </div>
        </div>,
        document.body
    )
}

export default ModalWindow