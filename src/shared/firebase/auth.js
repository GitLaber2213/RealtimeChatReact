import { auth } from "./firebase-config"

export const doSingOut = () => {
    return auth.signOut()
}