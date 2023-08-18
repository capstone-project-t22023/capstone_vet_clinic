import React, {useContext, useState} from "react";
import {Button, Box, Tooltip, Dialog, IconButton, Zoom} from "@mui/material";
import {AddRounded} from "@mui/icons-material";
import AddNewPetForm from "./AddNewPetForm";
// import ProgramContext from "../../contexts/ProgramContext";
import {PetsContext} from "../../contexts/PetsProvider";

export default function AddNewPetButton() {
    const [openModal, setOpenModal] = useState(false);
    const handleAddPet = (pet) => {
      console.log("add this pet", pet);
      setOpenModal(false);
    }

    const {selectedOwner} = useContext(PetsContext);
    // const {user} = useContext(ProgramContext);


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
                    Add a new pet to this owner: {selectedOwner ? `${selectedOwner.firstname} and id ${selectedOwner.pet_owner_id}` : ''}
                </Box>
                <AddNewPetForm onAddPet={handleAddPet}/>
            </Dialog>
        </>
    )
}