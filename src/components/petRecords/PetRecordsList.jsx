import React, {useContext, useEffect, useState} from "react";
import dayjs from "dayjs";
import {PetsContext} from "../../contexts/PetsProvider";
import { styled } from '@mui/material/styles';
import {Table, TableRow, Paper, TableBody, TableContainer, TableHead, Typography, Stack} from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.primary[50],
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


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
                    <StyledTableRow>
                        <StyledTableCell>Pet ID</StyledTableCell>
                        <StyledTableCell>Doctor ID</StyledTableCell>
                        <StyledTableCell>Veterinarian</StyledTableCell>
                        <StyledTableCell>Referral Date</StyledTableCell>
                        <StyledTableCell>Diagnosis</StyledTableCell>
                        <StyledTableCell>Archived</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                {petRecordsList &&
                <TableBody>
                    {petRecordsList.map((item, index) => (
                        <StyledTableRow key={index}>
                            <StyledTableCell>{item.pet_id}</StyledTableCell>
                            <StyledTableCell>{item.doctor_id}</StyledTableCell>
                            <StyledTableCell>{item.veterinarian}</StyledTableCell>
                            <StyledTableCell>{dayjs(item.referral_date).format("DD MMM YYYY")}</StyledTableCell>
                            <StyledTableCell>{item.diagnosis}</StyledTableCell>
                            <StyledTableCell>{item.archived}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
                }
            </Table>
        </TableContainer>
        </Stack>
    )
}