import {createContext, useContext, useEffect, useState} from 'react';
import {ProgramContext} from "./ProgramContext";
import app from "../App";

export const PetsContext = createContext();

export const PetsProvider = ({children}) => {

    const {user} = useContext(ProgramContext);
    const [petList, setPetList] = useState([]);
    const [updatePetListData, setUpdateNewPetListData] = useState(false)
    const [selectedOwner, setSelectedOwner] = useState({});
    const [selectedPet, setSelectedPet] = useState({});
    const [selectedAppointment, setSelectedAppointment] = useState({});
    const [sidebarContent, setSidebarContent] = useState(""); //appointment, pet


    const changeSidebarContent = (value) => {
        setSidebarContent(value);
        console.log("SIDEBAR CONTENT:", value)
    }

    const refreshAppointmentList = () => {
        console.log("need to refresh list, update has changed")
    }

    const updateSelectedOwner = (owner) => {
        if (user.role !== 'pet_owner') {
            setSelectedOwner(owner); // If user is not a pet owner, use the passed owner
            setSelectedPet({});
        }
    }

    const updateSelectedAppointment = (appointment) => {
        // selectedAppointment.booking_id === appointment.booking_id ? setSelectedAppointment({}) : setSelectedAppointment(appointment)
        // updateSelectedPet(appointment.pet_id)
        setSelectedPet(appointment.pet_id)
        setSelectedAppointment(appointment)
    }

    const updateSelectedPet = (petId) => {
        // selectedPet === petId ? setSelectedPet({}) : setSelectedPet(petId);
        setSelectedPet(petId)
        if (selectedAppointment.pet_id !== petId) {
            setSelectedAppointment({});
        }
    };

    const updatePetList = (Boolean) => {
        console.log("I am going to get a new data - PetsProvider/updatePetList (trying to refresh data after adding new pet..)")
        setUpdateNewPetListData(true);
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
                    ;
                }
            })
            .catch(error => {
                console.error(error);
            });
        console.log("trying to updateNewPetListData to false - petsProvider/UseEffect (trying to refresh data after adding new pet..)", petList)
        setUpdateNewPetListData(false);
    }, [user, updatePetListData]);


    return (
        <PetsContext.Provider
            value={{
                petList,
                selectedOwner,
                selectedPet,
                updateSelectedPet,
                updateSelectedOwner,
                updatePetList,
                selectedAppointment,
                setSelectedAppointment,
                updateSelectedAppointment,
                refreshAppointmentList,
                changeSidebarContent,
                sidebarContent
            }}>
            {children}
        </PetsContext.Provider>
    );
};