import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: {},
    total: 0,
    mobileOpen: false,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (state, action) => {
            state.total += action.payload.price*action.payload.amount;
            state.items[action.payload.item]
            ? state.items[action.payload.item] += action.payload.amount
            : state.items[action.payload.item] = action.payload.amount;
        },
        remove: (state, action) => {
            state.total -= action.payload.price*state.items[action.payload.item];
            delete state.items[action.payload.item];
        },
        setMobileOpen: (state, action) => {
            state.mobileOpen = action.payload;
        },
    }
});

export const { add, remove, setMobileOpen } = cartSlice.actions;

export default cartSlice.reducer;