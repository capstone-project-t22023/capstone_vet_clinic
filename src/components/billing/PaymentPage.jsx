import React, { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    Table, TableBody, TableContainer, TableHead, TableRow, Paper,
    Typography, IconButton, Stack, Box, Tooltip, Zoom, Dialog, DialogActions,
    DialogContent, DialogTitle, Chip, Grid, OutlinedInput, InputAdornment, Alert, TablePagination
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
    VaccinesRounded, VisibilityRounded, PointOfSale,
    Close,
} from "@mui/icons-material";

import {styled} from '@mui/material/styles';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.primary[50],
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

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

export default function PaymentPage() {

    const [billingItems, setBillingItems] = useState([]);
    const { user } = useContext(ProgramContext);
    const [openPayment, setOpenPayment] = useState(false);
    const [payeeUsername, setPayeeUsername] = useState("");
    const [payeeUser, setPayeeUser] = useState("");
    const [paymentAmount, setPaymentAmount] = useState(0);
    const [amountDue, setAmountDue] = useState(0);
    const [invoiceId, setInvoiceId] = useState(0);
    const [alertAccept, setAlertAccept] = useState(false);
    const [refreshPayments, setRefreshPayments] = useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    useEffect(() => {
        setRefreshPayments(false);
        fetch("http://localhost/capstone_vet_clinic/api.php/get_all_billing_info", {
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
                    let filtered = data.billing_info.filter(x => x.booking_status === "FINISHED");
                    setBillingItems(filtered);
                }
            })
            .catch(error => {
                console.error('Error getting billing info:', error);
            });

    }, [user, refreshPayments])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const openPaymentDialog = (appointment) => (event) => {
        event.preventDefault();

        setOpenPayment(true);
        setInvoiceId(appointment.invoice_id);
        setPayeeUsername(appointment.username);
        setPayeeUser(appointment.pet_owner);
        setAmountDue(appointment.invoice_amount);
    }

    const closePaymentDialog = () => {
        setOpenPayment(false);
    }

    const acceptPayment = () => {
        let data = {};
        data.payee_username = payeeUsername;
        data.payment_method = "EFTPOS";
        data.payment_paid = paymentAmount;
        data.invoice_id = invoiceId;

        console.log("data", data);
        fetch("http://localhost/capstone_vet_clinic/api.php/accept_payment", {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then(data => {
                console.log(data.accept_payment);
                setAlertAccept(true);
                setOpenPayment(false);
                setRefreshPayments(true);
            })
            .catch(error => {
                console.error('Error accepting payment:', error);
            });
    }

    return (
        <div>
            <Helmet>
                <title>PawsomeVet | Payments</title>
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
                                    Payments Management
                                </Typography>
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <Box flex={1}>
                                    <Paper sx={{ p: 3, borderRadius: 4 }} elevation={0}>
                                        {alertAccept ?
                                            <Alert
                                                variant="filled"
                                                severity="success"
                                                action={
                                                    <IconButton
                                                        aria-label="close"
                                                        color="inherit"
                                                        size="small"
                                                        onClick={() => {
                                                            setAlertAccept(false);
                                                        }}
                                                    >
                                                        <Close fontSize="inherit" />
                                                    </IconButton>
                                                }
                                            >
                                                Payment has been accepted!
                                            </Alert>
                                            : ""}
                                        <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                <TableHead>
                                                    <StyledTableRow>
                                                        <StyledTableCell align="center"><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}></Typography></StyledTableCell>
                                                        <StyledTableCell align="center"><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Booking ID</Typography></StyledTableCell>
                                                        <StyledTableCell align="center"><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Booking Type</Typography></StyledTableCell>
                                                        <StyledTableCell align="center"><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Booking Status</Typography></StyledTableCell>
                                                        <StyledTableCell align="center"><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Pet</Typography></StyledTableCell>
                                                        <StyledTableCell align="center"><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Pet Owner</Typography></StyledTableCell>
                                                        <StyledTableCell align="center"><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Veterinarian</Typography></StyledTableCell>
                                                        <StyledTableCell align="center"><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Payment Status</Typography></StyledTableCell>
                                                        <StyledTableCell align="center"><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Amount Due</Typography></StyledTableCell>
                                                        <StyledTableCell align="center"><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Invoice</Typography></StyledTableCell>
                                                        <StyledTableCell align="center"><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Receipt</Typography></StyledTableCell>
                                                    </StyledTableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {billingItems
                                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    .map((appointment) => (
                                                        <StyledTableRow key={appointment.booking_id} >
                                                            {appointment.payment_status !== "PAID" && appointment.invoice_id !== "NA" ?
                                                                <StyledTableCell align="center">
                                                                    <Tooltip title="Accept payment" placement="right" TransitionComponent={Zoom} arrow>
                                                                        <IconButton
                                                                            aria-label="accept payment"
                                                                            size="small"
                                                                            color='error'
                                                                            onClick={openPaymentDialog(appointment)}
                                                                        >
                                                                            <PointOfSale />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </StyledTableCell> : <StyledTableCell align="center"></StyledTableCell>
                                                            }
                                                            <StyledTableCell align="center">{appointment.booking_id}</StyledTableCell>
                                                            <StyledTableCell align="left">{showIcon(appointment.booking_type_id)}{appointment.booking_type}</StyledTableCell>
                                                            <StyledTableCell align="center">{appointment.booking_status}</StyledTableCell>
                                                            <StyledTableCell align="center">{appointment.petname}</StyledTableCell>
                                                            <StyledTableCell align="center">{appointment.pet_owner}</StyledTableCell>
                                                            <StyledTableCell align="center">{appointment.doctor}</StyledTableCell>
                                                            <StyledTableCell align="center">{appointment.payment_status}</StyledTableCell>
                                                            <StyledTableCell align="center">$AUD {appointment.invoice_amount}</StyledTableCell>
                                                            <StyledTableCell align="center">
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
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
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
                                                            </StyledTableCell>
                                                        </StyledTableRow>
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
                                    <Dialog
                                        open={openPayment}
                                        onClose={closePaymentDialog}
                                        aria-labelledby="payment-dialog"
                                        aria-describedby="accept-payment-dialog"
                                    >
                                        <DialogTitle id="accept-payment-dialog-title">
                                            Accept Payment
                                        </DialogTitle>
                                        <DialogContent>
                                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                                <Grid item xs={6}>
                                                    <Typography variant="button"><b>Payee</b></Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="button">{payeeUser}</Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="button"><b>Payment Method</b></Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="button">STRIPE</Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="button"><b>Invoice ID</b></Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="button">{invoiceId}</Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="button"><b>Invoice Amount</b></Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="button">{amountDue}</Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="button"><b>Amount Paid</b></Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="button">
                                                        <OutlinedInput
                                                            id="amount_field"
                                                            defaultValue={parseFloat(0).toFixed(2)}
                                                            startAdornment={<InputAdornment position="start">$AUD</InputAdornment>}
                                                            size="small"
                                                            onChange={(newValue) => {
                                                                setPaymentAmount(parseFloat(newValue.target.value).toFixed(2));
                                                            }}
                                                        />
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </DialogContent>
                                        <DialogActions>
                                            <Chip
                                                label="CANCEL"
                                                color="info"
                                                onClick={closePaymentDialog}
                                                icon={<Close />}
                                            />
                                            <Chip
                                                label="ACCEPT PAYMENT"
                                                color="primary"
                                                onClick={acceptPayment}
                                                icon={<PointOfSale />}
                                            />
                                        </DialogActions>
                                    </Dialog>
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
