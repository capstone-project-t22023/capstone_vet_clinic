import React, {useState} from 'react';
import {Chip, Box} from '@mui/material';
import dayjs from "dayjs";

export default function TimeSlots(props) {
    const {chosenDate, selectedSlots, onChange, whenBusyData} = props; // Destructure the selectedSlots and setSelectedSlots props
    const [timeSlots, setTimeSlots] = useState(generateTimeSlots())

    console.log("selected slots: ",selectedSlots)

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
        if (whenBusyData.booking_time) {
                if (
                    whenBusyData.booking_time.includes(slot.time)
                ) {
                    return true; // Slot is busy on the specified day and time
                }
        }
        return false; // Slot is not busy
    };

    const isSelected = (slot) => {

        return (
            (!slotIsBusy(slot) && selectedSlots && selectedSlots.includes(slot.time))
        );

    }

    const isChecked = (slot) => {

        return (
            ( selectedSlots && selectedSlots.includes(slot.time))
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

                    isChecked ?
                    <Chip
                        key={index}
                        label={slotIsBusy(slot) ? (slotIsBusy(slot) && isChecked(slot)? "Last One" : "Taken") : slot.time}
                        color={
                            isChecked(slot) // If the slot is checked
                                ? slotIsBusy(slot) // Check if the selected slot is also busy
                                    ? "warning" // If busy, assign changeSlotCheck function to onClick
                                    : "secondary" // If not busy, do not assign any action to onClick
                                : "primary" // If the slot is not checked, do not assign any action to onClick
                        }
                        variant={isSelected(slot) ? "" : (slotIsBusy(slot)? "" : "outlined")}
                        onDelete={isSelected(slot) || (isChecked(slot) && slotIsBusy(slot)) ? () => changeSlotCheck(slot) : null}
                        onClick={
                            isChecked(slot) // If the slot is checked
                                ? slotIsBusy(slot) // Check if the selected slot is also busy
                                    ? null // If not busy, do not assign any action to onClick
                                    : () => changeSlotCheck(slot) // If busy, assign changeSlotCheck function to onClick
                                : () => changeSlotCheck(slot) // If the slot is not checked, do not assign any action to onClick
                        }
                        disabled={isChecked(slot) // Check if the selected slot is also busy // If the slot is not selected, enable the button
                                    ? false // If busy, disable the button
                                    : slotIsBusy(slot) // If not busy, enable the button
                        }
                        sx={{ m:0.5 }}
                    />
                        :
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