import React, {useState, useEffect, useContext} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Box, Button, Paper, Divider, Container, Typography, Stack, Grid, Zoom, Slide} from '@mui/material';
import ProgramContext from '../ProgramContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserCard from "../components/user/UserCard";
import Aside from '../components/aside/Aside';
import OldPets from "../components/pets/OldPets";
import PetsListAvatars from "../components/pets/PetsListAvatars";
import generateRandomPetArray from "../components/pets/PetArrayListGenerator";
import PetProfile from "../components/pets/PetProfile";
import UpcomingAppointments from "../components/appointments/upcomingAppointments/UpcomingAppointments";
import OldPetsList from "../components/pets/OldPetsList";
import PetsList from "../components/pets/PetsList";
import petOwnersData from "../components/pets/json/test.json";

export default function Dashboard() {

    const {user, authenticated} = useContext(ProgramContext);
    const [selectedPet, setSelectedPet] = useState(false); // Changed initial value to null
    const [arrayUsersPets, setArrayUsersPets] = useState(generateRandomPetArray(5))

    const navigate = useNavigate();
    const handleClick = (navigation) => {
        navigate(navigation);
    }

    const petOwners = petOwnersData.petOwners;

    const handleChangedSelectedPet = (petId) => {
        (petId === false) ? setSelectedPet(false) : setSelectedPet(petId);
    };
    const handleDeletePet = (petId) => {
        console.log("This Pet has to be removed", petId)
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

                                <Paper sx={{p: 3, borderRadius: 4}} elevation={0}>
                                    <PetsList petsList={arrayUsersPets} petOwnersList={petOwners} onChange={handleChangedSelectedPet}/>
                                    <PetsListAvatars petsList={arrayUsersPets} onChange={handleChangedSelectedPet}/>
                                </Paper>

                                <Stack direction="row" spacing={2}>
                                    <UpcomingAppointments/>
                                    <UpcomingAppointments/>
                                </Stack>

                            </Stack>


                            <Divider sx={{my: 2, border: '1px dashed red'}}/>


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
                                    <PetsListAvatars petsList={arrayUsersPets} onChange={handleChangedSelectedPet}/>
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
                                    <UpcomingAppointments/>
                                    <UpcomingAppointments/>
                                </Stack>

                            </Stack>


                            <Divider sx={{my: 2, border: '1px dashed red'}}/>


                        </Stack>
                        <Divider sx={{my: 2, border: '1px dashed red'}}/>
                        <Footer/>
                    </>
                )}

            </Stack>
                <Slide in={selectedPet ? true : false} direction="left" mountOnEnter unmountOnExit={true}>
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
                        <PetProfile petsList={arrayUsersPets} selectedPet={selectedPet} onDelete={handleDeletePet}/>
                    </Stack>
                </Slide>
        </Stack>
    );
}