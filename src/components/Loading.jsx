import React from 'react';
import {Backdrop, CircularProgress, Stack} from "@mui/material";


function Loading({open}) {


    return (
        // <Backdrop
        //     sx={{ color: 'secondary.main', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        //     open={open}
        // >
        //     <CircularProgress color="inherit" />
        // </Backdrop>
        <Stack direction="row"
            justifyContent="center"
            sx={{ flex: 1, color: 'secondary.main', zIndex: (theme) => theme.zIndex.drawer + 1}}
            open={open}
        >
            <CircularProgress color="inherit"/>
        </Stack>
    );
}

export default Loading;
