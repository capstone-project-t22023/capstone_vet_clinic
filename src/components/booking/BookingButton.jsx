import React, { useState, useContext } from "react";
import { Button, Dialog, DialogTitle, Stack} from "@mui/material";
import {PetsContext} from "../../contexts/PetsProvider";
import BookingOptions from "./BookingOptions";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import dayjs from "dayjs";
import { EventRepeatRounded} from "@mui/icons-material";


export default function BookingButton() {
    const { selectedAppointment } = useContext(PetsContext)
    const [open, setOpen] = useState(false);
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
    };

    const handleCancel = (value) => {
        setOpen(value);
    }

    const isSelectedAppointmentEmpty = Object.keys(selectedAppointment).length === 0;




    return (
        <>
            {!isSelectedAppointmentEmpty ? (
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" onClick={handleChangeBooking} fullWidth size="small" endIcon={<EventRepeatRounded />}>
                        Change Booking
                    </Button>
                </Stack>
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
                {!isSelectedAppointmentEmpty ? <p className={"text-center text-primary"}>{dayjs(selectedAppointment.booking_date).format("DD MMM YYYY") } <AlarmOnIcon fontSize="small" color="secondary" /> { selectedAppointment.booking_time +"" }</p> : null}
                <BookingOptions onCancel={handleCancel} onSave={handleClose} selectedBooking={selectedAppointment} editMode={editMode} />
            </Dialog>
        </>
    );
}