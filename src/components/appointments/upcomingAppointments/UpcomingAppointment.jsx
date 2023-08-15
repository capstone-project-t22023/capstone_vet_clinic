import React from "react";
import {Stack, Typography, Divider,IconButton} from "@mui/material";
import { AccessTimeFilledRounded, ForwardRounded } from "@mui/icons-material";


const SxUpcomingAppointment = {
    flex: 1,
    borderRadius: 4,
    backgroundColor: "white",
    border: "1px solid white",
    transition: '0.6s ease-in-out',
    position: "relative",
    pr: 3,
    "& .MuiStack-root": {
        px: 3,
        py: 2,
        // alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        "& p, & span, & .MuiTypography-timeSlots": {
            fontSize: 14,
        },
        "& .MuiTypography-timeSlots": {
            color: "text.secondary",
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
    ":hover": {
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
    }
}
export default function UpcomingAppointment(){
    return(
        <Stack direction="row" spacing={0} sx={SxUpcomingAppointment}>
            <Stack direction="column" flex={0} alignItems="center">
                <Typography component="span">Jan</Typography>
                <Typography component="p">27</Typography>
            </Stack>
            <Divider orientation="vertical" flexItem/>
            <Stack direction="column" flex={1} alignItems="flex-start">
                <Typography component="p">Dentist: Dr. Joshua Rassel</Typography>
                <Typography component="span" variant="timeSlots"
                            sx={{color: "text.secondary"}}><AccessTimeFilledRounded
                    fontSize="inherit" sx={{mr: 1}}/>10:00 AM - 10:30 AM</Typography>
            </Stack>
            <IconButton aria-label="more" disabled color="primary">
                <ForwardRounded/>
            </IconButton>
        </Stack>
    )
}