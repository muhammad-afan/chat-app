import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { deselectConversations } from "./Conversation";
import { faker } from "@faker-js/faker";

const initialState = {
    sideBar: {
        open: false,
        type: "CONTACT", // can be CONTACT, STARRED, SHARED
    },
    snackbar: {
        open: null,
        severity: null,
        message: null,
    },
    users: [],
    ais: [],
    friends: [],
    friendRequests: [],
    chat_type: null,
    room_id: null,
    autoResponses: false,
};

const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
        // Toggle sidebar
        toggleSidebar(state, action) {
            state.sideBar.open = !state.sideBar.open;
        },
        toggleAutoResponse(state, action) {
            state.autoResponses = !action.payload.isChecked;
        },
        updateSidebarType(state, action) {
            state.sideBar.type = action.payload.type;
        },
        selectConversation(state, action) {
            console.log("action.payload : ", action.payload);
            state.chat_type = "individual";
            state.room_id = action.payload.room_id;
        },
        selectAiConversation(state, action) {
            state.chat_type = "ai";
            state.room_id = action.payload.room_id;
        },
        openSnackBar(state, action) {
            console.log(action.payload);
            state.snackbar.open = true;
            state.snackbar.severity = action.payload.severity;
            state.snackbar.message = action.payload.message;
        },
        closeSnackBar(state) {
            console.log("This is getting executed");
            state.snackbar.open = false;
            state.snackbar.message = null;
        },
        updateUsers(state, action) {
            state.users = action.payload.users;
        },
        updateAis(state, action) {
            console.log("action.payload line 59: app.js", action.payload);
            const conversation_id = action.payload.ais._id;
            console.log(
                "🚀 ~ file: app.js:60 ~ updateAis ~ conversation_id:",
                conversation_id
            );
            console.log("line 61: app.js ", action.payload.ais);
            const list = action.payload.ais.participants.map((el) => {
                return {
                    id: conversation_id,
                    user_id: el._id,
                    name: `${el.firstName} ${el.lastName}`,
                    img: el.avatar,
                    msg: "Hello",
                    online: true,
                };
            });
            state.ais = list;
        },
        updateFriends(state, action) {
            state.friends = action.payload.friends;
        },
        updateFriendRequests(state, action) {
            state.friendRequests = action.payload.requests;
        },
        deselectConversation(state, action) {
            state.room_id = null;
            state.chat_type = null;
        },
    },
});

export default slice.reducer;

export function toggleSidebar() {
    return async (dispatch, getState) => {
        dispatch(slice.actions.toggleSidebar());
    };
}

export function ToggleAutoResponse({ isChecked }) {
    return async (dispatch, getState) => {
        await axios
            .put(
                `/user/updateAutoResponses`,
                {
                    autoResponses: !isChecked,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getState().auth.token}`,
                    },
                }
            )
            .then((res) => {
                console.log("🚀 ~ file: app.js:106 ~ return ~ res:", res);
                dispatch(slice.actions.toggleAutoResponse({ isChecked }));
            })
            .catch((error) => {
                console.log("🚀 ~ file: app.js:108 ~ return ~ error:", error);
            });
    };
}

export function updateSidebarType(type) {
    return async (dispatch, getState) => {
        dispatch(
            slice.actions.updateSidebarType({
                type,
            })
        );
    };
}

export const closeSnackBar = () => async (dispatch, getState) => {
    dispatch(slice.actions.closeSnackBar());
};

export const showSnackbar =
    ({ severity, message }) =>
        async (dispatch, getState) => {
            dispatch(
                slice.actions.openSnackBar({
                    message,
                    severity,
                })
            );

            setTimeout(() => {
                dispatch(slice.actions.closeSnackBar());
            }, 4000);
        };

export const FetchUsers = () => {
    return async (dispatch, getState) => {
        await axios
            .get("/user/get-users", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().auth.token}`,
                },
            })
            .then((response) => {
                console.log("🚀 ~ file: app.js:111 ~ .then ~ response:", response);
                dispatch(slice.actions.updateUsers({ users: response.data.data }));
            })
            .catch((error) => {
                console.log("🚀 ~ file: app.js:115 ~ return ~ error:", error);
            });
    };
};

export const FetchFriends = () => {
    return async (dispatch, getState) => {
        await axios
            .get("/user/get-friends", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().auth.token}`,
                },
            })
            .then((response) => {
                console.log(response);
                dispatch(slice.actions.updateFriends({ friends: response.data.data }));
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const FetchFriendRequsts = () => {
    return async (dispatch, getState) => {
        await axios
            .get("/user/get-friend-requests", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().auth.token}`,
                },
            })
            .then((response) => {
                console.log(response);
                dispatch(
                    slice.actions.updateFriendRequests({ requests: response.data.data })
                );
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const FetchAis = () => {
    return async (dispatch, getState) => {
        await axios
            .get("/user/get-ais", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().auth.token}`,
                },
            })
            .then((response) => {
                console.log(
                    "🚀 ~ file: app.js:111 ~ .then ~ response:",
                    response.data.data[0]
                );
                dispatch(slice.actions.updateAis({ ais: response.data.data[0] }));
            })
            .catch((error) => {
                console.log("🚀 ~ file: app.js:115 ~ return ~ error:", error);
            });
    };
};

export const selectConversation = ({ room_id }) => {
    console.log("line 158 : ", room_id);
    return async (dispatch, getState) => {
        dispatch(slice.actions.selectConversation({ room_id }));
    };
};

export const SelectAiConversation = ({ room_id }) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.selectAiConversation({ room_id }));
    };
};

export const deselectConversation = () => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.deselectConversation());
        dispatch(deselectConversations());
        console.log(
            getState().conversation.direct_chat,
            "getState.conversation line 168"
        );
    };
};
