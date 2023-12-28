import { Box, IconButton, Stack, Typography, useTheme } from '@mui/material'
import { ArrowLeft } from 'phosphor-react';
import React from 'react'
import { updateSidebarType } from '../redux/slices/app';
import { useDispatch } from 'react-redux';
import Message from './conversation/Message';

const StarredMessages = () => {
    const theme = useTheme();
    const dispatch = useDispatch()

    return (
        <Box sx={{ width: 320, height: '100vh' }}>
            <Stack sx={{ height: '100%' }}>
                {/* Header */}
                <Box
                    sx={{
                        boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
                        width: '100%',
                        backgroundColor: theme.palette.mode === 'light' ? "#F8FAFf" : theme.palette.background
                    }}
                >
                    <Stack
                        direction={'row'}
                        sx={{
                            height: '100%',
                            p: 2
                        }}
                        alignItems={'center'}
                        spacing={3}
                    >
                        <IconButton onClick={() => dispatch(updateSidebarType("CONTACT"))}>
                            <ArrowLeft />
                        </IconButton>
                        <Typography variant='subtitle2'>
                            Starred Messages
                        </Typography>
                    </Stack>
                </Box>

                {/* Body */}
                <Stack sx={{ height: '100%', position: 'relative', flexGrow: 1, overflowY: 'scroll' }} p={3} spacing={3}>
                    <Message menu={false} />
                </Stack>
            </Stack>
        </Box>
    )
}

export default StarredMessages
