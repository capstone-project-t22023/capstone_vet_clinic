import React, { useState, useEffect, useContext } from "react";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Stack, Box, Grid, Button, Paper, TextField, MenuItem } from '@mui/material';
import TimeSlots from "./TimeSlots";
import ProgramContext from "../../contexts/ProgramContext";
import {PetsContext} from "../../contexts/PetsProvider";


export default function BookingOptionsUpdate(props) {
    const { selectedBooking, onSave, onCancel, editMode } = props;
    const {user, authenticated} = useContext(ProgramContext);
    const [date, setDate] = useState(dayjs(new Date()));
    const [selectedSlots, setSelectedSlots] = useState([]);
    const {selectedOwner,selectedPet,handlerRefreshAppointments} = useContext(PetsContext);
    // const [selectedOwner, setSelectedOwner] = useState('');
    // const [selectedPet, setSelectedPet] = useState('');
    const [selectedBookingType, setSelectedBookingType] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [pets, setPets] = useState([]);
    const [filteredPets, setFilteredPets] = useState([]);
    const [owners, setOwners] = useState([]);
    const [takenSlots, setTakenSlots] = useState([]);
    const [bookingTypes, setBookingTypes] = useState([]);

    console.log("Slots:", selectedSlots)
    //mount data
    useEffect(() => {
        Promise.all([
            fetch("http://localhost/capstone_vet_clinic/api.php/get_all_doctors", {
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                },
            }),
            fetch("http://localhost/capstone_vet_clinic/api.php/get_all_pets", {
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                },
            }),
            fetch("http://localhost/capstone_vet_clinic/api.php/get_taken_slots_all", {
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                },
            }),
            fetch("http://localhost/capstone_vet_clinic/api.php/get_booking_types", {
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                },
            })
        ])
            .then((responses) => {
                return Promise.all(responses.map(function (response) {
                    return response.json();
                }));
            })
            .then(data => {
                setPets(data[1].pets);
                setTakenSlots(data[2].taken_slots_all);

                let tmp_d = data[0].doctors.map( x => {
                    let tmp = {};
                    tmp.value = x.id;
                    tmp.label = x.firstname + " " + x.lastname;
                    return tmp;
                });
                tmp_d.push({value: '', label: ''});
                setDoctors(tmp_d);

                let tmp_bt = data[3].booking_types.map( x => {
                    let tmp = {};
                    tmp.value = x.booking_type;
                    tmp.label = x.booking_type;
                    tmp.booking_fee = x.booking_fee;
                    return tmp;
                });
                tmp_bt.push({value: '', label: '', booking_fee: 0.00});
                setBookingTypes(tmp_bt);

                let tmp_o = data[1].pets.map( x => {
                    let tmp = {};
                    tmp.value = x.pet_owner_id;
                    tmp.label = x.pets.length > 0 ? x.firstname + " " + x.lastname : x.firstname + " " + x.lastname + " (no pet)";
                    tmp.username = x.username;
                    tmp.pet_length = x.pets.length;
                    return tmp;
                });
                tmp_o.push({value: '', label: '', username: '', pet_length: 0});
                setOwners(tmp_o);

                if(selectedBooking && editMode){
                    if(user.role === 'pet_owner'){
                        // setSelectedOwner(user.id);
                        // let owned_pets = data[1].pets.filter( x => x.pet_owner_id === user.id);
                        // if (owned_pets.length > 0){
                        //     let pet_option = owned_pets[0].pets.map( x => {
                        //         let pet = {};
                        //         pet.value = x.pet_id;
                        //         pet.label = x.petname;
                        //         return pet;
                        //     });
                        //     pet_option.push({value: '', label: ''});
                        //     setFilteredPets(pet_option);
                        // }
                        
                    } else {
                        let tmp = data[1].pets.filter( x => x.pet_owner_id === selectedBooking.pet_owner_id);
                        if (tmp.length > 0){
                            // setSelectedOwner(selectedBooking.pet_owner_id);
                            let tmp_p = tmp[0].pets.map( x => {
                                let pet = {};
                                pet.value = x.pet_id;
                                pet.label = x.petname;
                                return pet;
                            });
                            tmp_p.push({value: '', label: ''});
                            setFilteredPets(tmp_p);
                        }
                    }
                        // let d = selectedBooking.booking_date.split("-");
                        // setDate(dayjs().set('date', d[0]).set('month', d[1]-1).set('year', d[2]));
                        setDate(dayjs(selectedBooking.booking_date));

                        setSelectedSlots(selectedBooking.booking_time);
                        setSelectedBookingType(selectedBooking.booking_type);
                        // // setSelectedPet(selectedBooking.pet_id);
                        setSelectedDoctor(selectedBooking.doctor_id);
                    
                } else {
                    // setSelectedOwner(user.id);
                    let owned_pets = data[1].pets.filter( x => x.pet_owner_id === user.id);
                    if (owned_pets.length > 0){
                        let pet_option = owned_pets[0].pets.map( x => {
                            let pet = {};
                            pet.value = x.pet_id;
                            pet.label = x.petname;
                            return pet;
                        });
                        pet_option.push({value: '', label: ''});
                        setFilteredPets(pet_option);
                    }
                }
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const changeDateHandler = (newDate) => {
        setDate(dayjs(newDate))
        setSelectedSlots([]);
        fetch("http://localhost/capstone_vet_clinic/api.php/get_taken_slots_by_date", {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
            body: JSON.stringify({
                selected_date: dayjs(newDate).format('DD-MM-YYYY')
            })
        })
            .then((response) => {
                return response.json();
            })
            .then(data => {
                setTakenSlots(data.taken_slots_by_date);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const saveBookingType = (event) => {
        setSelectedBookingType(event.target.value);
    }

    const saveOwner = (event) => {
        // setSelectedPet('');
        let tmp = pets.filter( x => x.pet_owner_id === event.target.value);
        if (tmp.length > 0){
            let tmp_p = tmp[0].pets.map( x => {
                let pet = {};
                pet.value = x.pet_id;
                pet.label = x.petname;
                return pet;
            });
            tmp_p.push({value: '', label: ''});
            setFilteredPets(tmp_p);
            // setSelectedOwner(tmp[0].pet_owner_id);
        }
    }

    const savePet = (event) => {
        // setSelectedPet(event.target.value);
    }

    const saveDoctor = (event) => {
        setSelectedDoctor(event.target.value);
    }

    const saveDate = () => {
        let tmp_slots = selectedSlots.map(x => {
            let booking_record = {};
            booking_record.booking_date = dayjs(date).format('DD-MM-YYYY');
            booking_record.booking_time = x;
            return booking_record;
        });


        let req_body = {
            booking_type : selectedBookingType,
            pet_owner_id : selectedOwner.pet_owner_id,
            pet_id: selectedPet,
            username: user.username,
            booking_slots: tmp_slots
        }
        console.log("Add Booking: " + JSON.stringify(req_body));



        console.log("Add Booking: " + JSON.stringify(req_body));

        fetch("http://localhost/capstone_vet_clinic/api.php/add_booking", {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
            body: JSON.stringify(req_body)
        })
            .then((response) => {
                return response.json();
            })
            .then(data => {
                console.log("Add Booking API: " + data.add_booking);
                
                fetch("http://localhost/capstone_vet_clinic/api.php/get_booking/"+data.add_booking, {
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                    }
                })
                    .then((response) => {
                        return response.json();
                    })
                    .then(data => {
                        // sendSelectedBooking(data.booking_record);
                        handlerRefreshAppointments(true);
                        onSave(true)
                    });

            })
            .catch(error => {
                console.error(error);
            });
    };

    const changeDate = () => {
        let tmp_slots = selectedSlots.map(x => {
            let booking_record = {};
            booking_record.booking_date = dayjs(date).format('DD-MM-YYYY');
            booking_record.booking_time = x;
            return booking_record;
        });

        let req_body = {
            booking_type : selectedBookingType,
            prev_booking_status: selectedBooking.booking_status,
            pet_owner_id : selectedOwner.pet_owner_id,
            pet_id: selectedPet,
            doctor_id: selectedDoctor,
            username: user.username,
            booking_slots: tmp_slots
        }

        console.log("Update Booking: " + JSON.stringify(req_body));

        let endpoint = "";
        if(user.role === 'admin'){
            endpoint = "http://localhost/capstone_vet_clinic/api.php/update_booking_by_admin/"+selectedBooking.booking_id;
        } else {
            endpoint = "http://localhost/capstone_vet_clinic/api.php/update_booking_by_pet_owner/"+selectedBooking.booking_id;
        }

        fetch( endpoint, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
            body: JSON.stringify(req_body)
        })
            .then((response) => {
                return response.json();
            })
            .then(data => {
                
                fetch("http://localhost/capstone_vet_clinic/api.php/get_booking/"+data.update_booking, {
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                    }
                })
                    .then((response) => {
                        return response.json();
                    })
                    .then(data => {
                        // sendSelectedBooking(data.booking_record);
                        handlerRefreshAppointments(true)
                    });

            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleCancel = () => {
        onCancel(false);
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

    const whenBusyData = takenSlots;
    
    return (
        <Box
            sx={{
                display: 'grid',
                gap: 1,
                p: 3
            }}
        >
            { editMode ? 
            <>
                <TextField
                    select
                    label="Booking Type"
                    helperText={selectedBookingType ? 'Please select your booking type' : 'Please select a booking type'}
                    onChange={saveBookingType}
                    value={selectedBookingType || ''}
                    error={!selectedBookingType}
                    required
                >
                    {bookingTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                { user.role === 'admin' ?
                <TextField
                select
                label="Doctor"
                helperText="Please select doctor"
                onChange={saveDoctor}
                value={selectedDoctor || ''}
                >
                {doctors.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
                </TextField> : ""}
                <Box
                    sx={{
                        display: 'grid',
                        gap: 1,
                        gridTemplateColumns: '1fr 1fr',
                    }}
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar value={date} onChange={changeDateHandler} />
                    </LocalizationProvider>
                    <Box sx={{ alignItems: 'center', border: '1px solid default' }}>
                        <TimeSlots chosenDate={date} selectedSlots={selectedSlots} whenBusyData={whenBusyData}
                            onChange={slotsHandler} />
                    </Box>
                </Box>
            </> 
            : 
            <>
                <TextField
                    select
                    label="Booking Type"
                    helperText={selectedBookingType ? 'Please select your booking type' : 'Please select a booking type'}
                    onChange={saveBookingType}
                    value={selectedBookingType || ''}
                    error={!selectedBookingType}
                    required
                >
                    {bookingTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <Box
                    sx={{
                        display: 'grid',
                        gap: 1,
                        gridTemplateColumns: '1fr 1fr',
                    }}
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar value={date} onChange={changeDateHandler} />
                    </LocalizationProvider>
                    <Box sx={{ alignItems: 'center', border: '1px solid default' }}>
                        <TimeSlots chosenDate={date} selectedSlots={selectedSlots} whenBusyData={whenBusyData}
                            onChange={slotsHandler} />
                    </Box>
                </Box>
            </>
            }

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 1,
                    m: 'auto',
                    width: 'fit-content',
                }}
            >
                <Button
                    variant={"outlined"}
                    onClick={handleCancel}
                >
                    Cancel
                </Button>
                {editMode ?
                <Button
                    variant={"contained"}
                    onClick={selectedSlots.length > 0 ? changeDate : null}
                    disabled={selectedSlots.length === 0}
                    color={"primary"}
                >
                    {selectedSlots.length > 0 ? "Update Bookings" : "Select Time"}
                </Button>
                :
                <Button
                    variant={"contained"}
                    onClick={selectedSlots.length > 0 ? saveDate : null}
                    disabled={selectedSlots.length === 0}
                    color={"primary"}
                >
                    {selectedSlots.length > 0 ? "Save Bookings" : "Select Time"}
                </Button>}
            </Box>
        </Box>
    );
}