import React from 'react'
import { Stack, Typography } from '@mui/material'
import VerifyForm from '../../sections/auth/VerifyForm'
import { useSelector } from 'react-redux'

const Verify = () => {
    const { email } = useSelector((state) => state.auth);
    return (
        <>
            <Stack spacing={2} sx={{ mt: 5, position: "relative", mb: 5 }}>
                <Typography variant='h4'>
                    Please verify OTP
                </Typography>
                <Stack direction={'row'} spacing={0.5}>
                    <Typography variant='body2'>
                        Sent to email ({email})
                    </Typography>
                </Stack>
            </Stack>
            {/* Verify Form */}
            <VerifyForm />
        </>
    )
}

export default Verify
