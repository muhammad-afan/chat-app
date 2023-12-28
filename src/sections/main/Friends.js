import { Dialog, DialogContent, Slide, Stack, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchFriendRequsts, FetchFriends, FetchUsers } from "../../redux/slices/app";
import { FriendElement, FriendRequestElement, UserElement } from "../../components/Friends";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const UsersList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(FetchUsers());
    }, []);

    const { users } = useSelector((state) => state.app);

    return (
        <>
            {users.map((el, index) => {
                // TODO => Render user component
                return <UserElement key={index} {...el} />;
            })}
        </>
    );
};

const FriendsList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(FetchFriends());
    }, []);

    const { friends } = useSelector((state) => state.app);

    return (
        <>
            {friends.map((el, index) => {
                // TODO => Render friend component
                return <FriendElement key={index} {...el} />;
            })}
        </>
    );
};

const FriendRequestsList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(FetchFriendRequsts());
    }, []);

    const { friendRequests } = useSelector((state) => state.app);

    return (
        <>
            {friendRequests.map((el, index) => {
                // TODO => Render friendRequest component
                return <FriendRequestElement key={index} {...el.sender} id={el._id} />;
            })}
        </>
    );
};

const Friends = ({ open, handleClose }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Dialog
            fullWidth
            maxWidth="xs"
            open={open}
            keepMounted
            TransitionComponent={Transition}
            onClose={handleClose}
            sx={{ p: 4 }}
        >
            <Stack p={2} sx={{ width: "100%" }}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Explore" />
                    <Tab label="Friends" />
                    <Tab label="Requests" />
                </Tabs>
            </Stack>
            {/* Dialog content */}
            <DialogContent>
                <Stack sx={{ height: "100%" }}>
                    <Stack spacing={2.5}>
                        {(() => {
                            switch (value) {
                                case 0: // display all users
                                    return <UsersList />
                                case 1: // display all friends
                                    return <FriendsList />
                                case 2: // display all friend requests
                                    return <FriendRequestsList />

                                default:
                                    break;
                            }
                        })()}
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default Friends;
