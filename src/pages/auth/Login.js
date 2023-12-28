import React from 'react'
import { Link, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import AuthSocial from '../../sections/auth/AuthSocial'
import LoginForm from '../../sections/auth/LoginForm'

const Login = () => {
    return (
        <>
            <Stack spacing={2} sx={{ mt: 5, position: "relative" }}>
                <Typography variant='h4'>Login to Tawk</Typography>
                <Stack direction={'row'} spacing={0.5}>
                    <Typography variant='body2'>New user?</Typography>
                    <Link to='/auth/register' component={RouterLink} variant='subtitle2'>
                        Create an account
                    </Link>
                </Stack>
                {/* Login Form */}
                <LoginForm />
                {/* Auth Social */}
                <AuthSocial />
            </Stack>
        </>
    )
}

export default Login
