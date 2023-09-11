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

export default function BookingType({text = false, icon = false, title = false, simple = false, type}) {

    const {user} = useContext(ProgramContext);
    const {selectedAppointment, allBookingTypes} = useContext(PetsContext);
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

    const handleChange = (event) => {
        setSelectedType(event.target.value);
        console.log("Type", event.target.value)
    };
    const handleChangeBookingType = () => {
        console.log("Save Booking Type")
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