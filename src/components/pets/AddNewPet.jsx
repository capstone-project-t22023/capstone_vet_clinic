import React, {useState} from "react";
import {Box, Button, Grid, TextField, InputAdornment} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";

export default function AddNewPet({petToEdit, onAddPet}) {
    const [petname, setPetname] = useState('');
    const [species, setSpecies] = useState('');
    const [breed, setBreed] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [weight, setWeight] = useState('');
    const [comments, setComments] = useState('');
    const [insuranceMembership, setInsuranceMembership] = useState(false);
    const [insuranceExpiry, setInsuranceExpiry] = useState('');
    const [errors, setErrors] = useState({});

    const validateInputs = () => {
        const newErrors = {};

        if (!petname) {
            newErrors.petname = 'Pet Name is required';
        }

        if (!species) {
            newErrors.species = 'Species is required';
        }

        if (!breed) {
            newErrors.breed = 'Breed is required';
        }

        if (!birthdate) {
            newErrors.birthdate = 'Birthdate is required';
        }

        if (!weight) {
            newErrors.weight = 'Weight is required';
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

            onAddPet(newPet);
            setPetname('');
            setSpecies('');
            setBreed('');
            setBirthdate('');
            setWeight('');
            setComments('');
            setInsuranceMembership(false);
            setInsuranceExpiry('');
            setErrors({});
        }
    };

    return (

        <>
            {petToEdit ? (
                <Grid container spacing={2} rowSpacing={1} columns={12}
                      sx={{width: "100%", mb: 3, "& .MuiSvgIcon-root": {flex: 1, color: "secondary.dark"}}}>

                    <Grid item xs={12} sm={6} md={4} lg={3}>

                        <TextField
                            id="species"
                            label="Species"
                            placeholder={petToEdit.species}
                            // helperText={errorSpecies ? errorSpecies : ""}
                            // onChange={handleChange}
                            // variant="standard"
                            // error={errorSpecies}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle/>
                                    </InputAdornment>
                                ),
                            }}
                            required
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField
                            id="breed"
                            label="Breed"
                            placeholder={petToEdit.breed}
                            // helperText={errorBreed ? errorBreedMessage : ""}
                            // onChange={handleChange}
                            // variant="standard"
                            // error={errorBreed}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle/>
                                    </InputAdornment>
                                ),
                            }}
                            required
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>

                        <TextField
                            id="birthdate"
                            label="Birth Date"
                            placeholder={petToEdit.birthdate}
                            // helperText={errorSpecies ? errorBirthdate : ""}
                            // onChange={handleChange}
                            // variant="standard"
                            // error={errorBirthdate}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle/>
                                    </InputAdornment>
                                ),
                            }}
                            required
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField
                            id="weight"
                            label="Weight"
                            placeholder={petToEdit.weight}
                            // helperText={errorBreed ? errorWeight : ""}
                            // onChange={handleChange}
                            // variant="standard"
                            // error={errorWeight}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle/>
                                    </InputAdornment>
                                ),
                            }}
                            required
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>

                        <TextField
                            id="comments"
                            label="Comments"
                            placeholder={petToEdit.comments}
                            // helperText={errorSpecies ? errorComments : ""}
                            // onChange={handleChange}
                            // variant="standard"
                            // error={errorComments}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle/>
                                    </InputAdornment>
                                ),
                            }}
                            required
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField
                            id="insurance_membership"
                            label="Insurance Membership"
                            placeholder={petToEdit.insurance_membership ? 'Yes' : 'No'}
                            // helperText={errorBreed ? errorInsurance_membership : ""}
                            // onChange={handleChange}
                            // variant="standard"
                            // error={errorInsurance_membership}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle/>
                                    </InputAdornment>
                                ),
                            }}
                            required
                            fullWidth
                            margin="normal"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField
                            id="insurance_expiry"
                            label="Insurance Expiry"
                            placeholder={petToEdit.insurance_expiry}
                            // value={petToEdit.insurance_expiry}
                            // helperText={errorBreed ? errorInsurance_expiry : ""}
                            // onChange={handleChange}
                            // variant="standard"
                            // error={errorInsurance_expiry}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle/>
                                    </InputAdornment>
                                ),
                            }}
                            required
                            fullWidth
                            margin="normal"
                            type={"date"}
                        />
                    </Grid>

                </Grid>

            ) : (
                <>
                    <Grid container spacing={2} rowSpacing={1} columns={12}
                          sx={{width: "100%", mb: 3, "& .MuiSvgIcon-root": {flex: 1, color: "secondary.dark"}}}>


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
                                        label="Birthdate"
                                        fullWidth
                                        value={birthdate}
                                        onChange={(e) => setBirthdate(e.target.value)}
                                        error={!!errors.birthdate}
                                        helperText={errors.birthdate}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                    <TextField
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
                                        label="Comments"
                                        fullWidth
                                        value={comments}
                                        onChange={(e) => setComments(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                    <TextField
                                        label="Insurance Membership"
                                        fullWidth
                                        value={insuranceMembership}
                                        onChange={(e) => setInsuranceMembership(e.target.checked)}
                                        type="checkbox"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                    <TextField
                                        label="Insurance Expiry"
                                        fullWidth
                                        value={insuranceExpiry}
                                        onChange={(e) => setInsuranceExpiry(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" color="primary">
                                        Add Pet
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                            </Grid>

                    </>

                    )}
        </>
    )
}