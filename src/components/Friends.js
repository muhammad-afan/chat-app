import { Avatar, Box, Button, IconButton, Stack, Typography, styled, useTheme } from '@mui/material';
import React from 'react'
import { socket } from '../socket';
import { Chat } from 'phosphor-react';
import StyledBadge from './StyledBadge';

const user_id = window.localStorage.getItem("user_id");

const StyledChatBox = styled(Box)(({ theme }) => ({
    "&:hover": {
        cursor: "pointer",
    },
}));


const UserElement = ({ img, firstName, lastName, online, _id }) => {
    console.log("🚀 ~ file: Friends.js:17 ~ UserElement ~ _id:", _id)
    const theme = useTheme();

    const name = `${firstName} ${lastName}`;

    return (
        <StyledChatBox
            sx={{
                width: "100%",

                borderRadius: 1,

                backgroundColor: theme.palette.background.paper,
            }}
            p={2}
        >
            <Stack
                direction="row"
                alignItems={"center"}
                justifyContent="space-between"
            >
                <Stack direction="row" alignItems={"center"} spacing={2}>
                    {" "}
                    {online ? (
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            variant="dot"
                        >
                            <Avatar alt={name} src={img} />
                        </StyledBadge>
                    ) : (
                        <Avatar alt={name} src={img} />
                    )}
                    <Stack spacing={0.3}>
                        <Typography variant="subtitle2">{name}</Typography>
                    </Stack>
                </Stack>
                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                    <Button
                        onClick={() => {
                            socket.emit("friend_request", { to: _id, from: user_id }, () => {
                                alert("request sent");
                            });
                            console.log("🚀 ~ file: Friends.js:60 ~ socket.emit ~ _id:", _id)
                        }}
                    >
                        Send Request
                    </Button>
                </Stack>
            </Stack>
        </StyledChatBox>
    );
};

const FriendRequestElement = ({
    img,
    firstName,
    lastName,
    incoming,
    missed,
    online,
    id,
}) => {
    const theme = useTheme();
    
    const name = `${firstName} ${lastName}`;

    return (
        <StyledChatBox
            sx={{
                width: "100%",

                borderRadius: 1,

                backgroundColor: theme.palette.background.paper,
            }}
            p={2}
        >
            <Stack
                direction="row"
                alignItems={"center"}
                justifyContent="space-between"
            >
                <Stack direction="row" alignItems={"center"} spacing={2}>
                    {" "}
                    {online ? (
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            variant="dot"
                        >
                            <Avatar alt={name} src={img} />
                        </StyledBadge>
                    ) : (
                        <Avatar alt={name} src={img} />
                    )}
                    <Stack spacing={0.3}>
                        <Typography variant="subtitle2">{name}</Typography>
                    </Stack>
                </Stack>
                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                    <Button
                        onClick={() => {
                            //  emit "accept_request" event
                            socket.emit("accept_request", { request_id: id });
                        }}
                    >
                        Accept Request
                    </Button>
                </Stack>
            </Stack>
        </StyledChatBox>
    );
};

// FriendElement

const FriendElement = ({
    img,
    firstName,
    lastName,
    incoming,
    missed,
    online,
    _id,
}) => {
    console.log("🚀 ~ file: Friends.js:142 ~ _id:", _id)
    const theme = useTheme();

    const name = `${firstName} ${lastName}`;

    return (
        <StyledChatBox
            sx={{
                width: "100%",

                borderRadius: 1,

                backgroundColor: theme.palette.background.paper,
            }}
            p={2}
        >
            <Stack
                direction="row"
                alignItems={"center"}
                justifyContent="space-between"
            >
                <Stack direction="row" alignItems={"center"} spacing={2}>
                    {" "}
                    {online ? (
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            variant="dot"
                        >
                            <Avatar alt={name} src={img} />
                        </StyledBadge>
                    ) : (
                        <Avatar alt={name} src={img} />
                    )}
                    <Stack spacing={0.3}>
                        <Typography variant="subtitle2">{name}</Typography>
                    </Stack>
                </Stack>
                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                    <IconButton
                        onClick={() => {
                            // start a new conversation
                            socket.emit("start_conversation", { to: _id, from: user_id });
                            console.log("🚀 ~ file: Friends.js:187 ~ _id:", _id)
                        }}
                    >
                        <Chat />
                    </IconButton>
                </Stack>
            </Stack>
        </StyledChatBox>
    );
};


export { UserElement, FriendRequestElement, FriendElement };
