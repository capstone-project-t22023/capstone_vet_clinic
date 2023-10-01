import React, { useState, useEffect, useContext } from 'react';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper,
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
                    <StyledTableRow>
                        <StyledTableCell align="center"><Typography variant="subtitle1" sx={{ fontWeight: 'bold'}}>Booking ID</Typography></StyledTableCell>
                        <StyledTableCell align="center"><Typography variant="subtitle1" sx={{ fontWeight: 'bold'}}>Booking Type</Typography></StyledTableCell>
                        <StyledTableCell align="center"><Typography variant="subtitle1" sx={{ fontWeight: 'bold'}}>Pet Name</Typography></StyledTableCell>
                        <StyledTableCell align="center"><Typography variant="subtitle1" sx={{ fontWeight: 'bold'}}>Pet Owner</Typography></StyledTableCell>
                        <StyledTableCell align="center"><Typography variant="subtitle1" sx={{ fontWeight: 'bold'}}>Payment Status</Typography></StyledTableCell>
                        <StyledTableCell align="center"><Typography variant="subtitle1" sx={{ fontWeight: 'bold'}}>Amount Due</Typography></StyledTableCell>
                        <StyledTableCell align="center"><Typography variant="subtitle1" sx={{ fontWeight: 'bold'}}>Invoice</Typography></StyledTableCell>
                        <StyledTableCell align="center"><Typography variant="subtitle1" sx={{ fontWeight: 'bold'}}>Receipt</Typography></StyledTableCell>
                    </StyledTableRow>
                    </TableHead>
                    <TableBody>
                    {billingItems.map((appointment) => (
                        <StyledTableRow
                        key={appointment.booking_id}
                        >
                            <StyledTableCell align="center">{appointment.booking_id}</StyledTableCell>
                            <StyledTableCell align="center">{showIcon(appointment.booking_type_id)}{appointment.booking_type}</StyledTableCell>
                            <StyledTableCell align="center">{appointment.petname}</StyledTableCell>
                            <StyledTableCell align="center">{appointment.pet_owner}</StyledTableCell>
                            <StyledTableCell align="center">{appointment.payment_status}</StyledTableCell>
                            <StyledTableCell align="center">{appointment.invoice_amount}</StyledTableCell>
                            <StyledTableCell align="center">
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
                            </StyledTableCell>
                            <StyledTableCell align="center">
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
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
        
    </div>
  )
}
