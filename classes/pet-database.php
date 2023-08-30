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
                SELECT id 
                FROM `pawsome`.`admins` 
                WHERE UPPER(username) = UPPER(?)
                AND archived = 0)
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
            'iissss', 
            $record['pet_id'],
            $record['doctor_id'],
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
            'iissssi', 
            $record['pet_id'],
            $record['doctor_id'],
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
                CONCAT(d.firstname, " ", d.lastname) veterinarian,
                pir.`vaccine_date`,
                pir.`vaccine`,
                pir.`comments`
            FROM 
            `pawsome`.`pet_immun_records` pir,
            `pawsome`.`doctors` d,
            `pawsome`.`pets` p
            WHERE pir.`pet_id` = ?
            AND pir.doctor_id = d.id
            AND pir.pet_id = p.id
            AND pir.archived = 0
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
}

?>