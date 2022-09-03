import * as React from 'react';
import { useCreateNewUserMutation } from '../app/api/userSlice';
import { useNavigate } from 'react-router-dom';
// import { ROLES } from '../config/roles';
import {
    Alert, TextField, Box, Typography, Button, Container, Divider
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
        console.log(user);
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

    // const steps = [
    //     {
    //         label: 'Username',
    //         description: (
    //             <TextField
    //                 margin='normal'
    //                 required
    //                 type='text'
    //                 name='username'
    //                 placeholder='Username'
    //                 id='username'
    //                 label='Username'
    //                 aria-label='username'
    //                 onChange={handleInputChange}
    //                 fullWidth
    //                 autoFocus
    //             />
    //         ),
    //     },
    //     {
    //         label: 'Password',
    //         description: (
    //             <TextField
    //                 margin='normal'
    //                 required
    //                 type='password'
    //                 name='password'
    //                 id='password'
    //                 label='Password'
    //                 aria-label='password'
    //                 onChange={handleInputChange}
    //                 fullWidth
    //                 autoFocus
    //             />
    //         ),
    //     },
    //     {
    //         label: 'Contact Info',
    //         description: (
    //             <Grid>
    //             <TextField
    //                 margin='normal'
    //                 type='text'
    //                 name='email'
    //                 placeholder='Email'
    //                 id='email'
    //                 label='Email'
    //                 aria-label='email'
    //                 onChange={handleInputChange}
    //                 fullWidth
    //                 autoFocus
    //             />
    //             <TextField
    //                 margin='normal'
    //                 type='text'
    //                 name='address'
    //                 placeholder='Address'
    //                 id='address'
    //                 label='Address'
    //                 aria-label='address'
    //                 onChange={handleInputChange}
    //                 fullWidth
    //             />
    //             <TextField
    //                 margin='normal'
    //                 type='text'
    //                 name='phone'
    //                 placeholder='Phone Number'
    //                 id='phone number'
    //                 label='Phone Number'
    //                 aria-label='phone number'
    //                 onChange={handleInputChange}
    //                 fullWidth
    //             />
    //             </Grid>
    //         ),
    //     },
    // ];

    return (
        <Container maxWidth='sm'>
            <Typography component='h1' variant='h4' align='center'>
                JuicyEats
            </Typography>
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
                {/* {steps[activeStep]?.description}
                <Stepper activeStep={activeStep}>
                {steps.map((step, index) => (
                    <Step key={step.label} sx={{pt: 2}}>
                        <StepLabel>{step.label}</StepLabel>
                    </Step>
                ))}
                </Stepper> */}
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
                {/* <Divider>or</Divider>
                <ListItem>
                <Button
                    type='submit'
                    name='submit'
                    aria-label='log in'
                    value='Login'
                    variant='contained'
                    onClick={signIn}
                    sx={{mt: 1, width: '325px'}}
                >
                    Log In
                </Button>
                </ListItem> */}
            </Box>
        </Container>
    );
};

export default NewUser;