import React, { useState, useEffect } from 'react'
import { Alert, Box, Card, CardActions, CardContent, Button, TextField } from '@mui/material';
import { Navigate, Link } from "react-router-dom";

export default function ConfirmSignup() {

    const [tmpToken, setTmpToken] = useState(0);
    const [enteredToken, setEnteredToken] = useState(0);
    const [tokenError, setTokenError] = useState(false);
    const [tokenErrorMessage, setTokenErrorMessage] = useState("");
    const [toLogin, setToLogin] = useState(false);

    useEffect(() => {
        let link = "";

        if (sessionStorage.getItem('tmp_privilege') === 'doctor') {
            link = "http://localhost/capstone_vet_clinic/api.php/get_token_doctor";
        } else if (sessionStorage.getItem('tmp_privilege') === 'admin') {
            link = "http://localhost/capstone_vet_clinic/api.php/get_token_admin";
        } else if (sessionStorage.getItem('tmp_privilege') === 'pet_owner') {
            link = "http://localhost/capstone_vet_clinic/api.php/get_token_pet_owner";
        }
        fetch(link, {
            mode: "cors",
            credentials: "same-origin",
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('tmp_token'),
            },
        })
            .then((response) => {
                return response.json();
            })
            .then(data => {
                setTmpToken(data.token.code);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    function handleConfirmation() {
        if (enteredToken !== tmpToken) {
            setTokenError(true);
            setTokenErrorMessage("Tokens don't match. Try again.");
        }

        let link = "";

        if (sessionStorage.getItem('tmp_privilege') === 'doctor') {
            link = "http://localhost/capstone_vet_clinic/api.php/confirm_doctor";
        } else if (sessionStorage.getItem('tmp_privilege') === 'admin') {
            link = "http://localhost/capstone_vet_clinic/api.php/confirm_admin";
        } else if (sessionStorage.getItem('tmp_privilege') === 'pet_owner') {
            link = "http://localhost/capstone_vet_clinic/api.php/confirm_pet_owner";
        }

        if (!tokenError) {
            fetch(link, {
                method: 'POST',
                body: JSON.stringify({
                    code: enteredToken,
                }),
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('tmp_token'),
                },
            })
                .then(res => res.json())
                .then((data) => {
                    if (data.status === 1) {
                        setToLogin(true);
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    function handleChange(event) {
        setTokenError(false);
        setTokenErrorMessage("");
        if (event.target.id === 'token') {
            setEnteredToken(event.target.value);
        }
    }

    return (
        <div>
            <Card>
                <CardContent>
                        Please enter code
                    <br />
                        {tmpToken}
                    <br />
                    {tokenError ?
                        <Alert severity="error">{tokenErrorMessage}</Alert> : ""
                    }
                    <br />
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <TextField
                            id="token"
                            label="Token"
                            sx={{ width: '35ch' }}
                            onChange={handleChange}
                            size="small"
                            variant="standard"
                        />
                    </Box>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={handleConfirmation}>Confirm Code</Button>
                    {toLogin ? <Navigate to="/login" replace={true} /> : ""}
                </CardActions>
            </Card>
            
        </div>
    )
}
