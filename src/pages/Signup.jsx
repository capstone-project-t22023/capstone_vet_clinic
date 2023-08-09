import React, {useContext} from 'react';
import {Container,Box} from '@mui/material';
import ProgramContext from "../ProgramContext";
import Header from "../components/Header"
import Footer from "../components/Footer";
import LoginForm from '../components/authorization/LoginForm'
import SignupForm from "../components/authorization/SignupForm";

export default function Login() {

    const {user, authenticated} = useContext(ProgramContext);


    return (
        <div>
            <Header/>
            <Container maxWidth="md">
                <Box sx={{mt: 5, mb: 5, pt:3, pb:10, border: "5px solid #f5effb", borderColor: "grey.100"}}>
                    <SignupForm/>
                </Box>
            </Container>
            <Footer/>
        </div>
    )
}