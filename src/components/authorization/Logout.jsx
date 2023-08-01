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

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, minmax(80px, 1fr))',
                    gap: 1,
                    p: 5,
                }}
            >
                <Button variant="contained">Solid</Button>
                <Button size="lg" variant="contained">
                    Neutral
                </Button>
                <Button size="md" variant="contained">
                    Danger
                </Button>
                <Button size="sm" variant="contained">
                    Info
                </Button>
            </Box>

                <h2>Sucessfully logged out!</h2>
            <Link to="/login">
                <Button size="md" variant="contained">Login</Button>
            </Link>
            <Link to="/">
                <Button size="md" variant="soft">Homepage</Button>
            </Link>
            <Button size="lg">Homepage</Button>

            <Link to="/login">
                <Button size="lg" variant="outlined">Login</Button>
            </Link>
        </div>
    )
}
