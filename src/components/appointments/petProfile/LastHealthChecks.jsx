import React, {useEffect, useState} from "react";
import {Box, Typography, Button, Stack, Divider} from "@mui/material";
import {ChevronRightRounded} from "@mui/icons-material";
import LastHealthChecksItem from "./LastHealthChecksItem";
import dayjs from "dayjs";

export default function LastHealthChecks({appointmentList, loading, count = -1}) {
    const [mergedAppointments, setMergedAppointments] = useState([]);
    const [filterMode, setFilterMode] = useState('all'); // 'all', 'historic', 'future'

    useEffect(() => {
        const merged = {};
        if (Array.isArray(appointmentList)) {
            appointmentList.forEach(appointment => {
                const bookingId = appointment.booking_id;
                if (!merged[bookingId]) {
                    merged[bookingId] = {...appointment, booking_time: [appointment.booking_time]};
                } else {
                    merged[bookingId].booking_time.push(appointment.booking_time);
                }
            });
        }

        const sortedMerged = Object.values(merged).sort((b, a) =>
            a.booking_date.localeCompare(b.booking_date)
        );

        setMergedAppointments(sortedMerged);
    }, [appointmentList]);


    const filteredAppointments = mergedAppointments.filter(appointment => {
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
    });


    // Apply the "count" filter on filteredAppointments
    const displayedAppointments = count === -1 ? filteredAppointments : filteredAppointments.slice(0, count);


    if (!Array.isArray(appointmentList) || appointmentList.length === 0) {
        return <Typography fontWeight="bold" color="secondary.300">No previous appointments.</Typography>;
    }


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
                {filteredAppointments.map((appointment, index) => (
                    <LastHealthChecksItem appointment={appointment} key={index}/>
                ))}
                <Divider flexItem/>
            </Stack>
        </Box>
        // )
    )
}