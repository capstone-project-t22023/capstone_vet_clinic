import React, { useState, useEffect, useContext } from 'react';
import {
    Box, InputAdornment, DialogContent, DialogTitle,
    TextField, Chip, MenuItem, Radio, DialogContentText, DialogActions,
    Dialog, FormControlLabel, Slide, Grid
} from '@mui/material';
import {
    Place, Pets,
    Home, Phone, Badge,
    Email, AccountCircle
} from '@mui/icons-material';
import dayjs from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {PetsContext} from "../../contexts/PetsProvider";


const animalSpecies = [
    { value: '', label: '' },
    { value: 'Dog', label: 'Dog' },
    { value: 'Cat', label: 'Cat' },
    { value: 'Guinea Pig', label: 'Guinea Pig' },
    { value: 'Giraffe', label: 'Giraffe' },
    { value: 'Hamster', label: 'Hamster' },
    { value: 'Rabbit', label: 'Rabbit' },
    { value: 'Racoon', label: 'Racoon' },
    { value: 'Snake', label: 'Snake' },
    { value: 'Other', label: 'Other' },
];

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function PetProfileForm(props) {
    const [errorAlert, setErrorAlert] = useState('');
    const [errors, setErrors] = useState({});
    const [petId, setPetId] = useState(null);
    const [petOwnerId, setPetOwnerId] = useState(null);
    const [petName, setPetName] = useState("");
    const [birthdate, setBirthdate] = useState(dayjs());
    const [species, setSpecies] = useState("");
    const [weight, setWeight] = useState(null);
    const [breed, setBreed] = useState(null);
    const [sex, setSex] = useState("");
    const [microchip, setMicrochip] = useState("");
    const [insurance, setInsurance] = useState("");
    const [expiry, setExpiry] = useState(null);
    const [showDialog, setShowDialog] = useState(props.showDialog);
    const [canSubmit, setCanSubmit] = useState(true);
    const [userId, setUserId] = useState(0);
    const [mode, setMode] = useState("add");
    const {handlerReloadPetList, changeSidebarContent} = useContext(PetsContext);

    useEffect(() => {
        console.log("props.defaultValues", props.ownerId)
        setPetOwnerId(props.ownerId);

        if (props.mode === "edit") {
            
            setPetId(props.defaultValues.pet_id);
            setPetName(props.defaultValues.petname);
            setBirthdate(dayjs(props.defaultValues.birthdate));
            setSpecies(props.defaultValues.species);
            setWeight(parseFloat(props.defaultValues.weight).toFixed(2));
            setBreed(props.defaultValues.breed);
            setSex(props.defaultValues.sex);
            setMicrochip(props.defaultValues.microchip_no);
            setInsurance(props.defaultValues.insurance_membership);
            setExpiry(props.defaultValues.insurance_expiry ? dayjs(props.defaultValues.insurance_expiry) : null);
            setMode(props.mode);
        }
    }, [props.defaultValues, props.mode]);

    const handleAdd = () => {

        console.log(JSON.stringify({
            "pet_owner_id": petOwnerId,
                "petname": petName,
                "species": species,
                "breed": breed,
                "birthdate": dayjs(birthdate).format('DD-MM-YYYY'),
                "weight": weight,
                "sex": sex,
                "microchip_no": microchip,
                "insurance_membership": insurance,
                "insurance_expiry": expiry ? dayjs(expiry).format('DD-MM-YYYY') : null
        }));

        fetch("http://localhost/capstone_vet_clinic/api.php/add_pet", {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                "pet_owner_id": petOwnerId,
                    "petname": petName,
                    "species": species,
                    "breed": breed,
                    "birthdate": dayjs(birthdate).format('DD-MM-YYYY'),
                    "weight": weight,
                    "sex": sex,
                    "microchip_no": microchip,
                    "insurance_membership": insurance,
                    "insurance_expiry": expiry ? dayjs(expiry).format('DD-MM-YYYY') : null
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.add_pet) {
                    props.setShowDialog(false);
                    handlerReloadPetList(true);
                    changeSidebarContent('');
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleUpdate = () => {

        console.log(JSON.stringify({
            "pet_owner_id": petOwnerId,
                "petname": petName,
                "species": species,
                "breed": breed,
                "birthdate": dayjs(birthdate).format('DD-MM-YYYY'),
                "weight": weight,
                "sex": sex,
                "microchip_no": microchip,
                "insurance_membership": insurance,
                "insurance_expiry": expiry ? dayjs(expiry).format('DD-MM-YYYY') : null
        }));

        fetch("http://localhost/capstone_vet_clinic/api.php/update_pet/" + petId, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                "pet_owner_id": petOwnerId,
                "petname": petName,
                "species": species,
                "breed": breed,
                "birthdate": dayjs(birthdate).format('DD-MM-YYYY'),
                "weight": weight,
                "sex": sex,
                "microchip_no": microchip,
                "insurance_membership": insurance,
                "insurance_expiry": expiry ? dayjs(expiry).format('DD-MM-YYYY') : null
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.update_pet) {
                    props.setShowDialog(false);
                    handlerReloadPetList(true);
                    changeSidebarContent('');
                } else {
                    console.log("error")
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleCloseForm = () => {
        setShowDialog(false);
        props.setShowDialog(false);
    };

    return (
        <>
            <Dialog
                open={props.showDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseForm}
                aria-describedby="user-form-dialog"
            >
                <DialogTitle>{mode === 'edit' ? "Update Pet ID: " + petId : "Add Pet"}</DialogTitle>
                <DialogContent>
                    <DialogContentText component={'span'} id="pet-form-dialog">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Grid container component={'span'} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid component={'span'} item xs={6}>
                                    <TextField
                                        id="petname"
                                        label="Petname"
                                        helperText={errors.petname}
                                        onChange={(newValue) => {
                                            setPetName(newValue.target.value);
                                        }}
                                        value={petName}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Pets />
                                                </InputAdornment>
                                            ),
                                        }}
                                        required
                                        fullWidth
                                        margin="normal"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid component={'span'} item xs={6}>
                                    <TextField
                                        select
                                        id="sex"
                                        label="Sex"
                                        helperText={errors.sex}
                                        onChange={(newValue) => {
                                            setSex(newValue.target.value);
                                        }}
                                        value={sex}
                                        error={Boolean(errors.sex)}
                                        required
                                        fullWidth
                                        margin="normal"
                                    >
                                        <MenuItem value="">
                                            
                                        </MenuItem>
                                        <MenuItem value="Female">
                                            Female
                                        </MenuItem>
                                        <MenuItem value="Male">
                                            Male
                                        </MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid component={'span'} item xs={6}>
                                    <TextField
                                        select
                                        id="species"
                                        label="Species"
                                        helperText={errors.species}
                                        onChange={(newValue) => {
                                            setSpecies(newValue.target.value);
                                        }}
                                        value={species}
                                        error={Boolean(errors.species)}
                                        required
                                        fullWidth
                                        margin="normal"
                                    >
                                        {animalSpecies.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid component={'span'} item xs={6}>
                                    <TextField
                                        id="breed"
                                        label="Breed"
                                        helperText={errors.breed}
                                        onChange={(newValue) => {
                                            setBreed(newValue.target.value);
                                        }}
                                        value={breed}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Pets />
                                                </InputAdornment>
                                            ),
                                        }}
                                        required
                                        fullWidth
                                        margin="normal"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid component={'span'} item xs={12}>
                                    <DatePicker
                                        label="Birthdate"
                                        id="birthdate"
                                        name="birthdate"
                                        value={birthdate}
                                        onChange={(newValue) => {
                                            setBirthdate(dayjs(newValue));
                                        }}
                                        fullWidth
                                        isRequired
                                        isInvalid={Boolean(errors.birthdate)}
                                        helperText={errors.birthdate}
                                    />
                                </Grid>
                                <Grid component={'span'} item xs={12}>
                                    <TextField
                                        id="microchip"
                                        label="Microchip Number"
                                        helperText={errors.microchip}
                                        onChange={(newValue) => {
                                            setMicrochip(newValue.target.value);
                                        }}
                                        value={microchip}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Badge />
                                                </InputAdornment>
                                            ),
                                        }}
                                        fullWidth
                                        margin="normal"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid component={'span'} item xs={12}>
                                    <TextField
                                        id="insurance_membership"
                                        label="Insurance Membership Number"
                                        helperText={errors.insurance_membership}
                                        onChange={(newValue) => {
                                            setInsurance(newValue.target.value);
                                        }}
                                        value={insurance}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Badge />
                                                </InputAdornment>
                                            ),
                                        }}
                                        fullWidth
                                        margin="normal"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid component={'span'} item xs={12}>
                                    <DatePicker
                                        label="Insurance Expiry"
                                        id="insurance_expiry"
                                        name="insurance_expiry"
                                        value={expiry}
                                        onChange={(newValue) => {
                                            setExpiry(dayjs(newValue));
                                        }}
                                        fullWidth
                                        isInvalid={Boolean(errors.insurance)}
                                        helperText={errors.insurance}
                                    />
                                </Grid>
                            </Grid>
                        </LocalizationProvider>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Chip
                        label="CANCEL"
                        color="secondary"
                        onClick={handleCloseForm}
                    />
                    {mode === 'edit' ?
                        <Chip
                            label="EDIT PET"
                            color="primary"
                            onClick={handleUpdate}
                            disabled={!Boolean(canSubmit)}
                        /> :
                        <Chip
                            label="ADD PET"
                            color="primary"
                            onClick={handleAdd}
                            disabled={!Boolean(canSubmit)}
                        />
                    }
                </DialogActions>
            </Dialog>

        </>
    )
}