import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import BookingOptions from './BookingOptions'

function SimpleDialog(props) {
    const { open, onClose } = props;

    const handleClose = () => {
        // onClose(selectedValue);
    };

    const handleSelectedDate = (booking) => {
        onClose(booking);
    };


    return (
        <Dialog onClose={handleClose} open={open}>
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
                {/*Selected: {selectedValue? selectedValue.selectedDate : "Please select a Date" }*/}
                Selected Date: {selectedValue? selectedValue.selectedDate : "Please select a Date" }
                Selected Slots: {selectedValue? selectedValue.selectedTimeSlots : "Please select a Date" }
            </Typography>
            <br />
            <Button variant="contained" onClick={handleClickOpen}>
                Open dialog with calendar in
            </Button>
            <SimpleDialog open={open} onClose={handleClose} />
        </div>
    );
}