import React, {useContext} from 'react';
import {Container, Typography} from '@mui/material';
import ProgramContext from "../ProgramContext";
import Header from "../components/Header"
import Footer from "../components/Footer";
import BookingButton from '../components/booking/BookingButton'

export default function Bookings() {

    const {user, authenticated} = useContext(ProgramContext);

    const selectedBookingHandler = (booking) => {
      console.log("Selected Booking is: ", booking)
    }

    return (
        <div>
            <Header/>
            <Container maxWidth="lg" sx={{mt: 5, mb: 5, p:3, bgcolor: "secondary.50"}}>
                <Typography component="h1" variant="h3" sx={{mt: 5, mb: 5, p:3, color: "primary.main"}}>Bookings Page</Typography>
                <Typography component="p" variant="h5" sx={{mt: 5, mb: 5, p:3, color: "primary.dark"}}>List of all Bookings + make a new booking</Typography>
                    <BookingButton booking={selectedBookingHandler}/>
            </Container>
            <Footer/>
        </div>
    )
}