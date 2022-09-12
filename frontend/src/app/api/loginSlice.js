import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loginOpen: false,
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLoginOpen: (state, action) => {
            state.loginOpen = action.payload;
        },
    }
});

export const { setLoginOpen } = loginSlice.actions;

export default loginSlice.reducer;