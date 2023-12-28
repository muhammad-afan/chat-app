import { Avatar, Badge, Box, Menu, MenuItem, Stack, Typography, alpha, styled, useTheme } from "@mui/material";
import StyledBadge from "./StyledBadge";
import { useDispatch, useSelector } from "react-redux";
import { SelectAiConversation, selectConversation } from "../redux/slices/app";
import { useEffect, useState } from "react";
import { Archive, Notification, PaintBrushHousehold, PushPin, SpeakerHigh, Trash } from "phosphor-react";
import { SetCurrentConversation } from "../redux/slices/Conversation";

const truncateText = (string, n) => {
    return string?.length > n ? `${string?.slice(0, n)}...` : string;
};

const StyledChatBox = styled(Box)(({ theme }) => ({
    "&:hover": {
        cursor: "pointer",
    },
}));

const ChatElement = ({ id, img, name, msg, time, unread, online, firstName, lastName, _id }) => {
    console.log("🚀 ~ file: ChatElements.js:20 ~ ChatElement ~ id:", id)
    const theme = useTheme();
    const dispatch = useDispatch();
    const { room_id, chat_type } = useSelector((state) => state.app);
    const selectedChatId = room_id?.toString();

    const { conversations, current_messages } = useSelector(
        (state) => state.conversation.direct_chat
    );

    const { ais } = useSelector((state) => state.app);
    console.log("🚀 ~ file: ChatElements.js:31 ~ ChatElement ~ ais:", ais)
    console.log("🚀 ~ file: ChatElements.js:27 ~ ChatElement ~ conversations:", conversations)

    useEffect(() => {
        if (chat_type === "individual") {
            const current = conversations.find((el) => el?.id === room_id);
            console.log("🚀 ~ file: ChatElements.js:32 ~ useEffect ~ current:", current)
        }
        else if (chat_type === "ai") {
            const current = ais[0];
            dispatch(SetCurrentConversation(current));
        }
    }, [room_id]);



    // const Currentonline = conversations.find((el) => el?.id === room_id);
    // useEffect(() => {
    //     dispatch(SetCurrentConversation(Currentonline));
    // }, [Currentonline.online])

    let isSelected = +selectedChatId === id;

    if (!selectedChatId) {
        isSelected = false;
    }

    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const [contextMenuOpen, setContextMenuOpen] = useState(false);

    const handleContextMenu = (event) => {
        event.preventDefault();

        const x = event.clientX;
        const y = event.clientY;

        setContextMenuPosition({ x, y });
        setContextMenuOpen(true);
    };

    const hideContextMenu = () => {
        setContextMenuOpen(false);
    };

    const handleMenuItemClick = (action) => {
        hideContextMenu();
        action();
    };
    const menuItems = [
        { label: "Mark as unread", icon: <Notification />, action: () => console.log("Item 1 clicked") },
        { label: "Pin to top", icon: <PushPin />, action: () => console.log("Item 2 clicked") },
        { label: "Mute", icon: <SpeakerHigh />, action: () => console.log("Item 3 clicked") },
        { label: "Archive", icon: <Archive />, action: () => console.log("Item 4 clicked") },
        { label: "Clear messages", icon: <PaintBrushHousehold />, action: () => console.log("Item 5 clicked") },
        { label: "Delete", icon: <Trash />, action: () => console.log("Item 6 clicked") },
    ];
    return (
        <div onContextMenu={handleContextMenu}>
            <StyledChatBox
                onClick={() => {
                    if (name === 'My Ai') dispatch(SelectAiConversation({ room_id: id }));
                    else dispatch(selectConversation({ room_id: id }));
                }}
                sx={{
                    width: "100%",
                    borderRadius: 1,
                    backgroundColor: room_id === id
                        ? theme.palette.mode === "light"
                            ? alpha(theme.palette.primary.main, 0.5)
                            : theme.palette.primary.main
                        : theme.palette.mode === "light"
                            ? "#fff"
                            : theme.palette.background.paper,
                }}
                p={2}
            >
                <Stack
                    direction="row"
                    alignItems={"center"}
                    justifyContent="space-between"
                >
                    <Stack direction="row" spacing={2}>
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
                            <Typography variant="caption">{truncateText(msg, 20)}</Typography>
                        </Stack>
                    </Stack>
                    <Stack spacing={2} alignItems={"center"}>
                        <Typography sx={{ fontWeight: 600 }} variant="caption">
                            {time}
                        </Typography>
                        <Badge
                            className="unread-count"
                            color="primary"
                            badgeContent={unread}
                        />
                    </Stack>
                </Stack>
            </StyledChatBox>
            <Menu
                open={contextMenuOpen}
                onClose={hideContextMenu}
                anchorReference="anchorPosition"
                anchorPosition={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}
            >
                {menuItems.map((item, index) => (
                    <MenuItem key={index} onClick={() => handleMenuItemClick(item.action)}>
                        {item.icon && <span style={{ marginRight: '8px' }}>{item.icon}</span>}
                        {item.label}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default ChatElement;
