import { createSelector, createSlice } from "@reduxjs/toolkit";


export const usersAndGroupsSlice = createSlice({
    name: 'usersAndGroups',
    initialState: {
        entites: {},
        ids: [],
        selectUserId: undefined,
        searchInputValue: ''
    },
    selectors: {
        selectUserById: (state, id) => state.entites[id],
        getSearchInputValue: (state) => {
            return state.searchInputValue
        },
        getFindedUsers: createSelector(
            (state) => state.ids,
            (state) => state.entites,
            (state) => state.searchInputValue,
            (ids, entites, searchInputValue) => {
                return ids
                .map(id => entites[id])
                .filter(user => {
                    return ['name', 'userName', 'email'].some((key) =>
                        user[key]?.toLowerCase().includes(searchInputValue.toLowerCase())
                    )
                })
            }),
    },
    reducers: {
        searchUsers: (state, action) => {
            state.searchInputValue = action.payload
        },
        fetchUsers: (state, action) => {
            state.entites = action.payload.reduce((acc, user) => {
                acc[user.uid] = user
                return acc
            }, [])
            state.ids = action.payload.map(user => user.uid)
        }

    }
})