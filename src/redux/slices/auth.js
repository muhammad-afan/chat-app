import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { showSnackbar } from "./app";

const initialState = {
    isLoggedIn: false,
    token: "",
    isLoading: false,
    email: "",
    error: false,
};

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.token = action.payload.token;
        },
        signOut(state, action) {
            state.isLoggedIn = false;
            state.token = "";
        },
        updateIsLoding(state, action) {
            state.error = action.payload.error;
            state.isLoading = action.payload.isLoading;
        },
        updateRegisterEmail(state, action) {
            state.email = action.payload.email;
        },
    },
});

// Reducer
export default slice.reducer;

// Log in

export function loginUser(formValues) {
    // formValues => {email, password}
    return async (dispatch, getState) => {
        await axios
            .post(
                "/auth/login",
                {
                    ...formValues,
                },
                {
                    headers: {
                        "Content-type": "application/json",
                    },
                }
            )
            .then((response) => {
                console.log(response.data);
                dispatch(
                    slice.actions.login({
                        isLoggedIn: true,
                        token: response.data.token,
                    })
                );
                window.localStorage.setItem("user_id", response.data.user_id);
                dispatch(
                    showSnackbar({
                        severity: response.data.status || "success",
                        message: response.data.message,
                    })
                );
            })
            .catch(function (error) {
                console.log(error);
                dispatch(
                    showSnackbar({
                        severity: error.response.data.status || "error",
                        message: error.response.data.message || error.message,
                    })
                );
            });
    };
}

export const logoutUser = () => {
    return async (dispatch, getState) => {
        window.localStorage.removeItem("user_id");
        dispatch(slice.actions.signOut());
        dispatch(
            showSnackbar({ severity: "success", message: "Logout successfully" })
        );
    };
};

export const ForgotPassword = (formValues) => {
    return async (dispatch, getState) => {
        await axios
            .post(
                "/auth/forgot-password",
                {
                    ...formValues,
                },
                {
                    headers: {
                        "Content-type": "application/json",
                    },
                }
            )
            .then((response) => {
                console.log(response);
                dispatch(
                    showSnackbar({
                        severity: response.data.status || "success",
                        message: response.data.message,
                    })
                );
            })
            .catch((error) => {
                console.log(error);
                dispatch(
                    showSnackbar({
                        severity: error.response.data.status || "error",
                        message: error.response.data.message || error.message,
                    })
                );
            });
    };
};

export const NewPassword = (formValues) => {
    return async (dispatch, getState) => {
        axios
            .post(
                "/auth/reset-password",
                {
                    ...formValues,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                console.log(response);
                dispatch(
                    slice.actions.login({
                        isLoggedIn: true,
                        token: response.data.token,
                    })
                );
                window.localStorage.setItem("user_id", response.data.user_id);
                dispatch(
                    showSnackbar({
                        severity: response.data.status || "success",
                        message: response.data.message,
                    })
                );
            })
            .catch((error) => {
                console.log(error);
                dispatch(
                    showSnackbar({
                        severity: error.response.data.status || "error",
                        message: error.response.data.message || error.message,
                    })
                );
            });
    };
};

export const RegisterUser = (formValues) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.updateIsLoding({ isLoading: true, error: false }));
        await axios
            .post(
                "/auth/register",
                {
                    ...formValues,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                console.log(response);
                dispatch(
                    slice.actions.updateRegisterEmail({ email: formValues.email })
                );
                dispatch(
                    slice.actions.updateIsLoding({ isLoading: false, error: false })
                );
                dispatch(
                    showSnackbar({
                        severity: response.data.status || "success",
                        message: response.data.message,
                    })
                );
            })
            .catch((error) => {
                console.log(error);
                dispatch(
                    slice.actions.updateIsLoding({ isLoading: false, error: true })
                );
                dispatch(
                    showSnackbar({
                        severity: error.response.data.status || "error",
                        message: error.response.data.message || error.message,
                    })
                );
            })
            .finally(() => {
                if (!getState().auth.error) window.location.href = "/auth/verify";
            });
    };
};

export const VerifyEmail = (formValues) => {
    return async (dispatch, getState) => {
        await axios
            .post(
                "/auth/verify",
                {
                    ...formValues,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                console.log(response);
                dispatch(
                    slice.actions.login({
                        isLoggedIn: true,
                        token: response.data.token,
                    })
                );
                window.localStorage.setItem("user_id", response.data.user_id);
                dispatch(
                    showSnackbar({
                        severity: response.data.status || "success",
                        message: response.data.message,
                    })
                );
                console.log("hello2");
            })
            .catch((error) => {
                console.log("hello", error.response.data);
                dispatch(
                    showSnackbar({
                        severity: error.response.data.status || "error",
                        message: error.response.data.message || error.message,
                    })
                );
            });
    };
};
