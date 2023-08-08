import * as React from 'react';
import {Box, Button, DialogTitle, Dialog, Typography} from "@mui/material";
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
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
            <DialogTitle sx={{ mt: 3, p: 2, textAlign: 'center', fontWeight: 'bold' }}>{selectedBooking ? "Already selected:" : "Choose the Date of appointment"}</DialogTitle>
            {selectedBooking ? <p className={"text-center text-primary"}>{selectedBooking.Date } <AlarmOnIcon fontSize="small" color="action" /> { selectedBooking.TimeSlots +"" }</p> : null}
            <BookingOptions onCancel={handleCancel} sendSelectedBooking={handleSelectedDate}/>
        </Dialog>
    );
}


export default function BookingButton({booking}) {
    const [open, setOpen] = React.useState(false);
    const [selectedBooking, setSelectedBooking] = React.useState();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedBooking(value);
        booking(value)
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