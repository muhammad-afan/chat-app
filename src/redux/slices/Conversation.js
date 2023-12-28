import { faker } from "@faker-js/faker";
import { createSlice } from "@reduxjs/toolkit";
import { getMessageTime } from "../../utils/formatedTime";
import ReactMarkdown from 'react-markdown'
import { renderToString } from 'react-dom/server';

const user_id = window.localStorage.getItem("user_id");

const initialState = {
    direct_chat: {
        conversations: [],
        current_conversation: null,
        current_messages: null,
        current_ai_messages: null,
    },
    group_chat: {},
};

const slice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        fetchDirectConversation(state, action) {
            console.log("line 24 action.payload", action.payload.conversations);
            const list = action.payload.conversations.map((el) => {
                const this_user = el.participants.find(
                    (elm) => elm._id.toString() !== user_id
                );
                let lastMessage, formattedTime;
                if (el.messages.length !== 0) {
                    lastMessage = el.messages[el.messages.length - 1];
                    console.log("🚀 ~ file: Conversation.js:25 ~ list ~ lastMessage:", lastMessage)
                    const date = lastMessage.created_at;
                    console.log("after date", date)
                    const messageDate = new Date(date.toString());
                    console.log("line 33: ", messageDate)
                    formattedTime = getMessageTime(messageDate);
                    lastMessage = lastMessage.text;
                    console.log("🚀 ~ file: Conversation.js:32 ~ list ~ formattedTime:", formattedTime)
                }
                else {
                    lastMessage = 'Send a message to start conversation';
                    formattedTime = '';
                }
                return {
                    id: el._id,
                    user_id: this_user._id,
                    name: `${this_user.firstName} ${this_user.lastName}`,
                    online: this_user.status === "Online",
                    img: faker.image.avatar(),
                    msg: lastMessage,
                    time: formattedTime,
                    unread: 0,
                    pinned: false,
                    autoResponses: el.autoResponses,
                };
            });
            state.direct_chat.conversations = list;
        },
        updateDirectConversation(state, action) {
            const this_conversation = action.payload.conversation;
            console.log("🚀 ~ file: Conversation.js:61 ~ updateDirectConversation ~ this_conversation:", this_conversation)
            state.direct_chat.conversations = state.direct_chat.conversations.map((el) => {
                if (el.id !== this_conversation._id) {
                    return el;
                } else {
                    const this_user = el.participants.find(
                        (elm) => elm._id.toString() !== user_id
                    );
                    let lastMessage, formattedTime;
                    if (el.messages.length !== 0) {
                        lastMessage = el.messages[el.messages.length - 1];
                        const messageDate = new Date(lastMessage.created_at);
                        lastMessage = lastMessage.text;
                        formattedTime = getMessageTime(messageDate);
                    }
                    else {
                        lastMessage = '';
                        formattedTime = '';
                    }
                    return {
                        id: this_conversation._id,
                        user_id: this_user._id,
                        name: `${this_user.firstName} ${this_user.lastName}`,
                        online: this_user.status === "Online",
                        img: faker.image.avatar(),
                        msg: lastMessage,
                        time: formattedTime,
                        unread: 0,
                        pinned: false,
                        autoResponses: this_conversation.autoResponses,
                    };
                }
            });
        },
        addDirectConversation(state, action) {
            const this_conversation = action.payload.conversation;
            console.log("🚀 ~ file: Conversation.js:96 ~ addDirectConversation ~ this_conversation:", this_conversation)
            const this_user = this_conversation.participants.find(
                (elm) => elm._id.toString() !== user_id.toString()
            );
            console.log("🚀 ~ file: Conversation.js:100 ~ addDirectConversation ~ this_user:", this_user)
            console.log({ this_user }, "hello");
            let lastMessage, formattedTime;
            if (this_conversation.messages.length !== 0) {
                lastMessage = this_conversation.messages[this_conversation.messages.length - 1];
                const messageDate = new Date(lastMessage.created_at);
                lastMessage = lastMessage.text;
                formattedTime = getMessageTime(messageDate);
            }
            else {
                lastMessage = '';
                formattedTime = '';
            }
            state.direct_chat.conversations.push({
                id: this_conversation._id,
                user_id: this_user._id,
                name: `${this_user.firstName} ${this_user.lastName}`,
                online: this_user.status === "Online",
                img: faker.image.avatar(),
                msg: lastMessage,
                time: formattedTime,
                unread: 0,
                pinned: false,
                autoResponses: this_conversation.autoResponses,
            });
        },
        setCurrentConversation(state, action) {
            console.log("line 81 : ", action.payload);
            state.direct_chat.current_conversation = action.payload;
        },
        fetchCurrentMessages(state, action) {
            const messages = action.payload.messages;
            const formatted_messages = messages.map((el) => ({
                id: el._id,
                type: "msg",
                subtype: el.type,
                message: el.text,
                incoming: el.to === user_id,
                outgoing: el.from === user_id,
                time: el.created_at,
            }));
            state.direct_chat.current_messages = formatted_messages;
        },
        fetchCurrentAiMessages(state, action) {
            console.log("action.payload.messages", action.payload.messages)
            const messages = action.payload.messages;
            const formatted_messages = messages.map((el) => {
                return {
                    id: el._id,
                    type: "msg",
                    subtype: el.type,
                    message: el.text,
                    incoming: el.to === user_id,
                    outgoing: el.from === user_id,
                    time: el.created_at,
                }
            });
            state.direct_chat.current_ai_messages = formatted_messages;
        },
        addDirectMessage(state, action) {
            state.direct_chat.current_messages.push(action.payload.message);
        },
        addAiMessage(state, action) {
            state.direct_chat.current_ai_messages.push(action.payload.message);
        },
        deselectConversations(state, action) {
            state.direct_chat.current_conversation = null;
            state.direct_chat.current_messages = null;
            state.direct_chat.current_ai_messages = null;
        }
    },
});

export default slice.reducer;
export const { deselectConversations } = slice.actions;

export const FetchDirectConversation = ({ conversations }) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.fetchDirectConversation({ conversations }));
    };
};

export const UpdateDirectConversation = ({ conversation }) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.updateDirectConversation({ conversation }));
    };
};

export const AddDirectConversation = ({ conversation }) => {
    console.log("🚀 ~ file: Conversation.js:135 ~ AddDirectConversation ~ conversation:", conversation)
    return async (dispatch, getState) => {
        console.log("line 137: conversations.js")
        dispatch(slice.actions.addDirectConversation({ conversation }));
    };
};

export const SetCurrentConversation = (current_conversation) => {
    console.log("🚀 ~ file: Conversation.js:122 ~ SetCurrentConversation ~ current_conversation:", current_conversation)
    return async (dispatch, getState) => {
        dispatch(slice.actions.setCurrentConversation(current_conversation));
    };
};

export const FetchCurrentMessages = ({ messages }) => {
    console.log("Fetching...")
    return async (dispatch, getState) => {
        dispatch(slice.actions.fetchCurrentMessages({ messages }));
    };
};

export const FetchCurrentAiMessages = ({ messages }) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.fetchCurrentAiMessages({ messages }));
    };
}

export const AddDirectMessage = (message) => {
    console.log("Adding...")
    return async (dispatch, getState) => {
        dispatch(slice.actions.addDirectMessage({ message }));
    };
};

export const AddAiMessage = (message) => {
    console.log("Adding ai messages...");
    return async (dispatch, getState) => {
        dispatch(slice.actions.addAiMessage({ message }));
    };
};
