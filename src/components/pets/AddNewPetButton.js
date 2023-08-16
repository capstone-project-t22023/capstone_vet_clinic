import React, {useState} from "react";
import {Button, Tooltip, Dialog, IconButton, Zoom} from "@mui/material";
import {AddRounded} from "@mui/icons-material";
import AddNewPetForm from "./AddNewPetForm";

export default function AddNewPetButton({petOwner = null}) {
    const [openModal, setOpenModal] = useState(false);
    const handleAddPet = (pet) => {
      console.log("add this pet", pet);
      setOpenModal(false);
    }

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
                Add a new pet to this owner: {petOwner}
                <AddNewPetForm onAddPet={handleAddPet}/>
            </Dialog>
        </>
    )
}