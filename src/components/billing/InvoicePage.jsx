import React, { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet-async';

import { Stack, Typography, Box, Paper } from '@mui/material';
import Aside from '../aside/Aside';
import Footer from '../Footer';
import ProgramContext from "../../contexts/ProgramContext";
import InvoiceTable from './InvoiceTable';

export default function InvoicePage() {

    const [billingItems, setBillingItems] = useState([]);
    const {user} = useContext(ProgramContext);

    useEffect(() => {
        fetch("http://localhost/capstone_vet_clinic/api.php/get_billing_by_doctor/"+user.id, {
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
                if (data.billing_info) {
                    let filtered = data.billing_info.filter( x => x.booking_status === "FINISHED");
                    setBillingItems(filtered);
                }
            })
            .catch(error => {
                console.error('Error getting billing info by doctor:', error);
            });
    }, [user])

    return (
        <div>
            <Helmet>
                <title>PawsomeVet | Invoices</title>
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
                                    Invoices & Receipts
                                </Typography>
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <Box flex={1}>
                                    <Paper sx={{ p: 3, borderRadius: 4 }} elevation={0}>
                                        <InvoiceTable billingItems={billingItems} />
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
