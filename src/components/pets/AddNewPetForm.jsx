import React, { useState } from "react";
import {
    Box,
    Button,
    Grid,
    TextField,
    FormControlLabel,
    Checkbox
} from "@mui/material";
import { AccountCircle, AddRounded } from "@mui/icons-material";

export default function AddNewPetForm({ petToEdit = null, onAddPet, onUpdate, onCancel }) {
    const [petname, setPetname] = useState("");
    const [species, setSpecies] = useState("");
    const [breed, setBreed] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [weight, setWeight] = useState("");
    const [comments, setComments] = useState("");
    const [insuranceMembership, setInsuranceMembership] = useState(false);
    const [insuranceExpiry, setInsuranceExpiry] = useState("");
    const [errors, setErrors] = useState({});

    const validateInputs = () => {
        const newErrors = {};

        if (!petname) {
            newErrors.petname = "Pet Name is required";
        }

        if (!species) {
            newErrors.species = "Species is required";
        }

        if (!breed) {
            newErrors.breed = "Breed is required";
        }

        if (!birthdate) {
            newErrors.birthdate = "Birthdate is required";
        }

        if (!weight) {
            newErrors.weight = "Weight is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateInputs()) {
            const newPet = {
                petname,
                species,
                breed,
                birthdate,
                weight,
                comments,
                insurance_membership: insuranceMembership,
                insurance_expiry: insuranceExpiry,
            };

            if (petToEdit) {
                onUpdate(newPet);
            } else {
                onAddPet(newPet);
            }

            setPetname("");
            setSpecies("");
            setBreed("");
            setBirthdate("");
            setWeight("");
            setComments("");
            setInsuranceMembership(false);
            setInsuranceExpiry("");
            setErrors({});
        }
    };

    const handleCancel = () => {
        onCancel(true);
    };

    return (
        <Box sx={{ p: 3 }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField
                            label="Pet Name"
                            fullWidth
                            value={petname}
                            onChange={(e) => setPetname(e.target.value)}
                            error={!!errors.petname}
                            helperText={errors.petname}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField
                            id="species"
                            label="Species"
                            fullWidth
                            value={species}
                            onChange={(e) => setSpecies(e.target.value)}
                            error={!!errors.species}
                            helperText={errors.species}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField
                            id="breed"
                            label="Breed"
                            fullWidth
                            value={breed}
                            onChange={(e) => setBreed(e.target.value)}
                            error={!!errors.breed}
                            helperText={errors.breed}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField
                            id="birthdate"
                            label="Birthdate"
                            fullWidth
                            value={birthdate}
                            onChange={(e) => setBirthdate(e.target.value)}
                            error={!!errors.birthdate}
                            helperText={errors.birthdate}
                            type="date"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField
                            id="weight"
                            label="Weight"
                            fullWidth
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            error={!!errors.weight}
                            helperText={errors.weight}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField
                            id="comments"
                            label="Comments"
                            fullWidth
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id="insurance_membership"
                                    checked={insuranceMembership}
                                    onChange={(e) => setInsuranceMembership(e.target.checked)}
                                />
                            }
                            label="Insurance Membership"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField
                            id="insurance_expiry"
                            label="Insurance Expiry"
                            fullWidth
                            value={insuranceExpiry}
                            onChange={(e) => setInsuranceExpiry(e.target.value)}
                            type="date"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {petToEdit ? (
                            <Button variant="text" onClick={handleCancel}>
                                Cancel
                            </Button>
                        ) : null}
                        <Button type="submit" variant="contained" color="primary">
                            {petToEdit ? "Update" : <AddRounded />}
                            {/*{petToEdit ? "Update" : "Add Pet"}*/}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}