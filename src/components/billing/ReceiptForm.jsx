import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom'

import {
    Stack, Typography, Box, Paper, Grid, 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import Aside from '../../components/aside/Aside';
import Footer from '../Footer';
import PawsomeVetLogo from '../../media/Logo.jpg';


const letterhead =
    <>
        <img src={PawsomeVetLogo} alt="" style={{ height: '80px', width: '80px', }} /><br />
        <Typography component="span" variant="h6"><b>PawsomeVet Veterinary Clinic</b></Typography><br />
        <Typography component="span" variant="caption">Address: 1 New Street, Sydney 2000 NSW, Australia</Typography><br />
        <Typography component="span" variant="caption">Ph: + (02) 9519 4111 / +(02)95194112</Typography><br />
        <Typography component="span" variant="caption">Fax: + (02) 9519 4111 / +(02)95194112</Typography><br />
        <Typography component="span" variant="caption">Email: info@pawsomevet.com.au</Typography><br />
        <Typography component="span" variant="caption">ABN: 865987656786</Typography>
    </>;

export default function ReceiptForm() {

    const location = useLocation();
    const { appointment } = location.state;
    const [bookingInfo, setBookingInfo] = useState([]);
    const [invoiceItemRows, setInvoiceItemRows] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0.00);

    useEffect(() => {
        setBookingInfo(appointment.appointment);

        Promise.all([
            fetch("http://localhost/capstone_vet_clinic/api.php/get_inventory_categories", {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            }),
            fetch("http://localhost/capstone_vet_clinic/api.php/get_mapped_inventory", {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            }),
            fetch("http://localhost/capstone_vet_clinic/api.php/get_invoice/" + appointment.appointment.invoice_id, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            })
        ])
            .then((responses) => {
                return Promise.all(responses.map(function (response) {
                    return response.json();
                }));
            })
            .then(data => {
                
                if (data[0].inventory_categories) {
                    let tmp_1 = data[0].inventory_categories.map(cat => {
                        let x = {};
                        x.label = cat.category;
                        x.value = cat.category_id;
                        return x;
                    })
                    tmp_1.push({ label: "Select One", value: 0 });

                    if(data[1].inventory){
                        if(data[2].get_invoice){
                            let invoice = data[2].get_invoice;
                            let inventory = data[1].inventory;

                            let tmp_invoice_items = invoice.invoice_items.map( x => {
                                let tmp = {};
                                tmp.item_category = x.item_category_id;
                                tmp.item_category_label = tmp_1.filter(cat => cat.value === x.item_category_id)[0].label;
                                tmp.item_description = x.item_id;
                                tmp.item_description_label = inventory.filter(item => x.item_id === item.item_id)[0].item_name;
                                tmp.item_id = x.item_id;
                                tmp.quantity = x.quantity;
                                tmp.unit_amount = x.unit_amount;
                                tmp.total_amount = x.total_amount;

                                return tmp;
                            });
                            
                            setInvoiceItemRows(tmp_invoice_items);
                            setTotalAmount(parseFloat(invoice.invoice_amount).toFixed(2));
                        }
                    }
                }

            })
            .catch(error => {
                console.error('Error getting inventory:', error);
            });

    }, [appointment]);

    return (
        <div>
            <Helmet>
                <title>PawsomeVet | Billing</title>
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
                                    View Receipt
                                </Typography>
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <Box flex={1}>
                                    <Paper sx={{ p: 3, borderRadius: 4 }} elevation={0}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                '& > :not(style)': {
                                                    m: 1,
                                                    width: 1,
                                                    paddingLeft: 3,
                                                    paddingRight: 3,
                                                    paddingTop: 2,
                                                    paddingBottom: 3
                                                },
                                            }}
                                        >
                                            <Paper elevation={4} >
                                                {letterhead}
                                                
                                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                                                    sx={{ paddingTop: 1, paddingBottom: 3 }}
                                                >
                                                    <Grid item xs={12} ><hr/></Grid>
                                                    <Grid item xs={4}>
                                                        <Typography variant="body2"><b>Invoice ID: </b>{bookingInfo.invoice_id}</Typography>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Typography variant="body2"><b>Payment Status: </b>{bookingInfo.payment_status}</Typography>
                                                    </Grid>
                                                    <Grid item xs={4}></Grid>
                                                    <Grid item xs={4}>
                                                        <Typography variant="body2"><b>Receipt ID: </b>{bookingInfo.receipt_id}</Typography>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Typography variant="body2"><b>Payment Date: </b>{bookingInfo.payment_date}</Typography>
                                                    </Grid>
                                                    <Grid item xs={4}></Grid>
                                                    <Grid item xs={12} ><hr/></Grid>
                                                    <Grid item xs={4}>
                                                        <Typography variant="body2"><b>Booking ID: </b>{bookingInfo.booking_id}</Typography>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Typography variant="body2"><b>Booking Status: </b>{bookingInfo.booking_status}</Typography>
                                                    </Grid>
                                                    <Grid item xs={4}></Grid>
                                                    <Grid item xs={4}>
                                                        <Typography variant="body2"><b>Booking Date: </b>{bookingInfo.booking_date}</Typography>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Typography variant="body2"><b>Booking Type: </b>{bookingInfo.booking_type}</Typography>
                                                    </Grid>
                                                    <Grid item xs={4}></Grid>
                                                    <Grid item xs={12} ><hr/></Grid>
                                                    <Grid item xs={4}>
                                                        <Typography variant="body2"><b>Pet Owner: </b>{bookingInfo.pet_owner}</Typography>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Typography variant="body2"><b>Pet: </b>{bookingInfo.petname}</Typography>
                                                    </Grid>
                                                    <Grid item xs={4}></Grid>
                                                    <Grid item xs={12} ><hr/></Grid>
                                                    <Grid item xs={12}>
                                                        <Typography variant="body2"><b>Veterinarian: </b>Dr. {bookingInfo.doctor}</Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography variant="body2"><b>Prepared by: </b>Dr. {bookingInfo.doctor}</Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography variant="body2"><b>Payment Received by: </b>{bookingInfo.admin_name}</Typography>
                                                    </Grid>
                                                    <Grid item xs={12} ><hr/></Grid>
                                                </Grid>
                                                <TableContainer component={Paper} sx={{ paddingRight: 2, paddingLeft: 2 }}>
                                                    <Table sx={{ minWidth: 650 }} aria-label="invoice table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell align="center"><b>Item Category</b></TableCell>
                                                                <TableCell align="center"><b>Item Description</b></TableCell>
                                                                <TableCell align="center"><b>Qty</b></TableCell>
                                                                <TableCell align="center"><b>Unit Amount</b></TableCell>
                                                                <TableCell align="center"><b>Total Amount</b></TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {invoiceItemRows.map((row, idx) => (
                                                                <TableRow
                                                                    key={"item-" + idx}
                                                                >
                                                                    <TableCell align="center">{row.item_category_label}</TableCell>
                                                                    <TableCell align="center">{row.item_description_label}</TableCell>
                                                                    <TableCell align="center">{row.quantity}</TableCell>
                                                                    <TableCell align="right">{row.unit_amount}</TableCell>
                                                                    <TableCell align="right">{row.total_amount}</TableCell>
                                                                </TableRow>
                                                            ))}
                                                            <TableRow>
                                                                <TableCell align="right" colSpan={4}>
                                                                    Total Receipt Amount
                                                                </TableCell>
                                                                <TableCell align="right" sx={{ color: 'green', fontWeight: 'bold' }}>$A {totalAmount}</TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Paper>
                                        </Box>
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
