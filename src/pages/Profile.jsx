import React, {useContext} from 'react';
import {Container, Typography} from '@mui/material';
import ProgramContext from "../ProgramContext";
import Header from "../components/Header"
import Footer from "../components/Footer";
import UserCard from "../components/user/UserCard";

export default function Home() {

    const {user, authenticated} = useContext(ProgramContext);

    return (
        <div>
            <Header/>
            <Container maxWidth="lg" sx={{mt: 5, mb: 5, p:3, bgcolor: 'primary.50'}}>
                <Typography component="h3" variant="h5">Profile Page</Typography>

                <UserCard user={user}/>
            </Container>
            <Footer/>
        </div>
    )
}