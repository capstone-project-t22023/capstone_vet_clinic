import React, {useContext, useEffect, useState} from "react";
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Typography,
} from "@mui/material";
import {PetsContext} from "../../contexts/PetsProvider";
import ProgramContext from "../../contexts/ProgramContext";
import {
    FitnessCenterRounded, LocalHospitalRounded,
    MedicalServicesRounded,
    ReportGmailerrorredRounded,
    RestaurantRounded,
    VaccinesRounded
} from "@mui/icons-material";
import dayjs from "dayjs";

export default function BookingType({text = false, icon = false, title = false, simple = false, type}) {

    const {user} = useContext(ProgramContext);
    const {selectedAppointment, allBookingTypes,handlerRefreshAppointments} = useContext(PetsContext);
    const [bookingType, setBookingType] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [openBookingType, setOpenBookingType] = useState(false)
    const [selectedType, setSelectedType] = useState(-1)

    if (!text && !icon && !title) {
        text = true;
        icon = true;
        title = true;
    }

    useEffect(() => {
        const foundBookingType = allBookingTypes.find(bType => bType.booking_type === type);
        if (foundBookingType) {
            setBookingType(foundBookingType);
            setSelectedType(foundBookingType.id);
        }
    }, [allBookingTypes, type]);

    const showIcon = (typeId) => {
        switch (typeId) {
            case 1:
                return <MedicalServicesRounded color="primary"/>;
            case 2:
                return <RestaurantRounded color="success"/>;
            case 3:
                return <FitnessCenterRounded color="secondary"/>;
            case 4:
                return <VaccinesRounded color="warning"/>;
            case 5:
                return <LocalHospitalRounded color="error"/>;
            default:
                return <ReportGmailerrorredRounded color="grey.300"/>;
        }
    };


    const updateBookingTypeInAppointment = () => {
        const {booking_date, booking_time} = selectedAppointment;

// Convert booking_date and booking_time into the desired format
        const booking_slots = booking_time.map((time) => ({
            booking_date: dayjs(booking_date).format("DD-MM-YYYY"),
            booking_time: time,
        }));

// Update the requestBody with the new booking_slots array
        const requestBody = {
            booking_type: allBookingTypes.find(bType => bType.id === selectedType).booking_type,
            pet_owner_id: selectedAppointment.pet_owner_id,
            pet_id: selectedAppointment.pet_id,
            doctor_id: selectedAppointment.doctor_id,
            booking_slots,
        };
        const apiUrl = "http://localhost/capstone_vet_clinic/api.php/update_booking_by_admin/" + selectedAppointment.booking_id;
        console.log(JSON.stringify(requestBody))

        fetch(apiUrl, {
            method: "POST",
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Response from API:", data);
            })
            .catch((data) => {
                console.error("Error:", data);
            });
    }


    const handleChange = (event) => {
        setSelectedType(event.target.value);
        console.log("Type", event.target.value)
    };
    const handleChangeBookingType = () => {
        // console.log(allBookingTypes);
        console.log("TOTO",allBookingTypes.find(bType => bType.booking_type === type).booking_type);
        setSelectedType(type?type:'');
        setEditMode(false);
        updateBookingTypeInAppointment();
        handlerRefreshAppointments(true)

        console.log("Save Booking Type")
    //     TODO Save booking type - update booking
    };

    const handleCloseBookingType = () => {
        setOpenBookingType(false);
    }

    return (
        <Box sx={{my: 2}}>
            {user.role === "admin" && !simple ? (
                <Stack direction="column">
                    {editMode ? (
                        <Paper elevation={0} sx={{borderRadius: 4, p: 2, border: "1px solid", borderColor: "primary.50"}}>
                            <Stack direction="column" spacing={2}>
                                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                    <InputLabel id="select-booking">Booking Type</InputLabel>


                                <Select
                                    value={selectedType}
                                    onChange={handleChange}
                                    displayEmpty
                                    variant="outlined"
                                    size="small"
                                    label="Booking Type"
                                    fullWidth
                                >

                                    {allBookingTypes.map((type) => (
                                        <MenuItem key={type.id} value={type.id}>
                                            {type.booking_type}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <Stack direction="row" spacing={2} sx={{mt: 1}} justifyContent="center">
                                    <Button onClick={() => setEditMode(!editMode)} variant="outlined" size="small"
                                            color="primary">Cancel</Button>
                                    <Button onClick={handleChangeBookingType} variant="contained" size="small"
                                            color="primary">Save</Button>
                                </Stack>
                                </FormControl>
                            </Stack>
                        </Paper>
                    ) : (
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography fontSize="0.75rem"><strong>Booking Type:</strong></Typography>
                            <Button
                                onClick={() => setEditMode(!editMode)}>{type ? type : "Select Type"}</Button>
                        </Stack>
                    )
                    }
                </Stack>

            ) : (
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-start">
                    {title && <Typography fontSize="0.75rem"><strong>Type:</strong></Typography>}
                    {icon && <Typography
                        sx={{"& .MuiSvgIcon-root": {fontSize: "1rem"}}}
                    >{showIcon(selectedType)}</Typography>}
                    {text && <Typography>{type ? type : "No Type"}</Typography>}
                </Stack>
            )}
        </Box>

    )
}