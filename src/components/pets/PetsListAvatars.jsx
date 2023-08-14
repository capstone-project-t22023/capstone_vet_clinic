import React, { useState } from "react";
import {
    Box,
    Button,
    Stack,
    Typography,
    Avatar,
    IconButton,
    Dialog,
    Paper,
    Collapse,
    List,
    ListItemButton
} from "@mui/material";

import AddNewPetButton from './AddNewPetButton';

export default function PetsListAvatars({ petList, onChange }) {
    const [showPet, setShowPet] = useState(null);
    // const [showDialog, setShowDialog] = useState(false);

    const handleSelectedPet = (petId) => {
        if (showPet === petId) {
            onChange(null);
            setShowPet(null);
        } else {
            setShowPet(petId);
            onChange(petId);
        }
    };

    const isSelected = (petId) => showPet === petId ? "active" : "";

    console.log(petList);

    return (
        <Stack direction={"row"} spacing={1} flexWrap="wrap" alignItems="center" justifyContent="flex-end"
               sx={{
                   "& .MuiButtonBase-root": {
                       p: 0.5,
                   },
                   "& .active": {
                       border: "2px solid",
                       borderColor: "secondary.main"
                   }
               }}
        >
            <AddNewPetButton />
            {petList ?
                petList.map(pet => (
                    <IconButton
                        key={pet.id}
                        onClick={() => handleSelectedPet(pet.id)}
                        flex={0}
                        className={isSelected(pet.id)}
                    >
                        <Avatar
                            src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=320&q=80"
                            alt={pet.petname}
                        />
                    </IconButton>
                ))
                : <h6>You should add a new pet</h6>
            }
        </Stack>
    );
}
