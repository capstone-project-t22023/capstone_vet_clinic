import React, {useContext, useEffect, useState} from "react";
import dayjs from "dayjs";
import {PetsContext} from "../../contexts/PetsProvider";
import {TableCell, Table, TableRow, Paper, TableBody, TableContainer, TableHead, Typography, Stack} from "@mui/material";

export default function PetRecordsList() {

    const [petRecordsList, setPetRecordsList] = useState([]);
    const { selectedPet } = useContext(PetsContext);


    const fetchRehabRecordsByPet = (petId) => {
        const apiUrl = `http://localhost/capstone_vet_clinic/api.php/get_all_rehab_record_by_pet/${petId}`;

        return fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                return data.rehab_record; // Extract the "rehab_record" array from the response
            })
            .catch((error) => {
                console.error('Error fetching rehab records:', error);
                throw error; // Propagate the error
            });
    };


    useEffect(() => {
        // Fetch rehab records for the selected pet
        fetchRehabRecordsByPet(selectedPet)
            .then((rehabRecords) => {
                // Update the state with the fetched rehab records
                setPetRecordsList(rehabRecords);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [selectedPet]); // Execute this effect whenever the selectedPet changes


    // TODO all other pet records

    return(
        <Stack direction="column" sx={{width: "100%"}}>
            <Typography variant="h5" component="h3">REHAB RECORDS:</Typography>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Pet ID</TableCell>
                        <TableCell>Doctor ID</TableCell>
                        <TableCell>Veterinarian</TableCell>
                        <TableCell>Referral Date</TableCell>
                        <TableCell>Diagnosis</TableCell>
                        <TableCell>Archived</TableCell>
                    </TableRow>
                </TableHead>
                {petRecordsList &&
                <TableBody>
                    {petRecordsList.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.pet_id}</TableCell>
                            <TableCell>{item.doctor_id}</TableCell>
                            <TableCell>{item.veterinarian}</TableCell>
                            <TableCell>{item.referral_date}</TableCell>
                            <TableCell>{item.diagnosis}</TableCell>
                            <TableCell>{item.archived}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                }
            </Table>
        </TableContainer>
        </Stack>
    )
}