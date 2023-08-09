import React, {useState, useEffect, useContext} from 'react';
import ProgramContext from '../ProgramContext';
import {Navigate} from "react-router-dom";
import {
    AppBar,
    Box,
    Toolbar,
    Container,
    Drawer,
    Stack,
    Button,
    styled,
    Typography,
    List,
    ListItem
} from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import AccountMenu from "./header/AccountMenu";
import AccountMenuDialog from "./header/menu/AccountMenuDialog";
import MainMenu from "./header/MainMenu"
import Logo from "./header/Logo";


export default function Header() {

    const [toLogout, setToLogout] = useState(false);
    const {user, authenticated, setAuthenticated} = useContext(ProgramContext);
    const [openDrawer, setOpenDrawer] = useState(false)

    function handleLogout() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('authenticated');
        setToLogout(true);
        window.location.reload();
    }

    const StyledToolbar = styled(Toolbar)({
        display: "flex",
        justifyContent: "space-between"
    })

    // const Search = styled("div")(({theme})=> ({
    //     backgroundColor: "white",
    //     width: '40%',
    // }))


    return (
        <div>
            {toLogout ? <Navigate to="/logout" replace={true}/> : null}
            <AppBar position="sticky">
                <Container maxWidth="lg">
                    <StyledToolbar disableGutters>
                        <Logo/>
                        <Stack direction="row" spacing={1} sx={{display: {xs: "none", md: "flex"}}}>
                            <MainMenu/>
                        </Stack>

                        <Stack direction="row" justifyContent={"flex-end"} spacing={1}
                               sx={{display: {xs: "flex", md: "none"}}}>
                            <Button onClick={e => setOpenDrawer(true)} size="small" color={"secondary"}
                                    variant=""><MenuRoundedIcon/></Button>
                            <Drawer
                                anchor="right"
                                open={openDrawer}
                                onClose={e => setOpenDrawer(false)}
                            >
                                <Stack direction="column" justifyContent="space-between" sx={{p: 2, height: "100%"}}>
                                    <Stack direction="column" spacing={1} sx={{p: 2, bgcolor: "primary.main" }}>
                                    <Typography component="h3" variant="h5" sx={{color: "primary.contrastText"}} >Choose from Main Menu</Typography>
                                        <MainMenu/>
                                    </Stack>
                                    <AccountMenuDialog user={user} toLogout={e => setToLogout(true)}/>

                                </Stack>
                            </Drawer>
                        </Stack>

                        {/*<Search>Search</Search>*/}

                        <Box sx={{flexGrow: 0, display: {xs: 'none', md: 'flex'}}}>
                            <AccountMenu user={user} toLogout={handleLogout}/>
                        </Box>

                    </StyledToolbar>
                </Container>
            </AppBar>

        </div>
    )
}
