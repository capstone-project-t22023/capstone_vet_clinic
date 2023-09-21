import React, {useContext, useState} from "react";
import {Box, Typography, Button, Stack, Divider, Pagination} from "@mui/material";
import {ChevronRightRounded} from "@mui/icons-material";
import LastHealthChecksItem from "./LastHealthChecksItem";
import dayjs from "dayjs";
import {PetsContext} from "../../../contexts/PetsProvider";

export default function LastHealthChecks({filterMode = 'all', count = -1, itemsPerPage = 5, doctor = false, status = '', appointmentList}) {
    const { changeSidebarContent, updateSelectedAppointment } = useContext(PetsContext)
    const [currentPage, setCurrentPage] = useState(1);
    const [newCount, setNewCount] = useState(count)


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


    // filter for number of total appointments to show
    const slicedByCountAppointments = newCount === -1 ? filteredAppointments : filteredAppointments.slice(0, newCount);

    if (!filteredAppointments || filteredAppointments.length === 0) {
        return <Typography fontWeight="bold" color="grey.300">No {filterMode==='future'? 'upcoming' : 'previous'} appointments.</Typography>;
    }


    const totalPages = Math.ceil(slicedByCountAppointments.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const displayedAppointments = itemsPerPage === -1 ? slicedByCountAppointments : slicedByCountAppointments.slice(startIndex, endIndex);

    const finalCount = slicedByCountAppointments.length;

    const handleAppointmentClick = (appointment) => {
        updateSelectedAppointment(appointment);
        changeSidebarContent("appointment");
    }

    return (
        <Box flex={1} sx={{width:"100%"}}>

            <Stack direction="row" justifyContent="space-between" width="100%" alignItems="baseline" sx={{mb: 3}}>
                <Typography fontWeight="bold" color="secondary.500">
                    {filterMode === 'future'
                        ? (finalCount !== 0
                            ? `Upcoming ${finalCount}`
                            : 'No upcoming')
                        : filterMode === 'today'
                            ? (finalCount !== 0
                                ? `Today's ${finalCount}`
                                : 'No today\'s')
                            : filterMode === 'historic'
                                ? (finalCount !== 0
                                    ? `Historical ${finalCount}`
                                    : 'No historical')
                                : (finalCount !== 0
                                    ? `${finalCount} All`
                                    : 'No')} appointments
                </Typography>
                {newCount !== -1 && finalCount !== 0 && finalCount !== filteredAppointments.length &&
                    <Button variant="text" size="small" color="secondary" onClick={() => setNewCount(-1)}>Show all
                        ({filteredAppointments.length})
                        <ChevronRightRounded fontSize="inherit"/>
                    </Button>
                }
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
                {totalPages > 1 &&
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={(event, page) => setCurrentPage(page)}
                        color="primary"
                    />
                }
            </Stack>
        </Box>
    )
}

