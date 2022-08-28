import * as React from 'react';
import {
    AppBar, Container, Button, Toolbar, Box, IconButton
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const Header = () => {
    const theme = useTheme();
    return (
        <AppBar
            position = "static"
            sx={{
                zIndex: theme.zIndex.drawer + 1
            }}
        >
            <Container maxWidth = "false">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1 }}>
                        <IconButton
                            color='secondary'
                            aria-label='cart'
                            edge='start'
                            className='cartButton'
                        >
                            <ShoppingCartOutlinedIcon
                            fontSize='large'
                            />
                        </IconButton>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>JuicyEats</Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Button
                            type='Login'
                            value='Login'
                            aria-label='login'
                            variant='contained'
                            margin='normal'
                            sx={{mt: 2, mb: 2, justifyContent: 'flex-end'}}
                            >
                            Log In
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
};

export default Header;