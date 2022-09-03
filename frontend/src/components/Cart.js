import * as React from 'react';
import {
    List, Typography, Box, Divider
} from '@mui/material';
import { useSelector } from 'react-redux';

import CartItem from './CartItem';

const Cart = () => {
    const items = useSelector(state => state.cart.items);

    return (
        <List
            sx={{
                flexGrow: '1'
            }}
            subheader={
                <Box
                    align='center'
                    sx={{
                        py: 2,
                    }}
                >
                    <Typography
                        variant='h6'
                        sx={{
                            color: 'primary.main'
                        }}
                    >Cart</Typography>
                </Box>
            }
        >
            <Divider />
            {
                Object.keys(items).map((key) => {
                    return (<CartItem key={key} listingId={key} amount={items[key]} />);
                })
            }
        </List>
    )
}

export default Cart;