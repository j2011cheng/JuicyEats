import * as React from 'react';
import {
    useGetListingsQuery
} from '../app/api/listingsApiSlice';
import {
    CircularProgress, Alert, ImageList
} from '@mui/material';

import Listing from './Listing';

const ListingList = () => {
    const {
        data: listings,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetListingsQuery();

    let content;

    if (isLoading) {
        content = (
            <CircularProgress />
        )
    }
    if (isError) {
        content = (
            <Alert severity='error'>{error?.data?.message}</Alert>
        )
    }
    if (isSuccess) {
        const { ids } = listings;
        content = (
            <ImageList
                name='listingslist'
            >
                {ids.length
                ? ids.map(listingId => <Listing id = {listingId} key = {listingId} listingId={listingId} />)
                : null
            }
            </ImageList>
        )
    }

    return content;
};

export default ListingList;