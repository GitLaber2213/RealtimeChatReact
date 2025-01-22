import { createSelector, createSlice } from "@reduxjs/toolkit";


export const usersAndGroupsSlice = createSlice({
    name: 'usersAndGroups',
    initialState: {
        entites: {},
        ids: [],
        selectUserId: undefined,
        searchInputValue: ''
    },
    reducers: {
        searchUsers: (state, action) => {
            state.searchInputValue = action.payload
        },

    }
})