import React, {useContext, useEffect, useState} from "react";
import {Box, InputAdornment, IconButton, Chip, Typography, TextField, List, Stack, ListItemButton, ListItemText} from "@mui/material";
import {Clear} from "@mui/icons-material";
import {PetsContext} from "../../contexts/PetsProvider";


export default function SearchPetOwner() {


    const {updateSelectedOwner, petList} = useContext(PetsContext);

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredOwners, setFilteredOwners] = useState(petList);
    const [ownerIsSelected, setOwnerIsSelected] = useState(false);

    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = petList.filter(
            (owner) =>
                owner.firstname.toLowerCase().includes(query) ||
                owner.lastname.toLowerCase().includes(query)
        );

        setFilteredOwners(filtered);
    };

    useEffect(() => {
        // when created new pet the list has to be updated
        setFilteredOwners(petList); // You can change the default filter here
    }, [petList]);
    const handleSelectedOwner = (owner) => {
        setOwnerIsSelected(owner.pet_owner_id)
        updateSelectedOwner(owner);
    };
    const handleClearInput = () => {
        setSearchQuery('');
    };

    return (
        <Stack direction="column" flex={0} spacing={1} alignItems="center" sx={{px:2}}>
            <TextField
                label="Search owners by name"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{my: 0, flex: 1}}
                InputProps={{
                    endAdornment: (
                        searchQuery.length > 0 && (
                            <InputAdornment position="end">
                                <IconButton size="small" onClick={handleClearInput}>
                                    <Clear />
                                </IconButton>
                            </InputAdornment>
                        )
                    ),
                }}
            />
            {filteredOwners.length > 0 && searchQuery && searchQuery.length > 0 ? (
                <Stack
                    direction="row" justifyContent="center" flexWrap="wrap" flex={1} spacing={1} useFlexGap
                    sx={{
                        maxHeight: "250px",
                        // border: "1px solid",
                        // backgroundColor: "primary.50",
                        p: 1,
                        overflow: "scroll",
                        "& .MuiListItem-root": {
                            // backgroundColor: "secondary.50",
                            cursor: "pointer",
                            ":hover": {}
                        }
                    }}>
                    {filteredOwners.map((owner) => (
                        <Chip label={`${owner.firstname} ${owner.lastname}`}
                              variant={owner.pet_owner_id === ownerIsSelected ? "" : "outlined"}
                              key={owner.pet_owner_id} onClick={() => handleSelectedOwner(owner)} color={owner.pets.length > 0 ? "primary" : "error"}
                              sx={{flex: 0}}/>
                    ))}
                </Stack>
            ) : (
                <Typography>{searchQuery && searchQuery.length > 0 ? "Sorry, no match!" : ""}</Typography>

            )}
        </Stack>
    )
}