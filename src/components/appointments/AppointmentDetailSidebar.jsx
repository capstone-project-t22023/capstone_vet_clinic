import React, {useContext, useEffect, useState} from "react";
import {Stack, Typography, Button, IconButton, Divider, Tooltip} from "@mui/material";
import {AutoDeleteRounded, FaceRounded, PaidRounded, PetsRounded} from "@mui/icons-material";
import programContext from "../../contexts/ProgramContext";
import {PetsContext} from "../../contexts/PetsProvider";
import BookingButton from "../booking/BookingButton";
import dayjs from "dayjs";
import Status from "./Status";
import Doctor from "./Doctor";
import BookingType from "./BookingType";

export default function AppointmentDetailSidebar({appointmentId}) {
    const {user} = useContext(programContext);
    const {
        changeSidebarContent,
        updateSelectedPet,
        updateSelectedAppointment,
        updateAppointmentStatus,
        appointmentList
    } = useContext(PetsContext);
    const [appointment, setAppointment] = useState({});

    useEffect(() => {
        if (appointmentList && Object.keys(appointmentList).length > 0) {
            const appointmentsArray = Object.values(appointmentList);
            const foundAppointment = appointmentsArray.find(item => item.booking_id === appointmentId);
            setAppointment(foundAppointment);
        }
    }, [appointmentList, appointmentId]);


    const handleStatusCancel = () => {
        updateAppointmentStatus(appointment, "cancel")
        changeSidebarContent('')
    }

    const handleOpenOwner = () => {
        // changeSidebarContent("owner");
        // updateSelectedOwner(petList.find(owner => owner.pet_owner_id === appointment.pet_owner_id))
        //     need to do the SELECTED USER TAB , what to display
    }
    const handleOpenPet = () => {
        updateSelectedPet(appointment.pet_id);
        updateSelectedAppointment("");
        changeSidebarContent("pet");
    }

    return (
        <Stack direction="column" p={6} spacing={5}>
            {appointment && Object.keys(appointment).length !== 0 && (
                <Stack direction="column" spacing={1}>
                    <Tooltip title={`ID: ${appointment.booking_id}`} placement="top" arrow>
                        <Typography variant="h6">Appointment Details</Typography>
                    </Tooltip>
                    <Status appointment={appointment}/>
                    { user.role !== "pet_owner" && appointment.booking_status === "FINISHED" && !appointment.invoice_id &&
                            <Button onClick={handleStatusCancel} variant="contained" size="small" color="primary"
                                    startIcon={<PaidRounded/>}>Generate Invoice</Button>
                    }
                    <Divider/>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography fontSize="0.75rem"><strong>Date:</strong></Typography>
                        <Typography>{dayjs(appointment.booking_date).format("DD MMMM YYYY")}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography fontSize="0.75rem"><strong>Time:</strong></Typography>
                        <Typography>{appointment.booking_time.join(', ')}</Typography>
                    </Stack>
                    {user.role !== "doctor" && appointment.booking_status !== "FINISHED" &&
                        <>
                            <BookingButton/>
                            <Button onClick={handleStatusCancel} variant="contained" size="small" color="error"
                                    endIcon={<AutoDeleteRounded/>}>Delete Booking</Button>
                        </>
                    }
                    <Divider/>
                    <BookingType type={appointment.booking_type}/>
                    <Doctor id={appointment.doctor_id}/>
                    <Divider/>
                    <Typography><strong>Invoice ID:</strong> {appointment.invoice_id}</Typography>
                    <Typography><strong>Receipt ID:</strong> {appointment.receipt_id}</Typography>
                    {/*<Typography><strong>Updated Date:</strong> {appointment.updated_date}</Typography>*/}
                    <Divider/>
                    {/*<Typography><strong>Pet Owner ID:</strong> {appointment.pet_owner_id}</Typography>*/}
                    {/*<Typography><strong>Username:</strong> {appointment.username}</Typography>*/}
                    {/*<Typography><strong>Pet ID:</strong> {appointment.pet_id}</Typography>*/}
                    <Stack direction="row" spacing={1} alignItems="center">
                        <IconButton color="primary" disabled onClick={handleOpenOwner}>
                            <FaceRounded/>
                        </IconButton>
                        <Typography fontSize="0.75rem"><strong>Owner:</strong></Typography>
                        <Typography>{appointment.pet_owner}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <IconButton color="primary" onClick={handleOpenPet}>
                            <PetsRounded/>
                        </IconButton>
                        <Typography fontSize="0.75rem"><strong>Pet:</strong></Typography>
                        <Typography>{appointment.petname}</Typography>
                    </Stack>
                </Stack>
            )}
            <Stack direction="column" spacing={2}>
                {user.role !== "pet_owner" &&
                    <>


                        <Button disabled variant="outlined" color="error">Update Pet Records??</Button>
                        <Button disabled variant="outlined" color="error">Update Inventory??</Button>
                        <Button disabled variant="outlined" color="error">Generate Invoice??</Button>
                    </>
                }
            </Stack>
        </Stack>
    )
}