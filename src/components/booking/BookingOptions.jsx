import {useState} from "react";
import dayjs from 'dayjs';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';
import {Button, Paper} from '@mui/material';
import TimeSlots from "./TimeSlots";


export default function BookingOptions(props) {
    const {selectedBooking} = props;
    const [date, setDate] = useState( dayjs(new Date()));
    const [selectedSlots, setSelectedSlots] = useState(new Set());

    const displayDate = dayjs(date).format('DD-MM-YYYY');


    const saveDate = () => {
        const combinedBooking = {
            selectedDate: displayDate,
            selectedTimeSlots: selectedSlots,
        };

        // Call the parent's selectedBooking handler
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