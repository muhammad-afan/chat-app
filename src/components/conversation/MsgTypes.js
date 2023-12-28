import React from 'react'
import { Box, Divider, IconButton, Link, Menu, MenuItem, Stack, Typography, useTheme } from '@mui/material'
import { DotsThreeVertical, DownloadSimple, Image } from 'phosphor-react'
import { Message_options } from '../../data'
import ReactMarkdown from 'react-markdown'


const DocMsg = ({ el, menu, handleClick }) => {
    const theme = useTheme()
    return (
        <Stack
            onContextMenu={handleClick}
            direction={'row'}
            justifyContent={el.incoming ? 'start' : 'end'}
        >
            <Box
                p={1.5}
                sx={{
                    backgroundColor: theme.palette.mode === "light"
                        ? el.incoming
                            ? "#F8FAFF"
                            : theme.palette.primary.main
                        : el.incoming
                            ? theme.palette.background.default
                            : theme.palette.primary.main,
                    borderRadius: 1.5, // 1.5 * 8 => 12px
                    width: 'max-content'
                }}
            >
                <Stack spacing={2}>
                    <Stack
                        p={2}
                        direction={'row'}
                        spacing={3}
                        alignItems={'center'}
                        sx={{
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: 1
                        }}
                    >
                        <Image size={48} />
                        <Typography variant='caption'>Abstract.png</Typography>
                        <IconButton>
                            <DownloadSimple />
                        </IconButton>
                    </Stack>
                    <Typography
                        variant='body2'
                        sx={{
                            color: el.incoming ? theme.palette.text : '#fff'
                        }}
                    >
                        {el.message}
                    </Typography>
                </Stack>
            </Box>
            {menu && <MsgOptions />}
        </Stack>
    )
}


const LinkMsg = ({ el, menu, handleClick }) => {
    const theme = useTheme();
    return (
        <Stack
            onContextMenu={handleClick}
            direction={'row'}
            justifyContent={el.incoming ? 'start' : 'end'}
        >
            <Box
                p={1.5}
                sx={{
                    backgroundColor: theme.palette.mode === "light"
                        ? el.incoming
                            ? "#F8FAFF"
                            : theme.palette.primary.main
                        : el.incoming
                            ? theme.palette.background.default
                            : theme.palette.primary.main,
                    borderRadius: 1.5, // 1.5 * 8 => 12px
                    width: 'max-content'
                }}
            >
                <Stack spacing={2}>
                    <Stack p={2} spacing={3} alignItems={'start'} sx={{ backgroundColor: theme.palette.background.paper, borderRadius: 1 }}>
                        <img src={el.preview} alt={el.message} style={{ maxHeight: '210px', borderRadius: '10px' }} />
                        <Stack spacing={2}>
                            <Typography variant='subtitle2'>creating chat app</Typography>
                            <Typography
                                variant='subtitle2'
                                sx={{
                                    color: theme.palette.primary.main
                                }}
                                component={Link}
                                to="//https://youtube.com"
                            >
                                www.youtube.com
                            </Typography>
                        </Stack>
                        <Typography variant='body2' color={el.incoming ? theme.palette.text : '#fff'}>
                            {el.message}
                        </Typography>
                    </Stack>
                </Stack>
            </Box>
            {menu && <MsgOptions />}
        </Stack>
    )
}


const ReplyMsg = ({ el, menu, handleClick }) => {
    const theme = useTheme();
    return (
        <Stack
            onContextMenu={handleClick}
            direction={'row'}
            justifyContent={el.incoming ? 'start' : 'end'}
        >
            <Box
                p={1.5}
                sx={{
                    backgroundColor: theme.palette.mode === "light"
                        ? el.incoming
                            ? "#F8FAFF"
                            : theme.palette.primary.main
                        : el.incoming
                            ? theme.palette.background.default
                            : theme.palette.primary.main,
                    borderRadius: 1.5, // 1.5 * 8 => 12px
                    width: 'max-content'
                }}
            >
                <Stack spacing={2}>
                    <Stack
                        p={2}
                        direction={'column'}
                        spacing={3}
                        alignItems={'center'}
                        sx={{
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: 1
                        }}
                    >
                        <Typography variant='body2' color={theme.palette.text}>
                            {el.message}
                        </Typography>
                    </Stack>
                    <Typography variant='body2' color={el.incoming ? theme.palette.text : '#fff'}>
                        {el.reply}
                    </Typography>
                </Stack>
            </Box>
            {menu && <MsgOptions />}
        </Stack>
    )
}


const MediaMsg = ({ el, menu, handleClick }) => {
    const theme = useTheme();
    return (
        <Stack
            onContextMenu={handleClick}
            direction={'row'}
            justifyContent={el.incoming ? 'start' : 'end'}
        >
            <Box
                p={1.5}
                sx={{
                    backgroundColor: theme.palette.mode === "light"
                        ? el.incoming
                            ? "#F8FAFF"
                            : theme.palette.primary.main
                        : el.incoming
                            ? theme.palette.background.default
                            : theme.palette.primary.main,
                    borderRadius: 1.5, // 1.5 * 8 => 12px
                    width: 'max-content'
                }}
            >
                <Stack spacing={1}>
                    <img
                        src={el.img}
                        alt={el.message}
                        style={{
                            maxHeight: '210px',
                            borderRadius: '10px'
                        }}
                    />
                    <Typography variant='body2' color={el.incoming ? theme.palette.text : '#fff'}>
                        {el.message}
                    </Typography>
                </Stack>
            </Box>
            {menu && <MsgOptions />}
        </Stack >
    )
}

const TextMsg = ({ el, menu, handleClick }) => {
    const theme = useTheme();
    return (
        <Stack
            onContextMenu={handleClick}
            direction={'row'}
            justifyContent={el.incoming ? 'start' : 'end'}
        >
            <Box
                p={1.5}
                sx={{
                    backgroundColor: theme.palette.mode === "light"
                        ? el.incoming
                            ? "#F8FAFF"
                            : theme.palette.primary.main
                        : el.incoming
                            ? theme.palette.background.default
                            : theme.palette.primary.main,
                    borderRadius: 1.5, // 1.5 * 8 => 12px
                    width: 'max-content'
                }}
            >
                <Typography variant='body2' color={el.incoming ? theme.palette.text : "#F8FAFF"} sx={{ "list-style-position": "inside" }}>
                    <ReactMarkdown>{el.message}</ReactMarkdown>
                </Typography>
            </Box>
            {/*  */}
            {menu && <MsgOptions />}
        </Stack>
    )
}

const Timeline = ({ el, handleClick }) => {
    const theme = useTheme();
    return (
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} onContextMenu={handleClick}>
            <Divider width="46%" />
            <Typography variant='caption' sx={{ color: theme.palette.text }}>{el.text}</Typography>
            <Divider width="46%" />
        </Stack>
    )
}


const MsgOptions = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <DotsThreeVertical
                size={20}
                id='basic-button'
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <Stack spacing={1} px={1}>
                    {
                        Message_options.map((el, idx) => (
                            <MenuItem key={idx}>{el.title}</MenuItem>
                        ))
                    }
                </Stack>
            </Menu>
        </>
    )
}
export { Timeline, TextMsg, MediaMsg, ReplyMsg, LinkMsg, DocMsg }
