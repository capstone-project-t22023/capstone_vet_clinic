import React, {useState} from 'react';
import {Chip, Box} from '@mui/material';
import dayjs from "dayjs";

export default function TimeSlots(props) {
    const {chosenDate, selectedSlots, onChange, whenBusyData, selectedBooking} = props; // Destructure the selectedSlots and setSelectedSlots props

    const [timeSlots, setTimeSlots] = useState(generateTimeSlots())


    // set up the Time Slots in 30 mins 8am - 5pm
    function generateTimeSlots() {
        const tempSlots = [];
        const startHour = 8; // 8 am
        const endHour = 17; // 5 pm
        const slotDurationMinutes = 30;
        for (let hour = startHour; hour < endHour; hour++) {
            for (let minute = 0; minute < 60; minute += slotDurationMinutes) {
                const formattedHour = hour.toString().padStart(2, '0');
                const formattedMinute = minute.toString().padStart(2, '0');
                const time = `${formattedHour}:${formattedMinute}`;
                tempSlots.push({
                    time: time,
                    free: true,
                });
            }
        }
        return tempSlots
    }

    const changeSlotCheck = (slot) => {

        slot.free = !slot.free;
        onChange(slot)
console.log("slots and booking and slot:", selectedSlots, selectedBooking,slot);
    }



    const slotIsBusy = (slot) => {
        let daySlots = whenBusyData[dayjs(chosenDate).format('DD-MM-YYYY')];
        return daySlots && daySlots.includes(slot.time) ? true : false;
    }

    const isSelected = (slot) => {

        // return (
        //     (!slotIsBusy(slot) && selectedSlots && selectedSlots.includes(slot.time)) ||
        //     (selectedBooking && selectedBooking.Date === dayjs(chosenDate).format('DD-MM-YYYY') && selectedBooking.TimeSlots.includes(slot.time))
        // );

            if((!slotIsBusy(slot) && selectedSlots && selectedSlots.includes(slot.time)) ||
            (selectedBooking && selectedBooking.Date === dayjs(chosenDate).format('DD-MM-YYYY') && selectedBooking.TimeSlots.includes(slot.time))){

                return true;
            }else{
                slot.free = !slot.free;
                return false
            }


    }

    const handleDelete = (slot) => {
        onChange(slot)
    }



    return (
        <div>
            <Box
                sx={{
                    display: 'grid',
                    gap: 1,
                    gridTemplateColumns: 'repeat(2, 1fr)',
                }}
            >

            {
                timeSlots.map((slot, index) => (

                    <Chip
                        key={index}
                        label={slotIsBusy(slot) ? "Taken" : slot.time}
                        color={isSelected(slot) ? "primary" : (slotIsBusy(slot)? "error" : "primary")}
                        variant={isSelected(slot) ? "" : (slotIsBusy(slot)? "" : "outlined")}
                        onDelete={isSelected(slot) ? () => changeSlotCheck(slot) : null}
                        onClick={!slotIsBusy(slot) ? (e) => changeSlotCheck(slot) : null}
                        disabled={(slotIsBusy(slot)? true : false)}
                        sx={{ m:0.5 }}
                    />
                ))}
            </Box>
        </div>
    );
}