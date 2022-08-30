import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: {},
    total: 0
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
    }
});

export const { add, remove } = cartSlice.actions;

export default cartSlice.reducer;