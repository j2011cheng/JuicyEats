import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null },
    reducers: {
        setToken: (state, action) => {
            const { accessToken } = action.payload;
            state.token = accessToken;
        },
        logOut: (state, action) => {
            state.token = null;
        },
    }
});

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/authenticate',
                method: 'POST',
                body: { ...credentials }
            })
        }),

        sendLogout: builder.mutation({
            query: () => ({
                url: '/authenticate/logout',
                method: 'POST'
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(authSlice.actions.logOut());
                    dispatch(apiSlice.util.resetApiState());
                } catch (err) {
                    console.log(err);
                }
            }
        }),

        refresh: builder.mutation({
            query: () => ({
                url: '/authorize/refresh',
                method: 'GET',
            })
        })
    })
});

export const { setToken, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;

export const {
    useLoginMutation,
    useSendLogoutMutation,
    useRefreshMutation
} = authApiSlice;