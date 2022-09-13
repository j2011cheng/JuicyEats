import * as React from 'react';
import {
    Button, ImageListItem, ImageListItemBar
} from '@mui/material';
import { selectListingById } from '../app/api/listingsSlice';
import {
    useSelector, useDispatch
} from 'react-redux';
import { add } from '../app/api/cartSlice';

const Listing = ({ listingId }) =>{
    const listing = useSelector(state => selectListingById(state, listingId));
    const dispatch = useDispatch();

    if (listing) {
        const listingClick = () => dispatch(add({item: listingId, amount: 1, price: listing.price}));

        return (
            <Button
                onClick={listingClick}
            >
                <ImageListItem>
                    <img
                        src='/not-found-image.jpg'
                        alt='Not Found'
                    />
                        <ImageListItemBar
                            title={listing.title}
                            subtitle={`$${(listing.price/100).toFixed(2)}`}
                        />
                </ImageListItem>
            </Button>
        )
    } else return null;
};

export default Listing;