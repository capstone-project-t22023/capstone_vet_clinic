import {useEffect, useState} from "react";
import dayjs from 'dayjs';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';
import {Button, Paper} from '@mui/material';
import TimeSlots from "./TimeSlots";


export default function BookingOptions(props) {
    const {selectedBooking} = props;
    const [date, setDate] = useState(dayjs(new Date()));
    const [selectedSlots, setSelectedSlots] = useState(new Set());

    const bookingsInSystem = [
        {
            Date: "04-08-2023",
            TimeSlots: ['12:00', '15:30'],
        }, {
            Date: "06-08-2023",
            TimeSlots: ['10:30', '11:30'],
        }
    ]

    const saveDate = () => {
        const slots = Array.from(selectedSlots);
        slots.map(obj => obj.value);

        const combinedBooking = {
            Date: dayjs(date).format('DD-MM-YYYY'),
            TimeSlots: slots,
        };

        // Send booking Date and Slots to Main Booking component
        selectedBooking(combinedBooking);
    };



    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar value={date} onChange={(newDate) => setDate(newDate)}/>
                <Paper elevation={20} sx={{m: 5, p: 3}}>
                    Time Slots:
                    <TimeSlots selectedSlots={selectedSlots} setSelectedSlots={setSelectedSlots}/>
                </Paper>
                <Button onClick={saveDate} size={"fullwidth"} variant={"contained"}>save Date</Button>
            </LocalizationProvider>
        </div>
    );
}