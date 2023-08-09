import React, {useState} from 'react';
import {Chip, Box} from '@mui/material';
import dayjs from "dayjs";

export default function TimeSlots(props) {
    const {chosenDate, selectedSlots, onChange, whenBusyData} = props; // Destructure the selectedSlots and setSelectedSlots props

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
    }



    const slotIsBusy = (slot) => {
        let daySlots = whenBusyData[dayjs(chosenDate).format('DD-MM-YYYY')];
        return daySlots && daySlots.includes(slot.time) ? true : false;
    }

    const isSelected = (slot) => {

        return (
            (!slotIsBusy(slot) && selectedSlots && selectedSlots.includes(slot.time))
        );

    }



    return (
        <div>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: 'wrap',
                    justifyContent: {xs: 'center', sm: 'flex-start'},
                    alignItems: 'space-around',
                    px: 2,
                }}
            >
            {
                timeSlots.map((slot, index) => (

                    <Chip
                        key={index}
                        label={slotIsBusy(slot) ? "Taken" : slot.time}
                        color={isSelected(slot) ? "secondary" : (slotIsBusy(slot)? "secondary" : "primary")}
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