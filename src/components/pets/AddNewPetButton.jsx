import React, {useContext, useState} from "react";
import {Button, Tooltip, Dialog, IconButton, Zoom, Typography, DialogContent} from "@mui/material";
import {AddRounded} from "@mui/icons-material";
import AddNewPetForm from "./AddNewPetForm";
import {PetsContext} from "../../contexts/PetsProvider";

export default function AddNewPetButton() {
    const [openModal, setOpenModal] = useState(false);
    const {selectedOwner, updatePetList, handlerReloadPetList} = useContext(PetsContext);

    const addNewPet = (petInfo) => {

        console.log("Add New Pet: " + JSON.stringify(petInfo));

        fetch("http://localhost/capstone_vet_clinic/api.php/add_pet", {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify(petInfo)
        })
            .then((response) => {
                if (response.ok) {
                    return response.json(); // Parse response body as JSON
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then(data => {
                if (data.add_pet && data.add_pet !== 'error') {
                    // Pet added successfully, you can update UI or take any other actions
                    handlerReloadPetList(true);
                    console.log("Success", data.add_pet)
                } else {
                    console.error("Error", data.add_pet)
                    // Handle error case
                }
            })
            .catch(error => {
                console.error('Error adding pet:', error);
            });
    };

    const handleAddPet = (pet) => {
        console.log("add this pet", pet);
        setOpenModal(false);
        addNewPet(pet);
    };


    return (
        <>
            <Tooltip title="New Pet" TransitionComponent={Zoom} placement="top">
                <IconButton onClick={() => setOpenModal(true)}
                            sx={{
                                flexShrink: 0,
                                width: 40,
                                height: 40,
                                m: 1,
                                "&.MuiButtonBase-root": {
                                    color: "primary.300",
                                    backgroundColor: "primary.50",
                                    border: "2px dotted",
                                    borderColor: "primary.100"
                                }

                            }}
                >
                    <AddRounded fontSize="small"/>
                </IconButton>
            </Tooltip>
            <Dialog
                open={openModal}
                onClose={() => setOpenModal(false)}
            >
                <DialogContent>
                    <AddNewPetForm ownerId={selectedOwner.pet_owner_id} onAddPet={handleAddPet} onCancel={() => setOpenModal(false)}/>
                </DialogContent>
            </Dialog>
        </>
    )
}