import React, {useContext, useEffect, useState} from "react";
import {Stack, Typography, Button, Divider} from "@mui/material";
import programContext from "../../contexts/ProgramContext";
import {PetsContext} from "../../contexts/PetsProvider";
import BookingButton from "../booking/BookingButton";

export default function AppointmentDetailSidebar({appointment}) {
    const {user} = useContext(programContext)
    const {handlerRefreshAppointments, appointmentList} = useContext(PetsContext)
    const [appointmentData, setAppointmentData] = useState({})

    console.log("THISNOW appointmentList", appointmentList, appointment)

    let appointmentShow = null; // Initialize the appointment variable

// Check if appointmentList is not empty
    if (appointmentList && Object.keys(appointmentList).length > 0) {
        // Use Object.values to get an array of appointments, then find the desired appointment
        const appointmentsArray = Object.values(appointmentList);
        appointmentShow = appointmentsArray.find(item => item.booking_id === appointment.booking_id);
    }

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
        updateStatusToFinish(appointmentShow)

    }

    const handleBooking = (booking) => {
        console.log("This is booking", booking)
    }

    return (
        <Stack direction="column" p={6} spacing={5}>
            {appointmentShow &&
                <Stack direction="column" spacing={1}>
                    <Typography variant="h6">Appointment Details</Typography>
                    <Divider/>
                    <Typography><strong>Booking ID:</strong> {appointmentShow.booking_id}</Typography>
                    <Typography><strong>Booking Date:</strong> {appointmentShow.booking_date}</Typography>
                    <Typography><strong>Booking Time:</strong> {appointmentShow.booking_time.join(', ')}</Typography>
                    <Typography><strong>Booking Status:</strong> {appointmentShow.booking_status}</Typography>
                    <Typography><strong>Booking Type:</strong> {appointmentShow.booking_type}</Typography>
                    <Typography><strong>Doctor ID:</strong> {appointmentShow.doctor_id}</Typography>
                    <Typography><strong>Invoice ID:</strong> {appointmentShow.invoice_id}</Typography>
                    <Typography><strong>Receipt ID:</strong> {appointmentShow.receipt_id}</Typography>
                    <Typography><strong>Updated Date:</strong> {appointmentShow.updated_date}</Typography>
                    <Typography><strong>Pet Owner ID:</strong> {appointmentShow.pet_owner_id}</Typography>
                    <Typography><strong>Username:</strong> {appointmentShow.username}</Typography>
                    <Typography><strong>Pet Owner:</strong> {appointmentShow.pet_owner}</Typography>
                    <Typography><strong>Pet ID:</strong> {appointmentShow.pet_id}</Typography>
                    <Typography><strong>Pet Name:</strong> {appointmentShow.petname}</Typography>
                </Stack>
            }
            <Stack direction="column" spacing={2}>
                <BookingButton/>
                <Button onClick={handleStatusFinished} disabled variant="contained" color="error">Mark as
                    FINISHED</Button>
                <Button onClick={handleStatusFinished} disabled variant="outlined" color="error">Update Pet
                    Records??</Button>
                <Button onClick={handleStatusFinished} disabled variant="outlined" color="error">Update
                    Inventory??</Button>
                <Button onClick={handleStatusFinished} disabled variant="outlined" color="error">Generate
                    Invoice??</Button>
            </Stack>
        </Stack>
    )
}