import React, {useContext, useEffect, useState} from "react";
import {Box, Button, Paper, Divider, IconButton, Stack, Typography} from "@mui/material";
import {AccessTimeFilledRounded, ForwardRounded, ChevronRightRounded} from '@mui/icons-material';
import UpcomingAppointmentsItem from "./UpcomingAppointmentsItem";
import dayjs from "dayjs";
import {PetsContext} from "../../../contexts/PetsProvider";


export default function UpcomingAppointments({filter}) {


    // APPOINTMENTS LIST
    const [loading, setLoading] = useState(true);
    const [appointmentList, setAppointmentList] = useState([]);
    const {selectedOwner} = useContext(PetsContext)

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
                console.log("Upcomming appointments",data.bookings)
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
            a.booking_date.localeCompare(b.booking_date)
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

    const handleFilter = (filter) => {
        setFilterMode(filter);
    }





    return (
        <Stack direction="Column" flex={1} sx={{border: "1px solid", borderColor: "primary.50", borderRadius:6, px:2, py:2}}>
            <Stack direction="row" justifyContent="space-between" width="100%" alignItems="baseline" sx={{mb:2}}>
                <Typography fontWeight="bold">
                    {filter === 'future'
                        ? 'Upcoming'
                        : filter === 'today'
                            ? `Today's`
                            : filter === 'historic'
                                ? 'Historical'
                                : 'All'} appointments
                </Typography>
                <Button variant="text" size="small" color="secondary">View all <ChevronRightRounded
                    fontSize="inherit"/></Button>
            </Stack>
            <Stack direction="column" spacing={1} flex={1} alignItems="center">

                {(!Array.isArray(filteredAppointments) || filteredAppointments.length === 0) ? (
                        <Typography fontWeight="bold" color="grey.300">No Records.</Typography>
                ) : (
                    filteredAppointments.map((appointment, index) => (
                        <UpcomingAppointmentsItem appointment={appointment} key={index} />
                    ))
                )}



            </Stack>
        </Stack>
    )
}