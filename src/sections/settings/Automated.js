import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, Stack, Typography } from '@mui/material';
import React, { useState } from 'react'
import AntSwitch from '../../components/AntSwitch';
import { useDispatch, useSelector } from 'react-redux';
import { ToggleAutoResponse } from '../../redux/slices/app';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Automated = ({ open, handleClose }) => {
    const dispatch = useDispatch();
    const { autoResponses } = useSelector((state) => state.app);
    console.log("🚀 ~ file: Automated.js:14 ~ Automated ~ autoResponses:", autoResponses)

    const handleSwitchChange = () => {
        dispatch(ToggleAutoResponse({ isChecked: autoResponses }));
    };
    return (
        <>
            <Dialog
                fullWidth
                maxWidth="xs"
                open={open}
                sx={{ p: 2 }}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
            >
                <DialogTitle>Automated Responses</DialogTitle>
                <DialogContent sx={{ mt: 4 }}>
                    <Stack alignItems={'center'} justifyContent={'space-between'} flexDirection={'row'}>
                        <Typography variant='body2'>Turn {autoResponses ? "Off" : "On"} Automated Responses</Typography>
                        <AntSwitch checked={autoResponses} onChange={handleSwitchChange} />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose}>OK</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Automated
