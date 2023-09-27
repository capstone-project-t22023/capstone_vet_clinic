import React, { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Typography, IconButton, Stack, Box, TablePagination
} from '@mui/material';
import { Link } from "react-router-dom";
import Aside from '../../components/aside/Aside';
import Footer from '../Footer';
import ProgramContext from "../../contexts/ProgramContext";
import {
    FitnessCenterRounded, LocalHospitalRounded,
    MedicalServicesRounded,
    ReportGmailerrorredRounded,
    RestaurantRounded,Receipt,
    VaccinesRounded, VisibilityRounded
} from "@mui/icons-material";

const showIcon = (typeId) => {
    switch (typeId) {
        case 1:
            return <MedicalServicesRounded color="primary" />;
        case 2:
            return <RestaurantRounded color="success" />;
        case 3:
            return <FitnessCenterRounded color="secondary" />;
        case 4:
            return <VaccinesRounded color="warning" />;
        case 5:
            return <LocalHospitalRounded color="error" />;
        default:
            return <ReportGmailerrorredRounded color="grey.300" />;
    }
};

export default function PaymentHistory() {

    const [billingItems, setBillingItems] = useState([]);
    const { user } = useContext(ProgramContext);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    useEffect(() => {
        fetch("http://localhost/capstone_vet_clinic/api.php/get_billing_by_pet_owner/"+user.id, {
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
                    setBillingItems(data.billing_info);
                }
            })
            .catch(error => {
                console.error('Error getting billing info:', error);
            });

    }, [user])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    return (
        <div>
            <Helmet>
                <title>PawsomeVet | Payment History</title>
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
                                    Payment History
                                </Typography>
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <Box flex={1}>
                                    <Paper sx={{ p: 3, borderRadius: 4 }} elevation={0}>
                                        <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="center"><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Booking ID</Typography></TableCell>
                                                        <TableCell align="center"><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Booking Date</Typography></TableCell>
                                                        <TableCell align="center"><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Booking Type</Typography></TableCell>
                                                        <TableCell align="center"><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Booking Status</Typography></TableCell>
                                                        <TableCell align="center"><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Pet</Typography></TableCell>
                                                        <TableCell align="center"><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Veterinarian</Typography></TableCell>
                                                        <TableCell align="center"><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Payment Status</Typography></TableCell>
                                                        <TableCell align="center"><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Amount Due</Typography></TableCell>
                                                        <TableCell align="center"><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Invoice</Typography></TableCell>
                                                        <TableCell align="center"><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Receipt</Typography></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {billingItems
                                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    .map((appointment) => (
                                                        <TableRow key={appointment.booking_id} >
                                                            <TableCell align="center">{appointment.booking_id}</TableCell>
                                                            <TableCell align="center">{appointment.booking_date}</TableCell>
                                                            <TableCell align="left">{showIcon(appointment.booking_type_id)}{appointment.booking_type}</TableCell>
                                                            <TableCell align="center">{appointment.booking_status}</TableCell>
                                                            <TableCell align="center">{appointment.petname}</TableCell>
                                                            <TableCell align="center">{appointment.doctor}</TableCell>
                                                            <TableCell align="center">{appointment.payment_status}</TableCell>
                                                            <TableCell align="center">$AUD {appointment.invoice_amount}</TableCell>
                                                            <TableCell align="center">
                                                                {appointment.invoice_id !== "NA" ?
                                                                    <Link to="/manage_invoice" state={{ appointment: { appointment } }}>
                                                                        <IconButton
                                                                            aria-label="open invoice"
                                                                            size="small"
                                                                            color='primary'
                                                                        >
                                                                            <VisibilityRounded />
                                                                        </IconButton>
                                                                    </Link> : ""
                                                                }
                                                            </TableCell>
                                                            <TableCell align="center">
                                                            { appointment.invoice_id !== "NA" && appointment.payment_status === "PAID" ?
                                                                <Link to="/view_receipt"  state= {{ appointment: {appointment} }}>
                                                                    <IconButton
                                                                        aria-label="open receipt"
                                                                        size="small"
                                                                        color='primary'
                                                                        >
                                                                        <Receipt />
                                                                    </IconButton>   
                                                                </Link> : ""
                                                            }
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <TablePagination
                                            rowsPerPageOptions={[10, 25, 100]}
                                            component="div"
                                            count={billingItems.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
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
