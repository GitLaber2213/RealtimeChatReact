import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    messages: [],
    currentChat: null,
    messageSenderText: ''
}


export const messageRoomSlice = createSlice({
    name: 'messagesRoom',
    initialState,
    reducers: {
        addMessage: (state, action) => {
            action.payload.message !== '' && state.messages.push(action.payload)
        },
        deleteMessages: (state) => {
            state.messages = []
        },
        setMessageSenderText: (state, action) => {
            state.messageSenderText = action.payload
        },

    }
})