import * as React from 'react';
import {
    CssBaseline, Box
} from '@mui/material';

import Header from './Header';
import CartDrawer from './CartDrawer';
import Body from './Body';
import Login from './Login';

const Dash = () => {
  return (
    <Box>
      <CssBaseline />
      <Header />
      <Login />
      <CartDrawer />
      <Body />
    </Box>
  );
};

export default Dash;
