import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useEffect, useMemo, useState } from "react";
import { auth } from "../firebase/firebase-config";



export const AuthContext = createContext()


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [uid, setUid] = useState()
    const [loading, setLoading] = useState(true)
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, authUser => {
            if(authUser) {
                setIsAuth(true)
                
                setUid(authUser.uid)
                setUser(authUser ? {
                    uid: authUser.uid,
                    displayName: authUser.displayName,
                    email: authUser.email,
                    avatar: null
                } : null)
                
            } else {
                setUser(null)
                setIsAuth(false)
            }
            setLoading(false)
        })
        return () => {
            unSubscribe()
        }
    }, [])

    
    const doSignOut = async () => {
        await signOut(auth)
        setUser(null)
        setUid(null)
    };

    const value = useMemo(() => ({
        user,
        setUser,
        auth,
        uid,
        doSignOut,
        isAuth,
        loading
    }), [user, auth ])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}