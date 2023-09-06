import React, {useContext, useEffect, useState} from "react";
import {Stack, Typography, Button, Divider} from "@mui/material";
import programContext from "../../contexts/ProgramContext";
import {PetsContext} from "../../contexts/PetsProvider";
import BookingButton from "../booking/BookingButton";
import dayjs from "dayjs";
import Status from "./Status";
import Doctor from "./Doctor";

export default function AppointmentDetailSidebar({appointmentId}) {
    const {user} = useContext(programContext);
    const {handlerRefreshAppointments, appointmentList} = useContext(PetsContext);
    const [appointment, setAppointment] = useState({});

    useEffect(() => {
        if (appointmentList && Object.keys(appointmentList).length > 0) {
            const appointmentsArray = Object.values(appointmentList);
            const foundAppointment = appointmentsArray.find(item => item.booking_id === appointmentId);
            setAppointment(foundAppointment);
        }
    }, [appointmentList, appointmentId]);

    const updateAppointmentStatus = (appointment, toStatus) => {

        const url = `http://localhost/capstone_vet_clinic/api.php/${toStatus}_booking/${appointment.booking_id}`;

        console.log("Change Appointment Status: ", appointment, url);

        fetch(url, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json(); // Parse response body as JSON
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then(data => {
                if (data && data !== 'error') {
                    // Appointment finished successfully, you can update UI or take any other actions
                    handlerRefreshAppointments(true);
                } else {
                    // Handle error case
                    console.error('Error finishing appointment:', data.error_message);
                }
            })
            .catch(error => {
                console.error('Error finishing appointment:', error);
            });
    };


    const handleStatusFinished = () => {
        updateAppointmentStatus(appointment, "finish")
    }
    const handleStatusConfirmed = () => {
        updateAppointmentStatus(appointment, "confirm")
    }
    const handleStatusCancel = () => {
        updateAppointmentStatus(appointment, "cancel")
    }

    const isFinished = () => {
        return appointment && appointment.booking_status === 'FINISHED'
    }
    const isPending = () => {
        return appointment && appointment.booking_status === 'PENDING'
    }
    const isConfirmed = () => {
        return appointment && appointment.booking_status === 'CONFIRMED'
    }


    return (
        <Stack direction="column" p={6} spacing={5}>
            {appointment && Object.keys(appointment).length !== 0 && (
                <Stack direction="column" spacing={1}>
                    <Typography variant="h6">Appointment Details</Typography>
                    <Divider/>
                    <Status type={appointment.booking_status}/>
                    <Typography><strong>Booking ID:</strong> {appointment.booking_id}</Typography>
                    <Typography><strong>Booking Date:</strong> {dayjs(appointment.booking_date).format("DD MMM YYYY")}
                    </Typography>
                    <Typography><strong>Booking Time:</strong> {appointment.booking_time.join(', ')}</Typography>
                    <Typography><strong>Booking Type:</strong> {appointment.booking_type}</Typography>
                    <Divider/>
                    <Doctor id={appointment.doctor_id}/>
                    <Typography><strong>Invoice ID:</strong> {appointment.invoice_id}</Typography>
                    <Typography><strong>Receipt ID:</strong> {appointment.receipt_id}</Typography>
                    {/*<Typography><strong>Updated Date:</strong> {appointment.updated_date}</Typography>*/}
                    <Divider/>
                    {/*<Typography><strong>Pet Owner ID:</strong> {appointment.pet_owner_id}</Typography>*/}
                    {/*<Typography><strong>Username:</strong> {appointment.username}</Typography>*/}
                    <Typography><strong>Pet Owner:</strong> {appointment.pet_owner}</Typography>
                    {/*<Typography><strong>Pet ID:</strong> {appointment.pet_id}</Typography>*/}
                    <Typography><strong>Pet Name:</strong> {appointment.petname}</Typography>
                </Stack>
            )}
            <Stack direction="column" spacing={2}>
                <BookingButton/>
                {user.role !== "pet_owner" &&
                    <>
                        {user.role === "admin" &&
                            <Button onClick={isPending() ? handleStatusConfirmed : isConfirmed() ? handleStatusFinished : null} variant="contained" disabled={isFinished()}
                                    color={isPending() ? "secondary" : isConfirmed() ? "error" : "primary"}>
                                {isPending() ? "Mark as Confirmed" : isConfirmed() ? "Mark as Finished" : isFinished() ? "this is final status" : "error??"}</Button>
                        }
                        {user.role === "doctor" && !isPending() &&
                            <Button onClick={handleStatusFinished} variant="contained" disabled={isFinished()}
                                    color="error">
                                {isConfirmed() ? "Mark as Finished" : isFinished() ? "this is final status" : "error??"}</Button>
                        }


                        <Button onClick={handleStatusCancel} variant="outlined" color="error">Cancel Booking</Button>



                        <Button onClick={handleStatusFinished} disabled variant="outlined" color="error">Update Pet
                            Records??</Button>
                        <Button onClick={handleStatusFinished} disabled variant="outlined" color="error">Update
                            Inventory??</Button>
                        <Button onClick={handleStatusFinished} disabled variant="outlined" color="error">Generate
                            Invoice??</Button>
                    </>
                }
            </Stack>
        </Stack>
    )
}