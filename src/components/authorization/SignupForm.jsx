import React, { useState, useEffect } from 'react';
import { Alert, Box, Grid, Card, CardActions, CardContent, Button, InputAdornment, TextField, IconButton, MenuItem, Radio, Avatar, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { Navigate, Link } from "react-router-dom";
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import BadgeIcon from '@mui/icons-material/Badge';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import PlaceIcon from '@mui/icons-material/Place';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const ausState = [
    { value: '', label: ''},
    { value: 'NSW', label: 'New South Wales'},
    { value: 'QLD', label: 'Queensland'},
    { value: 'NT', label: 'Northern Territories'},
    { value: 'WA', label: 'Western Australia'},
    { value: 'SA', label: 'South Australia'},
    { value: 'TAS', label: 'Tasmania'},
    { value: 'VIC', label: 'Victoria'},
    { value: 'ACT', label: 'Australian Capital Territory'},
];

export default function SignupForm() {
    const [canLogin, setCanLogin] = useState(false);
    const [errorAlert, setErrorAlert] = useState('');
    const [errorFname, setErrorFname] = useState(false);
    const [errorLname, setErrorLname] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPhone, setErrorPhone] = useState(false);
    const [errorAddress, setErrorAddress] = useState(false);
    const [errorState, setErrorState] = useState(false);
    const [errorPostcode, setErrorPostcode] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorPassword2, setErrorPassword2] = useState(false);
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
    const [errorPasswordMessage, setErrorPasswordMessage] = useState("");
    const [errorPassword2Message, setErrorPassword2Message] = useState("");
    const [errorUsernameMessage, setErrorUsernameMessage] = useState("");
    const [errorPrivilegeMessage, setErrorPrivilegeMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState(0);
    const [address, setAddress] = useState("");
    const [state, setState] = useState({value: '', label: ''});
    const [postcode, setPostcode] = useState(0);
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [selectedPrivilege, setSelectedPrivilege] = useState("");
    const [toHome, setToHome] = useState(false);
    const [toConfirm, setToConfirm] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [petOwners, setPetOwners] = useState([]);


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

    function handleShowPassword(){
        setShowPassword(!showPassword);
    };

    function handleShowConfirmPassword(){
        setShowConfirmPassword(!showConfirmPassword);
    };

    function handleMouseDownPassword (event){
        event.preventDefault();
    };

    function handleMouseDownConfirmPassword (event){
        event.preventDefault();
    };

    function handleChange(event) {
        setErrorUsername(false);
        setErrorPassword(false);
        setErrorPassword2(false);
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
        setErrorPassword2Message("");
        setErrorPasswordMessage("");
        setErrorPhoneMessage("");
        setErrorPostcodeMessage("");
        setErrorStateMessage("");
        setErrorUsernameMessage("");

        if(event.target.id === 'fname'){
            setFname(event.target.value);
        } else if(event.target.id === 'lname'){
            setLname(event.target.value);
        } else if(event.target.id === 'phone'){
            setPhone(event.target.value);
        } else if(event.target.id === 'email'){
            setEmail(event.target.value);
        } else if(event.target.id === 'address'){
            setAddress(event.target.value);
        } else if(event.target.id === 'postcode'){
            setPostcode(event.target.value);
        } else if (event.target.id === 'password'){
            setPassword(event.target.value);
        } else if (event.target.id === 'password2'){
            setPassword2(event.target.value);
        } else if (event.target.id === 'username'){
            setUsername(event.target.value);
        }
    }

    function handleSelectedPrivilege(event){
        setSelectedPrivilege(event.target.value);
    }

    function handleSelectedState(event){
        let st = ausState.filter( x => x.value === event.target.value);
        setState(st[0]);
    }

    function handleSignup(event){
        event.preventDefault();
        let record = {};
        let errorPresent = false;

        if (selectedPrivilege === 'doctor'){
            record = doctors.filter(x => username.toUpperCase() === x.username.toUpperCase())[0];
        } else if (selectedPrivilege === 'admin'){
            record = admins.filter(x => username.toUpperCase() === x.username.toUpperCase())[0];
        } else if (selectedPrivilege === 'pet_owner'){
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
        } else if (phone.length !== 9){
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
        
        if (!state.value) {
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
        } else if (postcode.length !== 4){
            setErrorPostcode(true);
            setErrorAlert(true);
            setErrorPostcodeMessage("Only accepts 4 numbers");
            errorPresent = true;
        }
        
        if (!password) {
            setErrorPassword(true);
            setErrorAlert(true);
            setErrorPasswordMessage("Password is required");
            errorPresent = true;
        } 
        
        if (!password2) {
            setErrorPassword2(true);
            setErrorAlert(true);
            setErrorPassword2Message("Please confirm password");
            errorPresent = true;
        } else if (password !== password2){
            setErrorPassword(true);
            setErrorPassword2(true);
            setErrorAlert(true);
            setErrorPasswordMessage("Password doesn't match");
            setErrorPassword2Message("Password doesn't match");
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
        
        if ( record ){
            setErrorAlert(true);
            setErrorAlertMessage("User already existing. Please login.");
        } else if ( errorPresent ) {
            setErrorAlert(true);
            setErrorAlertMessage("Please check existing errors.");
        } else if(!record){
            console.log(JSON.stringify({
                "username": username, 
                "password": password,
                "email": email, 
                "firstname": fname,
                "lastname": lname,
                "phone": phone,
                "address": address,
                "state": state.value,
                "postcode": postcode,
                "privilege": selectedPrivilege
            }));

            let link = "";
            if (selectedPrivilege === 'doctor'){
                link = "http://localhost/capstone_vet_clinic/api.php/register_doctor";
            } else if (selectedPrivilege === 'admin'){
                link = "http://localhost/capstone_vet_clinic/api.php/register_admin";
            } else if (selectedPrivilege === 'pet_owner'){
                link = "http://localhost/capstone_vet_clinic/api.php/register_pet_owner";
            }

            fetch(link, {
                method: 'POST',
                body: JSON.stringify({
                    "username": username, 
                    "password": password,
                    "email": email, 
                    "firstname": fname,
                    "lastname": lname,
                    "phone": phone,
                    "address": address,
                    "state": state.value,
                    "postcode": postcode
                })
              })
              .then(response => response.json())
              .then(data => {
                if (data.status) {
                    sessionStorage.setItem('tmp_token', data.status);
                    sessionStorage.setItem('tmp_privilege', selectedPrivilege);
                    setToConfirm(true);
                }
              })
              .catch(error => {
                console.error(error);
              });         
        }
    };

  return (
    <div>

        { canLogin ?
            <CardContent>
                Thank you for joining us!
                <br/>
            </CardContent>

            :

            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Avatar sx={{m: 1, bgcolor: 'secondary.dark'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Join Us!
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <FormControlLabel value="doctor" label="DOCTOR" control={
                        <Radio
                            checked={selectedPrivilege === 'doctor'}
                            onChange={handleSelectedPrivilege}
                            value="doctor"
                            name="privilege"
                            inputProps={{ 'aria-label': 'Doctor' }}
                        />
                    }/>
                    <FormControlLabel value="admin" label="Admin" control={
                        <Radio
                            checked={selectedPrivilege === 'admin'}
                            onChange={handleSelectedPrivilege}
                            value="admin"
                            name="privilege"
                            inputProps={{ 'aria-label': 'Admin' }}
                        />
                    }/>
                    <FormControlLabel value="pet_owner" label="Pet Owner" control={
                        <Radio
                        checked={selectedPrivilege === 'pet_owner'}
                        onChange={handleSelectedPrivilege}
                        value="pet_owner"
                        name="privilege"
                        inputProps={{ 'aria-label': 'Pet Owner' }}
                        />
                    }/>
                </Box>

                <Box component="form" noValidate sx={{mt: 1, mb:1, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', columnGap: 2, rowGap: 0 }}>
                    <TextField
                        id="fname"
                        label="FirstName"
                        helperText={errorFname ? errorFnameMessage : ""}
                        onChange={handleChange}
                        // variant="standard"
                        error = {errorFname}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <BadgeIcon />
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
                        // variant="standard"
                        error = {errorLname}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <BadgeIcon />
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
                        // variant="standard"
                        error = {errorPhone}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PhoneIcon />
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
                        // variant="standard"
                        error = {errorEmail}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon />
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
                        // variant="standard"
                        error = {errorAddress}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <HomeIcon />
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
                        onChange={handleSelectedState}
                        // variant="standard"
                        error = {errorState}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PlaceIcon />
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
                        // variant="standard"
                        error = {errorPostcode}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PlaceIcon />
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
                        // variant="standard"
                        error = {errorUsername}
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
                    <TextField
                        id="password"
                        label="Password"
                        helperText={errorPassword ? errorPassword2Message : ""}
                        onChange={handleChange}
                        // variant="standard"
                        type={showPassword ? 'text' : 'password'}
                        error = {errorPassword}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PasswordIcon />
                                </InputAdornment>
                            ),
                            endAdornment:(
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        id="password2"
                        label="Confirm Password"
                        helperText={errorPassword2 ? errorPassword2Message : ""}
                        onChange={handleChange}
                        // variant="standard"
                        error = {errorPassword2}
                        type={showConfirmPassword ? 'text' : 'password'}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PasswordIcon />
                                </InputAdornment>
                            ),
                            endAdornment:(
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleShowConfirmPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        required
                        fullWidth
                        margin="normal"
                    />
                </Box>
                { errorAlert ?
                    <Box sx={{ mt:2, mb: 3 }}>
                        <Alert severity="error">{errorAlertMessage}</Alert>
                    </Box>
                        : ""
                }
                <Box sx={{ display: 'flex', gap:2, mt: 2 }}>
                    <Link to="/">
                        <Button variant="outlined">Discard and Return to Home</Button>
                    </Link>
                    <Button variant="contained" onClick={handleSignup}>Sign Up and Confirm</Button>
                    { toConfirm ? <Navigate to="/confirm" replace={true}/> : "" }
                </Box>

            </Box>
        }

    </div>
  )
}
