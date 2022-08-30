import * as React from 'react';
import {
    Button, ImageListItem, ImageListItemBar
} from '@mui/material';
import { selectListingById } from '../app/api/listingsApiSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Listing = ({ listingId }) =>{
    const listing = useSelector(state => selectListingById(state, listingId));
    const navigate = useNavigate()

    if (listing) {
        const listingClick = () => navigate(`/listing?listing=${listing.id}`);

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