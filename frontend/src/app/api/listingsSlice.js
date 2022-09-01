import {
    createSelector,
    createEntityAdapter
} from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';

const listingsAdapter = createEntityAdapter({});
const initialState = listingsAdapter.getInitialState();

export const listingsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getListings: builder.query({
            query: () => '/listings',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const listings = responseData.map(listing => {
                    listing.id = listing._id;
                    return listing;
                });
                return listingsAdapter.setAll(initialState, listings);
            },
            providesTags: (res, err, arg) => {
                return (res.ids ?
                        [{ type: 'Listing', id: 'LIST' },
                        ...res.ids.map(id => ({ type: 'Listing', id }))] :
                        [{ type: 'Listing', id: 'LIST' }]
                    );
            }
        }),
    })
});

export const {
    useGetListingsQuery
} = listingsApiSlice;

export const selectListingsResult = listingsApiSlice.endpoints.getListings.select();

const selectListingsData = createSelector(
    selectListingsResult,
    listingsResult => listingsResult.data
);

export const {
    selectAll: selectAllListings,
    selectById: selectListingById,
    selectIds: selectListingIds
} = listingsAdapter.getSelectors(state => selectListingsData(state) ?? initialState);