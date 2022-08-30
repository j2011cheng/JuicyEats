import * as React from 'react';
import {
    Divider, Drawer, Toolbar, Box
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';

import Cart from './Cart';

const drawerWidth = 240;

const CartDrawer = () => {
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const total = useSelector(state => state.cart.total);

    const drawer = (
        <Box>
            <Divider />
            <Toolbar>
                Cart
            </Toolbar>
            <Divider />
            <Cart />
            <Divider />
            <h3>{total}</h3>
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
                onClose={handleDrawerToggle}
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