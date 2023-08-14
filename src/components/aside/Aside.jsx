import React from "react";
import {Box, Container, IconButton, Stack, List, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import {
    ExitToAppRounded as ExitIcon,
    SendRounded as SendIcon,
    DraftsRounded as DraftsIcon,
    InboxRounded as InboxIcon,
    DashboardRounded,
    SettingsRounded,
    CalendarMonthRounded,
    LocationCityRounded
} from '@mui/icons-material';
import Logo from "../header/Logo";

export default function Aside() {
    return (
        <Stack direction="column" justifyContent="space-between" alignItems="center" spacing={8}
               sx={{
                   backgroundColor: "white",
                   height: '100vh',
                   py: 6,
                   minWidth: "80px",

               }}>
            <Logo/>
            <Stack direction="column" height={1} width={1} spacing={1} sx={{
                justifyContent: "flex-start",
                alignItems: "stretch",
                pt: 2,
                '& .MuiButtonBase-root': {
                    width: '100%', // Change fullWidth to width
                    flexGrow: 0,
                    alignItems: "center",
                    color: "text.primary",
                    py: 2,
                    // my: 2,
                },
                '& .MuiSvgIcon-root': {
                    mx: "auto",
                },
                '& .Mui-selected':{
                    background: 0,
                    '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: "center",
                        left: -5,
                        width: '10px',
                        height: '75%',
                        backgroundColor: "secondary.main",
                        borderRadius: '10px'
                    },
                },
            }}>
                <ListItemButton selected={true} alignItems="center">
                    <DashboardRounded/>
                </ListItemButton>
                <ListItemButton>
                    <CalendarMonthRounded/>
                </ListItemButton>
                <ListItemButton>
                    <LocationCityRounded/>
                </ListItemButton>
                <ListItemButton>
                    <SettingsRounded/>
                </ListItemButton>
            </Stack>
            <Stack direction="column">
                <IconButton aria-label="logout">
                    <ExitIcon/>
                </IconButton>

            </Stack>
        </Stack>
    )
}