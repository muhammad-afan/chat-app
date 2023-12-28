import React, { useState } from "react";
import * as Yup from "yup";
import FormProvider from "../../components/hook-form/FormProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    Alert,
    Button,
    IconButton,
    InputAdornment,
    Link,
    Stack,
} from "@mui/material";
import { RHFTextField } from "../../components/hook-form";
import { Eye, EyeSlash } from "phosphor-react";
import { Link as RouterLink } from "react-router-dom"
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slices/auth";

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();

    // eslint-disable-next-line
    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .required("Email is required")
            .email("Email must be a valid email address"),
        password: Yup.string().required("Password is required"),
    });

    const defaultValues = {
        email: "demo@tawk.com",
        password: "demo1234",
    };

    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues,
    });

    const {
        reset,
        setError,
        handleSubmit,
        // eslint-disable-next-line
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = methods;

    const onSubmit = async (data) => {
        try {
            // submit data to backend
            dispatch(loginUser(data));
            console.log(data)
        } catch (error) {
            console.log(error);
            reset();
            setError("afterSubmit", {
                ...error,
                message: error.message,
            });
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                {!!errors.afterSubmit && (
                    <Alert severity="error">{errors.afterSubmit.message}</Alert>
                )}

                <RHFTextField name={"email"} label="Email Address" />
                <RHFTextField
                    name={"password"}
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => {
                                        setShowPassword(!showPassword);
                                    }}
                                >
                                    {showPassword ? <Eye /> : <EyeSlash />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>
            <Stack alignItems={"flex-end"} sx={{ my: 2 }}>
                <Link variant="body2" color={"inherit"} component={RouterLink} to={'/auth/reset-password'} underline="always">
                    Forgot Password?
                </Link>
            </Stack>
            <Button
                fullWidth
                color="inherit"
                size="large"
                type="submit"
                variant="contained"
                sx={{
                    backgroundColor: "text.primary",
                    color: (theme) =>
                        theme.palette.mode === "light" ? "common.white" : "grey.800",
                    "&:hover": {
                        backgroundColor: "text.primary",
                        color: (theme) =>
                            theme.palette.mode === "light" ? "common.white" : "grey.800",
                    },
                }}
            >
                Login
            </Button>
        </FormProvider>
    );
};

export default LoginForm;
