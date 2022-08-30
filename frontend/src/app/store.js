import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import cartReducer from './api/cartSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});