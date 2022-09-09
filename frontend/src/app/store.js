import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import cartReducer from './api/cartSlice';
import authReducer from './api/authSlice';
import loginReducer from './api/loginSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
        login: loginReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});