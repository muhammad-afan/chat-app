import React from 'react'
import { Link, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { CaretLeft } from 'phosphor-react'
import NewPasswordForm from '../../sections/auth/NewPasswordForm'

const NewPassword = () => {
    return (
        <>
            <Stack spacing={2} sx={{ mt: 5, position: "relative", mb: 5 }}>
                <Typography variant='h3' paragraph>Reset Password</Typography>
                <Typography sx={{ color: "text.secondary", mb: 5 }}>
                    Please set your new password
                </Typography>
            </Stack>
            {/* New Password Form */}
            <NewPasswordForm />
            <Link
                component={RouterLink}
                to={"/auth/login"}
                color={"inherit"}
                variant="subtitle2"
                sx={{
                    mt: 3,
                    mx: "auto",
                    alignItems: "center",
                    display: "inline-flex",
                }}
            >
                <CaretLeft />
                Return to Sign in
            </Link>
        </>
    )
}

export default NewPassword
