import React, {useContext, useEffect, useState} from "react";
import {
    Alert, Box,
    Button,
    DialogTitle, FormControl, InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField
} from "@mui/material";
import dayjs from "dayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {PetsContext} from "../../contexts/PetsProvider";
import ProgramContext from "../../contexts/ProgramContext";


export default function ImmunizationForm(props) {
    const [openForm, setOpenForm] = useState(true)
    const {selectedPet} = useContext(PetsContext)
    const {user} = useContext(ProgramContext)


    const handleCloseForm = () => {
        setOpenForm(false);
        props.setOpenForm(false)
        props.onClose(false);
    };


    const [formData, setFormData] = useState({
        pet_id: selectedPet,
        doctor_id: user.id,
        booking_id: props.selectedAppointmentId,
        vaccine_date: dayjs(new Date()),
        vaccine: '',
        comments: ''


    });

    const [errors, setErrors] = useState({});
    const [vaccineOptions, setVaccineOptions] = useState([]);

    // Fetch vaccine options from the API
    useEffect(() => {
        fetch('http://localhost/capstone_vet_clinic/api.php/get_all_vaccines', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setVaccineOptions(data.get_all_vaccines);
            })
            .catch((error) => {
                console.error('Error fetching vaccine options:', error);
            });
    }, []);


    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            vaccine_date: dayjs(date),
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length === 0) {
            // Form is valid, handle form submission here

            const reqBody = {
                pet_id: formData.pet_id,
                doctor_id: formData.doctor_id,
                booking_id: formData.booking_id,
                vaccine_date: dayjs(formData.vaccine_date).format("DD-MM-YYYY"),
                vaccine: formData.vaccine,
                comments: formData.comments
            }

            console.log(JSON.stringify(reqBody))

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify(reqBody),
            };

            fetch('http://localhost/capstone_vet_clinic/api.php/add_immun_record', requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    if (data.add_immun_record) {
                        console.log('Record added successfully');
                        // Optionally, you can reset the form here
                    } else {
                        console.error('Failed to add record', data);
                    }
                })
                .catch((error) => {
                    console.error('Error adding record:', error);
                });

            handleCloseForm();

        } else {
            // Form is invalid, set errors
            setErrors(validationErrors);
        }

    };

    const validateForm = (data) => {
        const errors = {};
        if (!data.vaccine_date) {
            errors.vaccine_date = 'Vaccine Date is required';
        }
        if (!data.vaccine) {
            errors.vaccine = 'Vaccine is required';
        }
        if (!data.comments) {
            errors.comments = 'Comment is required';
        }
        return errors;
    };


    return (


        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DialogTitle>{"Add Immunization Record"}</DialogTitle>
            <Box component="form" id="immunizForm" noValidate sx={{mt: 1}} onSubmit={handleSubmit}>
                {/*<form onSubmit={handleSubmit}>*/}
                <Stack spacing={2}>
                    <DatePicker
                        id="vaccine_date"
                        label="Vaccine Date"
                        name="vaccine_date"
                        value={dayjs(formData.vaccine_date)}
                        onChange={(date) => handleDateChange(date)}
                        slotProps={{
                            textField: {
                                // Add any props you want to customize the text field here
                                variant: 'outlined', // For example, change the variant to 'outlined'
                                fullWidth: true, // Make the text field full width
                            },
                        }}
                    />
                    {errors.vaccine_date && <Alert severity="error">{errors.vaccine_date}</Alert>}

                    <FormControl variant='outlined' fullWidth
                                 error={Boolean(errors.vaccine)}>
                        <InputLabel label="label-vaccine">Vaccine</InputLabel>
                        <Select
                            name="vaccine"
                            labelId="label-vaccine"
                            value={formData.vaccine}
                            onChange={handleChange}
                            error={Boolean(errors.vaccine)}
                        >
                            {vaccineOptions.map((option, index) => (
                                <MenuItem key={index} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {errors.vaccine && <Alert severity="error">{errors.vaccine}</Alert>}

                    <TextField
                        id="comments"
                        name="comments"
                        label="Comments"
                        multiline
                        maxRows={4}
                        onChange={handleChange}
                        value={formData.comments}
                    />
                    {errors.comments && <Alert severity="error">{errors.comments}</Alert>}

                    <Button type="submit">Submit</Button>
                </Stack>
                {/*</form>*/}
            </Box>
        </LocalizationProvider>

    )
}