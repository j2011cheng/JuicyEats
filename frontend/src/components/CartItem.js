import * as React from 'react';
import { remove } from '../app/api/cartSlice';
import {
    useSelector, useDispatch
} from 'react-redux';
import {
    ListItem, ListItemText, IconButton
} from '@mui/material';
import { DeleteOutline } from '@mui/icons-material'
import { selectListingById } from '../app/api/listingsSlice';

const CartItem = ({ listingId, amount }) => {
    const dispatch = useDispatch();
    const listing = useSelector(state => selectListingById(state, listingId));

    return (
        <ListItem
            secondaryAction={
                <IconButton
                    edge='end'
                    onClick={() => dispatch(remove({item: listing.id, price: listing.price}))}
                >
                    <DeleteOutline />
                </IconButton>
            }
        >
            <ListItemText
                primary={`${listing?.title} (${amount})`}
                secondary={`$${amount*listing?.price}`}
            />
        </ListItem>
    )
};

export default CartItem;