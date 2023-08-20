import React, {useContext, useState} from "react";
import {Button, Box, Tooltip, Dialog, IconButton, Zoom} from "@mui/material";
import {AddRounded} from "@mui/icons-material";
import AddNewPetForm from "./AddNewPetForm";
import {PetsContext} from "../../contexts/PetsProvider";
import dayjs from "dayjs";

export default function AddNewPetButton() {
    const [openModal, setOpenModal] = useState(false);

    const {selectedOwner, updatePetList} = useContext(PetsContext);

    console.log('owner', selectedOwner)


    const addNewPet = (petInfo) => {
        // const req_body = {
        //     "petname":"Rendy",
        //     "species":"Dog",
        //     "breed":"Husky",
        //     "birthdate":"08-08-2012",
        //     "weight":"54",
        //     "sex":"Male",
        //     "microchip_no":"1234567899",
        //     "insurance_membership":"15564s31a3",
        //     "insurance_expiry":"12-12-2025",
        //     "comments":"Likes ice cream",
        //     "pet_owner_id":1006,
        //     "username":"teemingbroth"
        // }

        // {
        //     "petname":"Rendy",
        //     "species":"Dog",
        //     "breed":"SouthPark",
        //     "birthdate":"09-08-2019",
        //     "weight":"64",
        //     "sex":"Male",
        //     "microchip_no":"12saf899",
        //     "insurance_membership":"15564s3a3",
        //     "insurance_expiry":"11-08-2023",
        //     "comments":"no commento",
        //     "pet_owner_id":1003,
        //     "username":"abundantasparagus"
        // }


        console.log("Add New Pet: " + JSON.stringify(petInfo));

        fetch("http://localhost/capstone_vet_clinic/api.php/add_pet", {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
            body: JSON.stringify(petInfo)
        })
            .then((response) => {
                if (response.ok) {
                    return response.json(); // Parse response body as JSON
                    updatePetList(true);
                    console.log("Please update the data - from addNewPetButton / response.ok")
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then(data => {
                if (data.add_pet && data.add_pet !== 'error') {
                    // Pet added successfully, you can update UI or take any other actions
                    updatePetList(true);
                    console.log("Please update the data - from addNewPetButton / data !== 'error'")
                } else {
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
                <Box>
                    Add a new pet to this
                    owner: {selectedOwner ? `${selectedOwner.firstname} and id ${selectedOwner.pet_owner_id}` : ''}
                </Box>
                <AddNewPetForm ownerId={selectedOwner.pet_owner_id} onAddPet={handleAddPet}/>
                <Button onClick={() => updatePetList(true)}>Update Data List</Button>
            </Dialog>
        </>
    )
}