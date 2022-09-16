import React, { useState } from 'react';
import { loginUser } from '../api';
import { Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import './register';

const Login = ({ setToken, navigate }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        const results = await loginUser(username, password);
        if (results.success) {
            setToken(results.data.token)
            window.localStorage.setItem('token', results.data.token);
            navigate('/profile');
        } else {
            console.log(results.error.message)
        }
    };

    return (
        <form className='login'
            onSubmit={(event) => {
                event.preventDefault();
                handleSubmit();
            }}>
            <h1>Login</h1>
            <TextField
                style={{ margin: '1rem' }}
                label='Enter Username'
                onChange={(event) => setUsername(event.target.value)}
            />
            <TextField
                style={{ margin: '1rem' }}
                label='Enter Password'
                onChange={(event) => setPassword(event.target.value)}
            />
            <Button
                style={{
                    height: '3.5rem',
                    margin: '1rem'
                }}
                variant='contained'
                type='submit'>
                Login
            </Button>
            <Button
                style={{
                    height: '3rem',
                    margin: '1rem'
                }}
                variant='text'
                type='submit'>
                <Link
                    style={{ textDecoration: 'none' }}
                    to='/register'>Register
                </Link>
            </Button>
        </form>
    )
}

export default Login;