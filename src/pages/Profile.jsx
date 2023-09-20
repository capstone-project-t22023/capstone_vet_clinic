import React, {useContext} from 'react';
import {Container, Typography, Stack, Paper} from '@mui/material';
import ProgramContext from "../contexts/ProgramContext";
import Footer from "../components/Footer";
import UserCard from "../components/user/UserCard";
import Aside from "../components/aside/Aside";
import {Helmet} from "react-helmet-async";


export default function Home() {

    const {user, authenticated} = useContext(ProgramContext);

    return (
        <>
            <Helmet>
                <title>PawsomeVet | Account Settings</title>
            </Helmet>
            <Stack direction="row" sx={{height: '100vh', maxHeight: '100%', overflowY: 'hidden'}}>
                <Aside/>

                <Stack
                    direction="column"
                    transition="width 0.9s ease-in-out"
                    justifyContent="space-between"
                    sx={{
                        borderLeft: '1px solid',
                        borderRight: '1px solid',
                        borderColor: '#eceef2',
                        overflowY: 'auto',
                        flex: 1,
                        p: 6
                    }}>


                    <Container>

                        <Typography component="h1" variant="h4" sx={{fontWeight: 600}}>
                            Welcome Back Admin - {user.firstname}!
                        </Typography>


                        <Stack direction="column" spacing={2} flex={0}>

                            <Typography fontWeight="bold" color="primary.main">Account Settings</Typography>

                            <Paper sx={{p: 3, borderRadius: 4}} elevation={0}>
                                <UserCard user={user}/>
                            </Paper>
                        </Stack>


                    </Container>
                    <Footer/>
                </Stack>
            </Stack>
        </>
    )
}