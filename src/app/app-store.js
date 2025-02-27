import { configureStore } from "@reduxjs/toolkit"
import { usersAndGroupsSlice } from "../features/users-and-groups/model/users-and-groups.slice"



export const store = configureStore({
    reducer: {
        [usersAndGroupsSlice.name]: usersAndGroupsSlice.reducer,
    }
})