import React from "react";
import Chats from "./Chats";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import Conversation from "../../components/conversation";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";
import NoChat from "../../assets/Illustration/NoChat";
import SharedMessages from "../../components/SharedMessages";
import StarredMessages from "../../components/StarredMessages";
import AiConversation from "../../components/conversation/AiConversation";

const GeneralApp = () => {
  const [searchParams] = useSearchParams();

  const { sideBar, room_id, chat_type } = useSelector((store) => store.app)
  const theme = useTheme();
  const handleContextMenu = (event) => {
    event.preventDefault();
  };

  return (
    <Stack direction={'row'} sx={{ width: '100%' }}>
      {/* Chats */}
      <Chats />
      <Box
        sx={{
          height: "100%",
          width: sideBar.open
            ? `calc(100vw - 740px )`
            : "calc(100vw - 420px )",
          backgroundColor:
            theme.palette.mode === "light"
              ? "#FFF"
              : theme.palette.background.paper,
          borderBottom:
            searchParams.get("type") === "individual-chat" &&
              searchParams.get("id")
              ? "0px"
              : "6px solid #0162C4",
        }}
      >
        {/* Conversation */}
        {chat_type === "individual" &&
          room_id !== null ? (
          <Conversation />
        ) :
          chat_type === "ai" &&
            room_id !== null ? (
            <AiConversation />
          ) : (
            <Stack
              spacing={2}
              sx={{ height: "100%", width: "100%" }}
              alignItems="center"
              justifyContent={"center"}
              onContextMenu={handleContextMenu}
            >
              <NoChat />
              <Typography variant="subtitle2">
                Select a conversation or start a{" "}
                <Link
                  style={{
                    color: theme.palette.primary.main,
                    textDecoration: "none",
                  }}
                  to="/"
                >
                  new one
                </Link>
              </Typography>
            </Stack>
          )}
      </Box>
      {/* Contact */}
      {sideBar.open && (() => {
        switch (sideBar.type) {
          case "CONTACT":
            return <Contact />
          case "STARRED":
            return <StarredMessages />
          case "SHARED":
            return <SharedMessages />
          default:
            break;
        }
      })()}
    </Stack>
  );
};

export default GeneralApp;
