import * as React from 'react';
import {
    Alert, AppBar, Container, Button, Toolbar, Box, IconButton, Typography, Tooltip, Menu, MenuItem, Avatar, ListItemIcon
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
    ShoppingCartOutlined, Logout, Settings
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setMobileOpen } from '../app/api/cartSlice';
import { setLoginOpen } from '../app/api/loginSlice';
import { useSendLogoutMutation } from '../app/api/authSlice';

const Header = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token);
    const mobileOpen = useSelector(state => state.cart.mobileOpen);
    const userId = useSelector(state => state.auth.id);
    const [menuAnchor, setMenuAnchor] = React.useState(null);

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

    const handleAccountClicked = () => navigate(`/users/${userId}`);

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
    const menuButton = (
        <React.Fragment>
            <Tooltip title="Account">
                <IconButton
                    id='menubutton'
                    aria-label='menubutton'
                    onClick={(event) => setMenuAnchor(event.currentTarget)}
                >
                    <Avatar />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={menuAnchor}
                id='accountmenu'
                open={Boolean(menuAnchor)}
                onClose={() => setMenuAnchor(null)}
                onClick={() => setMenuAnchor(null)}
            >
                <MenuItem
                    id='accountsettings'
                    aria-label='accountsettings'
                    onClick={handleAccountClicked}
                >
                    <ListItemIcon>
                        <Settings />
                    </ListItemIcon>
                    My Account
                </MenuItem>
                <MenuItem
                    id='logout'
                    value='logout'
                    aria-label='logout'
                    onClick={handleLogoutClicked}
                >
                    <ListItemIcon>
                        <Logout />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
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
                            <ShoppingCartOutlined
                            fontSize='large'
                            />
                        </IconButton>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant='h4' align='center'>JuicyEats</Typography>
                        </Box>
                        { token ? menuButton : loginButton }
                    </Toolbar>
                </Container>
            </AppBar>
        </React.Fragment>
    )
};

export default Header;