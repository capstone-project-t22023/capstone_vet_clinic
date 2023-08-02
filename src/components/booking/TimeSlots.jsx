import React from 'react';
import {Chip} from '@mui/material';

export default function TimeSlots(props) {
    const { selectedSlots, setSelectedSlots } = props; // Destructure the selectedSlots and setSelectedSlots props
    const startHour = 8; // 8 am
    const endHour = 17; // 5 pm
    const slotDurationMinutes = 30;

    const timeSlots = [];

    for (let hour = startHour; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += slotDurationMinutes) {
            const formattedHour = hour.toString().padStart(2, '0');
            const formattedMinute = minute.toString().padStart(2, '0');
            const time = `${formattedHour}:${formattedMinute}`;

            timeSlots.push(time);
        }
    }

    const handleSlotClick = (time) => {
        const updatedSlots = new Set(selectedSlots);
        if (updatedSlots.has(time)) {
            updatedSlots.delete(time);
        } else {
            updatedSlots.add(time);
        }
        setSelectedSlots(updatedSlots); // Call the setSelectedSlots function to update the state
    };

    return (
        <div>
            {timeSlots.map((time, index) => (
                <Chip
                    key={index}
                    label={time}
                    onClick={() => handleSlotClick(time)}
                    color={selectedSlots.has(time) ? 'primary' : 'default'}
                    style={{ margin: '4px' }}
                />
            ))}
        </div>
    );
}