import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setToken, useLoginMutation } from '../app/api/authSlice';
import {
    Dialog, DialogTitle, DialogContent, Box, TextField, Button, Divider
} from '@mui/material';
import { setLoginOpen } from '../app/api/loginSlice';

const Login = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login] = useLoginMutation();
    const loginOpen = useSelector(state => state.login.loginOpen);

    const handleLoginClose = () => {
        dispatch(setLoginOpen(false));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { accessToken } = await login({ username, password }).unwrap();
            dispatch(setToken({ accessToken }));
            setUsername('');
            setPassword('');
            dispatch(setLoginOpen(false));
        } catch (err) {
            console.log(`Error ${err.status} ${err.data?.message}`);
        }
    };

    return (
        <Dialog open={loginOpen} onClose={handleLoginClose}>
            <DialogTitle>Log In</DialogTitle>
            <DialogContent>
                <Box
                    component='form'
                    noValidate
                    sx={{
                        m: 1
                    }}
                >
                    <TextField
                        required
                        margin='normal'
                        type='text'
                        id='username'
                        label='Username'
                        placeholder='Username'
                        fullWidth
                        autoFocus
                        onChange={handleUsernameChange}
                    />
                    <TextField
                        required
                        margin='normal'
                        type='password'
                        id='password'
                        label='Password'
                        placeholder='Password'
                        fullWidth
                        onChange={handlePasswordChange}
                    />
                    <Button
                        type='submit'
                        id='login'
                        variant='contained'
                        fullWidth
                        onClick={handleSubmit}
                        sx={{
                            m: 1
                        }}
                    >
                        Log In
                    </Button>
                    <Divider>or</Divider>
                    <Button
                        id='newuser'
                        variant='outlined'
                        fullWidth
                        onClick={() => navigate('/newuser')}
                        sx={{
                            m: 1
                        }}
                    >
                        Create Account
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default Login;