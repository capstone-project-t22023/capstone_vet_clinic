import React, { useState, useContext } from "react";
import {Box, Button, DialogTitle, Dialog, Typography} from "@mui/material";
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import BookingOptions from './BookingOptions';
import ProgramContext from "../../ProgramContext";


function BookingDialog(props) {
    const {open, onClose, onCancel, selectedBooking, editMode} = props;

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
            <DialogTitle 
                sx={{ mt: 3, p: 2, textAlign: 'center', fontWeight: 'bold' }}>
                    {selectedBooking ? "Already selected:" : "Choose the Date of appointment"}
            </DialogTitle>
            <Typography 
                component="p" 
                variant="p" 
                sx={{color: "error.main", my: 1, textAlign: "center"}}>
                    This dates do have a bookings: 02-08-2023 & 04-08-23
            </Typography>
            {selectedBooking ? <p className={"text-center text-primary"}>{selectedBooking.booking_date } <AlarmOnIcon fontSize="small" color="action" /> { selectedBooking.booking_time +"" }</p> : null}            
            <BookingOptions 
                onCancel={handleCancel} 
                sendSelectedBooking={handleSelectedDate} 
                selectedBooking={selectedBooking} 
                editMode={editMode}/>
        </Dialog>
    );
}


export default function BookingButton({booking}) {
    const {user, authenticated} = useContext(ProgramContext);
    const [open, setOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState();
    const [editMode, setEditMode] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setEditMode(false);
    };

    const handleChangeBooking = () => {
        setOpen(true);
        setEditMode(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedBooking(value);
        booking(value);
    };

    const handleCancel = (value) => {
      setOpen(value);
    }

    const handleRemoveBooking = () => {
      fetch("http://localhost/capstone_vet_clinic/api.php/cancel_booking/"+selectedBooking.booking_id, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
            body: JSON.stringify({
                prev_booking_status: selectedBooking.booking_status,
                username: user.username
            })
        })
            .then((response) => {
                return response.json();
            })
            .then(data => {
                console.log(data.cancel_booking);
                setSelectedBooking(null);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div>
            {selectedBooking ? (
                <Box>
                    <Typography variant="subtitle1" component="div">
                        <p>Booking ID: {selectedBooking.booking_id}</p>
                        <p>Booking Status: {selectedBooking.booking_status}</p>
                        <p>Date: {selectedBooking.booking_date}</p>
                        <p>Time: {selectedBooking.booking_time.join(",")}</p>
                        <p>Pet Owner: {selectedBooking.pet_owner}</p>
                        <p>Pet: {selectedBooking.petname}</p>
                    </Typography>
                    <Button variant="outlined" onClick={handleRemoveBooking} sx={{ m: 1}}>
                        Remove Booking
                    </Button>
                    <Button variant="contained" onClick={handleChangeBooking} sx={{ m: 1}}>
                        Change booking
                    </Button>
                </Box>
            ) : (
                <Button variant="contained" onClick={handleClickOpen}>
                   Make a new booking
                </Button>
            )}
            <BookingDialog open={open} onClose={handleClose} onCancel={handleCancel} selectedBooking={selectedBooking} editMode={editMode}/>
        </div>
    );
}