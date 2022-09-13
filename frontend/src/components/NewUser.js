import * as React from 'react';
import { useCreateNewUserMutation } from '../app/api/userSlice';
import { useNavigate } from 'react-router-dom';
import {
    Alert, TextField, Box, Typography, Button, Container, Divider, AppBar, Toolbar
} from '@mui/material';

const NewUser = () => {
    const [createNewUser, {
        isSuccess,
        isError,
        error
    }] = useCreateNewUserMutation();

    const [user, setUser] = React.useState({username: '', password: ''});
    const [buttonToggle, setButtonToggle] = React.useState(true);

    const handleInputChange = (event) => {
        const {value, name} = event.target;
        const u = user;
        u[name] = value;
        setUser(u);
        if (user.username && user.password) {
            setButtonToggle(false);
        } else {
            setButtonToggle(true);
        }
    };

    const navigate = useNavigate();

    React.useEffect(() => {
        if (isSuccess) {
            setUser({username: '', password: ''})
            navigate('/');
        }
    }, [isSuccess, navigate]);

    const onSubmit = async (event) => {
        event.preventDefault();
        user.roles = ["User"];
        await createNewUser(user);
    };

    let content;

    if (isError) {
        content = (
            <Alert severity='error'>{error?.data?.message}</Alert>
        )
    }

    return (
        <React.Fragment>
            <AppBar position='fixed'>
                <Container maxWidth='false'>
                    <Toolbar disableGutters>
                        <Box
                            sx={{
                                flexGrow: 1
                            }}
                        >
                            <Typography variant='h4' align='center'>
                                JuicyEats
                            </Typography>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Container maxWidth='sm'>
                <Toolbar />
                {content}
                <Box
                    component='form'
                    noValidate
                    sx={{
                        pt: 2
                    }}
                >
                    <Divider>
                        <Typography variant='h6'>Username</Typography>
                    </Divider>
                    <TextField
                        margin='normal'
                        required
                        type='text'
                        name='username'
                        placeholder='Username'
                        id='username'
                        label='Username'
                        aria-label='username'
                        onChange={handleInputChange}
                        fullWidth
                        autoFocus
                    />
                    <Divider>
                        <Typography variant='h6'>Password</Typography>
                    </Divider>
                    <TextField
                        margin='normal'
                        required
                        type='password'
                        name='password'
                        placeholder='Password'
                        id='password'
                        label='Password'
                        aria-label='password'
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <Divider>
                        <Typography variant='h6'>Contact Info</Typography>
                    </Divider>
                    <Typography variant='subtitle1' align='center'>at least one</Typography>
                    <TextField
                        margin='normal'
                        type='text'
                        name='email'
                        placeholder='Email'
                        id='email'
                        label='Email'
                        aria-label='email'
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        margin='normal'
                        type='text'
                        name='address'
                        placeholder='Address'
                        id='address'
                        label='Address'
                        aria-label='address'
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        margin='normal'
                        type='text'
                        name='phone'
                        placeholder='Phone Number'
                        id='phone number'
                        label='Phone Number'
                        aria-label='phone number'
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <Box
                        sx={{
                            mb: 2,
                            display: 'flex',
                            flexDirection: 'row'
                        }}
                    >
                        <Button
                            onClick={() => navigate('/')}
                            aria-label='back'
                            sx={{mt: 1, mr: 1}}
                        >
                            Back
                        </Button>
                        <Box sx={{flexGrow: '1'}} />
                        <Button
                            disabled={buttonToggle}
                            aria-label='sign up'
                            variant='contained'
                            onClick={onSubmit}
                            sx={{mt: 1, mr: 1}}
                        >
                            Sign Up
                        </Button>
                    </Box>
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default NewUser;