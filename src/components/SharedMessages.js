import { Box, Grid, IconButton, Stack, Tab, Tabs, Typography, useTheme } from '@mui/material'
import { ArrowLeft } from 'phosphor-react';
import React from 'react'
import { updateSidebarType } from '../redux/slices/app';
import { useDispatch } from 'react-redux';
import { faker } from '@faker-js/faker';
import { SHARED_DOCS, SHARED_LINKS } from '../data';
import { DocMsg, LinkMsg } from './conversation/MsgTypes';

const SharedMessages = () => {
    const theme = useTheme();
    const dispatch = useDispatch()
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
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
                            Shared Messages
                        </Typography>
                    </Stack>
                </Box>

                <Tabs sx={{ px: 2, pt: 2 }} value={value} onChange={handleChange} centered>
                    <Tab label="Media" />
                    <Tab label="Links" />
                    <Tab label="Docs" />
                </Tabs>
                {/* Body */}
                <Stack sx={{ height: '100%', position: 'relative', flexGrow: 1, overflowY: 'scroll' }} p={3} spacing={value === 1 ? 1 : 3}>
                    {
                        (() => {
                            switch (value) {
                                case 0:
                                    // images
                                    return (
                                        <Grid container spacing={2}>
                                            {
                                                [0, 1, 2, 3, 4, 5, 6].map((el, idx) => {
                                                    return <Grid item xs={4} key={idx} >
                                                        <img src={faker.image.avatar()} alt={faker.name.fullName()} />
                                                    </Grid>
                                                })
                                            }
                                        </Grid>
                                    )
                                case 1:
                                    // links
                                    return SHARED_LINKS.map((el, idx) => <LinkMsg key={idx} menu={false} el={el} />)
                                case 2:
                                    // docs
                                    return SHARED_DOCS.map((el, idx) => <DocMsg key={idx} menu={false} el={el} />)

                                default:
                                    break;
                            }
                        })()
                    }
                </Stack>
            </Stack>
        </Box>
    )
}

export default SharedMessages
