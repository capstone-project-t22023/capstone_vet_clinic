import React, {useState,useEffect} from "react";
import dayjs from "dayjs";
import {
    Box,
    Button,
    TextField,
    Stack, DialogTitle, InputLabel, Select, MenuItem, FormControl, InputAdornment,
} from "@mui/material";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";


export default function AddNewPetForm({petToEdit, ownerId, onAddPet, onUpdate, onCancel, mode}) {

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

    useEffect(() => {
        if(mode !== "add"){
            setFormData(petToEdit);
        }
    }, [petToEdit, mode]);

    const validateField = (name, value) => {
        let error = '';

        if (name === 'petname') {
            if (!value) {
                error = 'Pet name is required.';
            }
            // Add more specific validations for petname if needed
        }

        if (name === 'birthdate') {
            if (!value) {
                error = 'Birthdate is required.';
            } else {
                // You can add more complex date validations here if needed
            }
        }

        if (name === 'species') {
            if (!value) {
                error = 'Species is required.';
            }
        }

        if (name === 'breed') {
            if (!value) {
                error = 'Breed is required.';
            } else if (value.length < 1 || value.length > 50) {
                error = 'Breed must be between 1 and 50 characters.';
            }
        }

        if (name === 'weight') {
            if (!value) {
                error = true;
            }
            else if (isNaN(value) || parseFloat(value) <= 0) {
                error = 'Weight must be a positive number.';
            }
        }

        if (name === 'sex') {
            if (!value) {
                error = 'Sex is required.';
            }
        }

        if (name === 'microchip_no') {
            if (value.includes('+')) {
                error = 'Only numbers allowed.';
            }
            else if (value.length > 10) {
                error = 'Max 10 numbers allowed.';
            }
            else if (value < 0) {
                error = `Can't be negative`;
            }
        }

        if (name === 'insurance_membership') {
            if (!(value.length >= 1 && value.length <= 10)) {
                error = '1 - 10 characters allowed.';
            }
            else if (value.includes('+')) {
                error = 'Only numbers allowed.';
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
console.log("formdata", formData)
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DialogTitle>{mode === "edit" ? "Update pet": "Add a new pet"}</DialogTitle>
            <Box component="form" noValidate sx={{mt: 1}} onSubmit={handleSubmit}>

            {/*<form onSubmit={handleSubmit}>*/}
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
                            value={dayjs(formData.birthdate)}
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
                        <FormControl variant='outlined' fullWidth
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
                                <MenuItem value="Guinea Pig">Guinea Pig</MenuItem>
                                <MenuItem value="Giraffe">Giraffe</MenuItem>
                                <MenuItem value="Hamster">Hamster</MenuItem>
                                <MenuItem value="Rabbit">Rabbit</MenuItem>
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
                            InputProps={{
                                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                            }}
                        />

                        <FormControl variant='outlined' fullWidth
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
                            InputProps={{ inputProps: { min: 0 } }}
                        />
                        <TextField
                            label="Insurance Membership"
                            name="insurance_membership"
                            value={formData.insurance_membership}
                            onChange={handleChange}
                            fullWidth
                            InputProps={{ inputProps: { min: 0 } }}
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
                            value={formData.insurance_expiry ? dayjs(formData.insurance_expiry) : null}
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
                        { mode === "edit" ?
                            <Button type="submit" variant="contained" color="primary" disabled={!isFieldChanged('petname')}>
                                Update Pet
                            </Button>
                        :
                            <Button type="submit" variant="contained" color="primary" disabled={!isFieldChanged('petname')}>
                                Add Pet
                            </Button>
                        }
                    </Stack>
                </Stack>
            {/*</form>*/}
            </Box>
        </LocalizationProvider>
    )
        ;
};