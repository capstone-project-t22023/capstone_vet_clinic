import React, { useState, useEffect } from 'react';
import {
    Box, InputAdornment, DialogContent, DialogTitle,
    TextField, Chip, MenuItem, Radio, DialogContentText, DialogActions,
    Dialog, FormControlLabel, Slide
} from '@mui/material';
import {
    Place,
    Home, Phone, Badge,
    Email, AccountCircle
} from '@mui/icons-material';

const ausState = [
    { value: '', label: '' },
    { value: 'NSW', label: 'New South Wales' },
    { value: 'QLD', label: 'Queensland' },
    { value: 'NT', label: 'Northern Territories' },
    { value: 'WA', label: 'Western Australia' },
    { value: 'SA', label: 'South Australia' },
    { value: 'TAS', label: 'Tasmania' },
    { value: 'VIC', label: 'Victoria' },
    { value: 'ACT', label: 'Australian Capital Territory' },
];

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewUserForm(props) {
    const [errorAlert, setErrorAlert] = useState('');
    const [errorFname, setErrorFname] = useState(false);
    const [errorLname, setErrorLname] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPhone, setErrorPhone] = useState(false);
    const [errorAddress, setErrorAddress] = useState(false);
    const [errorState, setErrorState] = useState(false);
    const [errorPostcode, setErrorPostcode] = useState(false);
    const [errorUsername, setErrorUsername] = useState(false);
    const [errorPrivilege, setErrorPrivilege] = useState(false);
    const [errorAlertMessage, setErrorAlertMessage] = useState("");
    const [errorFnameMessage, setErrorFnameMessage] = useState("");
    const [errorLnameMessage, setErrorLnameMessage] = useState("");
    const [errorEmailMessage, setErrorEmailMessage] = useState("");
    const [errorPhoneMessage, setErrorPhoneMessage] = useState("");
    const [errorAddressMessage, setErrorAddressMessage] = useState("");
    const [errorStateMessage, setErrorStateMessage] = useState("");
    const [errorPostcodeMessage, setErrorPostcodeMessage] = useState("");
    const [errorUsernameMessage, setErrorUsernameMessage] = useState("");
    const [errorPrivilegeMessage, setErrorPrivilegeMessage] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState(0);
    const [address, setAddress] = useState("");
    const [state, setState] = useState("");
    const [postcode, setPostcode] = useState(0);
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [selectedPrivilege, setSelectedPrivilege] = useState("");
    const [doctors, setDoctors] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [petOwners, setPetOwners] = useState([]);
    const [openForm, setOpenForm] = useState(props.openForm);
    const [canSubmit, setCanSubmit] = useState(true);
    const [userId, setUserId] = useState(0);
    const [mode, setMode] = useState("add");
    console.log("defaultValues", props.defaultValues);
    useEffect(() => {
        Promise.all([
            fetch("http://localhost/capstone_vet_clinic/api.php/get_all_doctors"),
            fetch("http://localhost/capstone_vet_clinic/api.php/get_all_admins"),
            fetch("http://localhost/capstone_vet_clinic/api.php/get_all_pet_owners")
        ])
            .then((responses) => {
                return Promise.all(responses.map(function (response) {
                    return response.json();
                }));
            })
            .then(data => {
                setDoctors(data[0].doctors);
                setAdmins(data[1].admins);
                setPetOwners(data[2].pet_owners);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        if(props.mode !== "add"){
        setSelectedPrivilege(props.defaultValues.role);
        setFname(props.defaultValues.firstname);
        setLname(props.defaultValues.lastname);
        setPhone((props.defaultValues.phone).toString());
        setEmail(props.defaultValues.email);
        setAddress(props.defaultValues.address);
        setState( props.defaultValues.state );
        setPostcode((props.defaultValues.postcode).toString());
        setUsername(props.defaultValues.username);
        setMode(props.mode);
        setUserId(props.defaultValues.id)
        }
    }, [props.defaultValues, props.mode]);

    function handleChange(event) {
        setErrorUsername(false);
        setErrorFname(false);
        setErrorLname(false);
        setErrorPhone(false);
        setErrorAddress(false);
        setErrorEmail(false);
        setErrorPostcode(false);
        setErrorState(false);
        setErrorAlert(false);
        setErrorPrivilege(false);
        setErrorAddressMessage("");
        setErrorAlertMessage("");
        setErrorEmailMessage("");
        setErrorFnameMessage("");
        setErrorLnameMessage("");
        setErrorPhoneMessage("");
        setErrorPostcodeMessage("");
        setErrorStateMessage("");
        setErrorUsernameMessage("");
        setCanSubmit(true);

        if (event.target.id === 'fname') {
            setFname(event.target.value);
        } else if (event.target.id === 'lname') {
            setLname(event.target.value);
        } else if (event.target.id === 'phone') {
            setPhone(event.target.value);
        } else if (event.target.id === 'email') {
            setEmail(event.target.value);
        } else if (event.target.id === 'address') {
            setAddress(event.target.value);
        } else if (event.target.id === 'postcode') {
            setPostcode(event.target.value);
        } else if (event.target.id === 'username') {
            setUsername(event.target.value);
        }
    }

    function handleSelectedPrivilege(event) {
        setSelectedPrivilege(event.target.value);
    }

    function handleSelectedState(event) {
        let st = ausState.filter(x => x.value === event.target.value);
        setState(st[0]);
    }

    function handleSignup(event) {
        event.preventDefault();
        let record = null;
        let errorPresent = false;

        if (selectedPrivilege === 'doctor') {
            record = doctors.filter(x => username.toUpperCase() === x.username.toUpperCase())[0];
        } else if (selectedPrivilege === 'admin') {
            record = admins.filter(x => username.toUpperCase() === x.username.toUpperCase())[0];
        } else if (selectedPrivilege === 'pet_owner') {
            record = petOwners.filter(x => username.toUpperCase() === x.username.toUpperCase())[0];
        }

        if (!email) {
            setErrorEmail(true);
            setErrorAlert(true);
            setErrorEmailMessage("Email is required");
            errorPresent = true;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            setErrorEmail(true);
            setErrorAlert(true);
            setErrorEmailMessage("Valid email is required");
            errorPresent = true;
        }

        if (!fname) {
            setErrorFname(true);
            setErrorAlert(true);
            setErrorFnameMessage("First Name is required");
            errorPresent = true;
        }

        if (!lname) {
            setErrorLname(true);
            setErrorAlert(true);
            setErrorLnameMessage("Last Name is required");
            errorPresent = true;
        }

        if (!phone) {
            setErrorPhone(true);
            setErrorAlert(true);
            setErrorPhoneMessage("Phone is required");
            errorPresent = true;
        } else if (!/^[0-9]+$/.test(phone)) {
            setErrorPhone(true);
            setErrorAlert(true);
            setErrorPhoneMessage("Only accepts 9 numbers, excluding 0 or +61");
            errorPresent = true;
        } else if (phone.length !== 9) {
            setErrorPhone(true);
            setErrorAlert(true);
            setErrorPhoneMessage("Only accepts 9 numbers, excluding 0 or +61");
            errorPresent = true;
        }

        if (!address) {
            setErrorAddress(true);
            setErrorAlert(true);
            setErrorAddressMessage("Address is required");
            errorPresent = true;
        }

        if (!state) {
            setErrorState(true);
            setErrorAlert(true);
            setErrorStateMessage("State is required");
            errorPresent = true;
        }

        if (!postcode) {
            setErrorPostcode(true);
            setErrorAlert(true);
            setErrorPostcodeMessage("Postcode is required");
            errorPresent = true;
        } else if (!/^[0-9]+$/.test(postcode)) {
            setErrorPostcode(true);
            setErrorAlert(true);
            setErrorPostcodeMessage("Only accepts 4 numbers");
            errorPresent = true;
        } else if (postcode.length !== 4) {
            setErrorPostcode(true);
            setErrorAlert(true);
            setErrorPostcodeMessage("Only accepts 4 numbers");
            errorPresent = true;
        }

        if (!username) {
            setErrorUsername(true);
            setErrorAlert(true);
            setErrorUsernameMessage("Username is required");
            errorPresent = true;
        }

        if (!selectedPrivilege) {
            setErrorPrivilege(true);
            setErrorAlert(true);
            setErrorPrivilegeMessage("Role is required");
            errorPresent = true;
        }

        if (record) {
            setErrorAlert(true);
            setErrorAlertMessage("User already existing. Please login.");
        } else if (errorPresent) {
            setErrorAlert(true);
            setErrorAlertMessage("Please check existing errors.");
        } else if (!record) {
            console.log(JSON.stringify({
                "username": username,
                "password": "test1234Abcd!",
                "email": email,
                "firstname": fname,
                "lastname": lname,
                "phone": phone,
                "address": address,
                "state": state,
                "postcode": postcode,
                "privilege": selectedPrivilege
            }));

            fetch("http://localhost/capstone_vet_clinic/api.php/add_user", {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify({
                    "username": username,
                    "password": "test1234Abcd!",
                    "email": email,
                    "firstname": fname,
                    "lastname": lname,
                    "phone": phone,
                    "address": address,
                    "state": state,
                    "postcode": postcode,
                    "privilege": selectedPrivilege
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.add_user) {
                        console.log(JSON.stringify(data.add_user));
                        props.setRefreshUsers(true);
                        props.setAlertAdd(true);
                        props.setOpenForm(false);
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    const handleUpdate = (event) => {
        event.preventDefault();
        let errorPresent = false;

        if (!email) {
            setErrorEmail(true);
            setErrorAlert(true);
            setErrorEmailMessage("Email is required");
            errorPresent = true;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            setErrorEmail(true);
            setErrorAlert(true);
            setErrorEmailMessage("Valid email is required");
            errorPresent = true;
        }

        if (!fname) {
            setErrorFname(true);
            setErrorAlert(true);
            setErrorFnameMessage("First Name is required");
            errorPresent = true;
        }

        if (!lname) {
            setErrorLname(true);
            setErrorAlert(true);
            setErrorLnameMessage("Last Name is required");
            errorPresent = true;
        }

        if (!phone) {
            setErrorPhone(true);
            setErrorAlert(true);
            setErrorPhoneMessage("Phone is required");
            errorPresent = true;
        } else if (!/^[0-9]+$/.test(phone)) {
            setErrorPhone(true);
            setErrorAlert(true);
            setErrorPhoneMessage("Only accepts 9 numbers, excluding 0 or +61");
            errorPresent = true;
        } else if (phone.length !== 9) {
            setErrorPhone(true);
            setErrorAlert(true);
            setErrorPhoneMessage("Only accepts 9 numbers, excluding 0 or +61");
            errorPresent = true;
        }

        if (!address) {
            setErrorAddress(true);
            setErrorAlert(true);
            setErrorAddressMessage("Address is required");
            errorPresent = true;
        }

        if (!state) {
            setErrorState(true);
            setErrorAlert(true);
            setErrorStateMessage("State is required");
            errorPresent = true;
        }

        if (!postcode) {
            setErrorPostcode(true);
            setErrorAlert(true);
            setErrorPostcodeMessage("Postcode is required");
            errorPresent = true;
        } else if (!/^[0-9]+$/.test(postcode)) {
            setErrorPostcode(true);
            setErrorAlert(true);
            setErrorPostcodeMessage("Only accepts 4 numbers");
            errorPresent = true;
        } else if (postcode.length !== 4) {
            setErrorPostcode(true);
            setErrorAlert(true);
            setErrorPostcodeMessage("Only accepts 4 numbers");
            errorPresent = true;
        }

        if (!username) {
            setErrorUsername(true);
            setErrorAlert(true);
            setErrorUsernameMessage("Username is required");
            errorPresent = true;
        }

        if (!selectedPrivilege) {
            setErrorPrivilege(true);
            setErrorAlert(true);
            setErrorPrivilegeMessage("Role is required");
            errorPresent = true;
        }

        if (errorPresent) {
            setErrorAlert(true);
            setErrorAlertMessage("Please check existing errors.");
            setCanSubmit(false);
        } else {
            fetch("http://localhost/capstone_vet_clinic/api.php/update_user/"+userId, {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify({
                    "username": username,
                    "email": email,
                    "firstname": fname,
                    "lastname": lname,
                    "phone": phone,
                    "address": address,
                    "state": state,
                    "postcode": postcode,
                    "role": selectedPrivilege
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.update_user) {
                        props.setRefreshUsers(true);
                        props.setAlertUpdate(true);
                        props.setOpenForm(false);
                    } else {
                        console.log("error")
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        props.setOpenForm(false);
    };

    return (
        <>
            <Dialog
                open={props.openForm}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseForm}
                aria-describedby="user-form-dialog"
            >
                <DialogTitle>{mode === 'edit' ? "Update User ID: " + userId : "Add User"}</DialogTitle>
                <DialogContent>
                        <DialogContentText component={'span'} id="user-form-dialog">
                            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                <FormControlLabel value="doctor" label="Doctor" control={
                                    <Radio
                                        checked={selectedPrivilege === 'doctor'}
                                        onChange={handleSelectedPrivilege}
                                        value="doctor"
                                        name="privilege"
                                        inputProps={{ 'aria-label': 'Doctor' }}
                                    />
                                } />
                                <FormControlLabel value="admin" label="Admin" control={
                                    <Radio
                                        checked={selectedPrivilege === 'admin'}
                                        onChange={handleSelectedPrivilege}
                                        value="admin"
                                        name="privilege"
                                        inputProps={{ 'aria-label': 'Admin' }}
                                    />
                                } />
                                <FormControlLabel value="pet_owner" label="Pet Owner" control={
                                    <Radio
                                        checked={selectedPrivilege === 'pet_owner'}
                                        onChange={handleSelectedPrivilege}
                                        value="pet_owner"
                                        name="privilege"
                                        inputProps={{ 'aria-label': 'Pet Owner' }}
                                    />
                                } />
                            </Box>

                            <Box component="form" noValidate sx={{ mt: 1, mb: 1, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', columnGap: 2, rowGap: 0 }}>
                                <TextField
                                    id="fname"
                                    label="FirstName"
                                    helperText={errorFname ? errorFnameMessage : ""}
                                    onChange={handleChange}
                                    value={fname}
                                    error={errorFname}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Badge />
                                            </InputAdornment>
                                        ),
                                    }}
                                    required
                                    fullWidth
                                    margin="normal"
                                    autoFocus
                                />
                                <TextField
                                    id="lname"
                                    label="LastName"
                                    helperText={errorLname ? errorLnameMessage : ""}
                                    onChange={handleChange}
                                    value={lname}
                                    error={errorLname}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Badge />
                                            </InputAdornment>
                                        ),
                                    }}
                                    required
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    id="phone"
                                    label="Phone"
                                    helperText={errorPhone ? errorPhoneMessage : ""}
                                    onChange={handleChange}
                                    value={phone}
                                    error={errorPhone}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Phone />
                                            </InputAdornment>
                                        ),
                                    }}
                                    required
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    id="email"
                                    label="Email Address"
                                    helperText={errorEmail ? errorEmailMessage : ""}
                                    onChange={handleChange}
                                    value={email}
                                    error={errorEmail}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Email />
                                            </InputAdornment>
                                        ),
                                    }}
                                    required
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    id="address"
                                    label="Address"
                                    helperText={errorAddress ? errorAddressMessage : ""}
                                    onChange={handleChange}
                                    sx={{ gridColumn: 'span 2' }}
                                    value={address}
                                    error={errorAddress}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Home />
                                            </InputAdornment>
                                        ),
                                    }}
                                    required
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    select
                                    defaultValue=""
                                    id="state"
                                    label="State"
                                    helperText={errorState ? errorStateMessage : ""}
                                    onChange={(newValue) => {
                                        setState(newValue.target.value);
                                    }}
                                    value={state}
                                    error={errorState}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Place />
                                            </InputAdornment>
                                        ),
                                    }}
                                    required
                                    fullWidth
                                    margin="normal"
                                >
                                    {ausState.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    id="postcode"
                                    label="Postcode"
                                    helperText={errorPostcode ? errorPostcodeMessage : ""}
                                    onChange={handleChange}
                                    value={postcode}
                                    error={errorPostcode}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Place />
                                            </InputAdornment>
                                        ),
                                    }}
                                    required
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    id="username"
                                    label="Username"
                                    helperText={errorUsername ? errorUsernameMessage : ""}
                                    onChange={handleChange}
                                    value={username}
                                    error={errorUsername}
                                    sx={{ gridColumn: 'span 2' }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        ),
                                    }}
                                    required
                                    fullWidth
                                    margin="normal"
                                />
                            </Box>
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
                            label="EDIT USER"
                            color="primary"
                            onClick={handleUpdate}
                            disabled={!Boolean(canSubmit)}
                        /> :
                        <Chip
                            label="ADD USER"
                            color="primary"
                            onClick={handleSignup}
                            disabled={!Boolean(canSubmit)}
                        />
                    }
                </DialogActions>
            </Dialog>

        </>
    )
}