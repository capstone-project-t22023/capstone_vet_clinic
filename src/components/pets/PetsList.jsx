import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Stack,
    Typography,
    Avatar,
    IconButton,
    Divider,
    Paper,
    Collapse,
    List,
    ListItem,
    ListItemText,
    TextField
} from "@mui/material";

import AddNewPetButton from './AddNewPetButton';
import SearchPetOwner from "./SearchPetOwner";

export default function PetsList({petsList, onChange, petOwnersList}) {
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

    const getPetOwner = (ownerId) => {
        const foundOwner = petOwnersList.find((owner) => owner.id === ownerId);
        return foundOwner ? foundOwner.firstName : "Unknown Owner";
    };

    const isSelected = (petId) => showPet === petId ? "active" : "";


    const [selectedOwner, setSelectedOwner] = useState(null)
    const [filteredPets, setFilteredPets] = useState(petsList);


    function filterPetsByOwnerId(pets, ownerId) {
        return pets.filter((pet) => pet.pet_owner_id === ownerId);
    }

    const handlerSelectedOwner = (selected) => {
        setSelectedOwner(selected);
        console.log("selected owner: ", selected);
    }


    useEffect(() => {
        setFilteredPets(filterPetsByOwnerId(petsList, selectedOwner));
    }, [selectedOwner, petsList]);

    return (
        <Stack direction="column" flex={1} flexWrap="wrap" spacing={3}>

            <AddNewPetButton/> this button should go into slided window

            <Stack direction={"row"} spacing={1} flexWrap="wrap" alignItems="top" justifyContent="flex-start"
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

                <SearchPetOwner selectedOwner={handlerSelectedOwner} petOwnersList={petOwnersList}/>


                {filteredPets ?
                    filteredPets.map(pet => (
                        <Stack key={pet.id} direction="column" flex={0}
                               sx={{backgroundColor: "primary.50", borderRadius: 6, minWidth: "10rem"}}>
                            <Typography>Pet Owner: {getPetOwner(pet.pet_owner_id)}</Typography>
                            <Typography>Pet Name: {pet.petname}</Typography>
                            <IconButton
                                key={pet.id}
                                onClick={() => handleSelectedPet(pet.id)}
                                flex={0}
                                className={isSelected(pet.id)}
                            >
                                <Avatar
                                    src={avatarAnimalUnsplashUrl(pet.species)}
                                    alt={pet.petname}
                                />
                            </IconButton>
                        </Stack>
                    ))
                    : <h6>You should add a new pet</h6>
                }
                <AddNewPetButton/>
            </Stack>
            <Divider/>
        </Stack>
    );
}
