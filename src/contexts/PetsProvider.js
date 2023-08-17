import {createContext, useContext, useEffect, useState} from 'react';
import {ProgramContext} from "./ProgramContext";

export const PetsContext = createContext();

export const PetsProvider = ({ children }) => {

    const {user} = useContext(ProgramContext);


    const [petList, setPetList] = useState([]);


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
                        setPetList(userPets.pets)
                    }
                    else if (user.role === 'doctor' || user.role === 'admin')  {
                        setPetList(data.pets)
                    };
                }
            })
            .catch(error => {
                console.error(error);
            });
    }, [user]);



    // const petList = [
    //     {
    //         "id": "943",
    //         "pet_owner_id": 7,
    //         "petname": "Ruby",
    //         "species": "Snake",
    //         "breed": "Dachshund",
    //         "birthdate": "2010-04-14T11:18:01.031Z",
    //         "weight": "27",
    //         "comments": "This is pet 1",
    //         "insurance_membership": false,
    //         "insurance_expiry": null,
    //         "update_date": "2022-07-06T23:54:30.418Z",
    //         "updated_by": "User 1",
    //         "archived": true
    //     },
    //     {
    //         "id": "505",
    //         "pet_owner_id": 6,
    //         "petname": "Charlie",
    //         "species": "Giraffe",
    //         "breed": "Poodle",
    //         "birthdate": "2023-07-04T09:14:36.654Z",
    //         "weight": "26",
    //         "comments": "This is pet 2",
    //         "insurance_membership": false,
    //         "insurance_expiry": "2024-07-11",
    //         "update_date": "2023-07-12T01:16:50.262Z",
    //         "updated_by": "User 2",
    //         "archived": true
    //     },
    //     {
    //         "id": "2930",
    //         "pet_owner_id": 6,
    //         "petname": "Ruby",
    //         "species": "Racoon",
    //         "breed": "Poodle",
    //         "birthdate": "2013-06-06T20:10:37.620Z",
    //         "weight": "5",
    //         "comments": "This is pet 3",
    //         "insurance_membership": false,
    //         "insurance_expiry": null,
    //         "update_date": "2016-02-02T03:16:44.339Z",
    //         "updated_by": "User 3",
    //         "archived": false
    //     },
    //     {
    //         "id": "2888",
    //         "pet_owner_id": 1,
    //         "petname": "Coco",
    //         "species": "Cat",
    //         "breed": "Dachshund",
    //         "birthdate": "2012-12-24T09:35:27.682Z",
    //         "weight": "41",
    //         "comments": "This is pet 4",
    //         "insurance_membership": true,
    //         "insurance_expiry": null,
    //         "update_date": "2021-08-01T11:11:51.277Z",
    //         "updated_by": "User 4",
    //         "archived": true
    //     },
    //     {
    //         "id": "900",
    //         "pet_owner_id": 9,
    //         "petname": "Joshua",
    //         "species": "Giraffe",
    //         "breed": "Golden Retriever",
    //         "birthdate": "2016-08-25T04:39:16.731Z",
    //         "weight": "16",
    //         "comments": "This is pet 5",
    //         "insurance_membership": true,
    //         "insurance_expiry": "2023-08-01",
    //         "update_date": "2022-08-02T00:59:18.274Z",
    //         "updated_by": "User 5",
    //         "archived": true
    //     },
    //     {
    //         "id": "2658",
    //         "pet_owner_id": 6,
    //         "petname": "Joshua",
    //         "species": "Giraffe",
    //         "breed": "Poodle",
    //         "birthdate": "2022-01-17T13:30:18.973Z",
    //         "weight": "3",
    //         "comments": "This is pet 6",
    //         "insurance_membership": false,
    //         "insurance_expiry": "2023-09-23",
    //         "update_date": "2022-09-24T11:42:29.176Z",
    //         "updated_by": "User 6",
    //         "archived": true
    //     },
    //     {
    //         "id": "1664",
    //         "pet_owner_id": 4,
    //         "petname": "Ruby",
    //         "species": "Dog",
    //         "breed": "Poodle",
    //         "birthdate": "2016-05-20T06:00:03.540Z",
    //         "weight": "49",
    //         "comments": "This is pet 7",
    //         "insurance_membership": true,
    //         "insurance_expiry": "2018-01-12",
    //         "update_date": "2017-01-13T04:02:57.473Z",
    //         "updated_by": "User 7",
    //         "archived": false
    //     },
    //     {
    //         "id": "2111",
    //         "pet_owner_id": 9,
    //         "petname": "Ruby",
    //         "species": "Snake",
    //         "breed": "Golden Retriever",
    //         "birthdate": "2011-10-12T02:43:22.362Z",
    //         "weight": "9",
    //         "comments": "This is pet 8",
    //         "insurance_membership": false,
    //         "insurance_expiry": null,
    //         "update_date": "2016-06-14T12:20:20.755Z",
    //         "updated_by": "User 8",
    //         "archived": false
    //     },
    //     {
    //         "id": "391",
    //         "pet_owner_id": 4,
    //         "petname": "Parky",
    //         "species": "Snake",
    //         "breed": "German Shepherd",
    //         "birthdate": "2010-10-21T22:42:53.184Z",
    //         "weight": "38",
    //         "comments": "This is pet 9",
    //         "insurance_membership": true,
    //         "insurance_expiry": "2016-07-27",
    //         "update_date": "2015-07-28T04:46:14.746Z",
    //         "updated_by": "User 9",
    //         "archived": false
    //     },
    //     {
    //         "id": "1932",
    //         "pet_owner_id": 2,
    //         "petname": "Joshua",
    //         "species": "Snake",
    //         "breed": "Beagle",
    //         "birthdate": "2014-04-03T20:12:47.194Z",
    //         "weight": "34",
    //         "comments": "This is pet 10",
    //         "insurance_membership": false,
    //         "insurance_expiry": "2023-10-09",
    //         "update_date": "2022-10-10T03:28:53.159Z",
    //         "updated_by": "User 10",
    //         "archived": false
    //     },
    //     {
    //         "id": "371",
    //         "pet_owner_id": 2,
    //         "petname": "Charlie",
    //         "species": "Dog",
    //         "breed": "French Bulldog",
    //         "birthdate": "2013-10-07T19:54:39.746Z",
    //         "weight": "48",
    //         "comments": "This is pet 11",
    //         "insurance_membership": true,
    //         "insurance_expiry": "2020-05-04",
    //         "update_date": "2019-05-04T22:12:35.406Z",
    //         "updated_by": "User 11",
    //         "archived": true
    //     },
    //     {
    //         "id": "1128",
    //         "pet_owner_id": 3,
    //         "petname": "Joshua",
    //         "species": "Dog",
    //         "breed": "Dachshund",
    //         "birthdate": "2010-11-05T20:38:21.663Z",
    //         "weight": "36",
    //         "comments": "This is pet 12",
    //         "insurance_membership": true,
    //         "insurance_expiry": "2023-03-14",
    //         "update_date": "2022-03-15T11:35:22.335Z",
    //         "updated_by": "User 12",
    //         "archived": true
    //     },
    //     {
    //         "id": "552",
    //         "pet_owner_id": 9,
    //         "petname": "Joshua",
    //         "species": "Cat",
    //         "breed": "Bulldog",
    //         "birthdate": "2018-02-22T07:20:30.983Z",
    //         "weight": "17",
    //         "comments": "This is pet 13",
    //         "insurance_membership": true,
    //         "insurance_expiry": null,
    //         "update_date": "2021-10-23T12:53:41.081Z",
    //         "updated_by": "User 13",
    //         "archived": true
    //     },
    //     {
    //         "id": "1021",
    //         "pet_owner_id": 8,
    //         "petname": "Ruby",
    //         "species": "Giraffe",
    //         "breed": "Poodle",
    //         "birthdate": "2020-08-22T13:14:57.430Z",
    //         "weight": "30",
    //         "comments": "This is pet 14",
    //         "insurance_membership": true,
    //         "insurance_expiry": null,
    //         "update_date": "2021-05-14T21:26:36.766Z",
    //         "updated_by": "User 14",
    //         "archived": true
    //     },
    //     {
    //         "id": "1589",
    //         "pet_owner_id": 2,
    //         "petname": "Charlie",
    //         "species": "Giraffe",
    //         "breed": "Golden Retriever",
    //         "birthdate": "2021-09-21T21:34:06.870Z",
    //         "weight": "44",
    //         "comments": "This is pet 15",
    //         "insurance_membership": true,
    //         "insurance_expiry": null,
    //         "update_date": "2021-10-04T06:00:28.327Z",
    //         "updated_by": "User 15",
    //         "archived": true
    //     },
    //     {
    //         "id": "3013",
    //         "pet_owner_id": 2,
    //         "petname": "Ruby",
    //         "species": "Dog",
    //         "breed": "Dachshund",
    //         "birthdate": "2020-07-22T03:38:13.513Z",
    //         "weight": "34",
    //         "comments": "This is pet 16",
    //         "insurance_membership": true,
    //         "insurance_expiry": "2024-07-23",
    //         "update_date": "2023-07-23T22:46:51.845Z",
    //         "updated_by": "User 16",
    //         "archived": false
    //     },
    //     {
    //         "id": "1054",
    //         "pet_owner_id": 2,
    //         "petname": "Ruby",
    //         "species": "Dog",
    //         "breed": "Poodle",
    //         "birthdate": "2015-01-07T15:31:58.364Z",
    //         "weight": "4",
    //         "comments": "This is pet 17",
    //         "insurance_membership": true,
    //         "insurance_expiry": "2019-03-04",
    //         "update_date": "2018-03-05T08:37:24.551Z",
    //         "updated_by": "User 17",
    //         "archived": true
    //     },
    //     {
    //         "id": "113",
    //         "pet_owner_id": 8,
    //         "petname": "Coco",
    //         "species": "Cat",
    //         "breed": "Ragdoll Cat",
    //         "birthdate": "2021-09-20T01:16:19.158Z",
    //         "weight": "41",
    //         "comments": "This is pet 18",
    //         "insurance_membership": false,
    //         "insurance_expiry": "2022-12-29",
    //         "update_date": "2021-12-30T09:40:36.577Z",
    //         "updated_by": "User 18",
    //         "archived": true
    //     },
    //     {
    //         "id": "2226",
    //         "pet_owner_id": 5,
    //         "petname": "Parky",
    //         "species": "Dog",
    //         "breed": "Ragdoll Cat",
    //         "birthdate": "2023-05-11T19:09:18.038Z",
    //         "weight": "44",
    //         "comments": "This is pet 19",
    //         "insurance_membership": true,
    //         "insurance_expiry": "2024-08-01",
    //         "update_date": "2023-08-02T00:26:57.109Z",
    //         "updated_by": "User 19",
    //         "archived": false
    //     },
    //     {
    //         "id": "1503",
    //         "pet_owner_id": 1,
    //         "petname": "Joshua",
    //         "species": "Racoon",
    //         "breed": "German Shepherd",
    //         "birthdate": "2015-03-18T02:13:31.178Z",
    //         "weight": "43",
    //         "comments": "This is pet 20",
    //         "insurance_membership": false,
    //         "insurance_expiry": null,
    //         "update_date": "2018-05-29T21:07:56.273Z",
    //         "updated_by": "User 20",
    //         "archived": true
    //     },
    //     {
    //         "id": "1262",
    //         "pet_owner_id": 8,
    //         "petname": "Coco",
    //         "species": "Racoon",
    //         "breed": "Beagle",
    //         "birthdate": "2023-03-14T08:38:38.217Z",
    //         "weight": "1",
    //         "comments": "This is pet 21",
    //         "insurance_membership": false,
    //         "insurance_expiry": "2024-07-10",
    //         "update_date": "2023-07-11T09:29:07.717Z",
    //         "updated_by": "User 21",
    //         "archived": true
    //     },
    //     {
    //         "id": "1825",
    //         "pet_owner_id": 9,
    //         "petname": "Ruby",
    //         "species": "Dog",
    //         "breed": "Poodle",
    //         "birthdate": "2014-02-13T03:31:58.834Z",
    //         "weight": "21",
    //         "comments": "This is pet 22",
    //         "insurance_membership": true,
    //         "insurance_expiry": "2017-03-18",
    //         "update_date": "2016-03-19T02:19:07.529Z",
    //         "updated_by": "User 22",
    //         "archived": false
    //     },
    //     {
    //         "id": "1660",
    //         "pet_owner_id": 3,
    //         "petname": "Charlie",
    //         "species": "Giraffe",
    //         "breed": "Ragdoll Cat",
    //         "birthdate": "2020-12-13T16:05:28.519Z",
    //         "weight": "35",
    //         "comments": "This is pet 23",
    //         "insurance_membership": true,
    //         "insurance_expiry": "2023-12-04",
    //         "update_date": "2022-12-04T17:37:04.504Z",
    //         "updated_by": "User 23",
    //         "archived": true
    //     },
    //     {
    //         "id": "806",
    //         "pet_owner_id": 4,
    //         "petname": "Joshua",
    //         "species": "Racoon",
    //         "breed": "Wienerdog",
    //         "birthdate": "2013-06-06T21:35:37.953Z",
    //         "weight": "17",
    //         "comments": "This is pet 24",
    //         "insurance_membership": true,
    //         "insurance_expiry": null,
    //         "update_date": "2015-07-17T13:13:30.519Z",
    //         "updated_by": "User 24",
    //         "archived": false
    //     },
    //     {
    //         "id": "358",
    //         "pet_owner_id": 1,
    //         "petname": "Ruby",
    //         "species": "Racoon",
    //         "breed": "Bulldog",
    //         "birthdate": "2017-07-28T06:16:27.639Z",
    //         "weight": "39",
    //         "comments": "This is pet 25",
    //         "insurance_membership": true,
    //         "insurance_expiry": null,
    //         "update_date": "2023-04-19T19:05:40.279Z",
    //         "updated_by": "User 25",
    //         "archived": true
    //     },
    //     {
    //         "id": "1131",
    //         "pet_owner_id": 4,
    //         "petname": "Parky",
    //         "species": "Snake",
    //         "breed": "Persian Cat",
    //         "birthdate": "2021-01-31T21:46:16.866Z",
    //         "weight": "31",
    //         "comments": "This is pet 26",
    //         "insurance_membership": true,
    //         "insurance_expiry": "2024-06-17",
    //         "update_date": "2023-06-18T06:00:18.233Z",
    //         "updated_by": "User 26",
    //         "archived": true
    //     },
    //     {
    //         "id": "1399",
    //         "pet_owner_id": 3,
    //         "petname": "Joshua",
    //         "species": "Cat",
    //         "breed": "Dachshund",
    //         "birthdate": "2019-05-10T23:38:45.007Z",
    //         "weight": "34",
    //         "comments": "This is pet 27",
    //         "insurance_membership": true,
    //         "insurance_expiry": null,
    //         "update_date": "2022-12-15T11:21:50.032Z",
    //         "updated_by": "User 27",
    //         "archived": false
    //     },
    //     {
    //         "id": "927",
    //         "pet_owner_id": 6,
    //         "petname": "Coco",
    //         "species": "Dog",
    //         "breed": "Beagle",
    //         "birthdate": "2018-11-10T05:47:06.827Z",
    //         "weight": "40",
    //         "comments": "This is pet 28",
    //         "insurance_membership": true,
    //         "insurance_expiry": "2023-11-05",
    //         "update_date": "2022-11-06T11:45:06.813Z",
    //         "updated_by": "User 28",
    //         "archived": true
    //     },
    //     {
    //         "id": "2645",
    //         "pet_owner_id": 3,
    //         "petname": "Charlie",
    //         "species": "Giraffe",
    //         "breed": "Wienerdog",
    //         "birthdate": "2021-11-07T07:43:13.904Z",
    //         "weight": "9",
    //         "comments": "This is pet 29",
    //         "insurance_membership": false,
    //         "insurance_expiry": "2023-06-07",
    //         "update_date": "2022-06-07T22:36:02.595Z",
    //         "updated_by": "User 29",
    //         "archived": true
    //     },
    //     {
    //         "id": "2327",
    //         "pet_owner_id": 8,
    //         "petname": "Ruby",
    //         "species": "Cat",
    //         "breed": "Labrador Retriever",
    //         "birthdate": "2022-12-30T23:31:02.393Z",
    //         "weight": "28",
    //         "comments": "This is pet 30",
    //         "insurance_membership": false,
    //         "insurance_expiry": null,
    //         "update_date": "2023-03-23T11:45:25.934Z",
    //         "updated_by": "User 30",
    //         "archived": false
    //     },
    //     {
    //         "id": "1056",
    //         "pet_owner_id": 2,
    //         "petname": "Coco",
    //         "species": "Dog",
    //         "breed": "Poodle",
    //         "birthdate": "2014-03-25T05:30:54.859Z",
    //         "weight": "19",
    //         "comments": "This is pet 31",
    //         "insurance_membership": true,
    //         "insurance_expiry": null,
    //         "update_date": "2018-03-14T23:52:54.261Z",
    //         "updated_by": "User 31",
    //         "archived": false
    //     },
    //     {
    //         "id": "497",
    //         "pet_owner_id": 4,
    //         "petname": "Joshua",
    //         "species": "Cat",
    //         "breed": "Dachshund",
    //         "birthdate": "2021-02-25T04:16:36.040Z",
    //         "weight": "19",
    //         "comments": "This is pet 32",
    //         "insurance_membership": false,
    //         "insurance_expiry": "2023-04-14",
    //         "update_date": "2022-04-15T13:03:51.162Z",
    //         "updated_by": "User 32",
    //         "archived": true
    //     },
    //     {
    //         "id": "2241",
    //         "pet_owner_id": 2,
    //         "petname": "Ruby",
    //         "species": "Giraffe",
    //         "breed": "Ragdoll Cat",
    //         "birthdate": "2012-01-31T02:50:03.982Z",
    //         "weight": "43",
    //         "comments": "This is pet 33",
    //         "insurance_membership": true,
    //         "insurance_expiry": "2020-08-25",
    //         "update_date": "2019-08-26T11:58:22.760Z",
    //         "updated_by": "User 33",
    //         "archived": false
    //     },
    //     {
    //         "id": "1488",
    //         "pet_owner_id": 2,
    //         "petname": "Charlie",
    //         "species": "Dog",
    //         "breed": "Siamese Cat",
    //         "birthdate": "2016-08-03T02:12:21.387Z",
    //         "weight": "36",
    //         "comments": "This is pet 34",
    //         "insurance_membership": false,
    //         "insurance_expiry": null,
    //         "update_date": "2020-05-29T12:12:02.474Z",
    //         "updated_by": "User 34",
    //         "archived": true
    //     },
    //     {
    //         "id": "2688",
    //         "pet_owner_id": 7,
    //         "petname": "Coco",
    //         "species": "Giraffe",
    //         "breed": "Poodle",
    //         "birthdate": "2015-05-04T00:12:13.458Z",
    //         "weight": "32",
    //         "comments": "This is pet 35",
    //         "insurance_membership": false,
    //         "insurance_expiry": "2020-04-04",
    //         "update_date": "2019-04-05T10:00:28.436Z",
    //         "updated_by": "User 35",
    //         "archived": true
    //     }
    // ];

    return (
        <PetsContext.Provider value={petList}>
            {children}
        </PetsContext.Provider>
    );
};