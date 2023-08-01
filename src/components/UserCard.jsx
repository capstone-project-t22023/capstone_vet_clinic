import React from 'react';
import {Paper} from '@mui/material';

export default function UserCard({user}) {

    // console.log(user)

    return (
            <Paper className="m-5 p-3 text-center" elevation={6}>
                {user && (
                    Object.entries(user).map(([key, value]) => <p>{key}: {value}</p>)
                )}
            </Paper>
    )
}
