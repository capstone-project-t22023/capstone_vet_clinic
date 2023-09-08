import React, {useContext} from "react";
import {Alert, Button, Stack, Typography} from "@mui/material";
import {CheckRounded, DoneOutlineRounded, ReportRounded} from "@mui/icons-material";
import {PetsContext} from "../../contexts/PetsProvider";
import programContext from "../../contexts/ProgramContext";

export default function Status({appointment}) {
    let alert = '';
    let message = false;

    if (appointment.booking_status === "FINISHED") {
        alert = "info";
        message = "Finished";
    } else if (appointment.booking_status === "PENDING") {
        alert = "warning";
        message = "Not confirmed yet";
    } else if (appointment.booking_status === "CONFIRMED") {
        alert = "success";
        message = "Confirmed";
    }

    const {handlerRefreshAppointments, updateAppointmentStatus} = useContext(PetsContext);
    const {user} = useContext(programContext)


    const handleStatusFinished = () => {
        updateAppointmentStatus(appointment, "finish")
    }
    const handleStatusConfirmed = () => {
        updateAppointmentStatus(appointment, "confirm")
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
        <Stack direction="row" spacing={1} alignItems="center">
            {/*<Typography><strong>Status:</strong></Typography>*/}
            <Alert
                sx={{flex: 1}}
                iconMapping={{
                    success: <CheckRounded fontSize="inherit"/>,
                    info: <DoneOutlineRounded fontSize="inherit"/>,
                    warning: <ReportRounded fontSize="inherit"/>,
                }}
                severity={alert}
            >
                <Typography sx={{fontSize: "0.75rem"}} flex={1}>
                    {message}
                </Typography>
            </Alert>
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">

                {user.role === "admin" && !isFinished &&
                    <Button onClick={isPending() ? handleStatusConfirmed : isConfirmed() ? handleStatusConfirmed : null} variant="contained" color="error"
                            size="small">{isPending() ? "Confirm >>" : isConfirmed() ? "<< Remove Confirm" : ""}</Button>
                }
                {user.role === "doctor" && isConfirmed() &&
                    <Button onClick={handleStatusFinished} variant="contained" color="primary"
                            size="small">Finish</Button>
                }

            </Stack>


        </Stack>
    );
}