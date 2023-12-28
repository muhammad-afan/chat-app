import React, { useCallback } from "react";
import * as Yup from "yup";
import FormProvider from "../../components/hook-form/FormProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Button, Stack } from "@mui/material";
import { RHFTextField } from "../../components/hook-form";

const ProfileForm = () => {
    const LoginSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        about: Yup.string().required("About is required"),
        avatarUrl: Yup.string().required("Avatar is required").nullable(true),
    });

    const defaultValues = {
        name: "",
        about: "",
    };

    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        // eslint-disable-next-line
        control,
        setValue,
        setError,
        handleSubmit,
        // eslint-disable-next-line
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = methods;

    // eslint-disable-next-line
    const values = watch();

    // eslint-disable-next-line
    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];

            const newFile = Yup.object(file, {
                preview: URL.createObjectURL(file),
            });

            if (file) {
                setValue("avatarUrl", newFile, { shouldValidate: true });
            }
        },
        [setValue]
    );

    const onSubmit = async (data) => {
        try {
            // submit data to backend
            console.log("data ", data);
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
                <Stack spacing={3}>
                    {!!errors.afterSubmit && (
                        <Alert severity="error">{errors.afterSubmit.message}</Alert>
                    )}

                    <RHFTextField
                        name={"name"}
                        label="Name"
                        helperText={"This name is visible to your contacts"}
                    />
                    <RHFTextField
                        multiline
                        rows={3}
                        maxRows={5}
                        name={"about"}
                        label={"About"}
                    />
                </Stack>
                <Stack direction={'row'} justifyContent={'end'}>
                    <Button color="primary" size="large" type="submit" variant="outlined">
                        Save
                    </Button>
                </Stack>
            </Stack>
        </FormProvider>
    );
};

export default ProfileForm;
