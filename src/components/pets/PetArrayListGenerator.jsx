import React from "react";


    ///// GENERATOR OF DUMMY PETS DATA
    function generateRandomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    function generateRandomNumber(min, max) {
        return (Math.random() * (max - min) + min).toFixed(0);
    }

    function generateRandomBoolean() {
        return Math.random() < 0.5;
    }

    export default function generateRandomPetArray(count) {
        const data = [];

        for (let i = 1; i <= count; i++) {
            const birthdate = generateRandomDate(new Date(2010, 0, 1), new Date());
            const updateDate = generateRandomDate(birthdate, new Date());
            const weight = generateRandomNumber(1, 50);
            const id = generateRandomNumber(35, 3050);

            data.push({
                id: id,
                pet_owner_id: generateRandomNumber(1, 10),
                petname: ['Joshua', 'Parky', 'Ruby', 'Coco', 'Charlie', 'Luna', 'Max', 'Bella', 'Rocky', 'Daisy', 'Oliver', 'Lucy', 'Charlie', 'Mia', 'Leo'][Math.floor(Math.random() * 5)],
                species: ['Dog', 'Cat', 'Snake', 'Racoon', 'Giraffe'][Math.floor(Math.random() * 5)],
                breed: ['Bulldog', 'Wienerdog', 'Labrador Retriever', 'Siamese Cat', 'Golden Retriever', 'French Bulldog', 'Persian Cat', 'German Shepherd', 'Poodle', 'Beagle', 'Ragdoll Cat', 'Dachshund'][Math.floor(Math.random() * 12)],
                birthdate: birthdate,
                weight: weight,
                comments: `This is pet ${i}`,
                insurance_membership: generateRandomBoolean(),
                insurance_expiry: generateRandomBoolean() ? new Date(updateDate.getFullYear() + 1, updateDate.getMonth(), updateDate.getDate()).toISOString().split('T')[0] : null,
                update_date: updateDate.toISOString(),
                updated_by: `User ${i}`,
                archived: generateRandomBoolean()
            });
        }

        return data;
    }
