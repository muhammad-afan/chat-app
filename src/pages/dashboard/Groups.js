import React, { useState } from "react";
import { Box, Divider, IconButton, Link, Stack, Typography, useTheme } from "@mui/material";
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search';
import { MagnifyingGlass, Plus } from "phosphor-react";
import { ChatList } from "../../data";
import ChatElement from "../../components/ChatElements";
import CreateGroup from "../../sections/main/CreateGroup";
import NewScrollbar from "../../components/NewScrollbar";

const Groups = () => {

    const [openDialog, setOpenDialog] = useState(false);

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    const theme = useTheme();
    return (
        <>
            <Stack direction={"row"} sx={{ width: "100%" }}>
                {/* Left */}
                <Box
                    sx={{
                        height: "100vh",
                        backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                                ? "#F8FAFF"
                                : theme.palette.background,
                        width: 320,
                        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                    }}
                >
                    <Stack p={3} spacing={2} sx={{ maxHeight: '100vh' }}>
                        <Stack>
                            <Typography variant="h5">Groups</Typography>
                        </Stack>
                        <Stack sx={{ width: '100%' }}>
                            <Search>
                                <SearchIconWrapper>
                                    <MagnifyingGlass color="#709CE6" />
                                </SearchIconWrapper>
                                <StyledInputBase placeholder="Search..." inputProps={{ "aria-label": "search" }} />
                            </Search>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                            <Typography variant="subtitle2" component={Link}>Create new group</Typography>
                            <IconButton onClick={() => setOpenDialog(true)}>
                                <Plus style={{ color: theme.palette.primary.main }} />
                            </IconButton>
                        </Stack>
                        <Divider />
                        <Stack sx={{ flexGrow: 1, overflow: 'hidden', height: '100%' }} spacing={3}>
                            <NewScrollbar>
                                <Stack spacing={2.5}>
                                    <Typography variant='subtitle2' sx={{ color: '#676767' }}>Pinned</Typography>
                                    {ChatList.filter((el) => el.pinned).map((el, idx) => {
                                        return <ChatElement {...el} key={idx} />
                                    })}
                                    <Typography variant='subtitle2' sx={{ color: '#676767' }}>All Groups</Typography>
                                    {ChatList.filter((el) => !el.pinned).map((el, idx) => {
                                        return <ChatElement {...el} key={idx} />
                                    })}
                                </Stack>
                            </NewScrollbar>
                        </Stack>
                    </Stack>
                </Box>
                {/* Right */}
                {/* //Todo => Reuse Conversation component  */}
            </Stack>
            {openDialog && <CreateGroup open={openDialog} handleClose={handleCloseDialog} />}
        </>
    );
};

export default Groups;
