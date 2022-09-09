import * as React from 'react';
import {
    Alert, AppBar, Container, Button, Toolbar, Box, IconButton, Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { setMobileOpen } from '../app/api/cartSlice';
import { setLoginOpen } from '../app/api/loginSlice';
import { useSendLogoutMutation } from '../app/api/authSlice';

const Header = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const mobileOpen = useSelector(state => state.cart.mobileOpen);
    const [sendLogout, {
        isError,
        error
    }] = useSendLogoutMutation();

    let content;
    if (isError) {
        content = (
            <Alert severity='error'>{error?.data?.message}</Alert>
        )
    };

    const handleLogoutClicked = () => sendLogout();

    const loginButton = (
        <Button
            id='openlogin'
            value='openlogin'
            aria-label='openlogin'
            variant='contained'
            onClick={() => dispatch(setLoginOpen(true))}
            sx={{
                mt: 2,
                mb: 2,
                float: 'right'
            }}
            >
            Log In
        </Button>
    );
    const logoutButton = (
        <Button
            id='logout'
            value='logout'
            aria-label='logout'
            variant='contained'
            onClick={handleLogoutClicked}
            sx={{
                mt: 2,
                mb: 2,
                float: 'right'
            }}
            >
            Logout
        </Button>
    )

    return (
        <React.Fragment>
            {content}
            <AppBar
                position = "fixed"
                sx={{
                    zIndex: theme.zIndex.drawer + 1
                }}
            >
                <Container maxWidth = "false">
                    <Toolbar disableGutters>
                        <Box>
                            <IconButton
                                aria-label='cart'
                                edge='start'
                                className='cartButton'
                                onClick={() => dispatch(setMobileOpen(!mobileOpen))}
                                sx={{
                                    [theme.breakpoints.down('md')]: {display: 'flex'},
                                    [theme.breakpoints.up('md')]: {display: 'none'},
                                    color: 'white'
                                }}
                            >
                                <ShoppingCartOutlinedIcon
                                fontSize='large'
                                />
                            </IconButton>
                        </Box>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant='h4' align='center'>JuicyEats</Typography>
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            { token ? logoutButton : loginButton }
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </React.Fragment>
    )
};

export default Header;