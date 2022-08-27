import * as React from 'react';
import {
    AppBar, Container, Button, Toolbar, Box
} from '@mui/material';

const Header = () => {
    return (
        <AppBar position = "static">
            <Container maxWidth = "false">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1 }}>
                        <Button
                            type='Cart'
                            value='Cart'
                            aria-label='cart'
                            variant='contained'
                            margin='normal'
                            sx={{mt: 2, mb: 2, justifyContent: 'flex-start'}}
                            >
                            Cart
                        </Button>
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