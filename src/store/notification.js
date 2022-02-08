import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    show: false,
    type: '',
    title: '',
    message: '',
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        send: (state, action) => {
            state.show = true;
            state.type = action.payload.type;
            state.title = action.payload.title;
            state.message = action.payload.message;
        },
        close: () => {
            return {...initialState};
        }
    }
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice.reducer;
