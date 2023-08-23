import React, {useState} from "react";
import { Button, Stack, Typography } from "@mui/material"


export default function MainMenu() {

    return(
        <>
                <Typography component="a" href={"/bookings"}><Button color={"secondary"} variant="contained" size={"small"}>Bookings</Button></Typography>
                <Typography component="a" href={"/profile"}><Button color={"secondary"} variant="contained" size={"small"}>Update Profile</Button></Typography>
                <Typography component="a" href={"#"}><Button color={"secondary"} variant="outlined" size={"small"}>Manage Pets</Button></Typography>
                <Typography component="a" href={"#"}><Button color={"secondary"} variant="outlined" size={"small"}>Open Pet's medical records</Button></Typography>
        </>
    )

}