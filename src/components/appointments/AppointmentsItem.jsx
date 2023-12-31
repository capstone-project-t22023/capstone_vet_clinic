import React from "react";
import {AccessTimeFilledRounded, ForwardRounded} from "@mui/icons-material";
import {Stack, Tooltip, IconButton, Divider, Typography} from "@mui/material";
import dayjs from "dayjs";
import Doctor from "./Doctor";
import BookingType from "./BookingType";


export default function AppointmentsItem({appointment, onClick, isSelected}) {

    const hoverStyles = {
        backgroundColor: "primary.50",
        borderColor: "primary.light",
        cursor: "pointer",

        "& .Mui-disabled": {
            display: "absolute",
            color: "primary.main",
            opacity: 1,
            right: 5,
        },

        "& .MuiTypography-timeSlots": {
            color: "primary.main",
            transition: 'color 0.6s ease-in-out',
        },
    };


    const SxUpcomingAppointment = {
        flex: 0,
        width: "100%",
        borderRadius: 4,
        border: "1px solid white",
        backgroundColor: isSelected ? "secondary.50" : "white",
        borderColor: isSelected ? "secondary.light" : "none",
        transition: '0.6s ease-in-out',
        position: "relative",
        // appointment.booking_status ==='PENDING'? "disabled" : "secondary",
        pr: 3,
        "& > .MuiStack-root": {
            px: 3,
            py: 2,
            justifyContent: "center",
            flexShrink: 0,
            "& p, & span, & .MuiTypography-timeSlots": {
                fontSize: 14,
            },
            "& .MuiTypography-timeSlots": {
                color: isSelected ? "primary.main" : "text.secondary",
            },
            "& p": {
                color: "text.primary",
                fontWeight: 600,
            },
            "& span": {
                color: "primary.main"
            },
        },
        "& .Mui-disabled": {
            // display: "none",
            opacity: 0,
            position: 'absolute',
            right: -5,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1,
            transition: 'opacity 0.6s ease-in-out, right 0.3s ease-in-out'
        },

        ":hover": hoverStyles
    }


    return (
        <Tooltip title={`${appointment.booking_type} - ${appointment.booking_status} - ${appointment.petname}`}
                 placement="top">
            <Stack direction="row" spacing={0} flex={0} sx={SxUpcomingAppointment} onClick={() => onClick(!isSelected)}>
                <Stack direction="column" flex={0} alignItems="center" sx={{minWidth: "6rem"}}>
                    <Typography component="span">{dayjs(appointment.booking_date).format('MMMM')}</Typography>
                    <Typography component="p" sx={{whiteSpace: "nowrap"}}>{dayjs(appointment.booking_date).format('D ddd')}</Typography>
                </Stack>
                <Divider orientation="vertical" flexItem/>
                <Stack direction="column" flex={1} alignItems="flex-start">
                    <Stack direction="row" spacing={1} justifyContent="space-between">
                        <BookingType type={appointment.booking_type} icon simple/>
                        <Typography component="p" sx={{"& strong": {color: "grey.700", fontSize: "0.675rem"}}}>
                            <Doctor id={appointment.doctor_id} simple/>
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        {appointment && appointment.booking_time.length > 0 && (
                            appointment.booking_time.map((timeSlot, index) => (
                                <Stack direction="row" spacing={1} key={index}>
                                    <Typography component="span" variant="timeSlots">
                                        <AccessTimeFilledRounded fontSize="inherit"/>
                                    </Typography>

                                    <Typography component="span" variant="timeSlots">
                                        {timeSlot}
                                    </Typography>
                                </Stack>
                            ))
                        )}
                    </Stack>
                </Stack>
                <IconButton aria-label="more" disabled color="primary">
                    <ForwardRounded/>
                </IconButton>
            </Stack>
        </Tooltip>
    )
}