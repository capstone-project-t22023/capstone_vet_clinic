import React, {useState, useEffect, useContext} from 'react';
import {Link, Navigate, useNavigate} from "react-router-dom";
import {Box, Button, Paper, Container, Typography} from '@mui/material';
import ProgramContext from '../ProgramContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserCard from "../components/user/UserCard";
import Pets from "../components/pets/Pets";

export default function Home() {

    const navigate = useNavigate();
    const handleClick = (navigation) => {
        navigate(navigation);
    }

    const {user, authenticated} = useContext(ProgramContext);

    return (
        <>
            <Header/>
            <Container maxWidth="lg" sx={{my: 5, p: 3, bgcolor: 'primary.50'}}>

                {!authenticated ? (
                    <Box>
                        <Typography component="h1" variant="h3">Homepage</Typography>
                        <Link to={"/login"}>Login</Link>
                    </Box>
                ) : (
                    <>
                        {user.role === "doctor" && (
                            <Typography component="h2" variant="h2">
                                Doctor's page
                            </Typography>
                        )}
                        {user.role === "admin" && (
                            <Typography component="h2" variant="h3">
                                Admin's page
                            </Typography>
                        )}
                        {user.role === "pet_owner" && (
                            <Typography component="h2" variant="h3">
                                Customer's page
                            </Typography>
                        )}
                    </>
                )}
                <>
                    You are logged in! Welcome {user.firstname}!
                    <div>
                        <Typography component="h3" variant="h5" sx={{color: "primary.main", my: 3}}>So far this two
                            pages are real pages:</Typography>
                        <Button color={"secondary"} variant="contained" sx={{mx: 1}}
                                onClick={() => handleClick("/bookings")}>Bookings</Button>
                        <Button color={"secondary"} variant="contained" sx={{mx: 1}}
                                onClick={() => handleClick("/profile")}>Update Profile</Button>
                        <Pets/>
                    </div>
                </>

            </Container>
            <Footer/>
        </>
    )
}
