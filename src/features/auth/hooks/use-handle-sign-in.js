import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthApi } from "../api/auth-api"
import { RouteConstants } from "../../../shared/constants/constants"
import { useAuth } from "../../../shared"

export const useHandleSignIn = (authType) => {
    const [error, setError] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const { auth } = useAuth()
    const navigate = useNavigate()

    const handleSignIn = async (email, password, displayName) => {
        setLoading(true)
        let user
        try {
            switch (authType) {
                case "login":
                    user = await AuthApi.doSignInWithEmailAndPassword(auth, email, password)
                    break
                case "signup":
                    user = await AuthApi.doCreateUserWithEmailAndPassword(auth, email, password, displayName)
                    await AuthApi.doUpdateProfile(user, displayName)
                    await AuthApi.doAddUserInDatabase(user.uid, user.displayName, user.email)
                    break
            }
            navigate(RouteConstants.CHATS, { relative: 'path' })
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return { error, loading, handleSignIn }
}