import {
    createApi, fetchBaseQuery
} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500/v0' }),
    tagTypes: ['Listing'],
    endpoints: builder => ({})
});