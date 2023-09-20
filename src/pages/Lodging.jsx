import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { Stack, Typography, Box, Paper } from '@mui/material';
import Aside from '../components/aside/Aside';
import Footer from '../components/Footer';
import LodgingPage from '../components/lodging/LodgingPage';

export default function Lodging() {

    const [lodgingCages, setLodgingCages] = useState([]);
    const [refreshLodging, setRefreshLodging] = useState(false);


    useEffect(() => {
        setRefreshLodging(false);
        fetch("http://localhost/capstone_vet_clinic/api.php/get_all_lodging", {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then(data => {
                if (data.lodging) {
                    setLodgingCages(data.lodging)
                }

            })
            .catch(error => {
                console.error('Error getting lodging:', error);
            });
    }, [refreshLodging])

    return (
        <div>
            <Helmet>
                <title>PawsomeVet | Lodging Management</title>
            </Helmet>
            <Stack direction="row" sx={{ height: '100vh', maxHeight: '100%', overflowY: 'hidden' }}>
                <Aside />
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

                    <Stack direction="column" justifyContent="space-between" spacing={3}>
                        <Stack direction="column" spacing={3}>
                            <Stack direction="row" justifyContent="space-between" alignItems="baseline">
                                <Typography component="h1" variant="h4" sx={{ fontWeight: 600 }}>
                                    Lodging Management
                                </Typography>
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <Box flex={1}>
                                    <Paper sx={{ p: 3, borderRadius: 4 }} elevation={0}>
                                        <LodgingPage lodgingCages={lodgingCages} setRefreshLodging={setRefreshLodging}/>
                                    </Paper>
                                </Box>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Footer />
                </Stack>
            </Stack>
        </div>
    )
}
