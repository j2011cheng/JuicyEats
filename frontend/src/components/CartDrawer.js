import * as React from 'react';
import {
    Divider, Drawer, Toolbar, Box, Typography, ListItem, Button
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { setMobileOpen } from '../app/api/cartSlice';

import Cart from './Cart';

const drawerWidth = 240;

const CartDrawer = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const total = useSelector(state => state.cart.total);
    const mobileOpen = useSelector(state => state.cart.mobileOpen);

    const drawer = (
        <Box
            display='flex'
            flexDirection='column'
            sx={{
                height: '100%'
            }}
        >
            <Cart />
            <Box
                sx={{
                    flex: '1',
                }}
            />
            <Divider />
            <Box
                sx={{
                    py: 2,
                    px: 1
                }}
            >
                <ListItem
                    secondaryAction={
                        <Button
                            aria-label='checkout'
                            variant='contained'
                        >
                            Checkout
                        </Button>
                    }
                >
                    <Typography
                        variant='button'
                        fontSize='large'
                    >
                        {`$${(total/100).toFixed(2)}`}
                    </Typography>
                </ListItem>
            </Box>
        </Box>
    );

    return (
        <Box>
            <Drawer
                variant='permanent'
                anchor='left'
                open
                sx={{
                    [theme.breakpoints.down('md')]: {display: 'none'},
                    [theme.breakpoints.up('md')]: {display: 'block'},
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    '& .MuiDrawer-paper': {width: drawerWidth}
                }}
            >
                <Toolbar />
                {drawer}
            </Drawer>
            <Drawer
                variant='temporary'
                anchor='left'
                open={mobileOpen}
                onClose={() => dispatch(setMobileOpen(false))}
                sx={{
                    display: {
                        sm: 'block',
                        md: 'none'
                    },
                    '& .MuiDrawer-paper': {width: drawerWidth}
                }}
            >
                {drawer}
            </Drawer>
        </Box>
    )
};

export default CartDrawer;