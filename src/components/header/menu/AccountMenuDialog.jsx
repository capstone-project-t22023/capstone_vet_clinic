import React from "react";
import {Avatar, Stack, Divider, MenuItem, Typography, ListItemIcon} from "@mui/material";
import {Settings, LogoutRounded} from "@mui/icons-material";

export default function AccountMenuDialog({toLogout, user}) {

    function handleLogout() {
        toLogout(true)
    }

    return (
        <>
            <Stack direction="column">

                <Stack direction="column"
                       sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2, mt: 1, mx: 2}}>
                    <Avatar/>
                    <Typography sx={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        px: 2,
                        maxWidth: '15rem'
                    }}>
                        {user.firstname} {user.lastname}
                    </Typography>
                </Stack>
                <Divider/>
                <Stack direction="column"
                       sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2, mt: 1, mx: 2}}>
                    <MenuItem>
                        <Typography component="a" href="/profile" sx={{display: "flex", width: "100%"}}>
                            <ListItemIcon>
                                <Settings fontSize="small"/>
                            </ListItemIcon>
                            Settings
                        </Typography>
                    </MenuItem>

                    <MenuItem onClick={handleLogout}>
                        <Typography component="a" href="/login">
                            <ListItemIcon>
                                <LogoutRounded fontSize="small"/>
                            </ListItemIcon>
                            Logout
                        </Typography>
                    </MenuItem>
                </Stack>
            </Stack>
        </>
    )
}

