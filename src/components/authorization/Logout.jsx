import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import { Box, Button } from '@mui/material';

export default function Logout() {

    useEffect(() => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('authenticated');
    }, []);
    return (
        <div>
             <h2>Sucessfully logged out!</h2>
            <Link to="/login">
                <Button size="md" variant="contained">Login</Button>
            </Link>
            <Link to="/">
                <Button size="md" variant="text">Homepage</Button>
            </Link>

            <Link to="/login">
                <Button size="lg" variant="outlined">Login</Button>
            </Link>
        </div>
    )
}
