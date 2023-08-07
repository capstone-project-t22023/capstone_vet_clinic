import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import BookingOptions from './BookingOptions'
import {Box} from "@mui/material";

function SimpleDialog(props) {
    const {open, onClose, selectedBooking} = props;

    const handleSelectedDate = (booking) => {
        onClose(booking);
    };

    const handleClose = () => {
        onClose(false);
    }


    return (
        <Dialog open={open} onClose={handleClose} >
            <DialogTitle sx={{ m: 0, p: 2 }}>Choose the Date of appointment:</DialogTitle>
            <BookingOptions selectedBooking={selectedBooking} onClose={handleClose}  sendSelectedBooking={handleSelectedDate}/>
        </Dialog>
    );
}


export default function SimpleDialogDemo() {
    const [open, setOpen] = React.useState(false);
    const [selectedBooking, setSelectedBooking] = React.useState();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedBooking(value);
    };

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
                    Select the booking
                </Button>
            )}
            <SimpleDialog open={open} onClose={handleClose} selectedBooking={selectedBooking}/>
        </div>
    );
}