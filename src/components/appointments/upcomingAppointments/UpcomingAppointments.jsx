import React from "react";
import {Box, Button, Paper, Divider, IconButton, Stack, Typography} from "@mui/material";
import {AccessTimeFilledRounded, ForwardRounded, ChevronRightRounded} from '@mui/icons-material';
import UpcomingAppointment from "./UpcomingAppointment";


export default function UpcomingAppointments() {
    return (
        <Box flex={1}>
            <Stack direction="row" justifyContent="space-between" width="100%" alignItems="baseline" sx={{mb:2}}>
                <Typography fontWeight="bold">Upcoming appointments</Typography>
                <Button variant="text" size="small" color="secondary">View all <ChevronRightRounded
                    fontSize="inherit"/></Button>
            </Stack>
            <Stack direction="column" spacing={1}>
                <UpcomingAppointment />
                <UpcomingAppointment />
                <UpcomingAppointment />
            </Stack>
        </Box>
    )
}