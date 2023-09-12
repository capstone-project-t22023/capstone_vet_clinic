import React from "react";
import {Stack, Box, Avatar, Tooltip, Divider, Typography} from "@mui/material";
import {FavoriteRounded, FavoriteBorderRounded} from "@mui/icons-material";
import dayjs from "dayjs";
import BookingType from "../BookingType";


export default function LastHealthChecksItem({appointment, onClick}) {
    return (
        <Tooltip title={`${appointment.booking_status} - ${appointment.booking_type}`} placement="left" arrow>
            <Stack direction="row" spacing={2} onClick={onClick}>
                <Stack direction="column" flex={0} alignItems="center">
                    <Avatar>
                        {/*<FavoriteBorderRounded fontSize="small"/>*/}
                        {/*<FavoriteRounded fontSize="small" color={appointment.booking_status ==='PENDING'? "disabled" : "secondary"}/>*/}
                        <BookingType type={appointment.booking_type} icon simple />
                    </Avatar>
                </Stack>
                <Stack direction="column" flex={1} flexWrap="wrap" alignItems="flex-start">
                    <Typography component="h5">{appointment.doctor_id ? appointment.doctor_id : "No-Doctor"} - {appointment.booking_type}</Typography>
                    {appointment && appointment.booking_time.length > 1 ? (
                        <Stack direction="row" spacing={1}>
                            {appointment.booking_time.map((timeSlot, index) => (
                                <Typography component="p" key={index}>{timeSlot}</Typography>
                            ))}
                        </Stack>
                    ) : (
                        <Typography component="p">{appointment.booking_time[0]}</Typography>
                    )}

                </Stack>
                <Stack direction="column" flex={0}>
                    <Typography component="p" sx={{whiteSpace: "nowrap"}}>{dayjs(appointment.booking_date).format('DD-MM-YYYY')}</Typography>
                </Stack>
            </Stack>
        </Tooltip>
    )
}