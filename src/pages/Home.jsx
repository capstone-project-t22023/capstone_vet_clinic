import React, {useState, useEffect, useContext} from 'react';
import {Link, Navigate, useNavigate} from "react-router-dom";
import {Box, Button, Paper, Stack, Container, Typography} from '@mui/material';
import ProgramContext from '../contexts/ProgramContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserCard from "../components/user/UserCard";
import OldPets from "../components/pets/OldPets";
import Aside from "../components/aside/Aside";

export default function Home() {


    console.log("How many times reload (home.jsx)");

    const navigate = useNavigate();
    const handleClick = (navigation) => {
        navigate(navigation);
    }

    const {user, authenticated} = useContext(ProgramContext);

    return (
        <Stack direction="row" sx={{height: "100vh", maxHeight: "100%", overflowY: 'hidden'}}>
            <Aside/>
            <Stack flex={1}>
                <Container maxWidth="lg" sx={{my: 5, p: 3, bgcolor: 'primary.50'}}>

                        <Stack direction="column" spacing={1}>
                            <Typography component="h1" variant="h3">Homepage</Typography>
                            <Link to={"/login"}>Login</Link>
                            <Link to="https://dribbble.com/shots/16824211-Pet-Care-Website">Homepage For a vet
                                clinic</Link>
                            <Link to="https://dribbble.com/shots/17897237-Wet-Noses-Dashboard">Dashboard of vet
                                clinic</Link>
                            <Link to="https://dribbble.com/shots/14964970-Veterinary-Clinic-Dashboard">Dashboard of vet
                                clinic - Better </Link>
                            <Link to="https://dribbble.com/shots/14095613-The-veterinary-clinic-dashdoard">I like the
                                bottom arrows on components to </Link>
                        </Stack>
                        You are logged in! Welcome {user.firstname}!
                        <div>
                            <Typography component="h3" variant="h5" sx={{color: "primary.main", my: 3}}>So far this two
                                pages are real pages:</Typography>
                            <Button color={"secondary"} variant="contained" sx={{mx: 1}}
                                    onClick={() => handleClick("/bookings")}>Bookings</Button>
                            <Button color={"secondary"} variant="contained" sx={{mx: 1}}
                                    onClick={() => handleClick("/profile")}>Update Profile</Button>
                            <OldPets/>
                        </div>

                </Container>
                <Footer/>
            </Stack>
        </Stack>
    )
}
