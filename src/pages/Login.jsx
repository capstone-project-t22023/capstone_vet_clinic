import React, {useContext} from 'react';
import {Container} from '@mui/material';
import ProgramContext from "../ProgramContext";
import Header from "../components/Header"
import Footer from "../components/Footer";
import LoginForm from '../components/authorization/LoginForm'

export default function Login() {

    const {user, authenticated} = useContext(ProgramContext);


    return (
        <div>
            <Header/>
            <Container maxWidth="md" sx={{mt: 5, mb: 5, pt:3, pb:10, border: "5px solid #f5effb", borderColor: "grey.100"}}>
                    <LoginForm/>
            </Container>
            <Footer/>
        </div>
    )
}