import React from "react"
import Info from "../../info/ui/info"
import { Button } from "../../../shared"



export const OptionalMenu = ({ info, successKey, successMessage, handleClickForSubmitBtn, handleClickForCancelBtn, textSubmitBtn, textCancelBtn }) => {
    return (
        <div>
            {info !== undefined && info !== successKey && <Info text={info} />}
            {info === successKey && <Info text={successMessage} error={false} />}
            <Button text={textSubmitBtn} handleClick={handleClickForSubmitBtn} />
            <Button handleClick={handleClickForCancelBtn} text={textCancelBtn} />
        </div>
    )
}


export default OptionalMenu