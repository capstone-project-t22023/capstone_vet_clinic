import React, {useContext, useState} from "react";
import dayjs from "dayjs";
import {
    Box,
    Button,
    Grid,
    TextField,
    Stack,
    Checkbox, Paper,
} from "@mui/material";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AccountCircle, AddRounded} from "@mui/icons-material";
import ProgramContext from "../../contexts/ProgramContext";


export default function AddNewPetForm({petToEdit = null, ownerId, onAddPet, onUpdate, onCancel}) {
    const {user} = useContext(ProgramContext);

    const initialFormData = {
        petname: '',
        species: '',
        breed: '',
        birthdate: '',
        weight: '',
        sex: '',
        microchip_no: '',
        insurance_membership: '',
        insurance_expiry: '',
        comments: '',
        pet_owner_id: ownerId,
        username: user.username
    };

    const [formData, setFormData] = useState(initialFormData);
    const [originalData, setOriginalData] = useState(initialFormData);
    const [errors, setErrors] = useState({});

    const validateField = (name, value) => {
        let error = '';

        if (name === 'insurance_membership' || name === 'microchip_no') {
            if (value.length > 10) {
                error = 'Max 10 characters allowed';
            }
        }

        // Add more specific validations for other fields here
        // Example: if (name === 'weight' && !Number(value)) error = 'Invalid weight';

        return error;
    };

    const handleChange = (event) => {
        console.log("Event:", event)
        const {name, value} = event.target;
        const error = validateField(name, value);

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        let formValid = true;
        const newErrors = {};

        Object.keys(formData).forEach((field) => {
            const error = validateField(field, formData[field]);
            if (error) {
                formValid = false;
                newErrors[field] = error;
            }
        });

        if (!formValid) {
            setErrors(newErrors);
        } else {
            setErrors({});
            onAddPet(formData);
            setOriginalData(formData);
            setFormData(initialFormData);
        }
    };

    const isFieldChanged = (field) => formData[field] !== originalData[field];

    return (
        <Box p={3}>
            <form onSubmit={handleSubmit}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack direction="column" spacing={2}>
                        <TextField
                            label="Pet Name"
                            name="petname"
                            value={formData.petname}
                            onChange={handleChange}
                            fullWidth
                            required
                            error={Boolean(errors.petname)}
                            helperText={errors.petname}
                        />
                        <TextField
                            label="Species"
                            name="species"
                            value={formData.species}
                            onChange={handleChange}
                            fullWidth
                            required
                            error={Boolean(errors.species)}
                            helperText={errors.species}
                        />
                        <TextField
                            label="Breed"
                            name="breed"
                            value={formData.breed}
                            onChange={handleChange}
                            fullWidth
                            required
                            error={Boolean(errors.breed)}
                            helperText={errors.breed}
                        />
                        <DatePicker
                            label="Birthdate"
                            name="birthdate"
                            openTo="year"
                            // defaultValue={dayjs()}
                            required
                            // value={formData.birthdate}
                            onChange={(newValue) => {
                                handleChange({
                                    target: {
                                        name: 'birthdate',
                                        value: dayjs(newValue).format('DD-MM-YYYY')
                                    }
                                });
                            }}
                            error={Boolean(errors.birthdate)}
                            helperText={errors.birthdate}
                            disableFuture
                            slotProps={{
                                textField: {
                                    // helperText: 'MM/DD/YYYY',
                                },
                            }}
                        />
                        <TextField
                            label="Weight"
                            name="weight"
                            value={(formData.weight)}
                            onChange={() => {
                                handleChange({
                                    target: {
                                        name: 'weight',
                                        value: parseFloat(formData.weight)
                                    }
                                })
                            }}
                            fullWidth
                            required
                            error={Boolean(errors.weight)}
                            helperText={errors.weight}
                        />
                        <TextField
                            label="Sex"
                            name="sex"
                            value={formData.sex}
                            onChange={handleChange}
                            fullWidth
                            required
                            error={Boolean(errors.sex)}
                            helperText={errors.sex}
                        />
                        <TextField
                            label="Microchip Number"
                            name="microchip_no"
                            value={formData.microchip_no}
                            onChange={handleChange}
                            fullWidth
                            required
                            error={Boolean(errors.microchip_no)}
                            helperText={errors.microchip_no}
                        />
                        <TextField
                            label="Insurance Membership"
                            name="insurance_membership"
                            value={formData.insurance_membership}
                            onChange={handleChange}
                            fullWidth
                            required
                            error={Boolean(errors.insurance_membership)}
                            helperText={errors.insurance_membership}
                        />
                        <DatePicker
                            label="Insurance Expiry"
                            name="insurance_expiry"
                            // defaultValue={dayjs()}
                            required
                            // value={formData.insurance_expiry}
                            onChange={(newValue) => {
                                handleChange({
                                    target: {
                                        name: 'insurance_expiry',
                                        value: dayjs(newValue).format('DD-MM-YYYY')
                                    }
                                });
                            }}
                            error={Boolean(errors.insurance_expiry)}
                            helperText={errors.insurance_expiry}
                            slotProps={{
                                textField: {
                                    // helperText: 'MM/DD/YYYY',
                                },
                            }}
                        />
                        <TextField
                            label="Comments"
                            name="comments"
                            value={formData.comments}
                            onChange={handleChange}
                            fullWidth
                            required
                            error={Boolean(errors.comments)}
                            helperText={errors.comments}
                        />
                        <Button variant="text" color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary" disabled={!isFieldChanged('petname')}>
                            Add Pet
                        </Button>
                    </Stack>
                </LocalizationProvider>
            </form>
        </Box>
    );
};