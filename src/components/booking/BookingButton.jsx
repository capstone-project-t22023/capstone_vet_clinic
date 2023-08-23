import React, { useState, useContext } from "react";
import {Box, Button, Typography, Dialog, DialogTitle} from "@mui/material";
import ProgramContext from "../../contexts/ProgramContext";
import {PetsContext} from "../../contexts/PetsProvider";
import BookingOptionsUpdate from "./BookingOptionsUpdate";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";


export default function BookingButton() {
    const {user, authenticated} = useContext(ProgramContext);
    const { selectedAppointment } = useContext(PetsContext)
    const [open, setOpen] = useState(false);
    // const [selectedBooking, setSelectedBooking] = useState();
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
        setOpen(!value);
        console.log(!value)
    };

    const handleCancel = (value) => {
        setOpen(value);
    }

    const isSelectedAppointmentEmpty = Object.keys(selectedAppointment).length === 0;

    const handleRemoveBooking = () => {
        fetch("http://localhost/capstone_vet_clinic/api.php/cancel_booking/"+selectedAppointment.booking_id, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
            body: JSON.stringify({
                prev_booking_status: selectedAppointment.booking_status,
                username: user.username
            })
        })
            .then((response) => {
                return response.json();
            })
            .then(data => {
                console.log(data.cancel_booking);
                // setSelectedBooking(null);
            })
            .catch(error => {
                console.error(error);
            });
    }



    return (
        <>
            {!isSelectedAppointmentEmpty ? (
                <Box>
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

            <Dialog open={open} onClose={handleClose} maxWidth={"md"}>
                <DialogTitle
                    sx={{ mt: 3, p: 2, textAlign: 'center', fontWeight: 'bold' }}>
                    {!isSelectedAppointmentEmpty ? "Already selected:" : "Choose the Date of appointment"}
                </DialogTitle>
                {!isSelectedAppointmentEmpty ? <p className={"text-center text-primary"}>{selectedAppointment.booking_date } <AlarmOnIcon fontSize="small" color="action" /> { selectedAppointment.booking_time +"" }</p> : null}
                <BookingOptionsUpdate onCancel={handleCancel} onSave={handleClose} selectedBooking={selectedAppointment} editMode={editMode}/>
            </Dialog>
        </>
    );
}