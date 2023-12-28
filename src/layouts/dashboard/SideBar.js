import React, { useState } from "react";
import {
    Avatar,
    Box,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    useTheme,
} from "@mui/material";
import logo from "../../assets/Images/logo.ico";
import { Nav_Buttons, Profile_Menu } from "../../data";
import { faker } from "@faker-js/faker";
import { Gear } from "phosphor-react";
import useSettings from "../../hooks/useSettings";
import AntSwitch from "../../components/AntSwitch";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/slices/auth";
import { useDispatch } from "react-redux";
import { socket } from "../../socket";

const getPath = (index) => {
    switch (index) {
        case 0:
            return "/app";
        case 1:
            return "/group";
        case 2:
            return "/call";
        case 3:
            return "/settings";
        default:
            break;
    }
};

const getMenuPath = (index) => {
    switch (index) {
        case 0:
            return "/profile";
        case 1:
            return "/settings";
        case 3:
            // TODO => update token and set isAuthenticated to false
            return "/auth/login"
        default:
            break;
    }
}

const SideBar = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [selected, setSelected] = useState(0);
    const navigate = useNavigate();
    const { onToggleMode } = useSettings();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const user_id = window.localStorage.getItem("user_id");
    return (
        <Box
            p={2}
            sx={{
                backgroundColor: theme.palette.background.paper,
                boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                height: "100vh",
                width: 100,
            }}
        >
            <Stack
                direction={"column"}
                sx={{ height: "100%", alignItems: "center" }}
                spacing={3}
                justifyContent={"space-between"}
            >
                <Stack alignItems={"center"} spacing={4}>
                    <Box
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            height: 64,
                            width: 64,
                            borderRadius: 1.5,
                        }}
                    >
                        <img src={logo} alt="chat app logo" />
                    </Box>
                    <Stack
                        sx={{ width: "max-content" }}
                        direction={"column"}
                        alignItems={"center"}
                        spacing={3}
                    >
                        {Nav_Buttons.map((el) =>
                            el.index === selected ? (
                                <Box
                                    key={el.index}
                                    sx={{
                                        backgroundColor: theme.palette.primary.main,
                                        borderRadius: 1.5,
                                    }}
                                >
                                    <IconButton
                                        sx={{ width: "max-content", color: "#fff" }}
                                        key={el.index}
                                    >
                                        {el.icon}
                                    </IconButton>
                                </Box>
                            ) : (
                                <IconButton
                                    onClick={() => {
                                        setSelected(el.index);
                                        navigate(getPath(el.index));
                                    }}
                                    sx={{
                                        width: "max-content",
                                        color:
                                            theme.palette.mode === "light"
                                                ? "#000"
                                                : theme.palette.text.primary,
                                    }}
                                    key={el.index}
                                >
                                    {el.icon}
                                </IconButton>
                            )
                        )}
                        <Divider sx={{ width: "48px" }} />
                        {selected === 3 ? (
                            <Box
                                sx={{
                                    backgroundColor: theme.palette.primary.main,
                                    borderRadius: 1.5,
                                }}
                            >
                                <IconButton sx={{ width: "max-content", color: "#fff" }}>
                                    <Gear />
                                </IconButton>
                            </Box>
                        ) : (
                            <IconButton
                                onClick={() => {
                                    setSelected(3);
                                    navigate(getPath(3));
                                }}
                                sx={{
                                    width: "max-content",
                                    color:
                                        theme.palette.mode === "light"
                                            ? "#000"
                                            : theme.palette.text.primary,
                                }}
                            >
                                <Gear />
                            </IconButton>
                        )}
                    </Stack>
                </Stack>
                <Stack spacing={4}>
                    <AntSwitch
                        onClick={() => {
                            onToggleMode();
                        }}
                        defaultChecked
                    />
                    <Avatar
                        src={faker.image.avatar()}
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleMenuClick}
                    />
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                    >
                        {Profile_Menu.map((el, idx) => (
                            <MenuItem key={idx} onClick={() => {
                                handleMenuClick();
                            }}>
                                <Stack
                                    onClick={() => {
                                        if (idx === 2) {
                                            dispatch(logoutUser());
                                            socket.emit("end", { user_id });
                                        }
                                        else navigate(getMenuPath(idx));
                                    }}
                                    sx={{ width: 100 }}
                                    direction={"row"}
                                    alignItems={"center"}
                                    justifyContent={"space-between"}
                                >
                                    <span>{el.title}</span>
                                    {el.icon}
                                </Stack>
                            </MenuItem>
                        ))}
                    </Menu>
                </Stack>
            </Stack>
        </Box>
    );
};

export default SideBar;
