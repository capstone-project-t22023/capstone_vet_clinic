import React from "react";
import {Link, useNavigate} from "react-router-dom"
import { Button } from "@mui/material"


export default function MainMenu() {

    const navigate = useNavigate();
    const handleClick = (navigation) => {
        navigate(navigation);
    }

    return(
        <React.Fragment>
            <Button color={"secondary"} onClick={() => handleClick("/bookings")}>Bookings</Button>
            <Button color={"secondary"} onClick={() => handleClick("/profile")}>Update Profile</Button>
            <Button color={"secondary"}onClick={() => handleClick("#")}>Manage Pets</Button>
            <Button color={"secondary"} onClick={() => handleClick("#")}>Open Pet's medical records</Button>
        </React.Fragment>
    )

}