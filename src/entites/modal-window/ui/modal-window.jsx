import React from "react";
import classes from './ModalWindow.module.css'

export const ModalWindow = ({ activeWindow, windowType, closeWindowHandler, children, windowHeader }) => {
    const isActive = activeWindow === windowType;

    const modalContainerClass = isActive ? `${classes.modalWindowContainer} ${classes.active}` : classes.modalWindowContainer;
    const modalContentClass = isActive ? `${classes.modalWindowUnContainer} ${classes.active}` : classes.modalWindowUnContainer;

    return (
        <div className={modalContainerClass} onClick={closeWindowHandler}>
            <div className={modalContentClass} onClick={e => e.stopPropagation()}>
                <div className={classes.windowHeadContainer}>
                    <div className={classes.windowHead}>{windowHeader}</div>
                    <div className={classes.closeWindowBtnContainer} onClick={closeWindowHandler}>
                        <div className={classes.closeWindowBtn} >
                            
                        </div>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
}

export default ModalWindow;