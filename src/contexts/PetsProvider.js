import {createContext, useContext, useEffect, useState} from 'react';
import {ProgramContext} from "./ProgramContext";

export const PetsContext = createContext();

export const PetsProvider = ({children}) => {

    const {user} = useContext(ProgramContext);
    const [petList, setPetList] = useState([]);
    const [updatePetListData, setUpdateNewPetListData] = useState(false)
    const [selectedOwner, setSelectedOwner] = useState({});
    const [selectedPet, setSelectedPet] = useState({});



    const updateSelectedOwner = (owner) => {
        if (user.role !== 'pet_owner') {
            setSelectedOwner(owner); // If user is not a pet owner, use the passed owner
        }
    }

    const updateSelectedPet = (pet) => {
        console.log("clickS",pet);
        setSelectedPet(pet); // If user is not a pet owner, use the passed owner
    }

    const updatePetList = (Boolean) =>{
        console.log("I am going to get a new data - PetsProvider/updatePetList")
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
                    };
                }
            })
            .catch(error => {
                console.error(error);
            });
        console.log("trying to updateNewPetListData to false - petsProvider/UseEffect", petList)
        setUpdateNewPetListData(false);
    }, [user, updatePetListData]);


    return (
        <PetsContext.Provider value={{petList, selectedOwner, selectedPet, updateSelectedPet, updateSelectedOwner, updatePetList}}>
            {children}
        </PetsContext.Provider>
    );
};