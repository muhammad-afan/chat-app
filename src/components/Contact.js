import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Slide, Stack, Typography, useTheme } from '@mui/material'
import { Bell, CaretRight, Phone, Prohibit, Star, Trash, VideoCamera, X } from 'phosphor-react';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { toggleSidebar, updateSidebarType } from '../redux/slices/app';
import { faker } from '@faker-js/faker';
import AntSwitch from './AntSwitch'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BlockDialoge = ({ open, handleClose }) => {
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>Block this contact</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Are you sure you want to block this Contact?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}

const DeleteDialoge = ({ open, handleClose }) => {
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>Delete this chat</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Are you sure you want to delete this chat?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}

const Contact = () => {

    const theme = useTheme();
    const dispatch = useDispatch();

    const [openBlock, setOpenBlock] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const handleCloseBlock = () => {
        setOpenBlock(false)
    }

    const handleCloseDelete = () => {
        setOpenDelete(false)
    }

    return (
        <Box sx={{ width: 320, height: '100vh' }}>
            <Stack sx={{ height: '100%' }}>
                {/* header */}
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
                        justifyContent={'space-between'}
                        spacing={3}
                    >
                        <Typography variant='subtitle2'>Contact Info</Typography>
                        <IconButton onClick={() => { dispatch(toggleSidebar()) }}>
                            <X />
                        </IconButton>
                    </Stack>
                </Box>

                {/* Body */}

                <Stack sx={{ height: '100%', position: 'relative', flexGrow: 1, overflowY: 'scroll' }} p={3} spacing={3}>
                    <Stack direction={'row'} alignItems={'center'} spacing={2}>
                        <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} sx={{ height: 64, width: 64 }} />
                        <Stack spacing={0.5}>
                            <Typography variant='article' fontWeight={600}>
                                {faker.name.fullName()}
                            </Typography>
                            <Typography variant='body2' fontWeight={500}>
                                {'+92 346 8090828'}
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-evenly'}>
                        <Stack spacing={1} alignItems={'center'}>
                            <IconButton>
                                <Phone />
                            </IconButton>
                            <Typography variant='overline'>Voice</Typography>
                        </Stack>
                        <Stack spacing={1} alignItems={'center'}>
                            <IconButton>
                                <VideoCamera />
                            </IconButton>
                            <Typography variant='overline'>Video</Typography>
                        </Stack>
                    </Stack>
                    <Divider />
                    <Stack spacing={0.5}>
                        <Typography variant='article'>About</Typography>
                        <Typography variant='body2'>Introvert until vibe matches 😎</Typography>
                    </Stack>
                    <Divider />
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography variant='subtitle'>Media, Links & Docs</Typography>
                        <Button endIcon={<CaretRight />} onClick={() => {
                            dispatch(updateSidebarType("SHARED"))
                        }}>
                            401
                        </Button>
                    </Stack>
                    <Stack direction={'row'} spacing={2} alignItems={'center'}>
                        {[1, 2, 3].map((el, idx) => (
                            <Box key={idx}>
                                <img src={faker.image.food()} alt={faker.name.fullName()} />
                            </Box>
                        ))}
                    </Stack>
                    <Divider />
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                        <Stack direction={'row'} alignItems={'center'} spacing={2}>
                            <Star size={21} />
                            <Typography variant='subtitle2'>Starred Messages</Typography>
                        </Stack>
                        <IconButton onClick={() => {
                            dispatch(updateSidebarType("STARRED"))
                        }}>
                            <CaretRight />
                        </IconButton>
                    </Stack>
                    <Divider />
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                        <Stack direction={'row'} alignItems={'center'} spacing={2}>
                            <Bell size={21} />
                            <Typography variant='subtitle2'>Mute Notifications</Typography>
                        </Stack>
                        <AntSwitch />
                    </Stack>
                    <Divider />
                    <Typography>1 group in common</Typography>
                    <Stack direction={'row'} spacing={2} alignItems={'center'}>
                        <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} />
                        <Stack spacing={0.5}>
                            <Typography variant='subtitle2'>Coding Monk</Typography>
                            <Typography variant='caption'>Owl, Parrot, Rabbit, You</Typography>
                        </Stack>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} spacing={2}>
                        <Button onClick={() => setOpenBlock(true)} fullWidth variant='outlined' startIcon={<Prohibit />}>
                            Block
                        </Button>
                        <Button onClick={() => setOpenDelete(true)} fullWidth variant='outlined' startIcon={<Trash />}>
                            Delete
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
            {openBlock && <BlockDialoge open={openBlock} handleClose={handleCloseBlock} />}
            {openDelete && <DeleteDialoge open={openDelete} handleClose={handleCloseDelete} />}
        </Box>
    )
}

export default Contact
