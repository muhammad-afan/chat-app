import { Box, Menu, MenuItem, Stack } from "@mui/material";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
    DocMsg,
    LinkMsg,
    MediaMsg,
    ReplyMsg,
    TextMsg,
    Timeline,
} from "./MsgTypes";
import { useDispatch, useSelector } from "react-redux";
import { deselectConversation } from "../../redux/slices/app";
import { Check, XSquare } from "phosphor-react";
import { socket } from "../../socket";
import {
    FetchCurrentAiMessages,
    FetchCurrentMessages,
    SetCurrentConversation,
} from "../../redux/slices/Conversation";

const AiMessage = ({ menu }) => {
    const dispatch = useDispatch();
    const messageEndRef = useRef(null);
    const chatContainerRef = useRef(null);
    const isFirstRender = useRef(true);

    const { conversations, current_ai_messages } = useSelector(
        (state) => state.conversation.direct_chat
    );

    const { ais } = useSelector((state) => state.app);
    console.log("🚀 ~ file: AiMessage.js:31 ~ AiMessage ~ ais:", ais)
    // console.log(
    //     "🚀 ~ file: Message.js:17 ~ Message ~ current_messages:",
    //     current_messages
    // );


    const { room_id } = useSelector((state) => state.app);


    // Todo => 
    useLayoutEffect(() => {
        // if (current_messages && current_messages[current_messages.length - 1].outgoing) {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        // }
        if (isFirstRender.current) {
            // Scroll to the bottom only on the initial render
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            isFirstRender.current = false;
        }
    }, [current_ai_messages]);

    useEffect(() => {
        socket.emit("get_ai_messages", { conversation_id: ais[0]?.id }, (data) => {
            // data => list of messages
            console.log(data, "List of messages 50");
            dispatch(FetchCurrentAiMessages({ messages: data }));
        });
        dispatch(SetCurrentConversation(ais[0]));
    }, []);



    // useEffect(() => {
    //     const current = conversations.find((el) => el?.id === room_id);
    //     console.log("🚀 ~ file: Message.js:60 ~ useEffect ~ current:", current)
    //     socket.emit("get_messages", { conversation_id: current?.id }, (data) => {
    //         // data => list of messages
    //         console.log(data, "List of messages 60");
    //         dispatch(FetchCurrentMessages({ messages: data }));
    //     });
    //     dispatch(SetCurrentConversation(current));
    // }, [room_id]);

    const [contextMenuPosition, setContextMenuPosition] = useState({
        x: 0,
        y: 0,
    });
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
        {
            label: "Close Chat",
            icon: <XSquare />,
            action: () => dispatch(deselectConversation()),
        },
        {
            label: "Select Messages",
            icon: <Check />,
            action: () => console.log("Item 2 clicked"),
        },
    ];

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === "Escape") {
                dispatch(deselectConversation());
            }
        };

        // Add the event listener when the component mounts
        document.addEventListener("keydown", handleKeyPress);

        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, []); // Empty dependency array ensures that the effect runs once when the component mounts

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    return (
        <div onContextMenu={handleContextMenu} ref={chatContainerRef} style={{ overflowY: "auto", height: '100%' }}>
            <Box p={3}>
                <Stack spacing={3}>
                    {current_ai_messages?.map((el, idx) => {
                        switch (el.type) {
                            case "divider":
                                // Timeline
                                return <Timeline el={el} key={idx} menu={menu} handleClick={handleClick} />
                            case "msg":
                                switch (el.subtype) {
                                    case "img":
                                        // Image message
                                        return <MediaMsg el={el} key={idx} menu={menu} handleClick={handleClick} />
                                    case "doc":
                                        // Document message
                                        return <DocMsg el={el} key={idx} menu={menu} handleClick={handleClick} />
                                    case "link":
                                        // Link message
                                        return <LinkMsg el={el} key={idx} menu={menu} handleClick={handleClick} />
                                    case "reply":
                                        // Reply message
                                        return <ReplyMsg el={el} key={idx} menu={menu} handleClick={handleClick} />
                                    default:
                                        // Text message
                                        return <TextMsg el={el} key={idx} menu={menu} handleClick={handleClick} />
                                }
                            default:
                                return <></>;
                        }
                    })}
                    <div ref={messageEndRef} style={{ visibility: 'hidden' }} />
                </Stack>
            </Box>
            <Menu
                open={contextMenuOpen}
                onClose={hideContextMenu}
                anchorReference="anchorPosition"
                anchorPosition={{
                    top: contextMenuPosition.y,
                    left: contextMenuPosition.x,
                }}
            >
                {menuItems.map((item, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => handleMenuItemClick(item.action)}
                    >
                        {item.icon && (
                            <span style={{ marginRight: "8px" }}>{item.icon}</span>
                        )}
                        {item.label}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default AiMessage;
