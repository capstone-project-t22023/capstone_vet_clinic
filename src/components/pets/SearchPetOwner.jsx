import React, {useState} from "react";
import {Box, Typography, TextField, List, Stack, ListItemButton, ListItemText} from "@mui/material";


export default function SearchPetOwner({selectedOwner, petsList}) {

    console.log('THIS', petsList)

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredOwners, setFilteredOwners] = useState(petsList);
    const [ownerIsSelected, setOwnerIsSelected] = useState(false);
    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = petsList.filter(
            (owner) =>
                owner.firstname.toLowerCase().includes(query) ||
                owner.lastname.toLowerCase().includes(query)
        );

        setFilteredOwners(filtered);
        console.log("filtered owners :", filtered)
    };
    const handleSelectedOwner = (ownerId) => {
        selectedOwner(ownerId);
        setOwnerIsSelected(ownerId);
    };

    return (
        <Stack direction="row" spacing={2} alignItems="center">
            <Stack direction="column">
                <Typography variant="h5">Search in Pet Owners List</Typography>
                <TextField
                    label="Search owners"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={handleSearchChange}
                    sx={{my: 2}}
                />
            </Stack>
            <List
                sx={{
                    maxHeight: "350px",
                    border: "1px solid",
                    borderColor: "primary.50",
                    overflow: "scroll",
                    "& .MuiListItem-root":{
                        // backgroundColor: "secondary.50",
                        cursor: "pointer",
                        ":hover":{
                        }
                    }
                }}>
                {filteredOwners && filteredOwners.map((owner) => (
                    <ListItemButton key={owner.id} onClick={() => handleSelectedOwner(owner.pet_owner_id)}
                              selected={owner.id === ownerIsSelected}>
                        <ListItemText
                            primary={`${owner.firstname} ${owner.lastname}`}
                        />
                    </ListItemButton>
                ))}
            </List>
        </Stack>
    )
}