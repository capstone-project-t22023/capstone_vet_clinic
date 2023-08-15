import React, {useState} from "react";
import {Avatar, Button, Box, Stack, Typography, Divider, IconButton, Tooltip, Fade, Dialog, Paper, Zoom} from "@mui/material";
import AgeCalculator from './AgeCalculator';
import {
    ChevronRightRounded,
    FavoriteRounded,
    SettingsApplicationsRounded,
    DeleteForeverRounded
} from '@mui/icons-material';
import BookingButton from "../booking/BookingButton";

export default function PetProfile({petsList, selectedPet, onDelete}) {
    const [showDialog, setShowDialog] = useState(false);

    const selectedPetData = petsList.find((pet) => pet.id === selectedPet);
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

    const handleUpdatePet = () => {

    }
    const handleDeletePet = () => {
        setShowDialog(true);
    }
    const handleConfirmDelete = () => {
        setShowDialog(true);
        onDelete(selectedPet);
    };


    return (
        selectedPetData && (
            <Stack direction="column" alignItems="center" flex={1} spacing={6} sx={{m: 4}}>
                <Stack direction="column" spacing={2} alignItems="center"
                       sx={{
                           ":hover button": {
                               opacity: 1,
                               transition: 'opacity 0.6s ease-in-out',
                           },
                           "& button": {
                               opacity: 0,
                               transition: 'opacity 0.6s ease-in-out',

                           },
                       }}>
                    <Avatar
                        src={avatarAnimalUnsplashUrl(selectedPetData.species)}
                        alt={selectedPetData.petname}
                        sx={{width: 120, height: 120}}
                    />
                    <Box sx={{textAlign: "center", position: "relative"}}>
                        <Typography
                            component="h3"
                            variant="h5"
                            color="text.primary"
                            sx={{
                                fontWeight: "bold",
                            }}
                        >
                            {selectedPetData.petname}
                        </Typography>
                        <Typography
                            component="h5"
                            color="text.secondary"
                            sx={{
                                textTransform: "uppercase",
                                fontSize: 14,
                            }}
                        >
                            {selectedPetData.breed}
                        </Typography>
                        <Stack direction="row">
                            <Tooltip title="Update details" placement="right" TransitionComponent={Zoom} arrow>
                                <IconButton variant="contained" color="primary" onClick={handleUpdatePet}>
                                    <SettingsApplicationsRounded fontSize="medium"/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete forever" placement="left" TransitionComponent={Zoom} arrow>
                                <IconButton color="error" onClick={handleDeletePet}>
                                    <DeleteForeverRounded fontSize="medium"/>
                                </IconButton>
                            </Tooltip>
                        </Stack>

                        <Dialog open={showDialog} onClose={() => setShowDialog(false)} maxWidth={"lg"}>
                            <Paper sx={{p: 3, textAlign: "center"}}>
                                <h4>{selectedPetData.petname} - {selectedPetData.breed}</h4>
                                <p>Are you sure you want to delete this pet?</p>

                                <Button variant="text" onClick={() => setShowDialog(false)}>
                                    Cancel
                                </Button>
                                <Button variant="contained" color="error" onClick={handleConfirmDelete}>
                                    Delete
                                </Button>
                            </Paper>
                        </Dialog>


                    </Box>

                    <Stack direction="row" spacing={0}
                           sx={{
                               width: 1,
                               minWidth: 250,
                               position: "relative",
                               "& .MuiStack-root": {
                                   backgroundColor: "primary.50",
                                   p: 2,
                                   mx: 0.5,
                                   borderRadius: 4,
                                   alignItems: "center",
                                   justifyContent: "center",
                                   flex: 1,
                                   flexShrink: 0,
                                   "& p, & span": {
                                       fontSize: 14,
                                   },
                                   "& p": {
                                       color: "text.primary",
                                       fontWeight: 600,
                                   },
                                   "& span": {
                                       color: "primary.main"
                                   }
                               }
                           }}>
                        <Stack direction="column">
                            <Typography component="p"><AgeCalculator birthdate={selectedPetData.birthdate}/></Typography>
                            <Typography component="span">Age</Typography>
                        </Stack>
                        <Stack direction="column">
                            <Typography component="p">Male</Typography>
                            <Typography component="span">Sex</Typography>
                        </Stack>
                        <Stack direction="column">
                            <Typography component="p">{selectedPetData.weight} kg</Typography>
                            <Typography component="span">Weight</Typography>
                        </Stack>
                    </Stack>
                </Stack>

                {/* Last Health Checks */}
                <Box>
                    <Stack direction="row" justifyContent="space-between" width="100%" alignItems="baseline" sx={{mb: 3}}>
                        <Typography fontWeight="bold">Last health checks</Typography>
                        <Button variant="text" size="small" color="secondary">View all <ChevronRightRounded
                            fontSize="inherit"/></Button>
                    </Stack>
                    <Stack direction="column" spacing={3}
                           sx={{
                               "& .MuiAvatar-root": {
                                   backgroundColor: "primary.50",
                                   color: "error.light"
                               },
                               "& h5": {
                                   fontWeight: "bold",
                                   fontSize: ".875rem"
                               },
                               "& h6": {
                                   color: "text.secondary",
                                   textTransform: "uppercase",
                                   fontSize: ".75rem",
                                   maxWidth: "8rem",
                               },
                               "& p": {
                                   color: "primary.200",
                                   textTransform: "uppercase",
                                   fontSize: ".75rem",
                                   fontWeight: "bold",
                               },
                           }}>
                        {/*Health Checks item*/}
                        <Stack direction="row" spacing={2}>
                            <Stack direction="column" flex={0} alignItems="center">
                                <Avatar>
                                    <FavoriteRounded fontSize="small"/>
                                </Avatar>
                            </Stack>
                            <Stack direction="column" flex={1} flexWrap="wrap" alignItems="flex-start">
                                <Typography component="h5">Heart rate check</Typography>
                                <Typography component="h6">Dr. Joshua Rassel</Typography>
                            </Stack>
                            <Stack direction="column" flex={0}>
                                <Typography component="p">12.12.2022</Typography>
                            </Stack>
                        </Stack>
                        <Divider flexItem/>
                        {/*Health Checks item end*/}
                        {/*Health Checks item*/}
                        <Stack direction="row" spacing={2}>
                            <Stack direction="column" flex={0} alignItems="center">
                                <Avatar>
                                    <FavoriteRounded fontSize="small"/>
                                </Avatar>
                            </Stack>
                            <Stack direction="column" flex={1} alignItems="flex-start">
                                <Typography component="h5">Heart rate check</Typography>
                                <Typography component="h6">Dr. Vwe Longy Nameas Like This Sua Rassel</Typography>
                            </Stack>
                            <Stack direction="column" flex={0}>
                                <Typography component="p">12.12.2022</Typography>
                            </Stack>
                        </Stack>
                        <Divider flexItem/>
                        {/*Health Checks item end*/}
                    </Stack>
                </Box>

                <BookingButton />

            </Stack>


        ))
}
