import * as React from 'react';
import { Divider, Drawer, Toolbar, Box } from '@mui/material';

const drawerWidth = 240;

const CartDrawer = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box>
            <Drawer
                variant='permanent'
                anchor='left'
                open
                sx={{
                    display: {
                        xs: 'none',
                        sm: 'block'
                    },
                    width: drawerWidth,
                    '& .MuiDrawer-paper': {width: drawerWidth}
                }}
            >
                <Toolbar />
                <Divider />
                <Toolbar>
                    Cart
                </Toolbar>
                <Divider />
            </Drawer>
            <Drawer
                variant='temporary'
                anchor='left'
                open={mobileOpen}
                onClose={handleDrawerToggle}
                sx={{
                    display: {
                        xs: 'block',
                        sm: 'none'
                    },
                    '& .MuiDrawer-paper': {width: drawerWidth}
                }}
            >
                <Toolbar>
                    Cart
                </Toolbar>
                <Divider />
            </Drawer>
        </Box>
    )
};

export default CartDrawer;