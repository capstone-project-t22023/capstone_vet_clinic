import React, {useContext, useState} from "react";
import {Navigate} from "react-router-dom";
import {
    IconButton,
    Stack,
    ListItemButton,
    Tooltip,
    Zoom
} from '@mui/material';
import {
    ExitToAppRounded as ExitIcon,
    DashboardRounded,
    SettingsRounded,
    CalendarMonthRounded,
    LocationCityRounded,
    WarehouseRounded
} from '@mui/icons-material';
import Logo from "../header/Logo";
import {useLocation, useNavigate} from "react-router-dom";
import ProgramContext from "../../contexts/ProgramContext";

export default function Aside() {
    const [toLogout, setToLogout] = useState(false);
    const {user, authenticated, setAuthenticated} = useContext(ProgramContext);

    const location = useLocation();
    const isActive = (path) => {
        return location.pathname === path;
    }

    const navigate = useNavigate();
    const handleClick = (navigation) => {
        navigate(navigation);
    }

    function handleLogout() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('authenticated');
        setAuthenticated(false)
        console.log("Bye Bye! Logging out now");
        window.location.replace("http://localhost:3000/pawsome_public/index.html");
    }

    return (
        <Stack direction="column" justifyContent="space-between" alignItems="center" spacing={8}
               sx={{
                   backgroundColor: "white",
                   height: '100vh',
                   py: 6,
                   minWidth: "80px",

               }}>
            <Logo/>
            {toLogout ? <Navigate to="/logout" replace={true}/> : null}
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
                '& .Mui-selected': {
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
                <Tooltip title="Dashboard" TransitionComponent={Zoom} placement="right" arrow>
                    <ListItemButton selected={isActive('/dashboard')} onClick={() => handleClick('/dashboard')}>
                        <DashboardRounded/>
                    </ListItemButton>
                </Tooltip>
                <ListItemButton disabled>
                    <CalendarMonthRounded/>
                </ListItemButton>
                <Tooltip title="Pet Records" TransitionComponent={Zoom} placement="right" arrow>
                    <ListItemButton disabled={user.role !== 'admin'} selected={isActive('/pet-records')} onClick={() => handleClick('/pet-records')}>
                        <LocationCityRounded/>
                    </ListItemButton>
                </Tooltip>
                <ListItemButton disabled={user.role === 'admin' ? false : true}>
                    <WarehouseRounded/>
                </ListItemButton>
                <Tooltip title="Update Profile" TransitionComponent={Zoom} placement="right" arrow>
                    <ListItemButton selected={isActive('/profile')} onClick={() => handleClick('/profile')}>
                        <SettingsRounded/>
                    </ListItemButton>
                </Tooltip>
            </Stack>
            <Stack direction="column">
                <Tooltip title="Logout & Exit" TransitionComponent={Zoom} placement="top">
                    <IconButton aria-label="logout" onClick={handleLogout}>
                        <ExitIcon/>
                    </IconButton>
                </Tooltip>
            </Stack>
        </Stack>
    )
}