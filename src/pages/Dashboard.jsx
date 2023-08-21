import React, {useState, useEffect, useContext} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Box, Button, Paper, Divider, Container, Typography, Stack, Grid, Zoom, Slide} from '@mui/material';
import ProgramContext from '../contexts/ProgramContext';
import Footer from '../components/Footer';
import Aside from '../components/aside/Aside';
import PetsListAvatars from "../components/pets/PetsListAvatars";
import PetProfile from "../components/pets/PetProfile";
import Appointments from "../components/appointments/Appointments";
import PetsList from "../components/pets/PetsList";
import {PetsContext} from "../contexts/PetsProvider";
import BookingButton from "../components/booking/BookingButton";


export default function Dashboard() {


    const {user} = useContext(ProgramContext);
    const {petList, selectedPet} = useContext(PetsContext);

    const navigate = useNavigate();
    const handleClick = (navigation) => {
        navigate(navigation);
    }

    const handleDeletePet = (petId) => {
        console.log("This Pet has to be removed", petId)
    }
    const handleBooking = (booking) => {
        console.log("This is booking", booking)
    }

    return (
        <Stack direction="row" sx={{height: '100vh', maxHeight: '100%', overflowY: 'hidden'}}>
            <Aside/>


            <Stack
                direction="column"
                transition="width 0.9s ease-in-out"
                sx={{
                    borderLeft: '1px solid',
                    borderRight: '1px solid',
                    borderColor: '#eceef2',
                    overflowY: 'auto',
                    flex: 1,
                    p: 6
                }}>

                {user.role === 'doctor' && (
                    <>

                        <Stack direction="column" justifyContent="space-between" height="100vh">
                            <Stack direction="column" spacing={3}>
                                <Stack direction="row" justifyContent="space-between" alignItems="baseline">
                                    <Typography component="h1" variant="h4" sx={{fontWeight: 600}}>
                                        Welcome Back, Dr. {user.firstname}!
                                    </Typography>
                                </Stack>


                                <Stack direction="row" spacing={2}>
                                    <Box flex={1}>
                                        <Stack direction="row" justifyContent="space-between" width="100%" alignItems="baseline" sx={{mb:2}}>
                                            <Typography fontWeight="bold">Search in Pet Owners List</Typography>

                                        </Stack>
                                        <Paper sx={{p: 3, borderRadius: 4}} elevation={0}>
                                            <PetsList petsList={petList}/>
                                        </Paper>
                                    </Box>
                                </Stack>

                            </Stack>




                        </Stack>
                        <Divider sx={{my: 2, border: '1px dashed red'}}/>
                        <Footer/>
                    </>
                )}

                {user.role === 'pet_owner' && (
                    <>
                        <Stack direction="column" justifyContent="space-between" height="100vh">
                            <Stack direction="column" spacing={3}>
                                <Stack direction="row" justifyContent="space-between" alignItems="baseline">
                                    <Typography component="h1" variant="h4" sx={{fontWeight: 600}}>
                                        Welcome Back, {user.firstname}!
                                    </Typography>
                                    <PetsListAvatars petList={petList}/>
                                </Stack>

                                <Paper sx={{p: 3, borderRadius: 4}} elevation={0}>
                                    <Typography component="h3" variant="h5" sx={{color: "primary.main", mb: 3}}>
                                        So far these pages are real pages:
                                    </Typography>
                                    <Button color="secondary" variant="contained" sx={{mx: 1}}
                                            onClick={() => handleClick("/bookings")}>Bookings</Button>
                                    <Button color="secondary" variant="contained" sx={{mx: 1}}
                                            onClick={() => handleClick("/profile")}>Update Profile</Button>
                                </Paper>

                                <Stack direction="row" spacing={2}>
                                    <Appointments filter="today"/>
                                    <Appointments filter="future"/>
                                    <Appointments filter="historic"/>
                                    <Appointments/>

                                </Stack>

                            </Stack>


                            <Divider sx={{my: 2, border: '1px dashed red'}}/>


                        </Stack>
                        <Divider sx={{my: 2, border: '1px dashed red'}}/>
                        <Footer/>
                    </>
                )}

            </Stack>
            <Slide in={selectedPet ? true : false} direction="left"  mountOnEnter unmountOnExit>
                <Stack
                    direction="column"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={5}
                    sx={{
                        height: '100vh',
                        backgroundColor: 'white',
                    }}
                >
                    <PetProfile onDelete={handleDeletePet}/>
                </Stack>
            </Slide>
        </Stack>
    );
}