import {
    Box,
    Divider,
    IconButton,
    Link,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";
import React from "react";
import {
    Search,
    SearchIconWrapper,
    StyledInputBase,
} from "../../components/Search";
import { MagnifyingGlass, Plus } from "phosphor-react";
import { CallLogElement } from "../../components/CallElement";
import { CallList } from "../../data";
import StartCall from "../../sections/main/StartCall";
import { useState } from "react";
import NewScrollbar from "../../components/NewScrollbar";

const Call = () => {

    const theme = useTheme();
    const [openCall, setOpenCall] = useState(false)

    const handleCallClose = () => {
        setOpenCall(false)
    }
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
                    <Stack p={3} spacing={2} sx={{ maxHeight: "100vh" }}>
                        <Stack>
                            <Typography variant="h5">Call Log</Typography>
                        </Stack>
                        <Stack sx={{ width: "100%" }}>
                            <Search>
                                <SearchIconWrapper>
                                    <MagnifyingGlass color="#709CE6" />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search..."
                                    inputProps={{ "aria-label": "search" }}
                                />
                            </Search>
                        </Stack>
                        <Stack
                            direction={"row"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                        >
                            <Typography variant="subtitle2" component={Link}>
                                Start new Conversation
                            </Typography>
                            <IconButton onClick={() => setOpenCall(true)}>
                                <Plus style={{ color: theme.palette.primary.main }} />
                            </IconButton>
                        </Stack>
                        <Divider />
                        <Stack
                            sx={{
                                flexGrow: 1,
                                overflow: "hidden",
                                height: "100%",
                                // "&:hover": { overflowY: "scroll" },
                            }}
                            spacing={3}
                        >
                            <NewScrollbar>
                                <Stack spacing={2.5} sx={{ overflow: "hidden" }}>
                                    {/* Call logs */}
                                    {CallList.map((el, idx) => (
                                        <CallLogElement key={idx} {...el} />
                                    ))}
                                </Stack>
                            </NewScrollbar>
                        </Stack>
                    </Stack>
                </Box>
                {/* Right */}
                {/* //Todo => Reuse Conversation component  */}
            </Stack>
            {openCall && <StartCall open={openCall} handleClose={handleCallClose} />}
        </>

    );
};

export default Call;
