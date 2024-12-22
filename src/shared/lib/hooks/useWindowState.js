import { useState } from "react";


export const useModalWindowState = () => {
    const [activeWindow, setActiveWindow] = useState(null);

    const openWindow = (window) => setActiveWindow(window)
    const closeWindow = () => setActiveWindow(null)

    return {activeWindow, openWindow, closeWindow}

}

export default useModalWindowState