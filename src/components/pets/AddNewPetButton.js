import React from "react";
import {Button, IconButton} from "@mui/material";
import {AddRounded} from "@mui/icons-material";

export default function AddNewPetButton() {
    return (
        <IconButton
            sx={{
                flexShrink: 0,
                width: 40,
                height: 40,
                m:1,
                "&.MuiButtonBase-root":{
                    color: "primary.300",
                    backgroundColor: "primary.50",
                    border: "2px dotted",
                    borderColor: "primary.100"
                }

            }}
        >
            <AddRounded fontSize="small"/>
        </IconButton>
    )
}