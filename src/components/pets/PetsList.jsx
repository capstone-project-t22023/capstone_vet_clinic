import React, {useState} from "react";
import {Box, Button, Stack, Typography, IconButton, Dialog, Paper} from "@mui/material";
import {Delete as DeleteIcon, EditRounded} from '@mui/icons-material';
import AddNewPet from "./AddNewPet";

export default function PetsList({showData, onDelete, onEdit, onAdd}) {
    const [expandedPetId, setExpandedPetId] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const [petToEdit, setPetToEdit] = useState(false);
    const [petToDelete, setPetToDelete] = useState(false);
    const [petToAdd, setPetToAdd] = useState(false);


    const toggleExpand = (petId) => {
        if (expandedPetId === petId) {
            setExpandedPetId(null);
        } else {
            setExpandedPetId(petId);
        }
    };

    const handleCancel = () => {
        setPetToEdit(false);
        setPetToDelete(false);
        setPetToAdd(false);
        setShowDialog(false);
    }
    const handleDeletePet = (pet) => {
        setPetToDelete(pet);
        setShowDialog(true);
    }

    const handleConfirmDelete = () => {
        onDelete(petToDelete);
        handleCancel()
    };

    const handleEditPet = (pet) => {
        setPetToEdit(pet);
        setShowDialog(true);
    }
    const handleConfirmEdit = () => {
        onEdit(petToEdit);
        handleCancel();
    };

    const handleAddPet = (pet) => {
        onAdd(pet)
        setShowDialog(false);
    }

    const handleOpenAddPet = () => {
        setPetToAdd(true)
        setShowDialog(true)
    }

    return (
        <>
            <Stack direction={"row"}>
                {showData.map(pet => (
                    <Box key={pet.id} sx={{backgroundColor: "secondary.100", m: 3, p: 1}}>
                        Pet Name:
                        <Button onClick={() => toggleExpand(pet.id)}>
                            {pet.petname}
                        </Button>
                        {expandedPetId === pet.id && (
                            <Box sx={{p: 2}}>
                                <Typography component="p" color="Primary"><Typography component="span"
                                                                                      color="text.secondary" sx={{
                                    fontWeight: 'bold',
                                    typography: 'subtitle2',
                                    mr: 1,
                                }}>Species:</Typography>{pet.species}</Typography>
                                <Typography component="p" color="Primary"><Typography component="span"
                                                                                      color="text.secondary" sx={{
                                    fontWeight: 'bold',
                                    typography: 'subtitle2',
                                    mr: 1,
                                }}>Breed:</Typography>{pet.breed}</Typography>
                                <Typography component="p" color="Primary"><Typography component="span"
                                                                                      color="text.secondary" sx={{
                                    fontWeight: 'bold',
                                    typography: 'subtitle2',
                                    mr: 1,
                                }}>Birthdate:</Typography>{pet.birthdate}</Typography>
                                <Typography component="p" color="Primary"><Typography component="span"
                                                                                      color="text.secondary" sx={{
                                    fontWeight: 'bold',
                                    typography: 'subtitle2',
                                    mr: 1,
                                }}>Weight:</Typography>{pet.weight}</Typography>
                                <Typography component="p" color="Primary"><Typography component="span"
                                                                                      color="text.secondary" sx={{
                                    fontWeight: 'bold',
                                    typography: 'subtitle2',
                                    mr: 1,
                                }}>Comments:</Typography>{pet.comments}</Typography>
                                <Typography component="p" color="Primary"><Typography component="span"
                                                                                      color="text.secondary" sx={{
                                    fontWeight: 'bold',
                                    typography: 'subtitle2',
                                    mr: 1,
                                }}>Insurance:</Typography>{pet.insurance_membership ? 'Yes' : 'No'},
                                    Insurance</Typography>
                                <Typography component="p" color="Primary"><Typography component="span"
                                                                                      color="text.secondary" sx={{
                                    fontWeight: 'bold',
                                    typography: 'subtitle2',
                                    mr: 1,
                                }}>Expiry:</Typography>{pet.insurance_expiry || 'N/A'}</Typography>
                                <Typography component="p" color="Primary"><Typography component="span"
                                                                                      color="text.secondary" sx={{
                                    fontWeight: 'bold',
                                    typography: 'subtitle2',
                                    mr: 1,
                                }}>Updated By:</Typography>{pet.updated_by}</Typography>
                                <Typography component="p" color="Primary"><Typography component="span"
                                                                                      color="text.secondary" sx={{
                                    fontWeight: 'bold',
                                    typography: 'subtitle2',
                                    mr: 1,
                                }}>Archived:</Typography>{pet.archived ? 'Yes' : 'No'}</Typography>

                            </Box>
                        )}
                        <Stack direction={"row"}>
                            <IconButton aria-label="delete" color="error"
                                        onClick={e => handleDeletePet(pet)}>
                                <DeleteIcon/>
                            </IconButton>
                            <IconButton aria-label="edit" color="primary" onClick={e => handleEditPet(pet)}>
                                <EditRounded/>
                            </IconButton>
                        </Stack>
                    </Box>


                ))}
            </Stack>

            <Button variant="contained" fullWidth={true} onClick={handleOpenAddPet}>+ Add new Pet</Button>


            {/* Dialog */}
            {showDialog &&
                (petToDelete && (
                    <Dialog open={showDialog} onClose={handleCancel} maxWidth={"lg"}>
                        <Paper sx={{p: 3, textAlign: "center"}}>
                            <p>Are you sure you want to delete this pet?</p>
                            <p>{petToDelete.petname} - {petToDelete.breed}</p>

                            <Button variant="text" onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button variant="contained" color="error" onClick={handleConfirmDelete}>
                                Delete
                            </Button>
                        </Paper>
                    </Dialog>
                )) ||
                petToEdit && (
                    <Dialog open={showDialog} onClose={handleCancel} maxWidth={"lg"}>
                        <Paper sx={{p: 3, textAlign: "center"}}>
                            <Typography component={"h3"} variant={"h5"} sx={{m: 2, color: "primary.main"}}>
                                Are you sure you want to edit this pet?
                            </Typography>

                            <AddNewPet petToEdit={petToEdit}/>

                            <Button variant="text" onClick={() => setShowDialog(false)}>
                                Cancel
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleConfirmEdit}>
                                Save
                            </Button>
                        </Paper>
                    </Dialog>
                ) ||
                petToAdd && (
                    <Dialog open={showDialog} onClose={() => setShowDialog(false)} maxWidth={"lg"}>
                        <Paper sx={{p: 3, textAlign: "center"}}>
                            <Typography component={"h3"} variant={"h5"} sx={{m: 2, color: "primary.main"}}>
                                New Pet to add
                            </Typography>

                            <AddNewPet onAddPet={handleAddPet}/>

                        </Paper>
                    </Dialog>

                )

            }


        </>
    )
}