import * as React from 'react';
import {
    Button, ImageListItem, ImageListItemBar
} from '@mui/material';
import { selectListingById } from '../app/api/listingsSlice';
//import { useNavigate } from 'react-router-dom';
import {
    useSelector, useDispatch
} from 'react-redux';
import { add } from '../app/api/cartSlice';

const Listing = ({ listingId }) =>{
    const listing = useSelector(state => selectListingById(state, listingId));
    const dispatch = useDispatch();
    //const navigate = useNavigate()

    if (listing) {
        // const listingClick = () => navigate(`/listing?listing=${listing.id}`);
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
                            subtitle={`$${listing.price}`}
                        />
                </ImageListItem>
            </Button>
        )
    } else return null;
};

export default Listing;