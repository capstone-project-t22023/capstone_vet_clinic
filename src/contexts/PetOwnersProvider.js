import { createContext } from 'react';

export const PetOwnersContext = createContext();

export const PetOwnersProvider = ({ children }) => {
    const petOwnersList = [{
            "id": 1,
            "firstName": "John",
            "lastName": "Smith",
            "email": "john.smith@example.com"
        },
            {
                "id": 2,
                "firstName": "Alice",
                "lastName": "Johnson",
                "email": "alice.johnson@example.com"
            },
            {
                "id": 3,
                "firstName": "Bob",
                "lastName": "Williams",
                "email": "bob.williams@example.com"
            },
            {
                "id": 4,
                "firstName": "Emily",
                "lastName": "Jones",
                "email": "emily.jones@example.com"
            },
            {
                "id": 5,
                "firstName": "Michael",
                "lastName": "Brown",
                "email": "michael.brown@example.com"
            },
            {
                "id": 6,
                "firstName": "Samantha",
                "lastName": "Davis",
                "email": "samantha.davis@example.com"
            },
            {
                "id": 7,
                "firstName": "David",
                "lastName": "Miller",
                "email": "david.miller@example.com"
            },
            {
                "id": 8,
                "firstName": "Olivia",
                "lastName": "Wilson",
                "email": "olivia.wilson@example.com"
            },
            {
                "id": 9,
                "firstName": "William",
                "lastName": "Martinez",
                "email": "william.martinez@example.com"
            },
            {
                "id": 10,
                "firstName": "Sophia",
                "lastName": "Moore",
                "email": "sophia.moore@example.com"
            }
        ];

    return (
        <PetOwnersContext.Provider value={petOwnersList}>
            {children}
        </PetOwnersContext.Provider>
    );
};