import * as React from 'react';
import { useCreateNewUserMutation } from '../app/api/userSlice';
import { useNavigate } from 'react-router-dom';
// import { ROLES } from '../config/roles';
import {
    Alert, Grid, TextField, Box, Typography, Stepper, Step, StepLabel, Button, ListItem, Container
} from '@mui/material';

const NewUser = () => {
    const [createNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useCreateNewUserMutation();

    // const [roles, setRoles] = React.useState([]);
    const [counterStep, setCounterStep] = React.useState(0);
    const [activeStep, setActiveStep] = React.useState(0);
    const [user, setUser] =
        React.useState({username: '', password: '', email: '', address: '', phone: null});

    const handleInputChange = (event) => {
        const {value, name} = event.target;
        const u = user;
        u[name] = value;
        setUser(u);
    };

    const handleBack = () => {
        setCounterStep(counterStep - 1);
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleNext = () => {
        setCounterStep(counterStep + 1);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    // const handleRolesChanged = (event) => {
    //     const values = Array.from(
    //         event.target.selectedOptions,
    //         (option) => option.value
    //     );
    //     setRoles(values);
    // };

    const navigate = useNavigate();

    React.useEffect(() => {
        if (isSuccess) {
            console.log('user created');
            setUser({username: '', password: '', email: '', address: '', phone: null})
        }
    }, [isSuccess, navigate]);

    const onSubmit = async (event) => {
        event.preventDefault();
        user.roles = ["User"];
        await createNewUser(user);
        navigate('/');
    };

    let content;

    if (isError) {
        content = (
            <Alert severity='error'>{error?.data?.message}</Alert>
        )
    }

    const steps = [
        {
            label: 'Username',
            description: (
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
            ),
        },
        {
            label: 'Password',
            description: (
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
                autoFocus
                />
            ),
        },
        {
            label: 'Contact Info',
            description: (
                <Grid>
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
                    autoFocus
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
                </Grid>
            ),
        },
    ];

    return (
        <Container maxWidth='sm'>
            <Typography component='h1' variant='h5' align='center'>
                JuicyEats
            </Typography>
            <Box
                component='form'
                noValidate
                sx={{
                    pt: 2
                }}
            >
                {steps[activeStep]?.description}
                <Stepper activeStep={activeStep}>
                {steps.map((step, index) => (
                    <Step key={step.label} sx={{pt: 2}}>
                        <StepLabel>{step.label}</StepLabel>
                    </Step>
                ))}
                </Stepper>
                <Box
                    sx={{
                        mb: 2,
                        display: 'flex',
                        flexDirection: 'row'
                    }}
                >
                    <Button
                        disabled={counterStep===0}
                        onClick={handleBack}
                        aria-label='back'
                        sx={{mt: 1, mr: 1}}
                    >
                        Back
                    </Button>
                    <Box sx={{flexGrow: '1'}} />
                    {
                        activeStep === steps.length-1
                        ? (<Button
                            aria-label='sign up'
                            variant='contained'
                            onClick={onSubmit}
                            sx={{mt: 1, mr: 1}}
                        >
                            Sign Up
                        </Button>)
                        : (<Button
                            aria-label='next'
                            onClick={handleNext}
                            sx={{mt: 1, mr: 1}}
                        >
                            Next
                        </Button>)
                    
                    }
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