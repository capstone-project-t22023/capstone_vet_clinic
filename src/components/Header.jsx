import React, { useState, useEffect, useContext } from 'react';
import ProgramContext from '../ProgramContext';
import { Navigate, Link } from "react-router-dom";
import { AppBar, Button, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountMenu from "./header/AccountMenu";
import MainMenu from "./header/MainMenu"
import Logo from "./header/Logo";



export default function Header() {

    const [toLogout, setToLogout] = useState(false);
    const {user, authenticated, setAuthenticated} = useContext(ProgramContext);

    function handleLogout(){
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('authenticated');
        setToLogout(true);
        window.location.reload();
    }



    ///just blind copy paste from Material UI
        const [anchorElNav, setAnchorElNav] = React.useState(null);
        const [anchorElUser, setAnchorElUser] = React.useState(null);





        const pages = ['Homepage', 'Manage Pets', 'Open Pet\'s medical records'];
        const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
        const handleOpenNavMenu = (event) => {
            setAnchorElNav(event.currentTarget);
            console.log(event.currentTarget)
        };
        const handleOpenUserMenu = (event) => {
            setAnchorElUser(event.currentTarget);
        };

        const handleCloseNavMenu = () => {
            setAnchorElNav(null);
        };

        const handleCloseUserMenu = () => {
            setAnchorElUser(null);
        };
        //// end of blind copy paste




    return (
    <div>

        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Logo />

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <MainMenu />
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>

                        Here is space for mobile menu

                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <AccountMenu user={user} toLogout={handleLogout}/>
                    </Box>



                </Toolbar>
            </Container>
        </AppBar>

    </div>
  )
}
