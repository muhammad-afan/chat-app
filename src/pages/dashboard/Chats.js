import {
    Box,
    Button,
    Divider,
    IconButton,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";
import {
    ArchiveBox,
    CircleDashed,
    MagnifyingGlass,
    Users,
} from "phosphor-react";
import React, { useEffect, useState } from "react";
import {
    Search,
    SearchIconWrapper,
    StyledInputBase,
} from "../../components/Search";
import ChatElement from "../../components/ChatElements";
import Friends from "../../sections/main/Friends";
import { socket } from "../../socket";
import NewScrollbar from "../../components/NewScrollbar";
import { useDispatch, useSelector } from "react-redux";
import { FetchDirectConversation } from "../../redux/slices/Conversation";
import { FetchAis, SelectAiConversation } from "../../redux/slices/app";


const user_id = window.localStorage.getItem("user_id");

const Chats = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const dispatch = useDispatch();
    const [value, setValue] = useState('');
    const theme = useTheme();
    const { ais } = useSelector((state) => state.app);
    console.log("🚀 ~ file: Chats.js:39 ~ ais:", ais)
    const { conversations, current_messages } = useSelector((state) => state.conversation.direct_chat);
    console.log("🚀 ~ file: Chats.js:37 ~ conversations:", conversations)
    console.log("🚀 ~ file: Chats.js:37 ~ current_messages:", current_messages)

    // useEffect(() => {
    //     socket.emit("get_direct_conversations", { user_id }, (data) => {
    //         console.log("🚀 ~ file: Chats.js:39 ~ socket.emit ~ data:", data)
    //         // data => list of conversation
    //         dispatch(FetchDirectConversation({ conversations: data }));
    //     })
    // }, []);



    console.log("line 54 chats.js => ais", ais);
    const fetchData = () => {
        console.log("hello 2 line 48: chats.js")
        socket.emit("get_direct_conversations", { user_id }, (data) => {
            console.log("🚀 ~ file: Chats.js:39 ~ socket.emit ~ data:", data)
            // data => list of conversation
            dispatch(FetchDirectConversation({ conversations: data }));
        })
    };

    useEffect(() => {
        // This block will run on the initial mount
        console.log("hello line 57: chats.js")
        fetchData();
        dispatch(FetchAis());
    }, []); // Empty dependency array means it runs once on mount

    useEffect(() => {
        fetchData();
    }, [current_messages]);

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    return (
        <>
            <Box
                sx={{
                    position: "relative",
                    width: 320,
                    backgroundColor:
                        theme.palette.mode === "light"
                            ? "#F8FAFF"
                            : theme.palette.background.default,
                    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                }}
            >
                <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
                    <Stack
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <Typography variant="h5">Chats</Typography>
                        <Stack direction={"row"} alignItems={"center"} spacing={1}>
                            <IconButton
                                onClick={() => {
                                    handleOpenDialog();
                                }}
                            >
                                <Users />
                            </IconButton>
                            <IconButton>
                                <CircleDashed />
                            </IconButton>
                        </Stack>
                    </Stack>
                    <Stack sx={{ width: "100%" }}>
                        <Search>
                            <SearchIconWrapper>
                                <MagnifyingGlass color="#709CE6" />
                            </SearchIconWrapper>
                            <StyledInputBase
                                value={value}
                                onChange={handleChange}
                                placeholder="Search..."
                                inputProps={{ "aria-label": "search" }}
                            />
                        </Search>
                    </Stack>
                    <Stack spacing={1}>
                        <Stack direction={"row"} alignItems={"center"} spacing={1.5}>
                            <ArchiveBox size={24} />
                            <Button>Archive</Button>
                        </Stack>
                        <Divider />
                    </Stack>
                    <Stack
                        direction={"column"}
                        sx={{
                            flexGrow: 1,
                            overflow: "hidden",
                            height: "100%",
                        }}
                        spacing={2}
                    >
                        <NewScrollbar>
                            <Stack spacing={2.4}>
                                {/* <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                                    Pinned
                                </Typography>
                                {ChatList.filter((el) => el.pinned).map((el) => {
                                    return <ChatElement {...el} />;
                                })} */}
                                <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                                    Automated Chat
                                </Typography>
                                {ais.map((ai, idx) => {
                                    return <ChatElement {...ai} key={idx} />
                                })}
                                <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                                    All Chats
                                </Typography>
                                {!value && conversations.filter((el) => !el.pinned).map((el, idx) => {
                                    console.log("🚀 ~ file: Chats.js:122 ~ {conversations.filter ~ el:", el)
                                    return <ChatElement {...el} key={idx} />;
                                })}
                                {value && conversations.filter((el) => el.name.toLowerCase().includes(value.toLowerCase())).map((el, idx) => {
                                    console.log("🚀 ~ file: Chats.js:122 ~ {conversations.filter ~ el:", el)
                                    return <ChatElement {...el} key={idx} />;
                                })}
                            </Stack>
                        </NewScrollbar>
                    </Stack>
                </Stack>
            </Box>
            {openDialog && (
                <Friends open={openDialog} handleClose={handleCloseDialog} />
            )}
        </>
    );
};

export default Chats;
