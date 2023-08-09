import React from 'react';
import {Box, Paper} from '@mui/material';

export default function UserCard({user}) {

    return (
        <div>
            <div className={"text-center"}>
                {user && (
                    Object.entries(user).map(([key, value]) => <p key={key}>{key}: {value}</p>)
                )}
            </div>

        </div>
    )
}
