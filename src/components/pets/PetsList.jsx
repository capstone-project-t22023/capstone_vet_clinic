import React, {useContext} from "react";
import {
    Box,
    Stack,
    Typography,
    Avatar,
    IconButton,
    Paper,
    Tooltip,
    Fade
} from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import AddNewPetButton from './AddNewPetButton';
import SearchPetOwner from "./SearchPetOwner";
import {PetsContext} from "../../contexts/PetsProvider";
import Appointments from "../appointments/Appointments";

export default function PetsList() {
    const {selectedOwner, updateSelectedOwner, selectedPet, changeSidebarContent, updateSelectedPet} = useContext(PetsContext);

    const isSelected = (petId) => selectedPet === petId ? "active" : "";


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

    const handleClickedPet = (petId) => {
        updateSelectedPet(petId);
        changeSidebarContent('pet');
    }

    return (
        <Stack direction="column" flex={1} flexWrap="wrap" spacing={3}>
            <Stack direction={"column"} spacing={1} flexWrap="wrap" alignItems="top" justifyContent="flex-start">

                {selectedOwner && Object.keys(selectedOwner).length > 0 ? (
                    <Stack sx={{position: "relative"}}>
                        <Box sx={{position: "absolute", top: 0, right: 0}}>
                            <IconButton color="primary" onClick={() => updateSelectedOwner({})}>
                                <CloseRoundedIcon/>
                            </IconButton>
                        </Box>
                        <Paper elevation={0} sx={{p: 2, borderRadius: 6}}>
                            {selectedOwner.pets.length > 0 ? (
                                <Stack direction="row" flexWrap="wrap" alignItems="center" justifyContent="center"
                                       spacing={1} width={1} flex={1}
                                       sx={{
                                           "& .MuiButtonBase-root": {
                                               p: 0.5,
                                           },
                                           "& .active": {
                                               border: "2px solid",
                                               borderColor: "secondary.main"
                                           }
                                       }}>
                                    <Typography component="h5" variant="h6"
                                                color="primary">{selectedOwner.firstname} has these pets:</Typography>
                                    {selectedOwner.pets.map((pet) => (
                                        <Stack
                                            key={pet.pet_id} // Assuming the unique identifier for a pet is pet_id
                                            direction="column"
                                            flex={0}
                                        >
                                            <Tooltip title={pet.petname} TransitionComponent={Fade} arrow
                                                     placement="top">
                                                <IconButton
                                                    onClick={() => handleClickedPet(pet.pet_id)}
                                                    flex={0}
                                                    className={isSelected(pet.pet_id)}
                                                >
                                                    <Avatar
                                                        src={avatarAnimalUnsplashUrl(pet.species)}
                                                        alt={pet.petname}
                                                    />
                                                </IconButton>
                                            </Tooltip>
                                        </Stack>
                                    ))}
                                    <AddNewPetButton petOwner={selectedOwner}/>
                                </Stack>

                            ) : (
                                <Stack direction="row" flexWrap="wrap" alignItems="center" justifyContent="center"
                                       spacing={1} width={1} flex={1}>
                                    <Typography component="h5" variant="h6">{selectedOwner.firstname} has no
                                        pets</Typography>
                                    <AddNewPetButton petOwner={selectedOwner}/>
                                </Stack>
                            )
                            }
                        </Paper>


                        {selectedOwner.pets.length > 0 &&
                            <Stack direction="row" spacing={2} mb={2} flexWrap="wrap">
                                <Appointments filter="today" count={3}/>
                                <Appointments filter="historic"/>
                                <Appointments filter="future"/>
                                <Appointments itemsPerPage={3}/>

                            </Stack>
                        }

                    </Stack>

                ) : (
                    <Box>
                        <Typography component="h5" variant="h6">Select the owner first</Typography>
                    </Box>
                )}
                {/*<Divider/>*/}
                <SearchPetOwner/>


            </Stack>
        </Stack>
    );
}
