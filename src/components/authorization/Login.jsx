import React, { useState, useEffect, useContext } from 'react';
import { Button, InputAdornment, TextField, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, Navigate } from "react-router-dom";
import ProgramContext from '../../ProgramContext';


export default function Login() {

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
                    if (data.credentials) {
                        sessionStorage.setItem('token', data.credentials);
                        sessionStorage.setItem('authenticated', true);
                            fetch("http://localhost/capstone_vet_clinic/api.php/get_admin", {
                              headers: {
                                  Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                              },
                              })
                            .then((response) => {
                                    return response.json();
                            })
                            .then(data => {
                              if(data.user){
                                let tmp = data.user;
                                tmp.role = 'admin';
                                setUser(tmp);
                                setAuthenticated(true);
                                sessionStorage.setItem('user',JSON.stringify(tmp));
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
                    if (data.credentials) {
                        sessionStorage.setItem('token', data.credentials);
                        sessionStorage.setItem('authenticated', true);
                        fetch("http://localhost/capstone_vet_clinic/api.php/get_doctor", {
                              headers: {
                                  Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                              },
                              })
                            .then((response) => {
                                    return response.json();
                            })
                            .then(data => {
                              if(data.user){
                                let tmp = data.user;
                                tmp.role = 'doctor';
                                setUser(tmp);
                                setAuthenticated(true);
                                sessionStorage.setItem('user',JSON.stringify(tmp));
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
                    if (data.credentials) {
                        sessionStorage.setItem('token', data.credentials);
                        sessionStorage.setItem('authenticated', true);
                        fetch("http://localhost/capstone_vet_clinic/api.php/get_pet_owner", {
                              headers: {
                                  Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                              },
                              })
                            .then((response) => {
                                    return response.json();
                            })
                            .then(data => {
                              if(data.user){
                                let tmp = data.user;
                                tmp.role = 'pet_owner';
                                setUser(tmp);
                                setAuthenticated(true);
                                sessionStorage.setItem('user',JSON.stringify(tmp));
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
        <div>{ toHome ?
            <Navigate to="/" replace={true} /> :
            <div>
            <TextField
                sx={{ m: 1, width: '35ch' }}
                id="username"
                error={errorUsername}
                value={username}
                onChange={handleChange}
                label="Username"
                helperText={errorUsername ? errorUsernameMessage : ""}
                variant="filled"
            />
            <br /><br />
            <TextField
                id="password"
                label="Password"
                sx={{ width: '35ch' }}
                helperText={errorPassword ? errorPasswordMessage : ""}
                onChange={handleChange}
                size="small"
                InputProps={{
                    endAdornment: (
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
                variant="filled"
                error={errorPassword}
                type={showPassword ? 'text' : 'password'}
            />
            <br/>
            <Button size="small" variant='outlined' onClick={handleLoginDoctor}>Login as Doctor</Button><br/>
            <Button size="small" variant='outlined' onClick={handleLoginAdmin}>Login as Admin</Button><br/>
            <Button size="small" variant='outlined' onClick={handleLoginPetOwner}>Login as Pet Owner</Button><br/>

            <Link to="/signup">
                <Button size="small" variant='outlined'>Signup</Button>
            </Link>
            
        </div> 
        }</div>
    )
}
