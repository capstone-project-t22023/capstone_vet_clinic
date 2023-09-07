import React from "react";
import {Typography, Button, IconButton, Stack, Link} from '@mui/material';
import {Pets} from "@mui/icons-material";
import PawsomeVetLogo from '../../media/Logo.jpg'

export default function Logo() {
    return (
        <Stack direction="row" justifyContent="center" flex={1}>
            <Link>
                <img src={PawsomeVetLogo} alt ="" style={{ height: '80px', width: '80px',}}/>
            </Link>


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