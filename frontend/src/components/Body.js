import * as React from 'react';
import {
 Box, Toolbar, Container, Grid
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import ListingList from './ListingList';

const Body = () => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                [theme.breakpoints.down('md')]: {pl: 'none', pr: 'none'},
                [theme.breakpoints.up('md')]: {pl: '20%', pr: '20%'}
            }}
        >
            <Toolbar />
            <Container>
                <Grid
                    container
                >
                    <ListingList />
                </Grid>
            </Container>
        </Box>
    );
};

export default Body;