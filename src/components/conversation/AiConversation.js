import { Box, Stack } from '@mui/material'
import React from 'react'
import Header from './Header';
import Footer from './Footer';
import Message from './Message';
import NewScrollbar from '../NewScrollbar';
import AiMessage from './AiMessage';

const AiConversation = () => {
    return (
        <Stack sx={{ height: '100%', maxHeight: '99vh', width: 'auto' }}>
            {/* Chat header */}
            <Header />
            {/* Msg */}
            <Box width={'100%'} sx={{ flexGrow: 1, height: "100%", overflow: 'auto' }}>
                <NewScrollbar>
                    <AiMessage menu={true} />
                </NewScrollbar>
            </Box>
            {/* Chat footer */}
            <Footer />
        </Stack>
    )
}

export default AiConversation
