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
    WarehouseRounded,
    LocalHotelRounded,
    PaidRounded,
    PeopleRounded
    PaidRounded,
    HelpRounded,
    MenuBookRounded
} from '@mui/icons-material';
import Logo from "../header/Logo";
import {useLocation, useNavigate} from "react-router-dom";
import ProgramContext from "../../contexts/ProgramContext";
import InstallationManual from '../../media/Pawsome Vet Clinic Installation Manual.pdf';
import UserManual from '../../media/Pawsome Vet Clinic User Manual.pdf';


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
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('authenticated');
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
                    <ListItemButton selected={isActive('/')} onClick={() => handleClick('/')}>
                        <DashboardRounded/>
                    </ListItemButton>
                </Tooltip>
                <ListItemButton disabled>
                    <CalendarMonthRounded/>
                </ListItemButton>
                <Tooltip title="Pet Records" TransitionComponent={Zoom} placement="right" arrow>
                    <ListItemButton disabled={user.role === 'pet_owner'} selected={isActive('/pet-records')} onClick={() => handleClick('/pet-records')}>
                        <LocationCityRounded/>
                    </ListItemButton>
                </Tooltip>

                {user.role === 'pet_owner' ?
                <>
                    <Tooltip title="Payment History" TransitionComponent={Zoom} placement="right" arrow>
                        <ListItemButton
                            selected={isActive('/payment_history')}
                            onClick={() => handleClick('/payment_history')}>
                            <PaidRounded/>
                        </ListItemButton>
                    </Tooltip>
                </>
                : "" }

                {user.role === 'doctor' ?
                <>
                    <Tooltip title="Invoices" TransitionComponent={Zoom} placement="right" arrow>
                        <ListItemButton
                            selected={isActive('/view_invoices')}
                            onClick={() => handleClick('/view_invoices')}>
                            <PaidRounded/>
                        </ListItemButton>
                    </Tooltip>
                </>
                : "" }

                {user.role === 'admin' ?
                <>
                    <Tooltip title="Payments" TransitionComponent={Zoom} placement="right" arrow>
                        <ListItemButton
                            selected={isActive('/process_payments')}
                            onClick={() => handleClick('/process_payments')}>
                            <PaidRounded/>
                        </ListItemButton>
                    </Tooltip>
                    <Tooltip title="Inventory" TransitionComponent={Zoom} placement="right" arrow>
                        <ListItemButton
                            selected={isActive('/inventory')}
                            onClick={() => handleClick('/inventory')}>
                            <WarehouseRounded/>
                        </ListItemButton>
                    </Tooltip>
                    <Tooltip title="Lodging" TransitionComponent={Zoom} placement="right" arrow>
                        <ListItemButton
                            selected={isActive('/lodging')}
                            onClick={() => handleClick('/lodging')}>
                            <LocalHotelRounded/>
                        </ListItemButton>
                    </Tooltip>
                    <Tooltip title='User Management' TransitionComponent={Zoom} placement="right" arrow>
                    <ListItemButton
                        selected={isActive('/user-management')}
                        onClick={() => handleClick('/user-management')}>
                        <PeopleRounded/>
                    </ListItemButton>
                    </Tooltip>
                    </Tooltip>
                    <Tooltip title="Installation Manual" TransitionComponent={Zoom} placement="right" arrow>
                        <Link to={InstallationManual} target = "_blank">
                            <ListItemButton>
                                <MenuBookRounded/>
                            </ListItemButton>
                        </Link>
                    </Tooltip>
                </>
                : "" }

                <Tooltip title="Update Profile" TransitionComponent={Zoom} placement="right" arrow>
                    <ListItemButton selected={isActive('/profile')} onClick={() => handleClick('/profile')}>
                        <SettingsRounded/>
                    </ListItemButton>
                </Tooltip>
                <Tooltip title="User Manual" TransitionComponent={Zoom} placement="right" arrow>
                    <Link to={UserManual} target = "_blank">
                        <ListItemButton>
                            <HelpRounded/>
                        </ListItemButton>
                    </Link>
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