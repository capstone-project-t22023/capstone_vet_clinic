import React, {useState} from "react";
import {Box, Button, Stack, Typography, IconButton} from "@mui/material";
import OldPetsList from "./OldPetsList";


///// GENERATOR OF DUMMY PETS DATA
function generateRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateRandomNumber(min, max) {
    return (Math.random() * (max - min) + min).toFixed(0);
}

function generateRandomBoolean() {
    return Math.random() < 0.5;
}

function generateRandomData(count) {
    const data = [];

    for (let i = 1; i <= count; i++) {
        const birthdate = generateRandomDate(new Date(2010, 0, 1), new Date());
        const updateDate = generateRandomDate(birthdate, new Date());
        const weight = generateRandomNumber(1, 50);
        const id = generateRandomNumber(35, 350);

        data.push({
            id: id,
            pet_owner_id: i * 100,
            petname: `Pet ${id}`,
            species: ['Dog', 'Cat'][Math.floor(Math.random() * 2)],
            breed: ['Bulldog', 'Siamese', 'Labrador', 'Persian'][Math.floor(Math.random() * 4)],
            birthdate: birthdate.toISOString().split('T')[0],
            weight: weight,
            comments: `This is pet ${i}`,
            insurance_membership: generateRandomBoolean(),
            insurance_expiry: generateRandomBoolean() ? new Date(updateDate.getFullYear() + 1, updateDate.getMonth(), updateDate.getDate()).toISOString().split('T')[0] : null,
            update_date: updateDate.toISOString(),
            updated_by: `User ${i}`,
            archived: generateRandomBoolean()
        });
    }

    return data;
}


export default function OldPets() {

    const handleDeletePet = (object) => {
        console.log(`Pet with ID ${object.id} has to be deleted now.`, object);
    }
    const handleEditPet = (object) => {
        console.log(`Pet with ID ${object.id} has to be Edited now.`, object);
    }
    const handleAddPet = (object) => {
        console.log(`New pet has to be created.`, object);
    }



    const petData = generateRandomData(5);

    return (
            <Box sx={{p: 3, m: 3, backgroundColor: "secondary.50"}}>
                <h4>This is Pets Component</h4>
                <Typography component="h4">All of your Pets</Typography>
                <OldPetsList showData={petData} onDelete={handleDeletePet} onEdit={handleEditPet} onAdd={handleAddPet}/>
            </Box>
    )
}