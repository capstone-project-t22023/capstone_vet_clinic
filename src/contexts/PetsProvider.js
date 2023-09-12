import {createContext, useContext, useEffect, useState} from 'react';
import {ProgramContext} from "./ProgramContext";


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
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
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
        if (selectedAppointment.pet_id !== petId) {
            setSelectedAppointment({});
        }
    };

    const handlerReloadPetList = (Boolean) => {
        setReloadPetList(Boolean);
    }


    useEffect(() => {
        fetch("http://localhost/capstone_vet_clinic/api.php/get_all_pets", {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
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
                        setPetList(data.pets)
                    }
                }
            })
            .catch(error => {
                console.error(error);
            });
        setReloadPetList(false);
    }, [user, reloadPetList]);



    const updateAppointmentStatus = (appointment, toStatus) => {

        const url = `http://localhost/capstone_vet_clinic/api.php/${toStatus}_booking/${appointment.booking_id}`;

        console.log("Change Appointment Status: ", url);

        fetch(url, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
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
                    console.log(data)
                } else {
                    // Handle error case
                    console.error('Error finishing appointment:', data.error_message);
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
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
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