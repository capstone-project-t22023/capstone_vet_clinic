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
            'INSERT INTO doctors (`firstname`, `lastname`, `username`, `password`, `address`, `state`, `email`, `phone`, `postcode`, `archived`, `created_date`, `updated_date`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)'
        );
        $sql->bind_param(
            'sssssssiiiss',
            $doctor['firstname'],
            $doctor['lastname'],
            $doctor['username'],
            $doctor['password'],
            $doctor['address'],
            $doctor['state'],
            $doctor['email'],
            $doctor['phone'],
            $doctor['postcode'],
            $doctor['archived'],
            $doctor['created_date'],
            $doctor['updated_date']
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
            'INSERT INTO admins (`firstname`, `lastname`, `username`, `password`, `address`, `state`, `email`, `phone`, `postcode`, `archived`, `created_date`, `updated_date`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)'
        );
        $sql->bind_param(
            'sssssssiiiss',
            $admin['firstname'],
            $admin['lastname'],
            $admin['username'],
            $admin['password'],
            $admin['address'],
            $admin['state'],
            $admin['email'],
            $admin['phone'],
            $admin['postcode'],
            $admin['archived'],
            $admin['created_date'],
            $admin['updated_date']
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
            'INSERT INTO pet_owners (`firstname`, `lastname`, `username`, `password`, `address`, `state`, `email`, `phone`, `postcode`, `archived`, `created_date`, `updated_date`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)'
        );
        $sql->bind_param(
            'sssssssiiiss',
            $pet_owner['firstname'],
            $pet_owner['lastname'],
            $pet_owner['username'],
            $pet_owner['password'],
            $pet_owner['address'],
            $pet_owner['state'],
            $pet_owner['email'],
            $pet_owner['phone'],
            $pet_owner['postcode'],
            $pet_owner['archived'],
            $pet_owner['created_date'],
            $pet_owner['updated_date']
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
     * Returns user object or false
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
     * Returns admin object or false
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
     * Returns pet_owner object or false
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
     * Returns doctor object or false
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
            'SELECT DISTINCT d.*, "doctor" role 
            FROM `pawsome`.`doctors` d 
            WHERE username=?'
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
     * Returns amdin object or false
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
            'SELECT DISTINCT a.*, "admin" role
            FROM `pawsome`.`admins` a
            WHERE username=?'
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
     * Returns pet_owner object or false
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
            'SELECT DISTINCT po.*, "pet_owner" role 
            FROM `pawsome`.`pet_owners` po 
            WHERE username=?'
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
     * Returns doctors object array or false
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
            'SELECT DISTINCT * FROM `doctors` WHERE archived=0 ORDER BY id'
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
     * Returns admins object array or false
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
            'SELECT DISTINCT * FROM `admins` WHERE archived=0 ORDER BY id'
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
                SELECT id from all_users WHERE UPPER(username) = UPPER(?)
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
                SELECT id from all_users WHERE UPPER(username) = UPPER(?)
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
                SELECT id from all_users WHERE UPPER(username) = UPPER(?)
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
     * Returns true or false 
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
        $sql = $this->connection->prepare('CALL delete_doctor(?, ?)');
        $sql->bind_param(
            'is',
            $record['id'], 
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
     * Delete admin info by id
     * Returns true or false 
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
        $sql = $this->connection->prepare('CALL delete_admin(?, ?)');
        $sql->bind_param(
            'is',
            $record['id'], 
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
     * Delete pet owner info by id
     * Returns true or false 
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
        $sql = $this->connection->prepare('CALL delete_pet_owner(?, ?)');
        $sql->bind_param(
            'is',
            $record['id'], 
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
     * Update doctor info by id
     * Returns true or false 
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
                SELECT id from all_users WHERE UPPER(username) = UPPER(?)
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
     * Returns true or false 
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
                SELECT id from all_users WHERE UPPER(username) = UPPER(?)
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
     * Returns true or false 
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
                SELECT id from all_users WHERE UPPER(username) = UPPER(?)
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
     * Returns pet_owners object array or false
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
            'SELECT DISTINCT * FROM `pet_owners` WHERE archived=0 ORDER BY id'
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
     * Retrieves all records of pets
     * Returns pets object array or false
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
     * Returns pets object array or false
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
     * Returns pets object array or false
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
     * Returns pets object array or false
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
     * Returns pets object array or false
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
     * Returns true or false 
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
                SELECT id from all_users WHERE UPPER(username) = UPPER(?)
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
     * Returns true or false 
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
                SELECT id from all_users WHERE UPPER(username) = UPPER(?)
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
     * Delete pet information
     * Returns true or false 
     */
    public function deletePet($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare('CALL delete_pet(?, ?)');
        $sql->bind_param(
            'is',
            $record['id'], 
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
     * Get pet information
     * Returns pet object or false 
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
     * Retrieves booking types
     * Returns booking type object array or false
     */
    public function getBookingTypes()
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT * FROM `pawsome`.`booking_types`'
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $types = array();
            while($row=$result->fetch_assoc()){
                array_push($types, $row);
            }
            $sql->close();
            $this->connection->close();
            return $types;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Retrieves taken slots by date
     * Returns booking slots object array or false
     */
    public function getTakenSlotsByDate($selected_date)
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
            taken_slots AS (SELECT DISTINCT
                        booking_date, booking_time, count(booking_time) slot_counter 
                        FROM pawsome.booking_slots 
                        GROUP BY booking_date, booking_time)
            SELECT DATE_FORMAT(booking_date, "%d-%m-%Y") booking_date, GROUP_CONCAT(booking_time separator ",") booking_time 
            FROM taken_slots 
            WHERE 
            slot_counter = 5 
            AND booking_date = STR_TO_DATE(?,"%d-%m-%Y")
            GROUP BY booking_date'
        );
        $sql->bind_param(
            's', $selected_date
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $taken_slots = array();
            while($row=$result->fetch_assoc()){
                array_push($taken_slots, $row);
            }
            $sql->close();
            $this->connection->close();
            return $taken_slots;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Retrieves taken slots
     * Returns booking slots object array or false
     */
    public function getTakenSlotsAll()
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
            taken_slots AS (SELECT DISTINCT
                        booking_date, booking_time, count(booking_time) slot_counter 
                        FROM pawsome.booking_slots 
                        GROUP BY booking_date, booking_time)
            SELECT DATE_FORMAT(booking_date, "%d-%m-%Y") booking_date, GROUP_CONCAT(booking_time separator ",") booking_time FROM taken_slots WHERE slot_counter = 5 GROUP BY booking_date'
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $taken_slots = array();
            while($row=$result->fetch_assoc()){
                array_push($taken_slots, $row);
            }
            $sql->close();
            $this->connection->close();
            return $taken_slots;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Retrieves taken slots by date
     * Returns booking slots object array or false
     */
    public function slotCounter($selected_slot)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT DISTINCT
            count(booking_time) slot_counter 
            FROM pawsome.booking_slots 
            WHERE 
            booking_date = STR_TO_DATE(?,"%d-%m-%Y")
            AND booking_time = ?
            GROUP BY booking_date, booking_time'
        );
        $sql->bind_param(
            'ss', 
            $selected_slot['selected_date'],
            $selected_slot['selected_time']
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $count=$result->fetch_assoc();
            $sql->close();
            $this->connection->close();
            return $count;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Insert data into the bookings table
     */
    public function addBooking($booking)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'INSERT INTO `pawsome`.`bookings`
            (`booking_status`,
            `booking_type_id`,
            `pet_owner_id`,
            `pet_id`,
            `updated_date`,
            `updated_by`,
            `archived`)
            VALUES
            (?,
            (SELECT id from booking_types WHERE UPPER(booking_type) = UPPER(?)),
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
                SELECT id from all_users WHERE UPPER(username) = UPPER(?)
            ),
            0)'
        );
        $booking_status = "PENDING";
        $sql->bind_param(
            'ssiis',
            $booking_status,
            $booking['booking_type'],
            $booking['pet_owner_id'],
            $booking['pet_id'],
            $booking['username']
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
     * Update data in the bookings table
     */
    public function updateBookingByAdmin($booking)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');

        $sql = $this->connection->prepare(
            'UPDATE `pawsome`.`bookings`
            SET
            `booking_status` = ?,
            `booking_type_id` = (SELECT id from booking_types WHERE UPPER(booking_type) = UPPER(?)),
            `pet_owner_id` = ?,
            `pet_id` = ?,
            `doctor_id` = ?,
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
                SELECT id from all_users WHERE UPPER(username) = UPPER(?)
            )
            WHERE
            `id` = ?
            '
        );
        $sql->bind_param(
            'ssiiisi',
            $booking['new_booking_status'],
            $booking['booking_type'],
            $booking['pet_owner_id'],
            $booking['pet_id'],
            $booking['doctor_id'],
            $booking['username'],
            $booking['booking_id']
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
     * Update data in the bookings table
     */
    public function updateBookingByPetOwner($booking)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');

        $sql = $this->connection->prepare(
            'UPDATE `pawsome`.`bookings`
            SET
            `booking_type_id` = (SELECT id from booking_types WHERE UPPER(booking_type) = UPPER(?)),
            `booking_status` = ?,
            `pet_owner_id` = ?,
            `pet_id` = ?,
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
                SELECT id from all_users WHERE UPPER(username) = UPPER(?)
            )
            WHERE
            `id` = ?
            '
        );
        $sql->bind_param(
            'ssiisi',
            $booking['booking_type'],
            $booking['new_booking_status'],
            $booking['pet_owner_id'],
            $booking['pet_id'],
            $booking['username'],
            $booking['booking_id']
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
     * Insert booking slot/s for booked date
     */
    public function addBookingSlot($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'INSERT INTO `pawsome`.`booking_slots`
            (`booking_id`,
            `booking_date`,
            `booking_time`)
            VALUES
            (?,STR_TO_DATE(?,"%d-%m-%Y"),?)'
        );
        $sql->bind_param(
            'iss', 
            $record['booking_id'], 
            $record['booking_date'], 
            $record['booking_time']
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
     * Cancel booking
     */
    public function cancelBooking($booking_record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'UPDATE `bookings`
            SET archived = 1,
            booking_status = ?,
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
                SELECT id from all_users WHERE UPPER(username) = UPPER(?)
            )
            WHERE id = ?'
        );
        $sql->bind_param(
            'ssi', 
            $booking_record['new_status'], 
            $booking_record['username'],
            $booking_record['booking_id']
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
     * Finish booking
     */
    public function finishBooking($booking_record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'UPDATE `bookings`
            SET 
            booking_status = ?
            updated_date = SYSDATE(),
            updated_by = (SELECT id from doctors where UPPER(username) = UPPER(?))
            WHERE id = ?'
        );
        $sql->bind_param(
            'ssi', 
            $booking_record['new_status'], 
            $booking_record['username'],
            $booking_record['booking_id']
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
     * Delete booking slots by id
     */
    public function deleteBookingSlot($booking_id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'DELETE FROM `pawsome`.`booking_slots`
            WHERE booking_id = ?'
        );
        $sql->bind_param(
            'i', 
            $booking_id
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
     * Insert booking history record
     */
    public function addBookingHistoryRecord($booking_history_record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'INSERT INTO `pawsome`.`booking_history`
            (`booking_id`,
            `prev_status`,
            `new_status`,
            `updated_date`,
            `updated_by`)
            VALUES
            (?,?,?,SYSDATE(),
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
                SELECT id from all_users WHERE UPPER(username) = UPPER(?)
            )
            )'
        );
        $sql->bind_param(
            'isss', 
            $booking_history_record['booking_id'], 
            $booking_history_record['prev_status'],
            $booking_history_record['new_status'],
            $booking_history_record['username']
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
     * Retrieves all records of bookings by booking ID
     * Returns bookings object array or false
     */
    public function getBookingById($booking_id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT DISTINCT 
            b.id booking_id,
            DATE_FORMAT(bs.booking_date, "%d-%m-%Y") booking_date,
            GROUP_CONCAT(bs.booking_time separator ",") booking_time,
            b.booking_status,
            bt.booking_type,
            b.doctor_id,
            b.invoice_id,
            b.receipt_id,
            b.updated_date,
            b.pet_owner_id,
            po.username,
            CONCAT(po.firstname," ",po.lastname) pet_owner,
            b.pet_id,
            p.petname
            FROM 
            `pawsome`.`bookings` b, 
            `pawsome`.`booking_types` bt, 
            `pawsome`.`pet_owners` po, 
            `pawsome`.`pets` p, 
            `pawsome`.`booking_slots` bs
            WHERE 
            p.pet_owner_id = po.id 
            AND b.pet_owner_id = po.id 
            AND b.pet_id = p.id 
            AND b.booking_type_id = bt.id
            AND b.id = bs.booking_id
            AND b.archived = 0
            AND b.id = ?
            ORDER BY b.updated_date DESC'
        );
        $sql->bind_param(
            'i', $booking_id
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $row=$result->fetch_assoc();
            $sql->close();
            $this->connection->close();
            return $row;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Retrieves all records of bookings by booking ID
     * Returns bookings object array or false
     */
    public function getBookingsByBookingId($filter_value)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT DISTINCT 
            b.id booking_id,
            bs.booking_date,
            bs.booking_time, 
            b.booking_status,
            bt.booking_type,
            b.doctor_id,
            b.invoice_id,
            b.receipt_id,
            b.updated_date,
            b.pet_owner_id,
            po.username,
            CONCAT(po.firstname," ",po.lastname) pet_owner,
            b.pet_id,
            p.petname
            FROM 
            `pawsome`.`bookings` b, 
            `pawsome`.`booking_types` bt, 
            `pawsome`.`pet_owners` po, 
            `pawsome`.`pets` p, 
            `pawsome`.`booking_slots` bs
            WHERE 
            p.pet_owner_id = po.id 
            AND b.pet_owner_id = po.id 
            AND b.pet_id = p.id 
            AND b.booking_type_id = bt.id
            AND b.id = bs.booking_id
            AND b.archived = 0
            AND b.id LIKE ?
            ORDER BY b.updated_date DESC'
        );
        $q = '%' . $filter_value . '%';
        $sql->bind_param(
            's', $q
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $bookings = array();
            while($row=$result->fetch_assoc()){
                array_push($bookings, $row);
            }
            $sql->close();
            $this->connection->close();
            return $bookings;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Retrieves all records of bookings by booking date
     * Returns bookings object array or false
     */
    public function getBookingsByBookingDate($filter_value)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT DISTINCT 
            b.id booking_id,
            bs.booking_date,
            bs.booking_time, 
            b.booking_status,
            bt.booking_type,
            b.doctor_id,
            b.invoice_id,
            b.receipt_id,
            b.updated_date,
            b.pet_owner_id,
            po.username,
            CONCAT(po.firstname," ",po.lastname) pet_owner,
            b.pet_id,
            p.petname
            FROM 
            `pawsome`.`bookings` b, 
            `pawsome`.`booking_types` bt, 
            `pawsome`.`pet_owners` po, 
            `pawsome`.`pets` p, 
            `pawsome`.`booking_slots` bs
            WHERE 
            p.pet_owner_id = po.id 
            AND b.pet_owner_id = po.id 
            AND b.pet_id = p.id 
            AND b.booking_type_id = bt.id
            AND b.id = bs.booking_id
            AND b.archived = 0
            AND bs.booking_date = STR_TO_DATE(?,"%d-%m-%Y")
            ORDER BY b.updated_date DESC'
        );
        $sql->bind_param(
            's', $filter_value
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $bookings = array();
            while($row=$result->fetch_assoc()){
                array_push($bookings, $row);
            }
            $sql->close();
            $this->connection->close();
            return $bookings;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Retrieves all records of bookings by booking status
     * Returns bookings object array or false
     */
    public function getBookingsByBookingStatus($filter_value)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT DISTINCT 
            b.id booking_id,
            bs.booking_date,
            bs.booking_time, 
            b.booking_status,
            bt.booking_type,
            b.doctor_id,
            b.invoice_id,
            b.receipt_id,
            b.updated_date,
            b.pet_owner_id,
            po.username,
            CONCAT(po.firstname," ",po.lastname) pet_owner,
            b.pet_id,
            p.petname
            FROM 
            `pawsome`.`bookings` b, 
            `pawsome`.`booking_types` bt, 
            `pawsome`.`pet_owners` po, 
            `pawsome`.`pets` p, 
            `pawsome`.`booking_slots` bs
            WHERE 
            p.pet_owner_id = po.id 
            AND b.pet_owner_id = po.id 
            AND b.pet_id = p.id 
            AND b.booking_type_id = bt.id
            AND b.id = bs.booking_id
            AND b.archived = 0
            AND UPPER(b.booking_status) LIKE UPPER(?)
            ORDER BY b.updated_date DESC'
        );
        $q = '%' . $filter_value . '%';
        $sql->bind_param(
            's', $q
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $bookings = array();
            while($row=$result->fetch_assoc()){
                array_push($bookings, $row);
            }
            $sql->close();
            $this->connection->close();
            return $bookings;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Retrieves all records of bookings by booking type
     * Returns bookings object array or false
     */
    public function getBookingsByBookingType($filter_value)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT DISTINCT 
            b.id booking_id,
            bs.booking_date,
            bs.booking_time, 
            b.booking_status,
            bt.booking_type,
            b.doctor_id,
            b.invoice_id,
            b.receipt_id,
            b.updated_date,
            b.pet_owner_id,
            po.username,
            CONCAT(po.firstname," ",po.lastname) pet_owner,
            b.pet_id,
            p.petname
            FROM 
            `pawsome`.`bookings` b, 
            `pawsome`.`booking_types` bt, 
            `pawsome`.`pet_owners` po, 
            `pawsome`.`pets` p, 
            `pawsome`.`booking_slots` bs
            WHERE 
            p.pet_owner_id = po.id 
            AND b.pet_owner_id = po.id 
            AND b.pet_id = p.id 
            AND b.booking_type_id = bt.id
            AND b.id = bs.booking_id
            AND b.archived = 0
            AND UPPER(bt.booking_type) LIKE UPPER(?)
            ORDER BY b.updated_date DESC'
        );
        $q = '%' . $filter_value . '%';
        $sql->bind_param(
            's', $q
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $bookings = array();
            while($row=$result->fetch_assoc()){
                array_push($bookings, $row);
            }
            $sql->close();
            $this->connection->close();
            return $bookings;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Retrieves all records of bookings by username
     * Returns bookings object array or false
     */
    public function getBookingsByUsername($filter_value)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT DISTINCT 
            b.id booking_id,
            bs.booking_date,
            bs.booking_time, 
            b.booking_status,
            bt.booking_type,
            b.doctor_id,
            b.invoice_id,
            b.receipt_id,
            b.updated_date,
            b.pet_owner_id,
            po.username,
            CONCAT(po.firstname," ",po.lastname) pet_owner,
            b.pet_id,
            p.petname
            FROM 
            `pawsome`.`bookings` b, 
            `pawsome`.`booking_types` bt, 
            `pawsome`.`pet_owners` po, 
            `pawsome`.`pets` p, 
            `pawsome`.`booking_slots` bs
            WHERE 
            p.pet_owner_id = po.id 
            AND b.pet_owner_id = po.id 
            AND b.pet_id = p.id 
            AND b.booking_type_id = bt.id
            AND b.id = bs.booking_id
            AND b.archived = 0
            AND UPPER(po.username) LIKE UPPER(?)
            ORDER BY b.updated_date DESC'
        );
        $q = '%' . $filter_value . '%';
        $sql->bind_param(
            's', $q
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $bookings = array();
            while($row=$result->fetch_assoc()){
                array_push($bookings, $row);
            }
            $sql->close();
            $this->connection->close();
            return $bookings;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Retrieves all records of bookings by petname
     * Returns bookings object array or false
     */
    public function getBookingsByPetName($filter_value)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT DISTINCT 
            b.id booking_id,
            bs.booking_date,
            bs.booking_time, 
            b.booking_status,
            bt.booking_type,
            b.doctor_id,
            b.invoice_id,
            b.receipt_id,
            b.updated_date,
            b.pet_owner_id,
            po.username,
            CONCAT(po.firstname," ",po.lastname) pet_owner,
            b.pet_id,
            p.petname
            FROM 
            `pawsome`.`bookings` b, 
            `pawsome`.`booking_types` bt, 
            `pawsome`.`pet_owners` po, 
            `pawsome`.`pets` p, 
            `pawsome`.`booking_slots` bs
            WHERE 
            p.pet_owner_id = po.id 
            AND b.pet_owner_id = po.id 
            AND b.pet_id = p.id 
            AND b.booking_type_id = bt.id
            AND b.id = bs.booking_id
            AND b.archived = 0
            AND UPPER(p.petname) LIKE UPPER(?)
            ORDER BY b.updated_date DESC'
        );
        $q = '%' . $filter_value . '%';
        $sql->bind_param(
            's', $q
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $bookings = array();
            while($row=$result->fetch_assoc()){
                array_push($bookings, $row);
            }
            $sql->close();
            $this->connection->close();
            return $bookings;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Retrieves all records of bookings by pet ID
     * Returns bookings object array or false
     */
    public function getBookingsByPetId($filter_value)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT DISTINCT 
            b.id booking_id,
            bs.booking_date,
            bs.booking_time, 
            b.booking_status,
            bt.booking_type,
            b.doctor_id,
            b.invoice_id,
            b.receipt_id,
            b.updated_date,
            b.pet_owner_id,
            po.username,
            CONCAT(po.firstname," ",po.lastname) pet_owner,
            b.pet_id,
            p.petname
            FROM 
            `pawsome`.`bookings` b, 
            `pawsome`.`booking_types` bt, 
            `pawsome`.`pet_owners` po, 
            `pawsome`.`pets` p, 
            `pawsome`.`booking_slots` bs
            WHERE 
            p.pet_owner_id = po.id 
            AND b.pet_owner_id = po.id 
            AND b.pet_id = p.id 
            AND b.booking_type_id = bt.id
            AND b.id = bs.booking_id
            AND b.archived = 0
            AND p.id = ?
            ORDER BY b.updated_date DESC'
        );
        $sql->bind_param(
            'i', $filter_value
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $bookings = array();
            while($row=$result->fetch_assoc()){
                array_push($bookings, $row);
            }
            $sql->close();
            $this->connection->close();
            return $bookings;
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
                SELECT d.*, "doctors" role FROM doctors d
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
}

?>