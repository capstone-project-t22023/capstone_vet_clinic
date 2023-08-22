import React, {useContext, useEffect, useState} from "react";
import {Box, Button, Pagination, Paper, Divider, IconButton, Stack, Typography} from "@mui/material";
import {AccessTimeFilledRounded, ForwardRounded, ChevronRightRounded} from '@mui/icons-material';
import AppointmentsItem from "./AppointmentsItem";
import dayjs from "dayjs";
import {PetsContext} from "../../contexts/PetsProvider";


export default function Appointments({filter = 'all', count = -1, itemsPerPage = 5}) {


    // APPOINTMENTS LIST
    const [loading, setLoading] = useState(true);
    const [appointmentList, setAppointmentList] = useState([]);
    const {selectedOwner} = useContext(PetsContext)

    const [currentPage, setCurrentPage] = useState(1);

    const getAppointments = (filter, filterValue) => {
        const requestData = {
            filter: filter,
            filter_value: selectedOwner.username
        };
        fetch("http://localhost/capstone_vet_clinic/api.php/search_booking", {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
            body: JSON.stringify(requestData)
        })
            .then(response => response.json())
            .then(data => {
                setAppointmentList(data.bookings)
            })
            .catch(error => {
                console.error('Error:', error);
            });
        return true
    };


    useEffect(() => {
        if (Object.keys(selectedOwner).length > 0) {
            setAppointmentList(getAppointments('username', selectedOwner.username));
        }
    }, [selectedOwner]);


    const [mergedAppointments, setMergedAppointments] = useState([]);
    const [filterMode, setFilterMode] = useState(filter); // 'all', 'historic', 'future'

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
           filter === 'historic' || filter === 'all' ? a.booking_date.localeCompare(b.booking_date) : b.booking_date.localeCompare(a.booking_date)
        );


        setMergedAppointments(sortedMerged);
    }, [appointmentList]);


    const filteredAppointments = mergedAppointments.filter(appointment => {
        const currentDate = new Date();
        const appointmentDate = new Date(appointment.booking_date);
        if (filterMode === 'historic') {
            return appointmentDate < currentDate;
        } else if (filterMode === 'future') {
            return appointmentDate >= currentDate;
        } else if (filterMode === 'today') {
            return appointmentDate === currentDate;
        }
        return true;
    });

    // filter for number of total appointments to show
    const slicedByCountAppointments = count === -1 ? filteredAppointments : filteredAppointments.slice(0, count);


    const totalPages = Math.ceil(slicedByCountAppointments.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const displayedAppointments = itemsPerPage === -1 ? slicedByCountAppointments : slicedByCountAppointments.slice(startIndex, endIndex);

    count = slicedByCountAppointments.length;


    return (
        <Stack direction="column" flex={1} sx={{border: "1px solid", borderColor: "primary.50", borderRadius:6, px:2, py:2}}>
            <Stack direction="row" justifyContent="space-between" width="100%" alignItems="baseline" sx={{mb:2}}>
                <Typography fontWeight="bold">
                    {filter === 'future'
                        ? (count !== 0
                            ? `Upcoming ${count}`
                            : 'No upcoming')
                        : filter === 'today'
                            ? (count !== 0
                                ? `Today's ${count}`
                                : 'No today\'s')
                            : filter === 'historic'
                                ? (count !== 0
                                    ? `Historical ${count}`
                                    : 'No historical')
                                : (count !== 0
                                    ? `${count} All`
                                    : 'No')} appointments
                </Typography>
                <Button variant="text" size="small" color="secondary" onClick={() => count = -1}>List all ({filteredAppointments.length +"/"+ count})<ChevronRightRounded
                    fontSize="inherit"/></Button>
            </Stack>
            <Stack direction="column" spacing={1} flex={1} alignItems="center">

                {(!Array.isArray(displayedAppointments) || displayedAppointments.length === 0) ? (
                    <Typography fontWeight="bold" color="grey.300">No Records.</Typography>
                ) : (
                    displayedAppointments.map((appointment, index) => (
                        <AppointmentsItem appointment={appointment} key={index} />
                    ))
                )}
                {totalPages > 1 &&
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={(event, page) => setCurrentPage(page)}
                        color="primary"
                    />
                }

            </Stack>
        </Stack>
    )
}