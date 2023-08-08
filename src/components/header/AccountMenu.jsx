import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom"
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
    Button
} from '@mui/material';
import {PersonAdd, Settings, Logout} from '@mui/icons-material';

export default function AccountMenu({toLogout, user}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleLogout() {
        toLogout(true)
        navigate('/login');
    }

    const handleSettings = () => {
        navigate('/profile')
    }


    return (
        <React.Fragment>
            {/*{ toLogout ? <Navigate to="/logout" replace={true} /> : null}*/}
            <Box sx={{flexGrow: 1, alignItems: 'center', textAlign: 'center', display: {xs: 'none', md: 'flex'}}}>
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
                            height: 32
                        }}>{user && user.firstname ? user.firstname.charAt(0) : "NO USER"}</Avatar>
                    </IconButton>
                </Tooltip>
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
                        mt: 1.5,
                        pl: 2,
                        pr: 2,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: 0,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2, mt: 1}}>
                    <Avatar sx={{}}/> <Typography sx={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    p: 0,
                    maxWidth: '10rem'
                }}>{user.firstname} {user.lastname}</Typography>
                </Box>
                <Divider/>
                <MenuItem onClick={handleSettings}>
                    <ListItemIcon>
                        <Settings fontSize="small"/>
                    </ListItemIcon>
                        Settings
                </MenuItem>

                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small"/>
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>


        </React.Fragment>
    );
}