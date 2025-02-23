import { createSlice } from "@reduxjs/toolkit";


export const usersAndGroupsSlice = createSlice({
    name: 'usersAndGroups',
    initialState: {
        searchInputValue: ''
    },
    reducers: {
        searchUsers: (state, action) => {
            state.searchInputValue = action.payload
        },

    }
})