import React, {useState, useEffect, useContext} from 'react';
import {Button, InputAdornment, TextField, IconButton, Box, Avatar, Typography, Checkbox, Grid, FormControlLabel} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {Link, Navigate} from "react-router-dom";
import ProgramContext from '../../contexts/ProgramContext';


export default function LoginForm() {

    const [errorUsername, setErrorUsername] = useState(false);
    const [errorUsernameMessage, setErrorUsernameMessage] = useState("");
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorPasswordMessage, setErrorPasswordMessage] = useState("");
    const [errorAlert, setErrorAlert] = useState(false);
    const [errorAlertMessage, setErrorAlertMessage] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [doctors, setDoctors] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [petOwners, setPetOwners] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [toHome, setToHome] = useState(false);
    const {setUser, setAuthenticated} = useContext(ProgramContext);

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

    function handleShowPassword() {
        setShowPassword(!showPassword);
    };

    function handleMouseDownPassword(event) {
        event.preventDefault();
    };

    function handleChange(event) {
        setErrorUsername(false);
        setErrorPassword(false);
        setErrorAlert(false);
        setErrorPasswordMessage("");
        setErrorUsernameMessage("");
        setErrorAlertMessage("");

        if (event.target.id === 'username') {
            setUsername(event.target.value);
        } else if (event.target.id === 'password') {
            setPassword(event.target.value);
        }
    }

    function handleLoginAdmin(event) {
        event.preventDefault();

        let record = admins.filter(x => username.toUpperCase() === x.username.toUpperCase())[0];

        if (!username) {
            setErrorUsername(true);
            setErrorAlert(true);
            setErrorUsernameMessage("Username is required");
            setErrorPasswordMessage("Please check errors");
        }

        if (!password) {
            setErrorPassword(true);
            setErrorAlert(true);
            setErrorPasswordMessage("Password is required");
            setErrorAlertMessage("Please check errors");
        }

        if (!record) {
            setErrorUsername(true);
            setErrorAlert(true);
            setErrorAlertMessage("User not existing. Please signup or double check credentials.");
        } else {
            fetch("http://localhost/capstone_vet_clinic/api.php/login_admin", {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
                .then(res => res.json())
                .then((data) => {
                    if (data.login) {
                        localStorage.setItem('token', data.login);
                        localStorage.setItem('authenticated', true);
                        fetch("http://localhost/capstone_vet_clinic/api.php/get_admin", {
                            headers: {
                                Authorization: 'Bearer ' + localStorage.getItem('token'),
                            },
                        })
                            .then((response) => {
                                return response.json();
                            })
                            .then(data => {
                                if (data.user) {
                                    let tmp = data.user;
                                    tmp.role = 'admin';
                                    setUser(tmp);
                                    setAuthenticated(true);
                                    localStorage.setItem('user', JSON.stringify(tmp));
                                }
                            })
                            .catch(error => {
                                console.error(error);
                            });
                        setToHome(true);
                    } else {
                        setErrorPassword(true);
                        setErrorAlert(true);
                        setErrorAlertMessage("Username/Password combination is not correct");
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    function handleLoginDoctor(event) {
        event.preventDefault();

        let record = doctors.filter(x => username.toUpperCase() === x.username.toUpperCase())[0];

        if (!username) {
            setErrorUsername(true);
            setErrorAlert(true);
            setErrorUsernameMessage("Username is required");
            setErrorPasswordMessage("Please check errors");
        }

        if (!password) {
            setErrorPassword(true);
            setErrorAlert(true);
            setErrorPasswordMessage("Password is required");
            setErrorAlertMessage("Please check errors");
        }

        if (!record) {
            setErrorUsername(true);
            setErrorAlert(true);
            setErrorAlertMessage("User not existing. Please signup or double check credentials.");
        } else {
            fetch("http://localhost/capstone_vet_clinic/api.php/login_doctor", {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
                .then(res => res.json())
                .then((data) => {
                    if (data.login) {
                        localStorage.setItem('token', data.login);
                        localStorage.setItem('authenticated', true);
                        fetch("http://localhost/capstone_vet_clinic/api.php/get_doctor", {
                            headers: {
                                Authorization: 'Bearer ' + localStorage.getItem('token'),
                            },
                        })
                            .then((response) => {
                                return response.json();
                            })
                            .then(data => {
                                if (data.user) {
                                    let tmp = data.user;
                                    tmp.role = 'doctor';
                                    setUser(tmp);
                                    setAuthenticated(true);
                                    localStorage.setItem('user', JSON.stringify(tmp));
                                }
                            })
                            .catch(error => {
                                console.error(error);
                            });
                        setToHome(true);
                    } else {
                        setErrorPassword(true);
                        setErrorAlert(true);
                        setErrorAlertMessage("Username/Password combination is not correct");
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    function handleLoginPetOwner(event) {
        event.preventDefault();

        let record = petOwners.filter(x => username.toUpperCase() === x.username.toUpperCase())[0];

        if (!username) {
            setErrorUsername(true);
            setErrorAlert(true);
            setErrorUsernameMessage("Username is required");
            setErrorPasswordMessage("Please check errors");
        }

        if (!password) {
            setErrorPassword(true);
            setErrorAlert(true);
            setErrorPasswordMessage("Password is required");
            setErrorAlertMessage("Please check errors");
        }

        if (!record) {
            setErrorUsername(true);
            setErrorAlert(true);
            setErrorAlertMessage("User not existing. Please signup or double check credentials.");
        } else {
            fetch("http://localhost/capstone_vet_clinic/api.php/login_pet_owner", {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
                .then(res => res.json())
                .then((data) => {
                    if (data.login) {
                        localStorage.setItem('token', data.login);
                        localStorage.setItem('authenticated', true);
                        fetch("http://localhost/capstone_vet_clinic/api.php/get_pet_owner", {
                            headers: {
                                Authorization: 'Bearer ' + localStorage.getItem('token'),
                            },
                        })
                            .then((response) => {
                                return response.json();
                            })
                            .then(data => {
                                if (data.user) {
                                    let tmp = data.user;
                                    tmp.role = 'pet_owner';
                                    setUser(tmp);
                                    setAuthenticated(true);
                                    localStorage.setItem('user', JSON.stringify(tmp));
                                }
                            })
                            .catch(error => {
                                console.error(error);
                            });
                        setToHome(true);
                    } else {
                        setErrorPassword(true);
                        setErrorAlert(true);
                        setErrorAlertMessage("Username/Password combination is not correct");
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    return (
        <div>{toHome ?
            <Navigate to="/dashboard" replace={true}/> :

            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.dark'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log in
                </Typography>
                <Box component="form" noValidate sx={{mt: 1}}>
                    <TextField
                        id="username"
                        error={errorUsername}
                        value={username}
                        onChange={handleChange}
                        label="Username"
                        helperText={errorUsername ? errorUsernameMessage : ""}

                        margin="normal"
                        required
                        fullWidth
                        name="username"
                        autoComplete="email"
                        autoFocus

                    />
                    <TextField
                        id="password"
                        label="Password"
                        helperText={errorPassword ? errorPasswordMessage : ""}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        error={errorPassword}
                        type={showPassword ? 'text' : 'password'}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        autoComplete="current-password"
                    />
                    <Box sx={{
                            display: 'flex',
                            flexDirection: {xs: 'column', sm: 'row'},
                            alignItems: 'center',
                            my: 2
                        }}>
                        <Button type="submit" onClick={handleLoginAdmin} fullWidth variant="contained">as Admin</Button>
                        <Button type="submit" onClick={handleLoginDoctor} fullWidth variant="contained" sx={{mx: 1, my: 2}}>as Doctor</Button>
                        <Button type="submit" onClick={handleLoginPetOwner} fullWidth variant="contained">as Customer</Button>
                    </Box>

                    <Grid container>
                        <Grid item xs>
                            <Link variant="body2">
                                //Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/signup" variant="body2">
                                "Don't have an account? Sign Up"
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        }

        </div>
    )
}
