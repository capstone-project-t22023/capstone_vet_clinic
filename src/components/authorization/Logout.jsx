import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { Button} from '@mui/material';

export default function Logout() {

    useEffect(() => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('authenticated');
    }, []);
  return (
    <div>
        <Link to="/login">
                <Button size="small" variant='outlined' >Login</Button><br/>
              </Link>
    </div>
  )
}
