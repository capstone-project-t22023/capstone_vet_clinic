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
            <Button sx={{color: "grey.50"}} onClick={() => handleClick("/bookings")}>Bookings</Button>
            <Button sx={{color: "grey.50"}} onClick={() => handleClick("/profile")}>Update Profile</Button>
            <Button sx={{color: "grey.50"}} onClick={() => handleClick("#")}>Manage Pets</Button>
            <Button sx={{color: "grey.50"}} onClick={() => handleClick("#")}>Open Pet's medical records</Button>
        </React.Fragment>
    )

}