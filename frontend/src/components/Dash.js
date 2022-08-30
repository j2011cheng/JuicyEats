import * as React from 'react';
import {
    CssBaseline, Box
} from '@mui/material';

import Header from './Header';
import CartDrawer from './CartDrawer';
import Body from './Body';

const Dash = () => {
  return (
    <Box>
      <CssBaseline />
      <Header/>
      <CartDrawer />
      <Body />
    </Box>
  );
};

export default Dash;
