import React from "react";
import { faker } from "@faker-js/faker";
import {
    Avatar,
    Box,
    Divider,
    IconButton,
    Menu,
    Fade,
    Stack,
    Typography,
    useTheme,
    MenuItem,
} from "@mui/material";
import { CaretDown, MagnifyingGlass, Phone, VideoCamera } from "phosphor-react";
import StyledBadge from "../StyledBadge";
import { toggleSidebar } from "../../redux/slices/app";
import { useDispatch, useSelector } from "react-redux";
import useResponsive from "../../hooks/useResponsive";

const Header = () => {
    const dispatch = useDispatch();
    const isMobile = useResponsive("between", "md", "xs", "sm");
    const theme = useTheme();

    const { current_conversation, conversations } = useSelector(
        (state) => state.conversation.direct_chat
    );
    const { ais, chat_type } = useSelector((state) => state.app);
    console.log("🚀 ~ file: Header.js:30 ~ Header ~ ais:", ais)

    console.log(
        "🚀 ~ file: Header.js:16 ~ Header ~ current_conversation:",
        current_conversation
    );
    console.log(
        "🚀 ~ file: Header.js:16 ~ Header ~ conversations:",
        conversations
    );

    if (chat_type === "ai") {
        console.log("ais[0].image", ais[0].img)
    }

    const [conversationMenuAnchorEl, setConversationMenuAnchorEl] =
        React.useState(null);
    const openConversationMenu = Boolean(conversationMenuAnchorEl);
    const handleClickConversationMenu = (event) => {
        setConversationMenuAnchorEl(event.currentTarget);
    };
    const handleCloseConversationMenu = () => {
        setConversationMenuAnchorEl(null);
    };
    const Conversation_Menu = [
        {
            title: "Contact info",
        },
        {
            title: "Mute notifications",
        },
        {
            title: "Clear messages",
        },
        {
            title: "Delete chat",
        },
    ];
    return (
        <Box
            p={2}
            sx={{
                width: "100%",
                backgroundColor:
                    theme.palette.mode === "light"
                        ? "#F8FAFF"
                        : theme.palette.background.default,
                boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            }}
        >
            <Stack
                alignItems={"center"}
                direction={"row"}
                justifyContent={"space-between"}
                sx={{ width: "100%", height: "100%" }}
            >
                <Stack
                    direction={"row"}
                    spacing={2}
                    onClick={() => {
                        dispatch(toggleSidebar());
                    }}
                >
                    <Box>
                        {current_conversation?.online ? (
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                variant="dot"
                            >
                                <Avatar
                                    src={chat_type === "ai" ? ais[0].img : faker.image.avatar()}
                                    alt={faker.name.fullName()}
                                />
                            </StyledBadge>
                        ) : (
                            <Avatar src={chat_type === "ai" ? ais[0].img : faker.image.avatar()} alt={faker.name.fullName()} />
                        )}
                    </Box>
                    <Stack spacing={0.2}>
                        <Typography variant="subtitle2">
                            {current_conversation?.name}
                        </Typography>
                        <Typography variant="caption">Online</Typography>
                    </Stack>
                </Stack>
                <Stack direction={"row"} alignItems={"center"} spacing={3}>
                    <IconButton>
                        <VideoCamera />
                    </IconButton>
                    <IconButton>
                        <Phone />
                    </IconButton>
                    <IconButton>
                        <MagnifyingGlass />
                    </IconButton>
                    <Divider orientation="vertical" flexItem />
                    <IconButton
                        id="conversation-positioned-button"
                        aria-controls={
                            openConversationMenu ? "conversation-positioned-menu" : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={openConversationMenu ? "true" : undefined}
                        onClick={handleClickConversationMenu}
                    >
                        <CaretDown />
                    </IconButton>
                    <Menu
                        MenuListProps={{
                            "aria-labelledby": "fade-button",
                        }}
                        TransitionComponent={Fade}
                        id="conversation-positioned-menu"
                        aria-labelledby="conversation-positioned-button"
                        anchorEl={conversationMenuAnchorEl}
                        open={openConversationMenu}
                        onClose={handleCloseConversationMenu}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                    >
                        <Box p={1}>
                            <Stack spacing={1}>
                                {Conversation_Menu.map((el, idx) => (
                                    <MenuItem onClick={handleCloseConversationMenu} key={idx}>
                                        <Stack
                                            sx={{ minWidth: 100 }}
                                            direction="row"
                                            alignItems={"center"}
                                            justifyContent="space-between"
                                        >
                                            <span>{el.title}</span>
                                        </Stack>{" "}
                                    </MenuItem>
                                ))}
                            </Stack>
                        </Box>
                    </Menu>
                </Stack>
            </Stack>
        </Box>
    );
};

export default Header;
