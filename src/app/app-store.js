import { configureStore } from "@reduxjs/toolkit";
import { usersAndGroupsSlice } from "../features/users-and-groups/model/users-and-groups.slice";
import { AuthSlice } from "../features/auth/model/auth.slice";



export const store = configureStore({
    reducer: {
        [usersAndGroupsSlice.name]: usersAndGroupsSlice.reducer,
        [AuthSlice.name]: AuthSlice.reducer,
    }
})