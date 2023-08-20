import React, {useContext, useState} from "react";
import { Stack, Avatar, IconButton, Tooltip } from "@mui/material";
import {PetsContext} from "../../contexts/PetsProvider";

import AddNewPetButton from './AddNewPetButton';

export default function PetsListAvatars({petList}) {
    const [showPet, setShowPet] = useState(null);
    const {selectedOwner, updateSelectedPet} = useContext(PetsContext);


    const handleSelectedPet = (petId) => {
        if (showPet === petId) {
            updateSelectedPet(false);
            setShowPet(null);
        } else {
            setShowPet(petId);
            updateSelectedPet(petId);
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

    const isSelected = (petId) => showPet === petId ? "active" : "";

    // console.log(petList);

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
            <AddNewPetButton petOwner={selectedOwner}/>
            {petList ?
                petList.map(pet => (
                    <Tooltip key={pet.pet_id} title={pet.petname} placement="top" arrow>
                        <IconButton
                            onClick={() => handleSelectedPet(pet.pet_id)}
                            flex={0}
                            className={isSelected(pet.pet_id)}
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
