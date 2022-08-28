import * as React from 'react';
import {
    CssBaseline, Box
} from '@mui/material';

import Header from './Header';
import CartDrawer from './CartDrawer';

const Dash = () => {
  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline />
      <Header/>
      <CartDrawer />
    </Box>
  );
};

export default Dash;
