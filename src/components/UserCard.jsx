import React from 'react';
import {Paper} from '@mui/material';
import BookingButton from './booking/BookingButton';

export default function UserCard({user}) {

    // console.log(user)
    const bookingHandler = (bookingDate) =>{
        console.log("received booking: ",bookingDate)
    }

    return (
        <div>
            <BookingButton onSelectedBooking={bookingHandler}/>

            <Paper className="m-5 p-3 text-center" elevation={6}>
                {user && (
                    Object.entries(user).map(([key, value]) => <p key={key}>{key}: {value}</p>)
                )}
            </Paper>

        </div>
    )
}
