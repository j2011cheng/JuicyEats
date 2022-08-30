import * as React from 'react';
import {
 Box, Toolbar, Container, Grid
} from '@mui/material';

import ListingList from './ListingList';

const Body = () => {
    return (
        <Box>
            <Toolbar />
            <Container>
                <Grid
                    container
                    maxwidth='100%'
                >
                    <ListingList />
                </Grid>
            </Container>
        </Box>
    );
};

export default Body;