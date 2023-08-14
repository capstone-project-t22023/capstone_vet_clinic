import React, {useState, useEffect, useContext} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Box, Button, Paper, Divider, Container, Typography, Stack, Grid} from '@mui/material';
import ProgramContext from '../ProgramContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserCard from "../components/user/UserCard";
import Aside from '../components/aside/Aside';
import OldPets from "../components/pets/OldPets";
import PetsListAvatars from "../components/pets/PetsListAvatars";
import generateRandomPetArray from "../components/pets/PetArrayListGenerator";
import PetProfile from "../components/pets/PetProfile";

export default function Dashboard() {

    const {user, authenticated} = useContext(ProgramContext);
    const [selectedPet, setSelectedPet] = useState(null); // Changed initial value to null
    const [arrayUsersPets, setArrayUsersPets] = useState(generateRandomPetArray(5))

    const navigate = useNavigate();
    const handleClick = (navigation) => {
        navigate(navigation);
    }

    const handleChangedSelectedPet = (petId) => {
        setSelectedPet(petId);
    }

    return (
        <Stack direction="row" sx={{height: "100vh", maxHeight: "100%", overflowY: 'hidden'}}>
            <Aside/>
            <Stack direction="column" width={1} sx={{
                borderLeft: '1px solid',
                borderRight: '1px solid',
                borderColor: '#eceef2',
                overflowY: 'auto'
            }}>
                <Stack direction="column" justifyContent="space-between" height="100vh" sx={{p: 3}}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography component="h1" variant="h4" sx={{fontWeight: 600}}>
                            Welcome Back, {user.firstname}!
                        </Typography>
                        <PetsListAvatars petList={arrayUsersPets} onChange={handleChangedSelectedPet}/>
                    </Stack>

                    <div>
                        <Typography component="h3" variant="h5" sx={{color: "primary.main", my: 3}}>
                            So far these pages are real pages:
                        </Typography>
                        <Button color="secondary" variant="contained" sx={{mx: 1}}
                                onClick={() => handleClick("/bookings")}>Bookings</Button>
                        <Button color="secondary" variant="contained" sx={{mx: 1}}
                                onClick={() => handleClick("/profile")}>Update Profile</Button>
                    </div>

                    <Divider sx={{my: 2, border: '1px dashed red'}}/>

                    {authenticated && (
                        <Typography component="h2" variant="h3">
                            {user.role === "doctor" ? "Doctor's page" :
                                user.role === "admin" ? "Admin's page" :
                                    user.role === "pet_owner" ? "Customer's page" : null}
                        </Typography>
                    )}
                </Stack>
                <Divider sx={{my: 2, border: '1px dashed red'}}/>
                <Footer/>
            </Stack>
            {selectedPet &&
                <Stack direction="column" justifyContent="space-between" alignItems="center" spacing={5}
                       sx={{height: '100vh', p: 4, backgroundColor: "white"}}>
                    <PetProfile petList={arrayUsersPets} selectedPet={selectedPet}/>
                </Stack>
            }
        </Stack>
    )
}
