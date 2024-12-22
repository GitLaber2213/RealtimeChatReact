import { onValue, ref } from "firebase/database"
import { db } from "../../../shared/firebase/firebase-config"

export const UsersAndGroupsApi = {
    doGetDataFromDatabase: async (arr = {}) => {
        const refdb = ref(db, 'usersChats/')
        onValue(refdb, (snapshot) => {
            const data = snapshot.val()
            arr = {
                ...data
            }
        })
        return arr;
    }
}