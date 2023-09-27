import React, { useState, useEffect, useContext } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
        Typography, IconButton } from '@mui/material';
import {Link} from "react-router-dom";
import {
    FitnessCenterRounded, LocalHospitalRounded,
    MedicalServicesRounded,
    ReportGmailerrorredRounded,
    RestaurantRounded,
    VaccinesRounded,
    VisibilityRounded,
    AddCircleRounded,
    EditRounded,
    Receipt,
    PointOfSale
} from "@mui/icons-material";

const showIcon = (typeId) => {
    switch (typeId) {
        case 1:
            return <MedicalServicesRounded color="primary"/>;
        case 2:
            return <RestaurantRounded color="success"/>;
        case 3:
            return <FitnessCenterRounded color="secondary"/>;
        case 4:
            return <VaccinesRounded color="warning"/>;
        case 5:
            return <LocalHospitalRounded color="error"/>;
        default:
            return <ReportGmailerrorredRounded color="grey.300"/>;
    }
};

export default function InvoiceTable(props) {

    const [billingItems, setBillingItems] = useState([]);

    useEffect(() => {
        setBillingItems(props.billingItems);

    }, [props])

  return (
    <div>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="invoice table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center"><Typography variant="subtitle1" sx={{ fontWeight: 'bold'}}>Booking ID</Typography></TableCell>
                        <TableCell align="center"><Typography variant="subtitle1" sx={{ fontWeight: 'bold'}}>Booking Type</Typography></TableCell>
                        <TableCell align="center"><Typography variant="subtitle1" sx={{ fontWeight: 'bold'}}>Pet Name</Typography></TableCell>
                        <TableCell align="center"><Typography variant="subtitle1" sx={{ fontWeight: 'bold'}}>Pet Owner</Typography></TableCell>
                        <TableCell align="center"><Typography variant="subtitle1" sx={{ fontWeight: 'bold'}}>Payment Status</Typography></TableCell>
                        <TableCell align="center"><Typography variant="subtitle1" sx={{ fontWeight: 'bold'}}>Amount Due</Typography></TableCell>
                        <TableCell align="center"><Typography variant="subtitle1" sx={{ fontWeight: 'bold'}}>Invoice</Typography></TableCell>
                        <TableCell align="center"><Typography variant="subtitle1" sx={{ fontWeight: 'bold'}}>Receipt</Typography></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {billingItems.map((appointment) => (
                        <TableRow
                        key={appointment.booking_id}
                        >
                            <TableCell align="center">{appointment.booking_id}</TableCell>
                            <TableCell align="center">{showIcon(appointment.booking_type_id)}{appointment.booking_type}</TableCell>
                            <TableCell align="center">{appointment.petname}</TableCell>
                            <TableCell align="center">{appointment.pet_owner}</TableCell>
                            <TableCell align="center">{appointment.payment_status}</TableCell>
                            <TableCell align="center">{appointment.invoice_amount}</TableCell>
                            <TableCell align="center">
                                { appointment.invoice_id !== "NA" ?
                                    ( appointment.payment_status === "NOT PAID" ?
                                    <Link to="/manage_invoice"  state= {{ appointment: {appointment} }}>
                                        <IconButton
                                            aria-label="open invoice"
                                            size="small"
                                            color='warning'
                                            >
                                            <EditRounded />
                                        </IconButton>   
                                    </Link>
                                    :
                                    <Link to="/manage_invoice"  state= {{ appointment: {appointment} }}>
                                        <IconButton
                                            aria-label="open invoice"
                                            size="small"
                                            color='primary'
                                            >
                                            <VisibilityRounded />
                                        </IconButton>   
                                    </Link>
                                    )
                                    :
                                    <Link to="/generate_invoice"  state= {{ appointment: {appointment} }}>
                                        <IconButton
                                            aria-label="open invoice"
                                            size="small"
                                            color='error'
                                            >
                                            <AddCircleRounded />
                                        </IconButton>   
                                    </Link>
                                }
                            </TableCell>
                            <TableCell align="center">
                            { appointment.invoice_id !== "NA" ?
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
        </Paper>
        
    </div>
  )
}
