import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useEffect, useMemo, useState } from "react";
import { auth } from "../firebase/firebase-config";



export const AuthContext = createContext()


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [uid, setUid] = useState()


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, authUser => {
            if(authUser) {
                
                setUid(authUser.uid)
                setUser(authUser ? {
                    uid: authUser.uid,
                    displayName: authUser.displayName,
                    email: authUser.email,
                    avatar: null
                } : null)
                
            } else {
                setUser(null)
            }
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
        doSignOut
    }), [user, auth ])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}