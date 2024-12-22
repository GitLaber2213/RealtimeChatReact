import { createSlice } from "@reduxjs/toolkit";

 

export const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        email: null,
        token: null,
        id: null,
        displayName: null,
        isAuth: false
    },
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email
            state.token = action.payload.token
            state.id = action.payload.id
            state.displayName = action.payload.displayName
            state.isAuth = true
        },
        removeUser(state) {
            state.email = null
            state.id = null
            state.token = null
            state.displayName = null
            state.isAuth = false
        }
    }
})