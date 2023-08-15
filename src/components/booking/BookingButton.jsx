import * as React from 'react';
import {Box, Button, DialogTitle, Dialog, Typography} from "@mui/material";
import {AlternateEmail} from '@mui/icons-material';
import BookingOptions from './BookingOptions'

function BookingDialog(props) {
    const {open, onClose, onCancel, selectedBooking} = props;

    const handleSelectedDate = (booking) => {
        onClose(booking);
    };

    const handleClose = () => {
        onClose(false);
    }
    const handleCancel = () => {
      onCancel(false)
    }


    return (
        <Dialog open={open} onClose={handleClose} maxWidth={"md"}>
            <DialogTitle sx={{ mt: 3, p: 2, textAlign: 'center', fontWeight: 'bold', color: "primary.main" }}>{selectedBooking ? "Chosen Appointment:" : "Choose the Date of appointment"}</DialogTitle>
            {selectedBooking && <Typography component="p" sx={{ backgroundColor:"secondary.main", color: "secondary.contrastText", py: 1, textAlign: "center"}}>{selectedBooking.Date } <AlternateEmail fontSize="small" color="primary" /> { selectedBooking.TimeSlots +"" }</Typography> }
            <BookingOptions onCancel={handleCancel} sendSelectedBooking={handleSelectedDate}/>
            <Typography component="p" sx={{backgroundColor:"grey.200", color: "grey.500", py: 1, textAlign: "center"}}>note: This dates (02-08-2023 & 04-08-23) do have a bookings...</Typography>
        </Dialog>
    );
}


export default function BookingButton() {
    const [open, setOpen] = React.useState(false);
    const [selectedBooking, setSelectedBooking] = React.useState();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedBooking(value);
        // THIS CAN SEND THE BOOKING TO PARENT
        // booking(value)
    };

    const handleCancel = (value) => {
      setOpen(value)
    }

    const handleRemoveBooking = () => {
      setSelectedBooking(null);
    }

    return (
        <div>
            {selectedBooking ? (
                <Box>
                    <Typography variant="subtitle1" component="div">
                        <p>Selected Date: {selectedBooking ? selectedBooking.Date : "Please select a Date"}</p>
                        <p>Selected Slots: {selectedBooking ? selectedBooking.TimeSlots + "" : "Nothing selected"}</p>
                    </Typography>
                    <Button variant="outlined" onClick={handleRemoveBooking} sx={{ m: 1}}>
                        Remove Booking
                    </Button>
                    <Button variant="contained" onClick={handleClickOpen} sx={{ m: 1}}>
                        Change booking
                    </Button>
                </Box>
            ) : (
                <Button variant="contained" onClick={handleClickOpen}>
                    Make a new booking
                </Button>
            )}
            <BookingDialog open={open} onClose={handleClose} onCancel={handleCancel} selectedBooking={selectedBooking}/>
        </div>
    );
}