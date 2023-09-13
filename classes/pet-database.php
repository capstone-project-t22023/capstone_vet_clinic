<?php
/**
 * Database class where API call queries to be executed for pet information
 */
class PetDatabase
{
    /**
     * 
     * Declare variables to be used for every database transaction
     * User must be defined in the database for this to work
     * 
     */
    private $server = 'localhost';
    private $db_uname = 'pawsome_admin';
    private $db_pwd = 'pawsome_admin2023';
    private $db_name = 'pawsome';
    private $connection = null;

    /**
     * Retrieves all records of vaccines
     */
    public function getAllVaccines()
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT item_name as vaccine 
            FROM inventory_items 
            WHERE item_name LIKE "%vaccine"
            AND inventory_item_category_id = 2'
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $vaccines = array();
            while($row=$result->fetch_assoc()){
                array_push($vaccines, $row['vaccine']);
            }
            $sql->close();
            $this->connection->close();
            return $vaccines;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }
    

    /**
     * Retrieves all records of pets
     */
    public function getAllPets()
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT
            p.pet_owner_id,
            po.firstname,
            po.lastname,
            po.username,
            p.id pet_id,
            p.petname,
            p.species,
            p.breed,
            p.birthdate,
            ROUND(p.weight,2) weight,
            p.sex,
            p.microchip_no,
            p.insurance_membership,
            p.insurance_expiry,
            p.comments
            FROM
            pets p,
            pet_owners po
            WHERE
            p.pet_owner_id = po.id
            AND p.archived = 0
            ORDER BY
            p.pet_owner_id'
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $pets = array();
            while($row=$result->fetch_assoc()){
                array_push($pets, $row);
            }
            $sql->close();
            $this->connection->close();
            return $pets;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Retrieves all records of pets
     */
    public function getAllPetsByFname($filter_value)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT
            p.pet_owner_id,
            po.firstname,
            po.lastname,
            po.username,
            p.id pet_id,
            p.petname,
            p.species,
            p.breed,
            p.birthdate,
            ROUND(p.weight,2) weight,
            p.sex,
            p.microchip_no,
            p.insurance_membership,
            p.insurance_expiry,
            p.comments
            FROM
            pets p,
            pet_owners po
            WHERE
            p.pet_owner_id = po.id
            AND p.archived = 0 
            AND UPPER(po.firstname) LIKE ?
            ORDER BY
            p.pet_owner_id'
        );
        $q = '%' . $filter_value . '%';
        $sql->bind_param(
            's', $q
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $pets = array();
            while($row=$result->fetch_assoc()){
                array_push($pets, $row);
            }
            $sql->close();
            $this->connection->close();
            return $pets;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Retrieves all records of pets
     */
    public function getAllPetsByLname($filter_value)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT
            p.pet_owner_id,
            po.firstname,
            po.lastname,
            po.username,
            p.id pet_id,
            p.petname,
            p.species,
            p.breed,
            p.birthdate,
            ROUND(p.weight,2) weight,
            p.sex,
            p.microchip_no,
            p.insurance_membership,
            p.insurance_expiry,
            p.comments
            FROM
            pets p,
            pet_owners po
            WHERE
            p.pet_owner_id = po.id
            AND p.archived = 0
            AND UPPER(po.lastname) LIKE ?
            ORDER BY
            p.pet_owner_id'
        );
        $q = '%' . $filter_value . '%';
        $sql->bind_param(
            's', $q
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $pets = array();
            while($row=$result->fetch_assoc()){
                array_push($pets, $row);
            }
            $sql->close();
            $this->connection->close();
            return $pets;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Retrieves all records of pets
     */
    public function getAllPetsByPetOwnerId($filter_value)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT
            p.pet_owner_id,
            po.firstname,
            po.lastname,
            po.username,
            p.id pet_id,
            p.petname,
            p.species,
            p.breed,
            p.birthdate,
            ROUND(p.weight,2) weight,
            p.sex,
            p.microchip_no,
            p.insurance_membership,
            p.insurance_expiry,
            p.comments
            FROM
            pets p,
            pet_owners po
            WHERE
            p.pet_owner_id = po.id
            AND p.archived = 0
            AND p.pet_owner_id = ?
            ORDER BY
            p.pet_owner_id'
        );
        $sql->bind_param(
            'i', $filter_value
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $pets = array();
            while($row=$result->fetch_assoc()){
                array_push($pets, $row);
            }
            $sql->close();
            $this->connection->close();
            return $pets;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Retrieves all records of pets
     */
    public function getAllPetsByPetname($filter_value)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT
            p.pet_owner_id,
            po.firstname,
            po.lastname,
            po.username,
            p.id pet_id,
            p.petname,
            p.species,
            p.breed,
            p.birthdate,
            ROUND(p.weight,2) weight,
            p.sex,
            p.microchip_no,
            p.insurance_membership,
            p.insurance_expiry,
            p.comments
            FROM
            pets p,
            pet_owners po
            WHERE
            p.pet_owner_id = po.id
            AND p.archived = 0
            AND UPPER(p.petname) LIKE ?
            ORDER BY
            p.pet_owner_id'
        );
        $q = '%' . $filter_value . '%';
        $sql->bind_param(
            's', $q
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $pets = array();
            while($row=$result->fetch_assoc()){
                array_push($pets, $row);
            }
            $sql->close();
            $this->connection->close();
            return $pets;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Add pet information
     */
    public function addPet($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'INSERT INTO `pets` 
            (
                `pet_owner_id`,
                `petname`,
                `species`,
                `breed`,
                `birthdate`,
                `weight`,
                `sex`,
                `microchip_no`,
                `insurance_membership`,
                `insurance_expiry`,
                `comments`,
                `updated_date`,
                `updated_by`,
                `archived`
            )
            VALUES
            ((SELECT id FROM pet_owners WHERE id = ?),
            ?,?,?,
            STR_TO_DATE(?, "%d-%m-%Y"),
            ?,?,?,?,
            STR_TO_DATE(?, "%d-%m-%Y"),
            ?,SYSDATE(),
            (
                WITH
                all_users AS 
                (
                    SELECT * FROM doctors
                    UNION
                    SELECT * FROM admins
                    UNION 
                    SELECT * FROM pet_owners
                )
                SELECT id from all_users 
                WHERE UPPER(username) = UPPER(?)
                AND archived = 0
            )
            ,0)'
        ); 
        $sql->bind_param(
            'issssdssssss', 
            $record['pet_owner_id'],
            $record['petname'],
            $record['species'],
            $record['breed'],
            $record['birthdate'],
            $record['weight'],
            $record['sex'],
            $record['microchip_no'],
            $record['insurance_membership'],
            $record['insurance_expiry'],
            $record['comments'],
            $record['username']
        );
        if ($sql->execute()) {
            $id = $this->connection->insert_id;
            $sql->close();
            $this->connection->close();
            return $id;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Update pet information
     */
    public function updatePet($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'UPDATE `pets` 
            SET 
            petname=?, 
            species=?, 
            breed=?, 
            birthdate=STR_TO_DATE(?, "%d-%m-%Y"),
            weight=?,
            sex=?,
            microchip_no=?,
            insurance_membership=?,
            insurance_expiry=STR_TO_DATE(?, "%d-%m-%Y"),
            comments=?,
            updated_date=SYSDATE(),
            updated_by=(
                WITH
                all_users AS 
                (
                    SELECT * FROM doctors
                    UNION
                    SELECT * FROM admins
                    UNION 
                    SELECT * FROM pet_owners
                )
                SELECT id from all_users 
                WHERE UPPER(username) = UPPER(?)
                AND archived = 0
            )
            WHERE
            id =?'
        ); 
        $sql->bind_param(
            'ssssdssssssi', 
            $record['petname'],
            $record['species'],
            $record['breed'],
            $record['birthdate'],
            $record['weight'],
            $record['sex'],
            $record['microchip_no'],
            $record['insurance_membership'],
            $record['insurance_expiry'],
            $record['comments'],
            $record['username'],
            $record['id']
        );
        if ($sql->execute()) {
            $sql->close();
            $this->connection->close();
            return true;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Archive pet
     */
    public function archivePet($pet_record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'UPDATE `pawsome`.`pets`
            SET 
            archived = 1,
            updated_date = SYSDATE(),
            updated_by = (
                WITH
                all_users AS 
                (
                    SELECT * FROM doctors
                    UNION
                    SELECT * FROM admins
                    UNION 
                    SELECT * FROM pet_owners
                )
                SELECT id from all_users 
                WHERE UPPER(username) = UPPER(?)
                AND archived = 0
            )
            WHERE id = ?'
        );
        $sql->bind_param(
            'si',
            $pet_record['username'],
            $pet_record['pet_id']
        );
        if ($sql->execute()) {
            $sql->close();
            $this->connection->close();
            return true;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Delete pet
     */
    public function deletePet($pet_record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'DELETE FROM `pawsome`.`pets`
            WHERE id = ?'
        );
        $sql->bind_param(
            'i',
            $pet_record['pet_id']
        );
        if ($sql->execute()) {
            $sql->close();
            $this->connection->close();
            return true;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Get pet information
     */
    public function getPet($id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT * FROM `pets` 
            WHERE
            id =?'
        ); 
        $sql->bind_param(
            'i', $id
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $pet_record = $result->fetch_assoc();
            $sql->close();
            $this->connection->close();
            return $pet_record;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Add pet immunisation
     */
    public function addPetVaccine($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'INSERT INTO `pawsome`.`pet_immun_records`
            (`pet_id`,
            `doctor_id`,
            `booking_id`,
            `vaccine_date`,
            `vaccine`,
            `comments`,
            `updated_date`,
            `updated_by`,
            `archived`)
            VALUES
            (
            (SELECT id FROM pets WHERE id = ?),
            (SELECT id FROM doctors WHERE id = ?),
            (SELECT id FROM bookings WHERE id = ?),
            STR_TO_DATE(?, "%d-%m-%Y"),
            ?,
            ?,
            SYSDATE(),
            (
                WITH
                all_users AS 
                (
                    SELECT * FROM doctors
                    UNION
                    SELECT * FROM admins
                    UNION 
                    SELECT * FROM pet_owners
                )
                SELECT id from all_users 
                WHERE UPPER(username) = UPPER(?)
                AND archived = 0
            ),
            0)'
        ); 
        $sql->bind_param(
            'iiissss', 
            $record['pet_id'],
            $record['doctor_id'],
            $record['booking_id'],
            $record['vaccine_date'],
            $record['vaccine'],
            $record['comments'],
            $record['username']
        );
        if ($sql->execute()) {
            $sql->close();
            $this->connection->close();
            return true;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Update pet immunisation
     */
    public function updatePetVaccine($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'UPDATE `pawsome`.`pet_immun_records`
            SET
            `pet_id`=(SELECT id FROM pets WHERE id = ?),
            `doctor_id`=(SELECT id FROM doctors WHERE id = ?),
            `booking_id`=(SELECT id FROM bookings WHERE id = ?),
            `vaccine_date`=STR_TO_DATE(?, "%d-%m-%Y"),
            `vaccine`=?,
            `comments`=?,
            `updated_date`=SYSDATE(),
            `updated_by`=(
                WITH
                all_users AS 
                (
                    SELECT * FROM doctors
                    UNION
                    SELECT * FROM admins
                    UNION 
                    SELECT * FROM pet_owners
                )
                SELECT id from all_users 
                WHERE UPPER(username) = UPPER(?)
                AND archived = 0
            )
            WHERE id = ?'
        ); 
        $sql->bind_param(
            'iiissssi', 
            $record['pet_id'],
            $record['doctor_id'],
            $record['booking_id'],
            $record['vaccine_date'],
            $record['vaccine'],
            $record['comments'],
            $record['username'],
            $record['id']
        );
        if ($sql->execute()) {
            $sql->close();
            $this->connection->close();
            return true;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Archive pet immunisation
     */
    public function archivePetVaccine($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'UPDATE `pawsome`.`pet_immun_records`
            SET
            `updated_date`=SYSDATE(),
            `updated_by`=(
                WITH
                all_users AS 
                (
                    SELECT * FROM doctors
                    UNION
                    SELECT * FROM admins
                    UNION 
                    SELECT * FROM pet_owners
                )
                SELECT id from all_users 
                WHERE UPPER(username) = UPPER(?)
                AND archived = 0
            ),
            archived=1
            WHERE id = ?'
        ); 
        $sql->bind_param(
            'si', 
            $record['username'],
            $record['id']
        );
        if ($sql->execute()) {
            $sql->close();
            $this->connection->close();
            return true;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Delete pet immunisation
     */
    public function deletePetVaccine($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'DELETE FROM `pawsome`.`pet_immun_records`
            WHERE id = ?'
        ); 
        $sql->bind_param(
            'i', 
            $record['id']
        );
        if ($sql->execute()) {
            $sql->close();
            $this->connection->close();
            return true;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Retrieves all immunisation by pet
     */
    public function getPetVaccineByPetId($id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT pir.`id` record_id,
                pir.`pet_id`,
                pir.`doctor_id`,
                pir.`booking_id`,
                CONCAT(d.firstname, " ", d.lastname) veterinarian,
                pir.`vaccine_date`,
                pir.`vaccine`,
                pir.`comments`
            FROM 
            `pawsome`.`pet_immun_records` pir,
            `pawsome`.`doctors` d,
            `pawsome`.`bookings` b,
            `pawsome`.`pets` p
            WHERE pir.`pet_id` = ?
            AND pir.doctor_id = d.id
            AND pir.booking_id = b.id
            AND pir.pet_id = p.id
            ORDER BY pir.`id`'
        );
        $sql->bind_param(
            'i', $id
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $pets_records = array();
            while($row=$result->fetch_assoc()){
                array_push($pets_records, $row);
            }
            $sql->close();
            $this->connection->close();
            return $pets_records;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Add prescription
     */
    public function addPrescription($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'INSERT INTO `pawsome`.`prescriptions`
                (`pet_id`,
                `doctor_id`,
                `booking_id`,
                `prescription_date`,
                `updated_date`,
                `updated_by`,
                `archived`)
                VALUES
                (
                (SELECT id FROM pets WHERE id = ?),
                (SELECT id FROM doctors WHERE id = ?),
                (SELECT id FROM bookings WHERE id = ?),
                STR_TO_DATE(?, "%d-%m-%Y"),
                SYSDATE(),
                (
                    WITH
                    all_users AS 
                    (
                        SELECT * FROM doctors
                        UNION
                        SELECT * FROM admins
                        UNION 
                        SELECT * FROM pet_owners
                    )
                    SELECT id from all_users 
                    WHERE UPPER(username) = UPPER(?)
                    AND archived = 0
                ),
                0)'
        ); 
        $sql->bind_param(
            'iiiss', 
            $record['pet_id'],
            $record['doctor_id'],
            $record['booking_id'],
            $record['prescription_date'],
            $record['username']
        );
        if ($sql->execute()) {
            $id = $this->connection->insert_id;
            $sql->close();
            $this->connection->close();
            return $id;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Update prescription
     */
    public function updatePrescription($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'UPDATE `pawsome`.`prescriptions`
            SET
            `pet_id` = (SELECT id FROM pets WHERE id = ?),
            `doctor_id` = (SELECT id FROM doctors WHERE id = ?),
            `booking_id` = (SELECT id FROM bookings WHERE id = ?),
            `prescription_date` = STR_TO_DATE(?, "%d-%m-%Y"),
            `updated_date` = SYSDATE(),
            `updated_by` = (
                    WITH
                    all_users AS 
                    (
                        SELECT * FROM doctors
                        UNION
                        SELECT * FROM admins
                        UNION 
                        SELECT * FROM pet_owners
                    )
                    SELECT id from all_users 
                    WHERE UPPER(username) = UPPER(?)
                    AND archived = 0
                )
            WHERE `id` = ?'
        ); 
        $sql->bind_param(
            'iiissi', 
            $record['pet_id'],
            $record['doctor_id'],
            $record['booking_id'],
            $record['prescription_date'],
            $record['username'],
            $record['id']
        );
        if ($sql->execute()) {
            $sql->close();
            $this->connection->close();
            return true;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Archive prescription
     */
    public function archivePrescription($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'UPDATE `pawsome`.`prescriptions`
            SET
            `updated_date`=SYSDATE(),
            `updated_by`=(
                WITH
                all_users AS 
                (
                    SELECT * FROM doctors
                    UNION
                    SELECT * FROM admins
                    UNION 
                    SELECT * FROM pet_owners
                )
                SELECT id from all_users 
                WHERE UPPER(username) = UPPER(?)
                AND archived = 0
            ),
            archived=1
            WHERE id = ?'
        ); 
        $sql->bind_param(
            'si', 
            $record['username'],
            $record['id']
        );
        if ($sql->execute()) {
            $sql->close();
            $this->connection->close();
            return true;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Delete prescription
     */
    public function deletePrescription($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'DELETE FROM `pawsome`.`prescriptions`
            WHERE id = ?'
        ); 
        $sql->bind_param(
            'i', 
            $record['id']
        );
        if ($sql->execute()) {
            $sql->close();
            $this->connection->close();
            return true;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Add diet record
     */
    public function addDietRecord($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'INSERT INTO `pawsome`.`pet_diet_records`
            (`prescription_id`,
            `product`,
            `serving_portion`,
            `morning`,
            `evening`,
            `comments`,
            `updated_date`,
            `updated_by`,
            `archived`)
            VALUES
            (
            (SELECT id FROM prescriptions WHERE id = ?),
            ?,?,?,?,?,
            SYSDATE(),
            (
                    WITH
                    all_users AS 
                    (
                        SELECT * FROM doctors
                        UNION
                        SELECT * FROM admins
                        UNION 
                        SELECT * FROM pet_owners
                    )
                    SELECT id from all_users 
                    WHERE UPPER(username) = UPPER(?)
                    AND archived = 0
                ),
            0)'
        ); 
        $sql->bind_param(
            'issssss', 
            $record['prescription_id'],
            $record['product'],
            $record['serving_portion'],
            $record['morning'],
            $record['evening'],
            $record['comments'],
            $record['username']
        );
        if ($sql->execute()) {
            $sql->close();
            $this->connection->close();
            return true;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Update diet record
     */
    public function updateDietRecord($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'UPDATE `pawsome`.`pet_diet_records`
            SET
            `product` = ?,
            `serving_portion` = ?,
            `morning` = ?,
            `evening` = ?,
            `comments` = ?,
            `updated_date` = SYSDATE(),
            `updated_by` = (
                    WITH
                    all_users AS 
                    (
                        SELECT * FROM doctors
                        UNION
                        SELECT * FROM admins
                        UNION 
                        SELECT * FROM pet_owners
                    )
                    SELECT id from all_users 
                    WHERE UPPER(username) = UPPER(?)
                    AND archived = 0
                )
            WHERE `id` = ?'
        ); 
        $sql->bind_param(
            'ssssssi', 
            $record['product'],
            $record['serving_portion'],
            $record['morning'],
            $record['evening'],
            $record['comments'],
            $record['username'],
            $record['id']
        );
        if ($sql->execute()) {
            $sql->close();
            $this->connection->close();
            return true;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Archive diet record
     */
    public function archiveDietRecord($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'UPDATE `pawsome`.`pet_diet_records`
            SET
            `updated_date`=SYSDATE(),
            `updated_by`=(
                WITH
                all_users AS 
                (
                    SELECT * FROM doctors
                    UNION
                    SELECT * FROM admins
                    UNION 
                    SELECT * FROM pet_owners
                )
                SELECT id from all_users 
                WHERE UPPER(username) = UPPER(?)
                AND archived = 0
            ),
            archived=1
            WHERE id = ?'
        ); 
        $sql->bind_param(
            'si', 
            $record['username'],
            $record['id']
        );
        if ($sql->execute()) {
            $sql->close();
            $this->connection->close();
            return true;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Delete diet record
     */
    public function deleteDietRecord($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'DELETE FROM `pawsome`.`pet_diet_records`
            WHERE id = ?'
        ); 
        $sql->bind_param(
            'i', 
            $record['id']
        );
        if ($sql->execute()) {
            $sql->close();
            $this->connection->close();
            return true;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Retrieves all diet records by pet
     */
    public function getDietRecordIdsByPrescriptionId($prescription_id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT `pet_diet_records`.`id`
            FROM `pawsome`.`pet_diet_records`
            WHERE `prescription_id` = ?'
        );
        $sql->bind_param(
            'i', $prescription_id
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $diet_records = array();
            while($row=$result->fetch_assoc()){
                array_push($diet_records, $row['id']);
            }
            $sql->close();
            $this->connection->close();
            return $diet_records;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Retrieves all diet records by pet
     */
    public function getDietRecordsByPrescriptionId($prescription_id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT 
            `pet_diet_records`.`product`,
            `pet_diet_records`.`serving_portion`,
            `pet_diet_records`.`morning`,
            `pet_diet_records`.`evening`,
            `pet_diet_records`.`comments`
            FROM `pawsome`.`pet_diet_records`
            WHERE `prescription_id` = ?'
        );
        $sql->bind_param(
            'i', $prescription_id
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $diet_records = array();
            while($row=$result->fetch_assoc()){
                array_push($diet_records, $row);
            }
            $sql->close();
            $this->connection->close();
            return $diet_records;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Retrieves all prescription by id
     */
    public function getPrescriptionById($prescription_id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT pr.`pet_id`,
                pr.`doctor_id`,
                pr.`booking_id`,
                CONCAT(d.firstname, " ", d.lastname) veterinarian,
                pr.`prescription_date`
            FROM 
            `pawsome`.`prescriptions` pr,
            `pawsome`.`doctors` d,
            `pawsome`.`bookings` b,
            `pawsome`.`pets` p
            WHERE
            pr.id = ?
            AND pr.doctor_id = d.id
            AND pr.booking_id = b.id
            AND pr.pet_id = p.id'
        );
        $sql->bind_param(
            'i', $prescription_id
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $prescriptions = $result->fetch_assoc();
            $sql->close();
            $this->connection->close();
            return $prescriptions;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Retrieves all prescription by pet id
     */
    public function getAllPrescriptionByPetId($pet_id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT pr.`id`,
                pr.`pet_id`,
                pr.`doctor_id`,
                pr.`booking_id`,
                CONCAT(d.firstname, " ", d.lastname) veterinarian,
                pr.`prescription_date`,
                pr.archived
            FROM 
            `pawsome`.`prescriptions` pr,
            `pawsome`.`doctors` d,
            `pawsome`.`bookings` b,
            `pawsome`.`pets` p
            WHERE
            pr.pet_id = ?
            AND pr.booking_id = b.id
            AND pr.doctor_id = d.id
            AND pr.pet_id = p.id
            ORDER BY pr.`prescription_date` DESC'
        );
        $sql->bind_param(
            'i', $pet_id
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $prescriptions = array();
            while($row=$result->fetch_assoc()){
                array_push($prescriptions, $row);
            }
            $sql->close();
            $this->connection->close();
            return $prescriptions;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Add referral
     */
    public function addReferral($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'INSERT INTO `pawsome`.`referrals`
                (`pet_id`,
                `doctor_id`,
                `booking_id`,
                `referral_date`,
                `diagnosis`,
                `updated_date`,
                `updated_by`,
                `archived`)
                VALUES
                (
                (SELECT id FROM pets WHERE id = ?),
                (SELECT id FROM doctors WHERE id = ?),
                (SELECT id FROM bookings WHERE id = ?),
                STR_TO_DATE(?, "%d-%m-%Y"), ?,
                SYSDATE(),
                (
                    WITH
                    all_users AS 
                    (
                        SELECT * FROM doctors
                        UNION
                        SELECT * FROM admins
                        UNION 
                        SELECT * FROM pet_owners
                    )
                    SELECT id from all_users 
                    WHERE UPPER(username) = UPPER(?)
                    AND archived = 0
                ),
                0)'
        ); 
        $sql->bind_param(
            'iiisss', 
            $record['pet_id'],
            $record['doctor_id'],
            $record['booking_id'],
            $record['referral_date'],
            $record['diagnosis'],
            $record['username']
        );
        if ($sql->execute()) {
            $id = $this->connection->insert_id;
            $sql->close();
            $this->connection->close();
            return $id;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Update referral
     */
    public function updateReferral($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'UPDATE `pawsome`.`referrals`
            SET
            `pet_id` = (SELECT id FROM pets WHERE id = ?),
            `doctor_id` = (SELECT id FROM doctors WHERE id = ?),
            `booking_id` = (SELECT id FROM bookings WHERE id = ?),
            `referral_date` = STR_TO_DATE(?, "%d-%m-%Y"),
            `diagnosis` = ?,
            `updated_date` = SYSDATE(),
            `updated_by` = (
                    WITH
                    all_users AS 
                    (
                        SELECT * FROM doctors
                        UNION
                        SELECT * FROM admins
                        UNION 
                        SELECT * FROM pet_owners
                    )
                    SELECT id from all_users 
                    WHERE UPPER(username) = UPPER(?)
                    AND archived = 0
                )
            WHERE `id` = ?'
        ); 
        $sql->bind_param(
            'iiisssi', 
            $record['pet_id'],
            $record['doctor_id'],
            $record['booking_id'],
            $record['referral_date'],
            $record['diagnosis'],
            $record['username'],
            $record['id']
        );
        if ($sql->execute()) {
            $sql->close();
            $this->connection->close();
            return true;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Retrieves all rehab records by pet
     */
    public function getRehabRecordIdsByReferralId($referral_id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT `pet_rehab_records`.`id`
            FROM `pawsome`.`pet_rehab_records`
            WHERE `referral_id` = ?'
        );
        $sql->bind_param(
            'i', $referral_id
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $rehab_records = array();
            while($row=$result->fetch_assoc()){
                array_push($rehab_records, $row['id']);
            }
            $sql->close();
            $this->connection->close();
            return $rehab_records;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Retrieves all rehab records by pet
     */
    public function getRehabRecordsByReferralId($referral_id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT 
            `pet_rehab_records`.`treatment_date`,
            `pet_rehab_records`.`attended`,
            `pet_rehab_records`.`comments`,
            `pet_rehab_records`.`archived`
            FROM `pawsome`.`pet_rehab_records`
            WHERE `referral_id` = ?'
        );
        $sql->bind_param(
            'i', $referral_id
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $rehab_records = array();
            while($row=$result->fetch_assoc()){
                array_push($rehab_records, $row);
            }
            $sql->close();
            $this->connection->close();
            return $rehab_records;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Retrieves all referral by id
     */
    public function getReferralById($referral_id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT r.`pet_id`,
                r.`doctor_id`,
                r.`booking_id`,
                CONCAT(d.firstname, " ", d.lastname) veterinarian,
                r.`referral_date`,
                r.`diagnosis`,
                r.`archived`
            FROM 
            `pawsome`.`referrals` r,
            `pawsome`.`doctors` d,
            `pawsome`.`bookings` b,
            `pawsome`.`pets` p
            WHERE
            r.id = ?
            AND r.doctor_id = d.id
            AND r.booking_id = b.id
            AND r.pet_id = p.id'
        );
        $sql->bind_param(
            'i', $referral_id
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $referrals = $result->fetch_assoc();
            $sql->close();
            $this->connection->close();
            return $referrals;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Retrieves all referrals by pet id
     */
    public function getAllReferralsByPetId($pet_id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT r.`id`,
                r.`pet_id`,
                r.`doctor_id`,
                r.`booking_id`,
                CONCAT(d.firstname, " ", d.lastname) veterinarian,
                r.`referral_date`,
                r.`diagnosis`,
                r.archived
            FROM 
            `pawsome`.`referrals` r,
            `pawsome`.`doctors` d,
            `pawsome`.`bookings` b,
            `pawsome`.`pets` p
            WHERE
            r.pet_id = ?
            AND r.doctor_id = d.id
            AND r.booking_id = b.id
            AND r.pet_id = p.id
            ORDER BY r.`referral_date` DESC'
        );
        $sql->bind_param(
            'i', $pet_id
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $referrals = array();
            while($row=$result->fetch_assoc()){
                array_push($referrals, $row);
            }
            $sql->close();
            $this->connection->close();
            return $referrals;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Archive referral
     */
    public function archiveReferral($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'UPDATE `pawsome`.`referrals`
            SET
            `updated_date`=SYSDATE(),
            `updated_by`=(
                WITH
                all_users AS 
                (
                    SELECT * FROM doctors
                    UNION
                    SELECT * FROM admins
                    UNION 
                    SELECT * FROM pet_owners
                )
                SELECT id from all_users 
                WHERE UPPER(username) = UPPER(?)
                AND archived = 0
            ),
            archived=1
            WHERE id = ?'
        ); 
        $sql->bind_param(
            'si', 
            $record['username'],
            $record['id']
        );
        if ($sql->execute()) {
            $sql->close();
            $this->connection->close();
            return true;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Delete referral
     */
    public function deleteReferral($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'DELETE FROM `pawsome`.`referrals`
            WHERE id = ?'
        ); 
        $sql->bind_param(
            'i', 
            $record['id']
        );
        if ($sql->execute()) {
            $sql->close();
            $this->connection->close();
            return true;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Add rehab record
     */
    public function addRehabRecord($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'INSERT INTO `pawsome`.`pet_rehab_records`
            (`referral_id`,
            `treatment_date`,
            `attended`,
            `comments`,
            `updated_date`,
            `updated_by`,
            `archived`)
            VALUES
            (
            (SELECT id FROM referrals WHERE id = ?),
            STR_TO_DATE(?, "%d-%m-%Y"),?,?,
            SYSDATE(),
            (
                    WITH
                    all_users AS 
                    (
                        SELECT * FROM doctors
                        UNION
                        SELECT * FROM admins
                        UNION 
                        SELECT * FROM pet_owners
                    )
                    SELECT id from all_users 
                    WHERE UPPER(username) = UPPER(?)
                    AND archived = 0
                ),
            0)'
        ); 
        $sql->bind_param(
            'issss', 
            $record['referral_id'],
            $record['treatment_date'],
            $record['attended'],
            $record['comments'],
            $record['username']
        );
        if ($sql->execute()) {
            $sql->close();
            $this->connection->close();
            return true;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Update rehab record
     */
    public function updateRehabRecord($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'UPDATE `pawsome`.`pet_rehab_records`
            SET
            `treatment_date` = STR_TO_DATE(?, "%d-%m-%Y"),
            `attended` = ?,
            `comments` = ?,
            `updated_date` = SYSDATE(),
            `updated_by` = (
                    WITH
                    all_users AS 
                    (
                        SELECT * FROM doctors
                        UNION
                        SELECT * FROM admins
                        UNION 
                        SELECT * FROM pet_owners
                    )
                    SELECT id from all_users 
                    WHERE UPPER(username) = UPPER(?)
                    AND archived = 0
                )
            WHERE `id` = ?'
        ); 
        $sql->bind_param(
            'ssssi', 
            $record['treatment_date'],
            $record['attended'],
            $record['comments'],
            $record['username'],
            $record['id']
        );
        if ($sql->execute()) {
            $sql->close();
            $this->connection->close();
            return true;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Archive rehab record
     */
    public function archiveRehabRecord($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'UPDATE `pawsome`.`pet_rehab_records`
            SET
            `updated_date`=SYSDATE(),
            `updated_by`=(
                WITH
                all_users AS 
                (
                    SELECT * FROM doctors
                    UNION
                    SELECT * FROM admins
                    UNION 
                    SELECT * FROM pet_owners
                )
                SELECT id from all_users 
                WHERE UPPER(username) = UPPER(?)
                AND archived = 0
            ),
            archived=1
            WHERE id = ?'
        ); 
        $sql->bind_param(
            'si', 
            $record['username'],
            $record['id']
        );
        if ($sql->execute()) {
            $sql->close();
            $this->connection->close();
            return true;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Delete rehab record
     */
    public function deleteRehabRecord($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'DELETE FROM `pawsome`.`pet_rehab_records`
            WHERE id = ?'
        ); 
        $sql->bind_param(
            'i', 
            $record['id']
        );
        if ($sql->execute()) {
            $sql->close();
            $this->connection->close();
            return true;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Add surgery
     */
    public function addSurgery($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'INSERT INTO `pawsome`.`pet_surgery_records`
                (`pet_id`,
                `doctor_id`,
                `booking_id`,
                `surgery`,
                `surgery_date`,
                `discharge_date`,
                `comments`,
                `updated_date`,
                `updated_by`,
                `archived`)
                VALUES
                (
                (SELECT id FROM pets WHERE id = ?),
                (SELECT id FROM doctors WHERE id = ?),
                (SELECT id FROM bookings WHERE id = ?),
                ?,
                STR_TO_DATE(?, "%d-%m-%Y"),
                STR_TO_DATE(?, "%d-%m-%Y"),
                ?,
                SYSDATE(),
                (
                    WITH
                    all_users AS 
                    (
                        SELECT * FROM doctors
                        UNION
                        SELECT * FROM admins
                        UNION 
                        SELECT * FROM pet_owners
                    )
                    SELECT id from all_users 
                    WHERE UPPER(username) = UPPER(?)
                    AND archived = 0
                ),
                0)'
        ); 
        $sql->bind_param(
            'iiisssss', 
            $record['pet_id'],
            $record['doctor_id'],
            $record['booking_id'],
            $record['surgery'],
            $record['surgery_date'],
            $record['discharge_date'],
            $record['comments'],
            $record['username']
        );
        if ($sql->execute()) {
            $sql->close();
            $this->connection->close();
            return true;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Update surgery
     */
    public function updateSurgery($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'UPDATE `pawsome`.`pet_surgery_records`
            SET
            `doctor_id` = (SELECT id FROM doctors WHERE id = ?),
            `booking_id` = (SELECT id FROM bookings WHERE id = ?),
            `surgery` = ?,
            `surgery_date` = STR_TO_DATE(?, "%d-%m-%Y"),
            `discharge_date` = STR_TO_DATE(?, "%d-%m-%Y"),
            `comments` = ?,
            `updated_date` = SYSDATE(),
            `updated_by` = (
                    WITH
                    all_users AS 
                    (
                        SELECT * FROM doctors
                        UNION
                        SELECT * FROM admins
                        UNION 
                        SELECT * FROM pet_owners
                    )
                    SELECT id from all_users 
                    WHERE UPPER(username) = UPPER(?)
                    AND archived = 0
                )
            WHERE `id` = ?'
        ); 
        $sql->bind_param(
            'iisssssi', 
            $record['doctor_id'],
            $record['booking_id'],
            $record['surgery'],
            $record['surgery_date'],
            $record['discharge_date'],
            $record['comments'],
            $record['username'],
            $record['id']
        );
        if ($sql->execute()) {
            $sql->close();
            $this->connection->close();
            return true;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Archive surgery
     */
    public function archiveSurgery($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'UPDATE `pawsome`.`pet_surgery_records`
            SET
            `updated_date`=SYSDATE(),
            `updated_by`=(
                WITH
                all_users AS 
                (
                    SELECT * FROM doctors
                    UNION
                    SELECT * FROM admins
                    UNION 
                    SELECT * FROM pet_owners
                )
                SELECT id from all_users 
                WHERE UPPER(username) = UPPER(?)
                AND archived = 0
            ),
            archived=1
            WHERE id = ?'
        ); 
        $sql->bind_param(
            'si', 
            $record['username'],
            $record['id']
        );
        if ($sql->execute()) {
            $sql->close();
            $this->connection->close();
            return true;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Delete surgery
     */
    public function deleteSurgery($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'DELETE FROM `pawsome`.`pet_surgery_records`
            WHERE id = ?'
        ); 
        $sql->bind_param(
            'i', 
            $record['id']
        );
        if ($sql->execute()) {
            $sql->close();
            $this->connection->close();
            return true;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Retrieves all surgery records by pet id
     */
    public function getAllSurgeriesByPetId($pet_id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT psr.`id`,
                psr.`pet_id`,
                psr.`doctor_id`,
                psr.`booking_id`,
                CONCAT(d.firstname, " ", d.lastname) veterinarian,
                psr.`surgery`,
                psr.`surgery_date`,
                psr.`discharge_date`,
                psr.`comments`,
                psr.archived
            FROM 
            `pawsome`.`pet_surgery_records` psr,
            `pawsome`.`doctors` d,
            `pawsome`.`bookings` b,
            `pawsome`.`pets` p
            WHERE
            psr.pet_id = ?
            AND psr.doctor_id = d.id
            AND psr.booking_id = b.id
            AND psr.pet_id = p.id
            ORDER BY psr.`surgery_date` DESC'
        );
        $sql->bind_param(
            'i', $pet_id
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $surgeries = array();
            while($row=$result->fetch_assoc()){
                array_push($surgeries, $row);
            }
            $sql->close();
            $this->connection->close();
            return $surgeries;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Upload File
     */
    public function uploadFile($file)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'INSERT INTO `pawsome`.`pet_doc_uploads`
                (`pet_id`,
                `file_type`,
                `file_name`,
                `upload_date`,
                `uploaded_by`,
                `archived`)
                VALUES
                (
                (SELECT id FROM `pawsome`.`pets` WHERE id = ?),
                ?,?,
                SYSDATE(),
                (
                    WITH
                    all_users AS 
                    (
                        SELECT * FROM `pawsome`.`doctors`
                        UNION
                        SELECT * FROM `pawsome`.`admins`
                        UNION 
                        SELECT * FROM `pawsome`.`pet_owners`
                    )
                    SELECT id from all_users 
                    WHERE UPPER(username) = UPPER(?)
                    AND archived = 0
                ),
                0)'
        ); 
        $sql->bind_param(
            'isss', 
            $file['pet_id'],
            $file['file_type'],
            $file['file_name'],
            $file['username']
        );
        if ($sql->execute()) {
            $id = $this->connection->insert_id;
            $sql->close();
            $this->connection->close();
            return $id;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Delete file
     */
    public function deleteFile($id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'DELETE FROM `pawsome`.`pet_doc_uploads`
            WHERE id = ?'
        );
        $sql->bind_param(
            'i', $id
        );
        if ($sql->execute()) {
            $sql->close();
            $this->connection->close();
            return true;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }
}

?>