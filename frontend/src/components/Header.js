import * as React from 'react';
import {
    AppBar, Container, Button, Toolbar, Box, IconButton, Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setMobileOpen } from '../app/api/cartSlice';

const Header = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const mobileOpen = useSelector(state => state.cart.mobileOpen);
    return (
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
                        <Button
                            type='NewUser'
                            value='NewUser'
                            aria-label='newuser'
                            variant='contained'
                            onClick={() => navigate('/newuser')}
                            sx={{
                                mt: 2,
                                mb: 2,
                                float: 'right'
                            }}
                            >
                            Create Account
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
};

export default Header;