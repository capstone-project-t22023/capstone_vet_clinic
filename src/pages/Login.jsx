import React, { useContext, useEffect } from 'react';
import {Container, Divider, Stack} from '@mui/material';
import LoginForm from '../components/authorization/LoginForm'
import {Helmet} from 'react-helmet-async';
import Footer from "../components/Footer";
import ProgramContext from '../contexts/ProgramContext';


export default function Login() {
    const {user} = useContext(ProgramContext);

    useEffect(() => {
        if(user.username){
            window.location.replace("http://localhost:3000");
        }
    },[user]);

    console.log("user", user);

    return (
        <div>
            <Helmet>
                <title>PawsomeVet | Login</title>
            </Helmet>
            <Container maxWidth="md"
                       sx={{mt: 5, mb: 5, pt: 3, pb: 10, border: "5px solid #f5effb", borderColor: "grey.100"}}>
                <LoginForm/>
                <Divider color="primary" sx={{mt:8}}/>
                <Stack direction="column" spacing={2} sx={{my: 4, mx: "auto", color: "secondary.500"}} flex={1}
                       alignItems={"center"}>
                    <p>Admin: pawsome_admin -> pawsome_admin2023</p>
                    <p>Doctor: teemingbroth -> teemingbroth_2023</p>
                    <p>Customer: abundantasparagus -> abundantasparagus_2023</p>
                </Stack>
                <Divider color="primary" />
            </Container>

            <Footer />
        </div>
    )
}