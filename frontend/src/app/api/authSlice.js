import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null, id: null },
    reducers: {
        setCreds: (state, action) => {
            const { accessToken, id } = action.payload;
            state.token = accessToken;
            state.id = id;
        },
        logOut: (state, action) => {
            state.token = null;
            state.id = null;
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

export const { setCreds, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;

export const {
    useLoginMutation,
    useSendLogoutMutation,
    useRefreshMutation
} = authApiSlice;