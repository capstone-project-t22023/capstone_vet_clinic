import {useState} from "react";
import dayjs from 'dayjs';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';
import {DialogActions, Stack, Box, Grid, Button, Paper} from '@mui/material';
import TimeSlots from "./TimeSlots";
import * as React from "react";


export default function BookingOptions(props) {
    const {selectedBooking, sendSelectedBooking, onClose} = props;
    const [date, setDate] = useState(dayjs(new Date()));
    const [selectedSlots, setSelectedSlots] = useState([]);


    const whenBusyData = {
        "04-08-2023": ['14:00', '15:30'],
        "02-08-2023": ['08:00', '11:30'],
    }


    const saveDate = () => {
        const combinedBooking = {
            Date: dayjs(date).format('DD-MM-YYYY'),
            TimeSlots: selectedSlots,
        };
        // Send booking Date and Slots to Main Booking component
        sendSelectedBooking(combinedBooking);
    };

    const handleCancel = () => {
        onClose(false);
    }

    const slotsHandler = (slot) => {
        if (selectedSlots && !selectedSlots.includes(slot.time)) {
            setSelectedSlots((prevState) => {
                const newSlots = [...prevState, slot.time];
                return newSlots.sort((a, b) => a.localeCompare(b));
            });
        } else {
            setSelectedSlots((prevState) => prevState.filter(time => time !== slot.time));
        }
    }

    const changeDateHandler = (newDate) => {
        setDate(newDate)
        setSelectedSlots([]);
    }


    console.log("Selected slots", selectedSlots)


    return (
        <Box
            sx={{
                display: 'grid',
                gap: 1,
                p: 3
            }}
        >
            <p>Selected Date test: {selectedBooking ? selectedBooking.Date+" " : "Please select a Date"}
                {selectedBooking ? selectedBooking.TimeSlots + "" : "Nothing selected"}</p>
            <Box
                sx={{
                    display: 'grid',
                    gap: 1,
                    gridTemplateColumns: '1fr 3fr',
                }}
            >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar value={date} onChange={changeDateHandler}/>
                </LocalizationProvider>
                <Box sx={{alignItems: 'center', border: '1px solid default'}}>
                    <TimeSlots chosenDate={date} selectedSlots={selectedSlots} whenBusyData={whenBusyData}
                               onChange={slotsHandler} selectedBooking={selectedBooking} />
                </Box>
            </Box>

            <DialogActions>
                <Button
                    variant={"outlined"}
                    onClick={handleCancel}
                >
                    Cancel
                </Button>
                <Button
                    variant={"contained"}
                    onClick={selectedSlots.length>0 ? saveDate : null}
                    disabled={selectedSlots.length === 0}
                    color={"primary"}
                >
                    {selectedSlots.length>0 ? "Save Booking" : "Select Time"}
                </Button>
            </DialogActions>
        </Box>
    );
}