import React from "react";
import { Avatar, Box, Stack, Typography } from "@mui/material";

export default function PetProfile({ petList, selectedPet }) {

    const selectedPetData = petList.find((pet) => pet.id === selectedPet);

    return (
        <Stack direction="column" alignItems="center" spacing={4}>
            {selectedPetData && (
                <>
                    <Avatar
                        src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=320&q=80"
                        alt={selectedPetData.petname}
                        sx={{ width: 120, height: 120 }}
                    />
                    <Box sx={{textAlign: "center"}}>
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
                    </Box>

                    <Stack direction="row" spacing={1}
                           sx={{
                               "& .MuiStack-root":{
                                   backgroundColor: "primary.50",
                                   p:2,
                                   borderRadius: 4,
                                   alignItems: "center",
                                   justifyContent: "center",
                                   flex: 1,
                                   flexShrink: 0,
                                   "& p, & span":{
                                       fontSize: 14,
                                   },
                                   "& p":{
                                       color: "text.primary",
                                       fontWeight: 600,
                                   },
                                   "& span":{
                                       color: "primary.main"
                                   }
                               }
                           }}>
                        <Stack direction="column">
                            <Typography component="p">1</Typography>
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
                    {/* Other fields go here */}
                </>
            )}
        </Stack>
    );
}
