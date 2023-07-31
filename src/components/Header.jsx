import React, { useState, useEffect, useContext } from 'react';
import ProgramContext from '../ProgramContext';
import { Button } from '@mui/material';
import { Navigate } from "react-router-dom";

export default function Header() {

    const [toLogout, setToLogout] = useState(false);
    const {user, authenticated} = useContext(ProgramContext);

    function handleLogout(){
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('authenticated');
        setToLogout(true);
    }

    return (
    <div>
           {
        toLogout ? <Navigate to="/logout" replace={true} /> :
        <div>
            Header: Logged in user: {user.firstname} {user.lastname}
            <Button size="small" variant='outlined' onClick={handleLogout}>Logout</Button><br/>
        </div>
        } 
    </div>
  )
}
