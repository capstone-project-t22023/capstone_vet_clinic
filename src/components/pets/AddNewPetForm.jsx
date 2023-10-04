import React, {useState} from "react";
import dayjs from "dayjs";
import {
    Box,
    Button,
    TextField,
    Stack, DialogTitle, InputLabel, Select, MenuItem, FormControl,
} from "@mui/material";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";


export default function AddNewPetForm({petToEdit = null, ownerId, onAddPet, onUpdate, onCancel}) {

    const initialFormData = {
        pet_owner_id: ownerId,
        petname: '',
        species: '',
        breed: '',
        birthdate: '',
        weight: '',
        sex: '',
        microchip_no: '',
        insurance_membership: '',
        insurance_expiry: '',
        comments: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [originalData, setOriginalData] = useState(initialFormData);
    const [errors, setErrors] = useState({});

    const validateField = (name, value) => {
        let error = '';

        if (name === 'petname') {
            if (value.trim() === '') {
                error = 'Pet name is required.';
            }
            // Add more specific validations for petname if needed
        }

        if (name === 'birthdate') {
            if (value.trim() === '') {
                error = 'Birthdate is required.';
            } else {
                // You can add more complex date validations here if needed
            }
        }

        if (name === 'species') {
            if (value === '') {
                error = 'Species is required.';
            }
        }

        if (name === 'breed') {
            if (value.trim() === '') {
                error = 'Breed is required.';
            } else if (value.length < 1 || value.length > 50) {
                error = 'Breed must be between 1 and 50 characters.';
            }
        }

        if (name === 'weight') {
            if (value.trim() === '') {
                error = true;
            }
            else if (isNaN(value) || parseFloat(value) <= 0) {
                error = 'Weight must be a positive number.';
            }
        }

        if (name === 'sex') {
            if (value === '') {
                error = 'Sex is required.';
            }
        }

        if (name === 'microchip_no') {
            if (value.trim() === '') {
                error = true;
            }
            else if (value.length !== 15) {
                error = '15 numbers allowed.';
            }
        }

        if (name === 'insurance_membership') {
            if (value.trim() === '') {
                error = true;
            } else if (value.length !== 10) {
                error = '10 numbers allowed.';
            }
        }


        return error;
    };

    const handleChange = (event) => {
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DialogTitle>Add a new pet</DialogTitle>
            <form onSubmit={handleSubmit}>
                <Stack direction="column" spacing={2}>
                    <Stack direction="row" spacing={2}>
                        <TextField
                            label="Pet Name"
                            name="petname"
                            value={formData.petname}
                            onChange={handleChange}
                            fullWidth
                            // required
                            error={Boolean(errors.petname)}
                        />
                        <DatePicker
                            label="Birthdate"
                            name="birthdate"
                            openTo="year"
                            disableFuture
                            onError={(newError) => Boolean(errors.birthdate)}
                            slotProps={{
                                textField: {
                                    // helperText: errors.birthdate,
                                    variant: 'outlined', // For example, change the variant to 'outlined'
                                    fullWidth: true, // Make the text field full width
                                    error: Boolean(errors.birthdate)
                                },
                            }}
                            fullWidth
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

                        />
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <FormControl component="form" variant='outlined' fullWidth
                                     error={Boolean(errors.species)}>
                            <InputLabel htmlFor="label-species">Species</InputLabel>
                            <Select
                                name="species"
                                labelId="label-species"
                                value={formData.species}
                                onChange={handleChange}
                            >
                                <MenuItem value="Dog">Dog</MenuItem>
                                <MenuItem value="Cat">Cat</MenuItem>
                                <MenuItem value="Giraffe">Giraffe</MenuItem>
                                <MenuItem value="Racoon">Racoon</MenuItem>
                                <MenuItem value="Snake">Snake</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>

                        </FormControl>

                        <TextField
                            label="Breed"
                            name="breed"
                            value={formData.breed}
                            onChange={handleChange}
                            fullWidth
                            // required
                            error={Boolean(errors.breed)}
                        />
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <TextField
                            label="Weight"
                            name="weight"
                            value={formData.weight}
                            onChange={handleChange}
                            fullWidth
                            error={Boolean(errors.weight)}
                            helperText={errors.weight}
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <FormControl component="form" variant='outlined' fullWidth
                                     error={Boolean(errors.sex)}>
                            <InputLabel htmlFor="label-sex">Sex</InputLabel>
                            <Select
                                name="sex"
                                labelId="label-sex"
                                value={formData.sex}
                                onChange={handleChange}
                                error={Boolean(errors.sex)}
                            >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <TextField
                            label="Microchip Number"
                            name="microchip_no"
                            value={formData.microchip_no}
                            onChange={handleChange}
                            fullWidth
                            error={Boolean(errors.microchip_no)}
                            helperText={errors.microchip_no}
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            label="Insurance Membership"
                            name="insurance_membership"
                            value={formData.insurance_membership}
                            onChange={handleChange}
                            fullWidth
                            error={Boolean(errors.insurance_membership)}
                            helperText={errors.insurance_membership}
                        />
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <DatePicker
                            label="Insurance Expiry"
                            name="insurance_expiry"
                            // defaultValue={dayjs()}
                            // required
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
                                    // Add any props you want to customize the text field here
                                    variant: 'outlined', // For example, change the variant to 'outlined'
                                    fullWidth: true, // Make the text field full width
                                },
                            }}
                        />
                        {/*<TextField*/}
                        {/*    label="Comments"*/}
                        {/*    name="comments"*/}
                        {/*    value={formData.comments}*/}
                        {/*    onChange={handleChange}*/}
                        {/*    fullWidth*/}
                        {/*    required*/}
                        {/*    error={Boolean(errors.comments)}*/}
                        {/*/>*/}
                    </Stack>
                    <Stack direction="row" spacing={2} flex={1} justifyContent="center">
                        <Button variant="outlined" color="primary" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary" disabled={!isFieldChanged('petname')}>
                            Add Pet
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </LocalizationProvider>
    )
        ;
};