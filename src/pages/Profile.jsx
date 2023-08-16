import React, {useContext} from 'react';
import {Container, Typography, Stack, Paper, Button, Divider, Slide } from '@mui/material';
import ProgramContext from "../contexts/ProgramContext";
import Header from "../components/Header"
import Footer from "../components/Footer";
import UserCard from "../components/user/UserCard";
import Aside from "../components/aside/Aside";
import UpcomingAppointments from "../components/appointments/upcomingAppointments/UpcomingAppointments";
import PetsListAvatars from "../components/pets/PetsListAvatars";


export default function Home() {

    const {user, authenticated} = useContext(ProgramContext);

    return (
    <Stack direction="row" sx={{height: '100vh', maxHeight: '100%', overflowY: 'hidden'}}>
        <Aside/>
               <UserCard user={user}/>

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
                    Doctor Role
                </>
            )}

            {user.role === 'pet_owner' && (
                <>
                    Pet owner Role
                </>
            )}


        </Stack>
    </Stack>

    )
}