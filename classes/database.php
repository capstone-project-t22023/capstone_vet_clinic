<?php
/**
 * Database class where API call queries to be executed
 */
class Database
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
     * Insert data into the doctors table
     */
    public function addDoctor($doctor)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'INSERT INTO doctors (`firstname`, `lastname`, `username`, `password`, `address`, `state`, `email`, `phone`, `postcode`, `archived`, `created_date`, `updated_date`) 
            VALUES (?,?,?,?,?,?,?,?,?,?,SYSDATE(),SYSDATE())'
        );
        $sql->bind_param(
            'sssssssiii',
            $doctor['firstname'],
            $doctor['lastname'],
            $doctor['username'],
            $doctor['password'],
            $doctor['address'],
            $doctor['state'],
            $doctor['email'],
            $doctor['phone'],
            $doctor['postcode'],
            $doctor['archived']
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
     * Insert data into the admins table
     */
    public function addAdmin($admin)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'INSERT INTO admins (`firstname`, `lastname`, `username`, `password`, `address`, `state`, `email`, `phone`, `postcode`, `archived`, `created_date`, `updated_date`) 
            VALUES (?,?,?,?,?,?,?,?,?,?,SYSDATE(),SYSDATE())'
        );
        $sql->bind_param(
            'sssssssiii',
            $admin['firstname'],
            $admin['lastname'],
            $admin['username'],
            $admin['password'],
            $admin['address'],
            $admin['state'],
            $admin['email'],
            $admin['phone'],
            $admin['postcode'],
            $admin['archived']
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
     * Insert data into the pet_owners table
     */
    public function addPetOwner($pet_owner)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'INSERT INTO pet_owners (`firstname`, `lastname`, `username`, `password`, `address`, `state`, `email`, `phone`, `postcode`, `archived`, `created_date`, `updated_date`) 
            VALUES (?,?,?,?,?,?,?,?,?,?,SYSDATE(),SYSDATE())'
        );
        $sql->bind_param(
            'sssssssiii',
            $pet_owner['firstname'],
            $pet_owner['lastname'],
            $pet_owner['username'],
            $pet_owner['password'],
            $pet_owner['address'],
            $pet_owner['state'],
            $pet_owner['email'],
            $pet_owner['phone'],
            $pet_owner['postcode'],
            $pet_owner['archived']
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
     * Insert generated token to the database to be used by doctor whenever system is used
     * Returns false or doctor_account_tokens object
     */
    public function generateTokenForDoctor($doctor_id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'INSERT INTO `doctor_account_tokens`(`doctor_id`, `code`) VALUES(?,?) ON DUPLICATE KEY UPDATE    
            code=?'
        );
        $code = rand(11111, 99999);
        $sql->bind_param('iss', $doctor_id, $code, $code);
        if ($sql->execute()) {
            $sql->close();
            $this->connection->close();
            return $code;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Insert generated token to the database to be used by admin whenever system is used
     * Returns false or admin_account_tokens object
     */
    public function generateTokenForAdmin($admin_id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'INSERT INTO `admin_account_tokens`(`admin_id`, `code`) VALUES(?,?) ON DUPLICATE KEY UPDATE    
            code=?'
        );
        $code = rand(11111, 99999);
        $sql->bind_param('iss', $admin_id, $code, $code);
        if ($sql->execute()) {
            $sql->close();
            $this->connection->close();
            return $code;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Insert generated token to the database to be used by pet owner whenever system is used
     * Returns false or pet_owners_account_tokens object
     */
    public function generateTokenForPetOwners($pet_owner_id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'INSERT INTO `pet_owners_account_tokens`(`pet_owner_id`, `code`) VALUES(?,?) ON DUPLICATE KEY UPDATE    
            code=?'
        );
        $code = rand(11111, 99999);
        $sql->bind_param('iss', $pet_owner_id, $code, $code);
        if ($sql->execute()) {
            $sql->close();
            $this->connection->close();
            return $code;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Confirm if doctor and token matches from the database
     * Returns true or false
     */
    public function confirmTokenDoctor($doctor_id, $code)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT * FROM `doctor_account_tokens` WHERE doctor_id=? AND code=?'
        );
        $sql->bind_param('is', $doctor_id, $code);
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $sql->close();
            $this->connection->close();
            return true;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Confirm if admin and token matches from the database
     * Returns true or false
     */
    public function confirmTokenAdmin($admin_id, $code)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT * FROM `admin_account_tokens` WHERE admin_id=? AND code=?'
        );
        $sql->bind_param('is', $admin_id, $code);
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $sql->close();
            $this->connection->close();
            return true;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Confirm if pet owner and token matches from the database
     * Returns true or false
     */
    public function confirmTokenPetOwner($pet_owner_id, $code)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT * FROM `pet_owners_account_tokens` WHERE pet_owner_id=? AND code=?'
        );
        $sql->bind_param('is', $pet_owner_id, $code);
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $sql->close();
            $this->connection->close();
            return true;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Retrieve corresponding token by doctor_id
     * Returns false or doctor_account_tokens object
     */
    public function getTokenDoctor($doctor_id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT * FROM `doctor_account_tokens` WHERE doctor_id=?'
        );
        $sql->bind_param('i', $doctor_id);
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $code = $result->fetch_assoc();
            $sql->close();
            $this->connection->close();
            return $code;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Retrieve corresponding token by admin_id
     * Returns false or admin_account_tokens object
     */
    public function getTokenAdmin($admin_id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT * FROM `admin_account_tokens` WHERE admin_id=?'
        );
        $sql->bind_param('i', $admin_id);
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $code = $result->fetch_assoc();
            $sql->close();
            $this->connection->close();
            return $code;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Retrieve corresponding token by pet_owner_id
     * Returns false or pet_owner_account_tokens object
     */
    public function getTokenPetOwner($pet_owners_id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT * FROM `pet_owners_account_tokens` WHERE pet_owner_id=?'
        );
        $sql->bind_param('i', $pet_owners_id);
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $code = $result->fetch_assoc();
            $sql->close();
            $this->connection->close();
            return $code;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Activates doctor by setting archived to 0
     * Non-activated doctor shouldn't be allowed to login
     * Returns true or false
     */
    public function activateDoctor($doctor_id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'UPDATE `doctors` SET `archived` = 0 WHERE id=?'
        );
        $sql->bind_param('i', $doctor_id);
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
     * Activates admin by setting archived to 0
     * Non-activated admin shouldn't be allowed to login
     * Returns true or false
     */
    public function activateAdmin($admin_id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'UPDATE `admins` SET `archived` = 0 WHERE id=?'
        );
        $sql->bind_param('i', $admin_id);
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
     * Activates pet_owner by setting archived to 0
     * Non-activated pet_owner shouldn't be allowed to login
     * Returns true or false
     */
    public function activatePetOwner($pet_owner_id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'UPDATE `pet_owners` SET `archived` = 0 WHERE id=?'
        );
        $sql->bind_param('i', $pet_owner_id);
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
     * Logs in doctor with given credentials
     */
    public function loginDoctor($username, $password)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT * FROM `doctors` WHERE username=? AND password=?'
        );
        $sql->bind_param('ss', $username, $password);
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $doctor = $result->fetch_assoc();
            $sql->close();
            $this->connection->close();
            return $doctor;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Logs in admin with given credentials
     */
    public function loginAdmin($username, $password)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT * FROM `admins` WHERE username=? AND password=?'
        );
        $sql->bind_param('ss', $username, $password);
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $admin = $result->fetch_assoc();
            $sql->close();
            $this->connection->close();
            return $admin;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Logs in pet owner with given credentials
     */
    public function loginPetOwner($username, $password)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT * FROM `pet_owners` WHERE username=? AND password=?'
        );
        $sql->bind_param('ss', $username, $password);
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $pet_owner = $result->fetch_assoc();
            $sql->close();
            $this->connection->close();
            return $pet_owner;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Retrieves doctor information by username
     */
    public function getDoctor($username)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT `doctors`.`id`,
                `doctors`.`firstname`,
                `doctors`.`lastname`,
                `doctors`.`username`,
                null as password,
                `doctors`.`address`,
                `doctors`.`state`,
                `doctors`.`email`,
                `doctors`.`phone`,
                `doctors`.`postcode`,
                `doctors`.`archived`,
                `doctors`.`created_date`,
                `doctors`.`updated_date`,
                `doctors`.`updated_by`,
                "doctor" role 
            FROM `pawsome`.`doctors` 
            WHERE `doctors`.`username`=?'
        );
        $sql->bind_param('s', $username);
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $doctor = $result->fetch_assoc();
            $sql->close();
            $this->connection->close();
            return $doctor;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Retrieves admin information by username
     */
    public function getAdmin($username)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT `admins`.`id`,
                `admins`.`firstname`,
                `admins`.`lastname`,
                `admins`.`username`,
                null as password,
                `admins`.`address`,
                `admins`.`state`,
                `admins`.`email`,
                `admins`.`phone`,
                `admins`.`postcode`,
                `admins`.`archived`,
                `admins`.`created_date`,
                `admins`.`updated_date`,
                `admins`.`updated_by`,
                "admin" role
            FROM `pawsome`.`admins`
            WHERE `admins`.`username`=?'
        );
        $sql->bind_param('s', $username);
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $admin = $result->fetch_assoc();
            $sql->close();
            $this->connection->close();
            return $admin;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Retrieves pet owner information by username
     */
    public function getPetOwner($username)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT `pet_owners`.`id`,
                `pet_owners`.`firstname`,
                `pet_owners`.`lastname`,
                `pet_owners`.`username`,
                null as password,
                `pet_owners`.`address`,
                `pet_owners`.`state`,
                `pet_owners`.`email`,
                `pet_owners`.`phone`,
                `pet_owners`.`postcode`,
                `pet_owners`.`archived`,
                `pet_owners`.`created_date`,
                `pet_owners`.`updated_date`,
                `pet_owners`.`updated_by`,
                "pet_owner" role 
            FROM `pawsome`.`pet_owners`
            WHERE `pet_owners`.`username`=?'
        );
        $sql->bind_param('s', $username);
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $pet_owner = $result->fetch_assoc();
            $sql->close();
            $this->connection->close();
            return $pet_owner;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Retrieves all records of doctors
     */
    public function getAllDoctors()
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT `doctors`.`id`,
                `doctors`.`firstname`,
                `doctors`.`lastname`,
                `doctors`.`username`,
                null as password,
                `doctors`.`address`,
                `doctors`.`state`,
                `doctors`.`email`,
                `doctors`.`phone`,
                `doctors`.`postcode`,
                `doctors`.`archived`,
                `doctors`.`created_date`,
                `doctors`.`updated_date`,
                `doctors`.`updated_by`
            FROM `pawsome`.`doctors`
            WHERE `doctors`.`archived`=0 
            ORDER BY `doctors`.`id`'
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $doctors = array();
            while($row=$result->fetch_assoc()){
                array_push($doctors, $row);
            }
            $sql->close();
            $this->connection->close();
            return $doctors;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Retrieves all records of admins
     */
    public function getAllAdmins()
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
                `admins`.`id`,
                `admins`.`firstname`,
                `admins`.`lastname`,
                `admins`.`username`,
                null as password,
                `admins`.`address`,
                `admins`.`state`,
                `admins`.`email`,
                `admins`.`phone`,
                `admins`.`postcode`,
                `admins`.`archived`,
                `admins`.`created_date`,
                `admins`.`updated_date`,
                `admins`.`updated_by`
            FROM `pawsome`.`admins` 
            WHERE `admins`.`archived`=0 
            ORDER BY `admins`.`id`'
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $admins = array();
            while($row=$result->fetch_assoc()){
                array_push($admins, $row);
            }
            $sql->close();
            $this->connection->close();
            return $admins;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Insert data into the doctors table by admin
     */
    public function addDoctorByAdmin($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'INSERT 
            INTO `pawsome`.`doctors` 
            (`firstname`, 
            `lastname`, 
            `username`, 
            `password`, 
            `address`, 
            `state`, 
            `email`, 
            `phone`, 
            `postcode`, 
            `archived`, 
            `created_date`, 
            `updated_date`,
            `updated_by`) 
            VALUES (?,?,?,?,?,?,?,?,?,0,SYSDATE(),SYSDATE(),
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
            )
            )'
        );
        $sql->bind_param(
            'sssssssiis',
            $record['firstname'],
            $record['lastname'],
            $record['username'],
            $record['password'],
            $record['address'],
            $record['state'],
            $record['email'],
            $record['phone'],
            $record['postcode'],
            $record['created_by']
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
     * Insert data into the admins table by admin
     */
    public function addAdminByAdmin($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'INSERT 
            INTO `pawsome`.`admins` 
            (`firstname`, 
            `lastname`, 
            `username`, 
            `password`, 
            `address`, 
            `state`, 
            `email`, 
            `phone`, 
            `postcode`, 
            `archived`, 
            `created_date`, 
            `updated_date`,
            `updated_by`) 
            VALUES (?,?,?,?,?,?,?,?,?,0,SYSDATE(),SYSDATE(),
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
            )
            )'
        );
        $sql->bind_param(
            'sssssssiis',
            $record['firstname'],
            $record['lastname'],
            $record['username'],
            $record['password'],
            $record['address'],
            $record['state'],
            $record['email'],
            $record['phone'],
            $record['postcode'],
            $record['created_by']
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
     * Insert data into the pet_owners table by admin
     */
    public function addPetOwnerByAdmin($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'INSERT 
            INTO `pawsome`.`pet_owners` 
            (`firstname`, 
            `lastname`, 
            `username`, 
            `password`, 
            `address`, 
            `state`, 
            `email`, 
            `phone`, 
            `postcode`, 
            `archived`, 
            `created_date`, 
            `updated_date`,
            `updated_by`) 
            VALUES (?,?,?,?,?,?,?,?,?,0,SYSDATE(),SYSDATE(),
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
            )
            )'
        );
        $sql->bind_param(
            'sssssssiis',
            $record['firstname'],
            $record['lastname'],
            $record['username'],
            $record['password'],
            $record['address'],
            $record['state'],
            $record['email'],
            $record['phone'],
            $record['postcode'],
            $record['created_by']
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
     * Delete doctor info by id
     */
    public function deleteDoctor($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'UPDATE `pawsome`.`doctors`
            SET
            archived = 1,
            updated_date = SYSDATE(),
            updated_by = (
                WITH
                    all_users AS 
                    (
                        SELECT * FROM `pawsome`.`doctors`
                        UNION
                        SELECT * FROM `pawsome`.`admins`
                        UNION 
                        SELECT * FROM `pawsome`.`pet_owners`
                    )
                    SELECT a.id from all_users a 
                    WHERE UPPER(a.username) = UPPER(?)
                    AND archived = 0
            )
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
     * Delete admin info by id
     */
    public function deleteAdmin($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'UPDATE `pawsome`.`admins`
            SET
            archived = 1,
            updated_date = SYSDATE(),
            updated_by = (
                WITH
                    all_users AS 
                    (
                        SELECT * FROM `pawsome`.`doctors`
                        UNION
                        SELECT * FROM `pawsome`.`admins`
                        UNION 
                        SELECT * FROM `pawsome`.`pet_owners`
                    )
                    SELECT a.id from all_users a 
                    WHERE UPPER(a.username) = UPPER(?)
                    AND archived = 0
            )
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
     * Delete pet owner info by id
     */
    public function deletePetOwner($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'UPDATE `pawsome`.`pet_owners`
            SET
            archived = 1,
            updated_date = SYSDATE(),
            updated_by = (
                WITH
                    all_users AS 
                    (
                        SELECT * FROM `pawsome`.`doctors`
                        UNION
                        SELECT * FROM `pawsome`.`admins`
                        UNION 
                        SELECT * FROM `pawsome`.`pet_owners`
                    )
                    SELECT a.id from all_users a 
                    WHERE UPPER(a.username) = UPPER(?)
                    AND archived = 0
            )
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
     * Update doctor info by id
     */
    public function updateDoctor($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'UPDATE `pawsome`.`doctors`
            SET
            firstname = ?,
            lastname = ?,
            password = ?,
            address = ?,
            state = ?,
            email = ?,
            phone = ?,
            postcode = ?,
            updated_date = SYSDATE(),
            updated_by = (
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
            )
            WHERE id = ?'
        ); 
        $sql->bind_param(
            'ssssssiisi', 
            $record['firstname'],
            $record['lastname'],
            $record['password'],
            $record['address'],
            $record['state'],
            $record['email'],
            $record['phone'],
            $record['postcode'],
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
     * Update admin info by id
     */
    public function updateAdmin($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'UPDATE `pawsome`.`admins`
            SET
            firstname = ?,
            lastname = ?,
            password = ?,
            address = ?,
            state = ?,
            email = ?,
            phone = ?,
            postcode = ?,
            updated_date = SYSDATE(),
            updated_by = (
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
            )
            WHERE id = ?'
        ); 
        $sql->bind_param(
            'ssssssiisi', 
            $record['firstname'],
            $record['lastname'],
            $record['password'],
            $record['address'],
            $record['state'],
            $record['email'],
            $record['phone'],
            $record['postcode'],
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
     * Update pet owner info by id
     */
    public function updatePetOwner($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'UPDATE `pawsome`.`pet_owners`
            SET
            firstname = ?,
            lastname = ?,
            password = ?,
            address = ?,
            state = ?,
            email = ?,
            phone = ?,
            postcode = ?,
            updated_date = SYSDATE(),
            updated_by = (
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
            )
            WHERE id = ?'
        ); 
        $sql->bind_param(
            'ssssssiisi', 
            $record['firstname'],
            $record['lastname'],
            $record['password'],
            $record['address'],
            $record['state'],
            $record['email'],
            $record['phone'],
            $record['postcode'],
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
     * Retrieves all records of pet owners
     */
    public function getAllPetOwners()
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT `pet_owners`.`id`,
                `pet_owners`.`firstname`,
                `pet_owners`.`lastname`,
                `pet_owners`.`username`,
                null as password,
                `pet_owners`.`address`,
                `pet_owners`.`state`,
                `pet_owners`.`email`,
                `pet_owners`.`phone`,
                `pet_owners`.`postcode`,
                `pet_owners`.`archived`,
                `pet_owners`.`created_date`,
                `pet_owners`.`updated_date`,
                `pet_owners`.`updated_by`
            FROM `pawsome`.`pet_owners`
            WHERE `pet_owners`.`archived`=0 
            ORDER BY `pet_owners`.`id`'
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $pet_owners = array();
            while($row=$result->fetch_assoc()){
                array_push($pet_owners, $row);
            }
            $sql->close();
            $this->connection->close();
            return $pet_owners;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Check roles
     */
    public function checkRoleByUsername($username)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'WITH
            all_users AS 
            (
                SELECT d.*, "doctor" role FROM doctors d
                UNION
                SELECT a.*, "admin" role  FROM admins a
                UNION 
                SELECT po.*, "pet_owner" role FROM pet_owners po
            )
            SELECT 
                id, firstname, lastname, username, role 
            FROM all_users 
            WHERE 
                archived = 0
                AND UPPER(username) = UPPER(?)'
        ); 
        $sql->bind_param(
            's', $username
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $user_record = $result->fetch_assoc();
            $sql->close();
            $this->connection->close();
            return $user_record;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Subscribe to newsletter
     */
    public function subscribe($email)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'INSERT INTO subscribers (email,date_subbed) VALUES (?,SYSDATE())'
        );
        $sql->bind_param(
            's', $email
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
     * Check existing subscriber
     */
    public function checkSubscriber($email)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT * FROM subscribers WHERE email = ?'
        );
        $sql->bind_param(
            's', $email
        );
        if ($sql->execute()) {
            $subscriber = $result->fetch_assoc();
            $sql->close();
            $this->connection->close();
            return $subscriber;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    

}

?>