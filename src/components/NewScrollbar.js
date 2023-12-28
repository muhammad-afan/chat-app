import { alpha, useTheme } from '@mui/material'
import React from 'react'
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';


const NewScrollbar = ({ children }) => {
    const theme = useTheme();

    const styles = {
        scrollbar: {
            height: '100%',
            '& .simplebarScrollbar': {
                '&:before': {
                    backgroundColor: alpha(theme.palette.grey[600], 0.48),
                },
                '&.simplebar-visible:before': {
                    opacity: 1,
                },
            },
            '& .simplebarTrack.simplebarVertical': {
                width: 10,
            },
            '& .simplebarTrack.simplebarHorizontal .simplebarScrollbar': {
                height: 6,
            },
            '& .simplebarMask': {
                zIndex: 'inherit',
            },
            "& .simplebarPlaceholder": {
                height: '0 !important',
            }
        },
    }

    return (
        <SimpleBar style={styles.scrollbar}>
            {children}
        </SimpleBar>
    )
}

export default NewScrollbar
