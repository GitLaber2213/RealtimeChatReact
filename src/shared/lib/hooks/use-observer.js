import { useEffect } from "react"
import { useMessages } from "../firebase-hooks/use-messages"


export const useObserver = (ref, messageId, readedStatus) => {
    const { readingMessage } = useMessages()
    useEffect(() => {
        const observer = new IntersectionObserver(([entries]) => {
            if (entries.isIntersecting) {
                observer.unobserve(entries.target)
                if(!readedStatus) {
                    readingMessage(true, messageId)
                }
            }
        }, { threshold: 1 })

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current)
            }
        }
    }, [ref])
}

export default useObserver