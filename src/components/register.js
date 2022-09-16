import React, { useState } from 'react';
import { registerUser } from '../api';
import { Button, TextField } from '@mui/material';

const Register = ({ setToken, navigate }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            alert('Password Doesn\'t Match')
            return null
        }

        const results = await registerUser(username, password);
        if (results.success) {
            setToken(results.data.token)
            window.localStorage.setItem('token', results.data.token);
            navigate('/profile');
        } else {
            console.log(results.error.message)
        }
    }

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={(event) => {
                event.preventDefault();
                handleSubmit();
            }}>
                <TextField
                    style=
                    {{ margin: '1rem' }}
                    label='Enter Username'
                    onChange={(event) => setUsername(event.target.value)} />
                <TextField
                    type='password'
                    placeholder='Enter Password'
                    onChange={(event) => setPassword(event.target.value)} />
                <TextField
                    type='password'
                    placeholder='Confirm Password'
                    onChange={(event) => setConfirmPassword(event.target.value)} />
                <Button style=
                    {{
                        height: '3.5rem',
                        margin: '1rem'
                    }}
                    variant='contained'
                    type='submit'>
                    Submit
                </Button>
            </form>
        </>
    )
}

export default Register;