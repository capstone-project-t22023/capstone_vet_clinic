import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import BookingOptions from './BookingOptions'

function SimpleDialog(props) {
    const { open, onClose } = props;

    // const handleClose = () => {
    //     // onClose(selectedValue);
    // };

    const handleSelectedDate = (booking) => {
        onClose(booking);
    };


    return (
        <Dialog open={open}>
            <DialogTitle>Choose the Date of appointment:</DialogTitle>
            <BookingOptions selectedBooking={handleSelectedDate} />
        </Dialog>
    );
}


export default function SimpleDialogDemo() {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <div>
            <Typography variant="subtitle1" component="div">
                <p>Selected Date: {selectedValue? selectedValue.Date : "Please select a Date" }</p>
                <p>Selected Slots: {selectedValue? selectedValue.TimeSlots : "Nothing selected" }</p>
            </Typography>
            <br />
            <Button variant="contained" onClick={handleClickOpen}>
                Select the booking
            </Button>
            <SimpleDialog open={open} onClose={handleClose} />
        </div>
    );
}