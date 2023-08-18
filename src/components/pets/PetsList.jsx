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
import {PetsContext} from "../../contexts/PetsProvider";

export default function PetsList({petsList, onChange}) {
    const [showPet, setShowPet] = useState(null);
    const {selectedOwner} = useContext(PetsContext);

    const isSelected = (petId) => showPet === petId ? "active" : "";

    const handleSelectedPet = (petObject) => {
        if (showPet === petObject) {
            onChange(false);
            setShowPet(null);
        } else {
            setShowPet(petObject);
            onChange(petObject);
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

                {/*<SearchPetOwner selectedOwner={handlerSelectedOwner} petsList={petsList}/>*/}
                <SearchPetOwner petsList={petsList}/>

                {selectedOwner ? (
                    selectedOwner.pets.length>0 ? (
                        <Stack direction="row" flexWrap="wrap" spacing={2} width={1} flex={1}>
                            {selectedOwner.pets.map((pet) => (
                                <Stack
                                    key={pet.pet_id} // Assuming the unique identifier for a pet is pet_id
                                    direction="column"
                                    flex={0}
                                    sx={{ backgroundColor: "secondary.50", borderRadius: 6 }}
                                >
                                    <IconButton
                                        onClick={() => handleSelectedPet(pet)}
                                        flex={0}
                                        className={isSelected(pet.pet_id)}
                                    >
                                        <Avatar
                                            src={avatarAnimalUnsplashUrl(pet.species)}
                                            alt={pet.petname}
                                        />
                                    </IconButton>
                                    <Typography>{pet.petname}</Typography>
                                </Stack>
                            ))}
                            <AddNewPetButton petOwner={selectedOwner} />
                        </Stack>

                    ) : (
                        <Box>
                            <Typography component="h5" variant="h6">Owner has no pets</Typography>
                            <AddNewPetButton petOwner={selectedOwner}/>
                        </Box>
                    )
                    ):(
                        <Box>
                            <Typography component="h5" variant="h6">Select the owner first</Typography>
                        </Box>
                    )}

            </Stack>
            <Divider/>
        </Stack>
    );
}
