import React from "react";
import {Typography, Stack} from '@mui/material';
import {Pets} from "@mui/icons-material";

export default function Logo() {
    return (
        <Stack direction="row" alignItems="center" spacing={2}
               sx={{
                   '&:hover': {
                       color: 'secondary.main',
                       '& .MuiSvgIcon-root': {
                           color: 'secondary.100'
                       }
                   }
               }}
        >
            <Pets/>
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                    color: 'inherit',
                    textDecoration: 'none',
                    display: {
                        xs: 'none', md: 'block', fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                    },
                }}>
                PawSome
            </Typography>
        </Stack>
    )
}