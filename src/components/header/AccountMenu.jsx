import React, {useState} from 'react';
import {
    Box,
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    Divider,
    IconButton,
    Tooltip,
    Typography,
    Container,
    Stack,
    Button
} from '@mui/material';
import AccountMenuDialog from './menu/AccountMenuDialog';

export default function AccountMenu({toLogout, user}) {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };



    return (
        <React.Fragment>
            <Box sx={{flexGrow: 1, alignItems: 'center', textAlign: 'center', display: {xs: 'none', md: 'flex'}}}>
                {(user && Object.keys(user).length > 0) ? (
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ml: 2}}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{
                                width: 32,
                                height: 32,
                                bgcolor: "secondary.main",
                                color: "secondary.contrastText"
                            }}>{user && user.firstname ? user.firstname.charAt(0) : "NO USER"}</Avatar>
                        </IconButton>
                    </Tooltip>
                ) : (
                    <div>
                        <Typography component="a" href={"/login"}><Button color={"secondary"} variant="contained"
                                                                          size={"small"} sx={{mx: 1}}>LOG
                            IN</Button></Typography>
                        <Typography component="a" href={"/signup"}><Button color={"secondary"} variant="outlined"
                                                                           size={"small"} sx={{mx: 1}}>Sign up</Button></Typography>
                    </div>
                )}
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        // mt: 1.5,
                        '& .MuiAvatar-root': {
                            bgcolor: "primary.light",
                            width: 48,
                            height: 48,
                            mb: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgColor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
                <AccountMenuDialog user={user} toLogout={ e => toLogout(true)} />
            </Menu>


        </React.Fragment>
    );
}