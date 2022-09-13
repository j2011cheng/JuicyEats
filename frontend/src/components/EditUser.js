import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserById, useUpdateUserMutation, useDeleteUserMutation, useGetUsersQuery } from '../app/api/userSlice';
import {
    CircularProgress, AppBar, Container, Alert, Toolbar, Box, Divider, Typography, TextField, Button, Dialog, DialogTitle, DialogContent,
    DialogActions, DialogContentText
} from '@mui/material';

const EditUser = () => {
    useGetUsersQuery();
    const navigate = useNavigate();
    const { id } = useParams();
    const selectedUser = useSelector(state => selectUserById(state, id));

    const [updateUser, {
        isSuccess: isUpdateSuccess,
        isError: isUpdateError,
        error: updateError
    }] = useUpdateUserMutation();
    const [deleteUser, {
        isSuccess: isDeleteSuccess,
        isError: isDeleteError,
        error: deleteError
    }] = useDeleteUserMutation();

    const [user, setUser] = React.useState({username: '', password: ''});
    const [confirmOpen, setConfirmOpen] = React.useState(false);

    const handleInputChange = (event) => {
        const {value, name} = event.target;
        const u = user;
        u[name] = value;
        setUser(u);
    };
    const handleConfirmOpen = () => {
        setConfirmOpen(true);
    };
    const handleConfirmClose = () => {
        setConfirmOpen(false);
    };
    const handleConfirmDelete = async () => {
        await deleteUser({ id });
    }

    React.useEffect(() => {
        if (isUpdateSuccess || isDeleteSuccess) {
            setUser({username: '', password: ''})
            navigate('/');
        }
    }, [isUpdateSuccess, isDeleteSuccess, navigate]);

    let content;

    if (isUpdateError) {
        content = (
            <Alert severity='error'>{updateError?.data?.message}</Alert>
        )
    }
    if (isDeleteError) {
        content = (
            <Alert severity='error'>{deleteError?.data?.message}</Alert>
        )
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        await updateUser(user);
    };

    const header = (
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
    );

    const deleteConfirm = (
        <Dialog
            open={confirmOpen}
            onClose={handleConfirmClose}
        >
            <DialogTitle
                id='confirm-dialog-title'
                aria-label='confirm-dialog-title'
            >
                Are you sure you want to delete your account?
            </DialogTitle>
            <DialogContent>
                <DialogContentText
                    id='confirm-dialog-text'
                    aria-label='confirm-dialog-text'
                >
                    Please confirm if you want to delete your account. This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleConfirmClose}
                >
                    Cancel
                </Button>
                <Button
                    variant='contained'
                    onClick={handleConfirmDelete}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );

    if (selectedUser) {
        return (
            <React.Fragment>
                {header}
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
                            defaultValue={selectedUser.username}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <Divider>
                            <Typography variant='h6'>Password</Typography>
                        </Divider>
                        <TextField
                            margin='normal'
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
                            defaultValue={selectedUser.email}
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
                            defaultValue={selectedUser.address}
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
                            defaultValue={selectedUser.phone}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <Divider />
                        <Button
                            id='deleteaccount'
                            aria-label='deleteaccount'
                            variant='contained'
                            color='error'
                            fullWidth
                            onClick={handleConfirmOpen}
                            sx={{
                                my: 2
                            }}
                        >
                            Delete Account
                        </Button>
                        <Divider />
                        <Box
                            sx={{
                                my: 2,
                                display: 'flex',
                                flexDirection: 'row'
                            }}
                        >
                            <Button
                                onClick={() => navigate('/')}
                                aria-label='back'
                            >
                                Back
                            </Button>
                            <Box sx={{flexGrow: '1'}} />
                            <Button
                                aria-label='submit'
                                variant='contained'
                                onClick={onSubmit}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Container>
                {deleteConfirm}
            </React.Fragment>
        );
    } else return <CircularProgress />
};

export default EditUser;