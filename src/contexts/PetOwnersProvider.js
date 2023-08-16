import { createContext } from 'react';

export const PetOwnersContext = createContext();

export const PetOwnersProvider = ({ children }) => {
    const petOwnersList = [{
            "id": 100,
            "firstName": "John",
            "lastName": "Smith",
            "email": "john.smith@example.com"
        },
            {
                "id": 200,
                "firstName": "Alice",
                "lastName": "Johnson",
                "email": "alice.johnson@example.com"
            },
            {
                "id": 300,
                "firstName": "Bob",
                "lastName": "Williams",
                "email": "bob.williams@example.com"
            },
            {
                "id": 400,
                "firstName": "Emily",
                "lastName": "Jones",
                "email": "emily.jones@example.com"
            },
            {
                "id": 500,
                "firstName": "Michael",
                "lastName": "Brown",
                "email": "michael.brown@example.com"
            },
            {
                "id": 600,
                "firstName": "Samantha",
                "lastName": "Davis",
                "email": "samantha.davis@example.com"
            },
            {
                "id": 700,
                "firstName": "David",
                "lastName": "Miller",
                "email": "david.miller@example.com"
            },
            {
                "id": 800,
                "firstName": "Olivia",
                "lastName": "Wilson",
                "email": "olivia.wilson@example.com"
            },
            {
                "id": 900,
                "firstName": "William",
                "lastName": "Martinez",
                "email": "william.martinez@example.com"
            },
            {
                "id": 1000,
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