import React, {useContext, useEffect, useState} from "react";
import {Box, Typography, Button, Stack, Divider} from "@mui/material";
import {ChevronRightRounded} from "@mui/icons-material";
import LastHealthChecksItem from "./LastHealthChecksItem";
import dayjs from "dayjs";
import {PetsContext} from "../../../contexts/PetsProvider";

export default function LastHealthChecks({appointmentList, loading, count = -1}) {
    const [filterMode, setFilterMode] = useState('historic'); // 'all', 'historic', 'future'
    const { changeSidebarContent, updateSelectedAppointment } = useContext(PetsContext)


    const filteredAppointments = appointmentList ? appointmentList.filter(appointment => {
        const currentDate = new Date();
        const appointmentDate = new Date(appointment.booking_date);
        if (filterMode === 'historic') {
            return dayjs(appointmentDate).format('DD-MM-YYYY') < dayjs(currentDate).format('DD-MM-YYYY');
        } else if (filterMode === 'today') {
            return dayjs(appointmentDate).format('DD-MM-YYYY') === dayjs(currentDate).format('DD-MM-YYYY');
        } else if (filterMode === 'future') {
            return dayjs(appointmentDate).format('DD-MM-YYYY') > dayjs(currentDate).format('DD-MM-YYYY');
        }
        return true;
    }) : [];

    // Apply the "count" filter on filteredAppointments
    const displayedAppointments = count === -1 ? filteredAppointments : filteredAppointments.slice(0, count);


    if (!filteredAppointments || filteredAppointments.length === 0) {
        return <Typography fontWeight="bold" color="secondary.300">No previous appointments.</Typography>;
    }

    const handleAppointmentClick = (appointment) => {
        changeSidebarContent("appointment");
        updateSelectedAppointment(appointment);
    }

    console.log(filteredAppointments)

    return (// updatedAppointmentsByDay && updatedAppointmentsByDay.length > 0 && (
        <Box flex={1} sx={{width:"100%"}}>

            <Stack direction="row" justifyContent="space-between" width="100%" alignItems="baseline" sx={{mb: 3}}>
                <Typography fontWeight="bold">Last health checks ({filteredAppointments.length})</Typography>
                <Button variant="text" size="small" color="secondary">View all <ChevronRightRounded
                    fontSize="inherit"/></Button>
            </Stack>
            <Stack direction="column" spacing={3}
                   sx={{
                       "& .MuiAvatar-root": {
                           backgroundColor: "primary.50",
                           // color: "error.light"
                       }, "& h5": {
                           fontWeight: "bold", fontSize: ".875rem"
                       }, "& h6": {
                           color: "text.secondary",
                           textTransform: "uppercase",
                           fontSize: ".75rem",
                           maxWidth: "8rem",
                       }, "& p": {
                           color: "primary.200", textTransform: "uppercase", fontSize: ".75rem", fontWeight: "bold",
                       },
                   }}>
                {displayedAppointments.map((appointment, index) => (
                    <LastHealthChecksItem appointment={appointment} key={index} onClick={() => handleAppointmentClick(appointment)}/>
                ))}
                <Divider flexItem/>
            </Stack>
        </Box>
        // )
    )
}