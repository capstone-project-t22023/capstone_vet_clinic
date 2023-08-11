import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function EditUserForm({ user, onUpdateUser }) {
    const [firstname, setFirstname] = useState(user.firstname);
    const [lastname, setLastname] = useState(user.lastname);
    const [address, setAddress] = useState(user.address);
    const [state, setState] = useState(user.state);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [postcode, setPostcode] = useState(user.postcode);
    const [isDirty, setIsDirty] = useState(false); // Track if any field has changed
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Check if any field value has changed
        const hasChanged =
            firstname !== user.firstname ||
            lastname !== user.lastname ||
            address !== user.address ||
            state !== user.state ||
            email !== user.email ||
            phone !== user.phone ||
            postcode !== user.postcode;

        setIsDirty(hasChanged);
    }, [firstname, lastname, address, state, email, phone, postcode, user]);

    const validateInputs = () => {
        const newErrors = {};

        // Add validation logic here

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateInputs() && isDirty) {
            const updatedUser = {
                ...user,
                firstname,
                lastname,
                address,
                state,
                email,
                phone,
                postcode,
            };

            onUpdateUser(updatedUser);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h5">Edit User</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="First Name"
                        fullWidth
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        error={!!errors.firstname}
                        helperText={errors.firstname}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Last Name"
                        fullWidth
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        error={!!errors.lastname}
                        helperText={errors.lastname}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Address"
                        fullWidth
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        error={!!errors.address}
                        helperText={errors.address}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="State"
                        fullWidth
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        error={!!errors.state}
                        helperText={errors.state}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Phone"
                        fullWidth
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        error={!!errors.phone}
                        helperText={errors.phone}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Postcode"
                        fullWidth
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                        error={!!errors.postcode}
                        helperText={errors.postcode}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" disabled={isDirty ? false : true}>
                        {isDirty ? "Save Changes" : "Change values"}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default EditUserForm;
