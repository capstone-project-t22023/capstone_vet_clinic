import React, {useContext, useEffect, useState} from "react";
import {
    Avatar, Button, Box, Stack, Typography, IconButton, Tooltip, Dialog, Paper, Zoom
} from "@mui/material";
import AgeCalculator from './AgeCalculator';
import {SettingsApplicationsRounded, DeleteForeverRounded, HistoryEduRounded} from '@mui/icons-material';
import BookingButton from "../booking/BookingButton";
import {PetsContext} from "../../contexts/PetsProvider";
import ProgramContext from "../../contexts/ProgramContext";

import AddNewPetForm from "./AddNewPetForm";
import LastHealthChecks from "../appointments/petProfile/LastHealthChecks";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {Link, useLocation, useNavigate} from "react-router-dom";

export default function PetProfile({onDelete}) {
    const [showDialog, setShowDialog] = useState(false);
    const [actionForm, setActionForm] = useState(null);
    const {selectedOwner,selectedPet,handlerReloadPetList} = useContext(PetsContext);
    const [activePet, setActivePet] = useState(selectedPet);
    const {user} = useContext(ProgramContext);

    function getPetById(petId) {
        return selectedOwner.pets ? selectedOwner.pets.find(pet => pet.pet_id === petId) : null;
    }

    useEffect (() => {
        setActivePet(getPetById(selectedPet))
        setAppointmentList(fetchAppointments('pet_id',selectedPet));
    }, [selectedPet])

    const handleBooking = (booking) => {
      console.log("This is booking", booking)
    }

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

    const handleUpdatePet = () => {
        setActionForm('update');
        setShowDialog(true);
    }
    const handleConfirmUpdate = (pet) => {
        console.log("This pet has to be updated - do action here", pet);
        setShowDialog(false);
        handlerReloadPetList(true);
    };
    const handleDeletePet = () => {
        setActionForm('delete');
        setShowDialog(true);
    }
    const handleConfirmDelete = () => {
        deletePet(activePet.pet_id);
        setShowDialog(false);
        handlerReloadPetList(true);
    };

    const deletePet = (petId) => {
        const apiUrl = `http://localhost/capstone_vet_clinic/api.php/delete_pet/${petId}`;
        console.log("apiUrl ",apiUrl)

        return fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to delete pet');
                }
                return response.json();
            })
            .then((data) => {
                if (data.delete_pet === true) {
                    return true; // Pet was successfully deleted
                } else {
                    throw new Error('Failed to delete pet');
                }
            })
            .catch((error) => {
                console.error('Error deleting pet:', error);
                return false; // Pet deletion failed
            });
    }




    // APPOINTMENTS LIST
    const [loading, setLoading] = useState(true);
    const [appointmentList, setAppointmentList] = useState([])

    const fetchAppointments = (filterType, filterValue) => {
        const url = `http://localhost/capstone_vet_clinic/api.php/search_booking?filter=${filterType}&filter_value=${filterValue}`;

        fetch(url, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        })
            .then(response => response.json())
            .then(data => {
                setAppointmentList(data.bookings)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };


    return (activePet && (
        <Stack direction="column" alignItems="center" flex={1} spacing={6} sx={{p: 4}}>
            <Stack direction="column" spacing={2} alignItems="center"
                   sx={{
                       ":hover button": {
                           opacity: 1, transition: 'opacity 0.6s ease-in-out',
                       }, "& button": {
                           opacity: 0, transition: 'opacity 0.6s ease-in-out',

                       },
                   }}>
                <Avatar
                    src={avatarAnimalUnsplashUrl(activePet.species)}
                    alt={activePet.petname}
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
                        {activePet.petname}
                    </Typography>
                    <Typography
                        component="h5"
                        color="text.secondary"
                        sx={{
                            textTransform: "uppercase", fontSize: 14,
                        }}
                    >
                        {activePet.breed}
                    </Typography>
                    <Stack direction="row" justifyContent="center">
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

                            {actionForm === "delete" ? (
                                <Box>
                                    <h4>{activePet.petname} - {activePet.breed}</h4>
                                    <p>Are you sure you want to delete this pet?</p>

                                    <Button variant="text" onClick={() => setShowDialog(false)}>
                                        Cancel
                                    </Button>
                                    <Button variant="contained" color="error" onClick={handleConfirmDelete}>
                                        Delete
                                    </Button>
                                </Box>
                            ) : (
                                actionForm === "update" ? (
                                    <Box>
                                        <h4>{selectedOwner.firstname} {activePet.petname} - {activePet.breed}</h4>
                                        <AddNewPetForm petToEdit={activePet} onUpdate={handleConfirmUpdate}
                                                       onCancel={() => setShowDialog(false)}/>
                                    </Box>
                                ) : (
                                    <Box>
                                        <h4>Error - no action form has been selected</h4>

                                        <Button variant="text" onClick={() => setShowDialog(false)}>
                                            Cancel
                                        </Button>
                                    </Box>
                                )
                            )}

                        </Paper>
                    </Dialog>


                </Box>

                <Stack direction="row" spacing={0}
                       sx={{
                           width: 1, minWidth: 250, position: "relative", "& .MuiStack-root": {
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
                                   color: "text.primary", fontWeight: 600,
                               },
                               "& span": {
                                   color: "primary.main"
                               }
                           }
                       }}>
                    <Stack direction="column">
                        <Typography component="p"><AgeCalculator birthdate={activePet.birthdate}/></Typography>
                        <Typography component="span">Age</Typography>
                    </Stack>
                    <Stack direction="column">
                        <Typography component="p">Male</Typography>
                        <Typography component="span">Sex</Typography>
                    </Stack>
                    <Stack direction="column">
                        <Typography component="p">{activePet.weight}</Typography>
                        <Typography component="span">Weight</Typography>
                    </Stack>
                </Stack>
            </Stack>

            <Stack direction="column" spacing={2}>
            <LastHealthChecks appointmentList={appointmentList} count={3} filterMode='today' />
            <LastHealthChecks appointmentList={appointmentList} count={3} itemsPerPage={3} filterMode='future' />
            </Stack>

            <Stack direction="column" spacing={2}>
            <BookingButton booking={handleBooking}/>
            {user.role !== 'pet_owner' &&
                    <Link to="/pet-records" state={{selectedPet: selectedPet}}>
                        <Button variant="outlined" color="primary" endIcon={<HistoryEduRounded />}>Update pet History</Button>
                    </Link>
            }
            </Stack>


        </Stack>


    ))
}
