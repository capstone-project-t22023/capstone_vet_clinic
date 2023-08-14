import React from "react";
import {Typography, Button, IconButton, Stack} from '@mui/material';
import {Pets} from "@mui/icons-material";

export default function Logo() {
    return (
        <Stack direction="row" justifyContent="center" flex={1}>
            <IconButton color="primary" variant="contained" aria-label="add an alarm"
                        sx={{backgroundColor: "secondary.main"}}>
                <Pets size="large"/>
            </IconButton>


            {/*<Typography*/}
            {/*    variant="h6"*/}
            {/*    noWrap*/}
            {/*    component="a"*/}
            {/*    href="/"*/}
            {/*    sx={{*/}
            {/*        color: 'inherit',*/}
            {/*        textDecoration: 'none',*/}
            {/*        display: {*/}
            {/*            xs: 'none', sm: 'block', fontFamily: 'monospace',*/}
            {/*            fontWeight: 700,*/}
            {/*            letterSpacing: '.3rem',*/}
            {/*        },*/}
            {/*    }}>*/}
            {/*    PawSome*/}
            {/*</Typography>*/}
        </Stack>
    )
}