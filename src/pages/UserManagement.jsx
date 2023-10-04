import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { Stack, Typography, Box, Paper } from '@mui/material';
import Aside from '../components/aside/Aside';
import Footer from '../components/Footer';
import ManageUsers from '../components/userManagement/ManageUsers';

export default function UserManagement() {

    const [users, setUsers] = useState([]);
    const [refreshUsers, setRefreshUsers] = useState(false);


    useEffect(() => {
        setRefreshUsers(false);
        fetch("http://localhost/capstone_vet_clinic/api.php/get_all_users", {
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
                if (data.users) {
                    setUsers(data.users);
                    console.log("users", users);
                }

            })
            .catch(error => {
                console.error('Error getting all inventory:', error);
            });
    }, [refreshUsers])

    return (
        <div>
            <Helmet>
                <title>PawsomeVet | User Management</title>
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
                                    User Management
                                </Typography>
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <Box flex={1}>
                                    <Paper sx={{ p: 3, borderRadius: 4 }} elevation={0}>
                                        <ManageUsers users={users} setRefreshUsers={setRefreshUsers}/>
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
