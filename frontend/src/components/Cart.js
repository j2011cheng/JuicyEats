import * as React from 'react';
import {
    List
} from '@mui/material';
import { useSelector } from 'react-redux';

import CartItem from './CartItem';

const Cart = () => {
    const items = useSelector(state => state.cart.items);

    return (
        <List>
            {
                Object.keys(items).map((key) => {
                    return (<CartItem key={key} listingId={key} amount={items[key]} />);
                })
            }
        </List>
    )
}

export default Cart;