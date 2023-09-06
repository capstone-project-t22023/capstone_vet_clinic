import React from "react";
import {Alert, Stack, Typography} from "@mui/material";
import {CheckRounded, DoneOutlineRounded, ReportRounded} from "@mui/icons-material";

export default function Status({type}) {
    let alert = false;
    let message = false;

    if (type === "FINISHED") {
        alert = "info";
        message = "Finished";
    } else if (type === "PENDING") {
        alert = "warning";
        message = "Not confirmed yet";
    } else if (type === "CONFIRMED") {
        alert = "success";
        message = "Confirmed";
    }

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Typography><strong>Status:</strong></Typography>

                <Alert
                    sx={{flex: 1}}
                    iconMapping={{
                        success: <CheckRounded fontSize="inherit"/>,
                        info: <DoneOutlineRounded fontSize="inherit"/>,
                        warning: <ReportRounded fontSize="inherit"/>,
                    }}
                    severity={alert}
                >
            <Typography sx={{fontSize: "0.75rem"}}>
                    {message}
            </Typography>

                </Alert>


        </Stack>
    );
}