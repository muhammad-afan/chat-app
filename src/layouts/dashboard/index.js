import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket, socket } from "../../socket";
import { selectConversation, showSnackbar } from "../../redux/slices/app";
import { AddAiMessage, AddDirectConversation, AddDirectMessage, UpdateDirectConversation } from "../../redux/slices/Conversation";


const DashboardLayout = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { conversations, current_conversation } = useSelector(
    (state) => state.conversation.direct_chat
  );

  const playRequestAccepted = () => {
    const audio = new Audio('/audios/accept_request_sender.mp3');
    console.log("🚀 ~ file: index.js:20 ~ playNotificationSound ~ audio:", audio)
    audio.play();
  };

  const playNewfriendRequest = () => {
    const audio = new Audio('/audios/new_friend_request.mp3');
    console.log("🚀 ~ file: index.js:26 ~ playNotificationSound ~ audio:", audio)
    audio.play();
  }

  const playNewMessageSound = () => {
    const audio = new Audio('/audios/new_message.mp3');
    console.log("🚀 ~ file: index.js:32 ~ playNotificationSound ~ audio:", audio)
    audio.play();
  }

  const user_id = window.localStorage.getItem("user_id");
  useEffect(() => {
    if (isLoggedIn) {
      window.onload = function () {
        if (!window.location.hash) {
          window.location = window.location + "#loaded";
          window.location.reload();
        }
      };

      window.onload();

      if (!socket) {
        connectSocket(user_id);
      }

      // "new_friend_request"

      socket.on("new_friend_request", (data) => {
        dispatch(showSnackbar({ severity: "success", message: data.message }));
        if (data.playNotification) {
          playNewfriendRequest();
        }
      });

      socket.on("request_accepted", (data) => {
        dispatch(showSnackbar({ severity: "success", message: data.message }));
        if (data.playNotification) {
          playRequestAccepted();
        }
      });

      socket.on("request_sent", (data) => {
        dispatch(showSnackbar({ severity: "success", message: data.message }));
      });

      socket.on("new_message", (data) => {
        const message = data.message;
        console.log(current_conversation, data);
        // check if msg we got is from currently selected conversation
        if (current_conversation?.id === data.conversation_id) {
          dispatch(
            AddDirectMessage({
              id: message._id,
              type: "msg",
              subtype: message.type,
              message: message.text,
              incoming: message.to === user_id,
              outgoing: message.from === user_id,
            })
          );
        }
        dispatch(showSnackbar({ severity: "success", message: data.snackbarMessage }))
        if (data.playNotificationSound) {
          playNewMessageSound();
        }
      });

      socket.on("new_user_message", (data) => {
        const message = data.message;
        console.log("🚀 ~ file: index.js:96 ~ socket.on ~ message:", message)
        dispatch(AddAiMessage({
          id: data.lastMessageId,
          type: "msg",
          subtype: message.type,
          message: message.text,
          incoming: message.to === user_id,
          outgoing: message.from === user_id,
          time: message.created_at,
        }))
      });

      socket.on("new_ai_message", (data) => {
        const message = data.message;
        console.log("🚀 ~ file: index.js:102 ~ socket.on ~ message:", message);
        dispatch(AddAiMessage({
          id: data.lastAiMessageId,
          type: "msg",
          subtype: message.type,
          message: message.text,
          incoming: message.to === user_id,
          outgoing: message.from === user_id,
          time: message.created_at,
        }))
      })

      socket.on("start_chat", (data) => {
        // 
        console.log("🚀 ~ file: index.js:66 ~ socket.on ~ data:", data)
        const existing_conversation = conversations.find((el) => el.id === data._id);
        console.log("🚀 ~ file: index.js:88 ~ socket.on ~ existing_conversation:", existing_conversation)
        if (existing_conversation) {
          dispatch(UpdateDirectConversation({ conversation: data }));
        } else {
          // Add direction conversation
          console.log("else line 93: index.js")
          dispatch(AddDirectConversation({ conversation: data }));
        }
        dispatch(selectConversation({ room_id: data._id }))
      })
    }

    return () => {
      socket?.off("new_friend_request");
      socket?.off("request_accepted");
      socket?.off("request_sent");
      socket?.off("start_chat");
      socket?.off("new_message");
      socket?.off("new_user_message");
      socket?.off("new_ai_message");
    };
  }, [isLoggedIn, socket]);

  if (!isLoggedIn) {
    return <Navigate to={"/auth/login"} />;
  }

  return (
    <Stack direction={"row"} sx={{ overflow: "hidden" }}>
      {/* SideBar */}
      <SideBar />
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
