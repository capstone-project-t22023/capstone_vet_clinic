import {createContext, useContext, useEffect, useState} from 'react';
import {ProgramContext} from "./ProgramContext";
import dayjs from "dayjs";


export const PetsContext = createContext();

export const PetsProvider = ({children}) => {

    const {user} = useContext(ProgramContext);
    const [petList, setPetList] = useState([]);
    const [reloadPetList, setReloadPetList] = useState(false)
    const [selectedOwner, setSelectedOwner] = useState({});
    const [selectedPet, setSelectedPet] = useState(-1);
    const [selectedAppointment, setSelectedAppointment] = useState({});
    const [sidebarContent, setSidebarContent] = useState(""); //appointment, pet
    const [refreshAppointments, setRefreshAppoinmtents] = useState(false);
    const [appointmentList, setAppointmentList] = useState([]);
    const [allDoctors, setAllDoctors] = useState([]);
    const [allBookingTypes, setAllBookingTypes] = useState([]);

    const fetchDoctors = () => {

        const url = 'http://localhost/capstone_vet_clinic/api.php/get_all_doctors';

        fetch(url, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        })
            .then(response => response.json())
            .then(data => {
                setAllDoctors(data.doctors)
            })
            .catch(error => {
                console.error('Error:', error);
            });
        return true
    }

    useEffect(() => {
        fetchDoctors();
        fetchBookingTypes();
    },[]);

    const getDoctor = (id) => {
        return allDoctors.find(doctor => doctor.id === id);
    }

    const changeSidebarContent = (value) => {
        setSidebarContent(value);
    }

    const handlerRefreshAppointments = (value) => {
        setRefreshAppoinmtents(value)
    }


    const updateSelectedOwner = (owner) => {
        if (user.role !== 'pet_owner') {
            setSelectedOwner(owner); // If user is not a pet owner, use the passed owner
            setSelectedPet(-1);
            changeSidebarContent('');
        }
    }


    const updateSelectedAppointment = (appointment) => {
        // selectedAppointment.booking_id === appointment.booking_id ? setSelectedAppointment({}) : setSelectedAppointment(appointment)
        // updateSelectedPet(appointment.pet_id)
        if (appointment) {
            setSelectedPet(appointment.pet_id);
        }
        setSelectedAppointment(appointment)
    }

    const updateSelectedPet = (petId) => {
        // selectedPet === petId ? setSelectedPet({}) : setSelectedPet(petId);
        setSelectedPet(petId)
        if (selectedAppointment && selectedAppointment.pet_id !== petId) {
            setSelectedAppointment({});
        }
    };

    const handlerReloadPetList = (Boolean) => {
        setReloadPetList(Boolean);
    }


    useEffect(() => {
        fetch("http://localhost/capstone_vet_clinic/api.php/get_all_pets", {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        })
            .then((response) => {
                return response.json();
            })
            .then(data => {
                if (data.pets) {
                    if (user.role === 'pet_owner') {
                        const userPets = data.pets.find(u => u.pet_owner_id === user.id);
                        setSelectedOwner(userPets); // Set userIsPetOwner based on whether user is a pet owner
                        setPetList(userPets.pets);
                    } else if (user.role === 'doctor' || user.role === 'admin') {
                        if(selectedOwner.pet_owner_id){
                            const userPets = data.pets.find(u => u.pet_owner_id === selectedOwner.pet_owner_id);
                            setSelectedOwner(userPets); 
                            setPetList(data.pets);
                        } else {
                            setPetList(data.pets);
                        }
                    }
                }
            })
            .catch(error => {
                console.error(error);
            });
            
        setReloadPetList(false);
    }, [user, reloadPetList]);



    const updateAppointmentStatus = (appointment, toStatus) => {
        let url = `http://localhost/capstone_vet_clinic/api.php/${toStatus}_booking/${appointment.booking_id}`;
        let reqBody ='';

        if (toStatus === "removeConfirm") {
            url = `http://localhost/capstone_vet_clinic/api.php/update_booking_by_admin/${appointment.booking_id}`
            reqBody ={
                "booking_type": appointment.booking_type,
                "pet_owner_id": appointment.pet_owner_id,
                "pet_id": appointment.pet_id,
                "doctor_id": appointment.doctor_id,
                "booking_slots": appointment.booking_time.map((time) => ({
                    "booking_date": dayjs(appointment.booking_date).format("DD-MM-YYYY"),
                    "booking_time": time
                }))
            }
        }



        fetch(url, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify(toStatus === "removeConfirm" ? reqBody : null), // Use reqBody conditionally
        })
            .then((response) => {
                if (response.ok) {
                    return response.json(); // Parse response body as JSON
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then(data => {
                if (data && data !== 'error') {
                    // Appointment finished successfully, you can update UI or take any other actions
                    handlerRefreshAppointments(true);
                    console.log("Status has been updated")
                } else {
                    // Handle error case
                    console.error('Error finishing appointment:', data);
                }
            })
            .catch(error => {
                console.error('Error finishing appointment:', error);
            });
    };



    const fetchBookingTypes = () => {
        const url = `http://localhost/capstone_vet_clinic/api.php/get_booking_types`;

        fetch(url, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        })
            .then(response => response.json())
            .then(data => {
                setAllBookingTypes(data.booking_types)
            })
            .catch(error => {
                console.error('Error:', error);
            });
        return true
    }

    const getBookingTypeById = (id) => {
        return allBookingTypes.find( bType => bType.booking_id === id)
    }




    return (
        <PetsContext.Provider
            value={{
                petList,
                selectedOwner,
                selectedPet,
                updateSelectedPet,
                updateSelectedOwner,
                handlerReloadPetList,
                selectedAppointment,
                setSelectedAppointment,
                updateSelectedAppointment,
                updateAppointmentStatus,
                handlerRefreshAppointments,
                refreshAppointments,
                changeSidebarContent,
                sidebarContent,
                appointmentList, setAppointmentList,
                getDoctor, allDoctors,
                allBookingTypes
            }}>
            {children}
        </PetsContext.Provider>
    );
};