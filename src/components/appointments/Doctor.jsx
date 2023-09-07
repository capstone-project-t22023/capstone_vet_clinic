import React, {useContext, useState} from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogTitle,
    MenuItem,
    Paper,
    Select,
    Stack, Tooltip,
    Typography,
    Zoom
} from "@mui/material";
import {PetsContext} from "../../contexts/PetsProvider";
import ProgramContext from "../../contexts/ProgramContext";

export default function Doctor({id = -1}) {

    const {user} = useContext(ProgramContext);
    const {getDoctor, allDoctors, selectedAppointment} = useContext(PetsContext);
    const [editMode, setEditMode] = useState(false)
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [openDoctorDetails, setOpenDoctorDetails] = useState(false)


    const doctor = getDoctor(id)


    // admin to change doctor for selected appointment

    const updateDoctorInAppointment = () => {
        const {booking_date, booking_time} = selectedAppointment;

// Convert booking_date and booking_time into the desired format
        const booking_slots = booking_time.map((time) => ({
            booking_date,
            booking_time: time,
        }));

// Update the requestBody with the new booking_slots array
        const requestBody = {
            booking_type: selectedAppointment.booking_type,
            pet_owner_id: selectedAppointment.pet_owner_id,
            pet_id: selectedAppointment.pet_id,
            doctor_id: selectedDoctor, // Use the updated doctor_id here
            booking_slots,
        };
        const apiUrl = "/update_booking_by_admin/" + selectedAppointment.booking_id; // Replace with your actual API endpoint URL

        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Response from API:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }


    const handleChangeDoctor = () => {
        updateDoctorInAppointment();
        setEditMode(false);
        setSelectedDoctor('');
    }

    const handleChange = (event) => {
        setSelectedDoctor(event.target.value);
        console.log("DR", event.target.value)
    };

    const handleCloseDoctorDetails = () => {
        setOpenDoctorDetails(false);
    }


    return (
        <Box sx={{my: 2}}>
            {user.role === "admin" &&
                <Stack direction="column">
                    {editMode ? (
                        <Paper elevation={20}>
                            <Stack direction="column" spacing={2}
                                   sx={{border: "1px solid", borderColor: "primary.50", p: 1}}>
                                <Select
                                    value={selectedDoctor}
                                    onChange={handleChange}
                                    displayEmpty
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                >
                                    <MenuItem value="" disabled>
                                        Select Dr.
                                    </MenuItem>
                                    {allDoctors.map((dr) => (
                                        <MenuItem key={dr.id} value={dr.id}>
                                            {dr.firstname} {dr.lastname}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <Stack direction="row" spacing={3} justifyContent="center">
                                    <Button onClick={() => setEditMode(!editMode)} variant="outlined"
                                            color="primary">Cancel</Button>
                                    <Button onClick={handleChangeDoctor} variant="contained"
                                            color="primary">Save</Button>
                                </Stack>
                            </Stack>
                        </Paper>
                    ) : (
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography><strong>Doctor:</strong></Typography>
                            <Button
                                onClick={() => setEditMode(!editMode)}>{doctor ? doctor.firstname + " " + doctor.lastname : "Select Doctor"}</Button>
                        </Stack>
                    )
                    }
                </Stack>

            }
            <Stack direction="row" spacing={1} alignItems="center">
                <Tooltip title={doctor ? (
                    <>
                        Phone: {doctor.phone}
                        <br/>
                        Email: {doctor.email}
                    </>
                ) : null} TransitionComponent={Zoom}
                         placement="bottom" arrow>
                    <Typography
                        onClick={doctor ? () => setOpenDoctorDetails(true) : null}><strong>Doctor:</strong> {doctor ? doctor.firstname + " " + doctor.lastname : "No Doctor Yet"}
                    </Typography>
                </Tooltip>
            </Stack>
            <Dialog open={openDoctorDetails} onClose={handleCloseDoctorDetails} maxWidth={"md"}>
                <DialogTitle
                    sx={{mt: 3, p: 2, textAlign: 'center', fontWeight: 'bold'}}>
                    Doctor's details:
                </DialogTitle>
                {doctor &&
                    <Card>
                        <CardContent>
                            <Typography>First Name: {doctor.firstname}</Typography>
                            <Typography>Last Name: {doctor.lastname}</Typography>
                            <Typography>Email: {doctor.email}</Typography>
                            <Typography>Phone: {doctor.phone}</Typography>
                            {/* Add more fields as needed */}
                        </CardContent>
                    </Card>
                }

            </Dialog>
        </Box>
    )
}