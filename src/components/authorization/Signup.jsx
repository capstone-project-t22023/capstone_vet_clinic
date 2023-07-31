import React, { useState, useEffect } from 'react';
import { Alert, Box, Grid, Card, CardActions, CardContent, Button, InputAdornment, TextField, IconButton, MenuItem, Radio} from '@mui/material';
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

const ausState = [
    { value: '', label: '', shipping_fee: 0 },
    { value: 'NSW', label: 'New South Wales', shipping_fee: 30 },
    { value: 'QLD', label: 'Queensland', shipping_fee: 40 },
    { value: 'NT', label: 'Northern Territories', shipping_fee: 50 },
    { value: 'WA', label: 'Western Australia', shipping_fee: 50 },
    { value: 'SA', label: 'South Australia', shipping_fee: 50 },
    { value: 'TAS', label: 'Tasmania', shipping_fee: 50 },
    { value: 'VIC', label: 'Victoria', shipping_fee: 40 },
    { value: 'ACT', label: 'Australian Capital Territory', shipping_fee: 40 },
];

export default function Signup() {
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
         <Grid container spacing={2} >
                        <Grid xs item display="flex" justifyContent="center" alignItems="center" textAlign="center">
                            <Card>
                                { canLogin ? 
                                    <CardContent>
                                            Thank you for joining us!
                                        <br/>
                                    </CardContent> 
                                :
                                    <CardContent>
                                            Join us!
                                        <br/>
                                        { errorAlert ?
                                            <Alert severity="error">{errorAlertMessage}</Alert> : ""
                                        }
                                        <br/>
                                        <Radio
                                        checked={selectedPrivilege === 'doctor'}
                                        onChange={handleSelectedPrivilege}
                                        value="doctor"
                                        name="privilege"
                                        inputProps={{ 'aria-label': 'Doctor' }}
                                        />DOCTOR
                                        <Radio
                                        checked={selectedPrivilege === 'admin'}
                                        onChange={handleSelectedPrivilege}
                                        value="admin"
                                        name="privilege"
                                        inputProps={{ 'aria-label': 'Admin' }}
                                        />ADMIN
                                        <Radio
                                        checked={selectedPrivilege === 'pet_owner'}
                                        onChange={handleSelectedPrivilege}
                                        value="pet_owner"
                                        name="privilege"
                                        inputProps={{ 'aria-label': 'Pet Owner' }}
                                        />PET OWNER
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                            <TextField
                                                id="fname"
                                                label="FirstName"
                                                sx={{ width: '35ch' }}
                                                helperText={errorFname ? errorFnameMessage : ""}
                                                onChange={handleChange}
                                                size="small"
                                                InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                    <BadgeIcon />
                                                    </InputAdornment>
                                                ),
                                                }}
                                                variant="standard"
                                                error = {errorFname}
                                            />
                                            &nbsp;
                                            <TextField
                                                id="lname"
                                                label="LastName"
                                                sx={{ width: '35ch' }}
                                                helperText={errorLname ? errorLnameMessage : ""}
                                                onChange={handleChange}
                                                size="small"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                        <BadgeIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                variant="standard"
                                                error = {errorLname}
                                            />
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                            <TextField
                                                id="phone"
                                                label="Phone"
                                                sx={{ width: '35ch' }}
                                                helperText={errorPhone ? errorPhoneMessage : ""}
                                                onChange={handleChange}
                                                size="small"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                        <PhoneIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                variant="standard"
                                                error = {errorPhone}
                                            />
                                            &nbsp;
                                            <TextField
                                                id="email"
                                                label="Email Address"
                                                sx={{ width: '35ch' }}
                                                helperText={errorEmail ? errorEmailMessage : ""}
                                                onChange={handleChange}
                                                size="small"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                        <EmailIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                variant="standard"
                                                error = {errorEmail}
                                            />
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                            <TextField
                                                id="address"
                                                label="Address"
                                                sx={{ width: '70ch' }}
                                                helperText={errorAddress ? errorAddressMessage : ""}
                                                onChange={handleChange}
                                                size="small"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                        <HomeIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                variant="standard"
                                                error = {errorAddress}
                                            />
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                            <TextField
                                                id="state"
                                                label="State"
                                                select
                                                sx={{ width: '30ch' }}
                                                helperText={errorState ? errorStateMessage : ""}
                                                onChange={handleSelectedState}
                                                size="small"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                        <PlaceIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                variant="standard"
                                                error = {errorState}
                                                defaultValue=""
                                            >
                                                {ausState.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                            &nbsp;
                                            <TextField
                                                id="postcode"
                                                label="Postcode"
                                                sx={{ width: '20ch' }}
                                                helperText={errorPostcode ? errorPostcodeMessage : ""}
                                                onChange={handleChange}
                                                size="small"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                        <PlaceIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                variant="standard"
                                                error = {errorPostcode}
                                            />
                                        </Box>
                                        <br/><br/>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                            <TextField
                                                id="username"
                                                label="Username"
                                                sx={{ width: '30ch' }}
                                                helperText={errorUsername ? errorUsernameMessage : ""}
                                                onChange={handleChange}
                                                size="small"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                        <AccountCircle />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                variant="standard"
                                                error = {errorUsername}
                                            />
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                            <TextField
                                                id="password"
                                                label="Password"
                                                sx={{ width: '30ch' }}
                                                helperText={errorPassword ? errorPassword2Message : ""}
                                                onChange={handleChange}
                                                size="small"
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
                                                variant="standard"
                                                error = {errorPassword}
                                                type={showPassword ? 'text' : 'password'}
                                            />
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                            <TextField
                                                id="password2"
                                                label="Confirm Password"
                                                sx={{ width: '30ch' }}
                                                helperText={errorPassword2 ? errorPassword2Message : ""}
                                                onChange={handleChange}
                                                size="small"
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
                                                        onMouseDown={handleMouseDownConfirmPassword}
                                                    >
                                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                    </InputAdornment>
                                                )
                                                }}
                                                variant="standard"
                                                error = {errorPassword2}
                                                type={showConfirmPassword ? 'text' : 'password'}
                                            />
                                        </Box>
                                    </CardContent>
                                }
                                <CardActions>
                                    <Link to="/">
                                    <Button size="small">Discard and Return to Home</Button>
                                    </Link>
                                    <Button size="small" onClick={handleSignup}>Sign Up and Confirm</Button>
                                    { toConfirm ? <Navigate to="/confirm" replace={true}/> : "" }
                                </CardActions>
                            </Card>
                            <br/>
                            
                        </Grid>
                    </Grid>
    </div>
  )
}
