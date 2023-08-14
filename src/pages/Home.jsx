import React, {useState, useEffect, useContext} from 'react';
import {Link, Navigate, useNavigate} from "react-router-dom";
import {Box, Button, Paper, Container, Typography} from '@mui/material';
import ProgramContext from '../ProgramContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserCard from "../components/user/UserCard";
import OldPets from "../components/pets/OldPets";

export default function Home() {


    console.log("How many times reload");

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
                        <Link to="https://dribbble.com/shots/16824211-Pet-Care-Website">Homepage For a vet clinic</Link>
                        <Link to="https://dribbble.com/shots/17897237-Wet-Noses-Dashboard">Dashboard of vet clinic</Link>
                        <Link to="https://dribbble.com/shots/14964970-Veterinary-Clinic-Dashboard">Dashboard of vet clinic - Better </Link>
                        <Link to="https://dribbble.com/shots/14095613-The-veterinary-clinic-dashdoard">I like the bottom arrows on components to  </Link>
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
                        <OldPets />
                    </div>
                </>

            </Container>
            <Footer/>
        </>
    )
}
