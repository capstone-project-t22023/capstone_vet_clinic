import React, {useContext} from 'react';
import {Helmet} from 'react-helmet-async';

import {Box, IconButton, Paper, Typography, Stack, Slide} from '@mui/material';
import ProgramContext from '../contexts/ProgramContext';
import Footer from '../components/Footer';
import Aside from '../components/aside/Aside';
import PetsListAvatars from "../components/pets/PetsListAvatars";
import PetProfile from "../components/pets/PetProfile";
import Appointments from "../components/appointments/Appointments";
import PetsList from "../components/pets/PetsList";
import {PetsContext} from "../contexts/PetsProvider";
import AppointmentDetailSidebar from "../components/appointments/AppointmentDetailSidebar";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";


export default function PetRecords() {


    const {user} = useContext(ProgramContext);
    const {petList, sidebarContent, changeSidebarContent, selectedAppointment} = useContext(PetsContext);

    return (
        <div>
            <Helmet>
                <title>PawsomeVet | PetRecords</title>
            </Helmet>
            <Stack direction="row" sx={{height: '100vh', maxHeight: '100%', overflowY: 'hidden'}}>
                <Aside/>


                <Stack
                    direction="column"
                    transition="width 0.9s ease-in-out"
                    justifyContent="space-between"
                    sx={{
                        borderLeft: '1px solid',
                        borderRight: '1px solid',
                        borderColor: '#eceef2',
                        overflowY: 'auto',
                        flex: 1,
                        p: 6
                    }}>

                    {user.role !== 'pet_owner' && (
                        <>

                            <Stack direction="column" justifyContent="space-between" spacing={3}>
                                <Stack direction="column" spacing={3}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="baseline">
                                        <Typography component="h1" variant="h4" sx={{fontWeight: 600}}>
                                            Pet Records
                                        </Typography>
                                    </Stack>

                                    <Paper sx={{borderRadius: 6}} elevation={0}>
                                        {/*<Appointments timeframe="today" count={10} itemsPerPage={5} doctor/>*/}
                                    </Paper>


                                    <Stack direction="row" spacing={2}>
                                        <Box flex={1}>
                                            <Stack direction="row" justifyContent="space-between" width="100%"
                                                   alignItems="baseline" sx={{mb: 2}}>
                                                <Typography fontWeight="bold">Search in Pet Owners List</Typography>

                                            </Stack>
                                            <Paper sx={{p: 3, borderRadius: 4}} elevation={0}>
                                                <PetsList petRecords/>
                                            </Paper>
                                        </Box>
                                    </Stack>

                                    {/*<Stack direction="row" spacing={2}>*/}
                                    {/*    <Box flex={1}>*/}
                                    {/*        <Stack direction="row" justifyContent="space-between" width="100%"*/}
                                    {/*               alignItems="baseline" sx={{mb: 2}}>*/}
                                    {/*            <Typography fontWeight="bold">List of all Pending*/}
                                    {/*                Appointments:</Typography>*/}

                                    {/*        </Stack>*/}
                                    {/*        <Paper sx={{p: 3, borderRadius: 4}} elevation={0}>*/}
                                    {/*            <PetsList petsList={petList}/>*/}
                                    {/*        </Paper>*/}
                                    {/*    </Box>*/}
                                    {/*</Stack>*/}

                                </Stack>


                            </Stack>
                        </>
                    )}


                    <Footer/>

                </Stack>
                <Slide in={sidebarContent !== ""} direction="left" mountOnEnter unmountOnExit>
                    <Stack
                        direction="column"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={5}
                        sx={{
                            // minHeight: '100vh',
                            // height: '100vh', maxHeight: '100%',
                            overflowY: 'scroll',
                            backgroundColor: 'white',
                            // position: "relative"
                        }}
                    >
                        <Box
                            sx={{position: "absolute", top: 16, right: 16}}>
                            <IconButton color="primary" onClick={() => changeSidebarContent("")}>
                                <CloseRoundedIcon/>
                            </IconButton>
                        </Box>
                        {sidebarContent === 'appointment' &&

                            Object.keys(selectedAppointment).length > 0 &&
                            <AppointmentDetailSidebar appointmentId={selectedAppointment.booking_id}/>
                        }
                        {sidebarContent === 'pet' &&
                            <PetProfile/>
                        }
                    </Stack>
                </Slide>
            </Stack>
        </div>
    );
}