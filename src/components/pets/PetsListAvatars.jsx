import React, {useState} from "react";
import {
    Box,
    Button,
    Stack,
    Typography,
    Avatar,
    IconButton,
    Paper,
    Collapse,
    Tooltip,
    List,
    ListItemButton
} from "@mui/material";

import AddNewPetButton from './AddNewPetButton';

export default function PetsListAvatars({petsList, onChange}) {
    const [showPet, setShowPet] = useState(null);
    // const [showDialog, setShowDialog] = useState(false);

    const handleSelectedPet = (petId) => {
        if (showPet === petId) {
            onChange(false);
            setShowPet(null);
        } else {
            setShowPet(petId);
            onChange(petId);
        }
    };

    const avatarAnimalUnsplashUrl = (species) => {
        if (species === 'Dog') {
            return 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=320&q=80';
        } else if (species === 'Cat') {
            return 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=320&q=80';
        } else if (species === 'Racoon') {
            return 'https://images.unsplash.com/photo-1497752531616-c3afd9760a11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=320&q=80';
        } else if (species === 'Snake') {
            return 'https://images.unsplash.com/photo-1531386151447-fd76ad50012f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=320&q=80';
        } else {
            // Default URL if species is not recognized
            return 'https://images.unsplash.com/photo-1554774859-f6b0366d7cc3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=320&q=80';
        }
    };

    const isSelected = (petId) => showPet === petId ? "active" : "";

    console.log(petsList);

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
            <AddNewPetButton/>
            {petsList ?
                petsList.map(pet => (
                    <Tooltip key={pet.id} title={pet.petname} placement="top" arrow>
                        <IconButton
                            onClick={() => handleSelectedPet(pet.id)}
                            flex={0}
                            className={isSelected(pet.id)}
                        >
                            <Avatar
                                src={avatarAnimalUnsplashUrl(pet.species)}
                                alt={pet.petname}
                            />
                        </IconButton>
                    </Tooltip>
                ))
                : <h6>You should add a new pet</h6>
            }
        </Stack>
    );
}
