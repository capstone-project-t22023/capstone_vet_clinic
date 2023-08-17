import React, {useContext, useEffect, useState} from "react";
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
import {PetOwnersContext} from "../../contexts/PetOwnersProvider";

export default function PetsList({petsList, onChange}) {
    const [showPet, setShowPet] = useState(null);
    const petOwners = useContext(PetOwnersContext);

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
        } else if (species === 'Giraffe') {
            return 'https://images.unsplash.com/photo-1547721064-da6cfb341d50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=320&q=80';
        } else if (species === 'Racoon') {
            return 'https://images.unsplash.com/photo-1497752531616-c3afd9760a11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=320&q=80';
        } else if (species === 'Snake') {
            return 'https://images.unsplash.com/photo-1531386151447-fd76ad50012f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=320&q=80';
        } else {
            // Default URL if species is not recognized
            return 'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=320&q=80';
        }
    };

    const getPetOwner = (ownerId) => {
        const foundOwner = petOwners.find((owner) => owner.id === ownerId);
        return foundOwner ? foundOwner.firstName : "Unknown Owner";
    };

    const isSelected = (petId) => showPet === petId ? "active" : "";


    const [selectedOwner, setSelectedOwner] = useState(null)
    const [filteredPets, setFilteredPets] = useState(false);


    function filterPetsByOwnerId(pets, ownerId) {
        return pets.filter((pet) => pet.pet_owner_id === ownerId);
    }

    const handlerSelectedOwner = (selected) => {
        setSelectedOwner(selected);
    }


    useEffect(() => {
        setFilteredPets(filterPetsByOwnerId(petsList, selectedOwner));
        console.log("filtered pets:", filteredPets);
    }, [selectedOwner]);

    return (
        <Stack direction="column" flex={1} flexWrap="wrap" spacing={3}>


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

                <SearchPetOwner selectedOwner={handlerSelectedOwner} petOwnersList={petOwners}/>

                {filteredPets.length > 0 ? (
                    <Stack direction="row" flexWrap="wrap" spacing={2} width={1} flex={1}>
                        <Typography>Pet Owner: {selectedOwner}</Typography>
                        {filteredPets.map(pet => (
                            <Stack
                                key={pet.id}
                                direction="column"
                                flex={0}
                                sx={{backgroundColor: "secondary.50", borderRadius: 6}}
                            >
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
                                <Typography>{pet.petname}</Typography>
                            </Stack>
                        ))}
                <AddNewPetButton petOwner={selectedOwner}/>
                    </Stack>
                ) : (
                    <Typography component="h5" variant="h6" >Select owner first</Typography>
                )}

            </Stack>
            <Divider/>
        </Stack>
    );
}
