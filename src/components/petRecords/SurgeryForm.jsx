import React, {useContext, useState} from "react";
import {Alert, Button, DialogTitle, Slide, Stack, TextField} from "@mui/material";
import dayjs from "dayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {PetsContext} from "../../contexts/PetsProvider";
import ProgramContext from "../../contexts/ProgramContext";

export default function SurgeryForm(props) {
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
        surgery: '',
        surgery_date: dayjs(new Date()).format("DD-MM-YYYY"),
        discharge_date: dayjs(new Date()).format("DD-MM-YYYY"),
        comments: ''


    });

    const [errors, setErrors] = useState({});


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
            surgery_date: dayjs(date).format("DD-MM-YYYY"),
        });
    };
    const handleDischargeDateChange = (date) => {
        setFormData({
            ...formData,
            discharge_date: dayjs(date).format("DD-MM-YYYY"),
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length === 0) {
            // Form is valid, handle form submission here

            console.log(JSON.stringify(formData))
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify(formData),
            };

            fetch('http://localhost/capstone_vet_clinic/api.php/add_surgery', requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    if (data.add_surgery) {
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
        if (!data.surgery_date) {
            errors.surgery_date = 'Vaccine Date is required';
        }
        if (!data.surgery) {
            errors.surgery = 'Surgery Name is required';
        }
        if (!data.discharge_date) {
            errors.discharge_date = 'Discharge Date is required';
        }
        if (!data.comments) {
            errors.comments = 'Comment is required';
        }
        return errors;
    };


    return (


        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DialogTitle>{"Add Surgery"}</DialogTitle>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        id="surgery"
                        name="surgery"
                        label="Surgery"
                        variant="outlined"
                        onChange={handleChange}
                        value={formData.surgery}
                    />
                    {errors.surgery && <Alert severity="error">{errors.surgery}</Alert>}
                    <DatePicker
                        id="surgery_date"
                        name="surgery_date"
                        label="Surgery Date"
                        value={dayjs(formData.surgery_date)}
                        onChange={(date) => handleDateChange(date)}
                        slotProps={{
                            textField: {
                                // helperText: 'MM/DD/YYYY',
                            },
                        }}
                    />
                    {errors.surgery_date && <Alert severity="error">{errors.surgery_date}</Alert>}
                    <DatePicker
                        id="discharge_date"
                        label="Discharge Date"
                        name="discharge_date"
                        value={dayjs(formData.discharge_date)}
                        onChange={(date) => handleDischargeDateChange(date)}
                        slotProps={{
                            textField: {
                                // helperText: 'MM/DD/YYYY',
                            },
                        }}
                    />
                    {errors.discharge_date && <Alert severity="error">{errors.discharge_date}</Alert>}

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
            </form>
        </LocalizationProvider>

    )
}