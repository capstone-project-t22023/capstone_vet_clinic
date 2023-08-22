import React, {useContext} from "react";
import {Stack, Typography, Button} from "@mui/material";
import programContext from "../../contexts/ProgramContext";
import {PetsContext} from "../../contexts/PetsProvider";
import BookingButton from "../booking/BookingButton";

export default function AppointmentDetailSidebar({appointment}) {
    const {user} = useContext(programContext)
    const {refreshAppointmentList} = useContext(PetsContext)

    const updateStatusToFinish = (appointment) => {
        const reqData = {
            "booking_id": appointment.booking_id,
            "prev_booking_status": "PENDING",
            "new_booking_status": "FINISHED",
            "username": user.username
        }
        console.log("Finish the Appointment/Booking: " + JSON.stringify(reqData));

        fetch("http://localhost/capstone_vet_clinic/api.php/finish_booking", {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
            body: JSON.stringify(reqData)
        })
            .then((response) => {
                if (response.ok) {
                    return response.json(); // Parse response body as JSON
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then(data => {
                if (data.finish_booking && data.finish_booking !== 'error') {
                    // Pet added successfully, you can update UI or take any other actions
                    refreshAppointmentList(true);
                } else {
                    // Handle error case
                }
            })
            .catch(error => {
                console.error('Error adding pet:', error);
            });
    };


    const handleStatusFinished = () => {
        console.log("THIS NEEDS TO BE DONE BY DATABASE");
        updateStatusToFinish(appointment)

    }

    const handleBooking = (booking) => {
      console.log("This is booking", booking)
    }

    return (
        <Stack direction="column" p={6} spacing={5}>
            <Stack direction="column" spacing={1}>
                <Typography variant="h6">Appointment Details</Typography>
                <Typography><strong>Booking ID:</strong> {appointment.booking_id}</Typography>
                <Typography><strong>Booking Date:</strong> {appointment.booking_date}</Typography>
                <Typography><strong>Booking Time:</strong> {appointment.booking_time.join(', ')}</Typography>
                <Typography><strong>Booking Status:</strong> {appointment.booking_status}</Typography>
                <Typography><strong>Booking Type:</strong> {appointment.booking_type}</Typography>
                <Typography><strong>Doctor ID:</strong> {appointment.doctor_id}</Typography>
                <Typography><strong>Invoice ID:</strong> {appointment.invoice_id}</Typography>
                <Typography><strong>Receipt ID:</strong> {appointment.receipt_id}</Typography>
                <Typography><strong>Updated Date:</strong> {appointment.updated_date}</Typography>
                <Typography><strong>Pet Owner ID:</strong> {appointment.pet_owner_id}</Typography>
                <Typography><strong>Username:</strong> {appointment.username}</Typography>
                <Typography><strong>Pet Owner:</strong> {appointment.pet_owner}</Typography>
                <Typography><strong>Pet ID:</strong> {appointment.pet_id}</Typography>
                <Typography><strong>Pet Name:</strong> {appointment.petname}</Typography>
            </Stack>
            <Stack direction="column" spacing={2}>
                <Button onClick={handleStatusFinished} disabled variant="contained" color="error">Mark as
                    FINISHED</Button>
                <Button onClick={handleStatusFinished} variant="outlined" color="error">Add Booking</Button>
                <BookingButton booking={handleBooking} />
                <Button onClick={handleStatusFinished} variant="outlined" color="error">Update Pet Records</Button>
                <Button onClick={handleStatusFinished} variant="outlined" color="error">Update Inventory</Button>
                <Button onClick={handleStatusFinished} variant="outlined" color="error">Generate Invoice</Button>
            </Stack>
        </Stack>
    )
}