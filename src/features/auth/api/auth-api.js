import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { set, getDatabase, ref } from 'firebase/database'

export const AuthApi = {
    doSignInWithEmailAndPassword: async (auth, email, password) => {
        const {user} = await signInWithEmailAndPassword(auth, email, password)
        return user
    },
    doCreateUserWithEmailAndPassword: async (auth, email, password) => {
        const {user} = await createUserWithEmailAndPassword(auth, email, password)
        return user
    },
    doUpdateProfile: async (user, displayName) => {
        await updateProfile(user, { displayName: displayName })
    },
    doAddUserInDatabase: async (uid, displayName, email) => {
        await set(ref(getDatabase(), 'Chats/' + uid), {
            uid: uid,
            displayName: displayName,
            email: email
        })
    },

}

