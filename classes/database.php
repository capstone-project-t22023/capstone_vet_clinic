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
            'INSERT INTO doctors (`firstname`, `lastname`, `username`, `password`, `address`, `state`, `email`, `phone`, `postcode`, `status`, `created_date`) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
        );
        $sql->bind_param(
            'sssssssiiis',
            $doctor['firstname'],
            $doctor['lastname'],
            $doctor['username'],
            $doctor['password'],
            $doctor['address'],
            $doctor['state'],
            $doctor['email'],
            $doctor['phone'],
            $doctor['postcode'],
            $doctor['status'],
            $doctor['created_date']
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
            'INSERT INTO admins (`firstname`, `lastname`, `username`, `password`, `address`, `state`, `email`, `phone`, `postcode`, `status`, `created_date`) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
        );
        $sql->bind_param(
            'sssssssiiis',
            $admin['firstname'],
            $admin['lastname'],
            $admin['username'],
            $admin['password'],
            $admin['address'],
            $admin['state'],
            $admin['email'],
            $admin['phone'],
            $admin['postcode'],
            $admin['status'],
            $admin['created_date']
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
            'INSERT INTO pet_owners (`firstname`, `lastname`, `username`, `password`, `address`, `state`, `email`, `phone`, `postcode`, `status`, `created_date`) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
        );
        $sql->bind_param(
            'sssssssiiis',
            $pet_owner['firstname'],
            $pet_owner['lastname'],
            $pet_owner['username'],
            $pet_owner['password'],
            $pet_owner['address'],
            $pet_owner['state'],
            $pet_owner['email'],
            $pet_owner['phone'],
            $pet_owner['postcode'],
            $pet_owner['status'],
            $pet_owner['created_date']
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
     * Activates doctor by setting status to 1
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
            'UPDATE `doctors` SET `status` = 1 WHERE id=?'
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
     * Activates admin by setting status to 1
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
            'UPDATE `admins` SET `status` = 1 WHERE id=?'
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
     * Activates pet_owner by setting status to 1
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
            'UPDATE `pet_owners` SET `status` = 1 WHERE id=?'
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
            'SELECT DISTINCT * FROM `doctors` WHERE username=?'
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
            'SELECT DISTINCT * FROM `admins` WHERE username=?'
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
            'SELECT DISTINCT * FROM `pet_owners` WHERE username=?'
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
            'SELECT DISTINCT * FROM `doctors` WHERE status=1 ORDER BY lastname'
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
            'SELECT DISTINCT * FROM `admins` WHERE status=1 ORDER BY lastname'
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
            'SELECT DISTINCT * FROM `pet_owners` WHERE status=1 ORDER BY lastname'
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
     * Delete doctor info by id
     * Returns true or false 
     */
    public function deleteDoctor($doctor_id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql_tokens = $this->connection->prepare(
            'DELETE FROM `doctor_account_tokens` WHERE `doctor_id`=?'
        );
        $sql_tokens->bind_param(
            'i', $doctor_id
        );

        $sql = $this->connection->prepare(
            'DELETE FROM `doctors` WHERE `id`=?'
        );
        $sql->bind_param(
            'i', $doctor_id
        );

        if ($sql_tokens->execute()) {
            if($sql->execute()){
                $sql->close();
                $sql_tokens->close();
                $this->connection->close();
                return true;
            }
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Delete admin info by id
     * Returns true or false 
     */
    public function deleteAdmin($admin_id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql_tokens = $this->connection->prepare(
            'DELETE FROM `admin_account_tokens` WHERE `admin_id`=?'
        );
        $sql_tokens->bind_param(
            'i', $admin_id
        );

        $sql = $this->connection->prepare(
            'DELETE FROM `admins` WHERE `id`=?'
        );
        $sql->bind_param(
            'i', $admin_id
        );

        if ($sql_tokens->execute()) {
            if($sql->execute()){
                $sql->close();
                $sql_tokens->close();
                $this->connection->close();
                return true;
            }
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Delete pet owner info by id
     * Returns true or false 
     */
    public function deletePetOwner($pet_owner_id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql_tokens = $this->connection->prepare(
            'DELETE FROM `pet_owners_account_tokens` WHERE `pet_owner_id`=?'
        );
        $sql_tokens->bind_param(
            'i', $pet_owner_id
        );

        $sql = $this->connection->prepare(
            'DELETE FROM `pet_owners` WHERE `id`=?'
        );
        $sql->bind_param(
            'i', $pet_owner_id
        );

        if ($sql_tokens->execute()) {
            if($sql->execute()){
                $sql->close();
                $sql_tokens->close();
                $this->connection->close();
                return true;
            }
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
            'UPDATE `doctors`
            SET
            firstname = ?,
            lastname = ?,
            address = ?,
            state = ?,
            email = ?,
            phone = ?,
            postcode = ?,
            status = ?
            WHERE id = ?'
        ); 
        $sql->bind_param(
            'sssssiiii', 
            $record['firstname'],
            $record['lastname'],
            $record['address'],
            $record['state'],
            $record['email'],
            $record['phone'],
            $record['postcode'],
            $record['status'],
            $record['doctor_id'],
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
            'UPDATE `admins`
            SET
            firstname = ?,
            lastname = ?,
            address = ?,
            state = ?,
            email = ?,
            phone = ?,
            postcode = ?,
            status = ?
            WHERE id = ?'
        ); 
        $sql->bind_param(
            'sssssiiii', 
            $record['firstname'],
            $record['lastname'],
            $record['address'],
            $record['state'],
            $record['email'],
            $record['phone'],
            $record['postcode'],
            $record['status'],
            $record['admin_id'],
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
            'UPDATE `pet_owners`
            SET
            firstname = ?,
            lastname = ?,
            address = ?,
            state = ?,
            email = ?,
            phone = ?,
            postcode = ?,
            status = ?
            WHERE id = ?'
        ); 
        $sql->bind_param(
            'sssssiiii', 
            $record['firstname'],
            $record['lastname'],
            $record['address'],
            $record['state'],
            $record['email'],
            $record['phone'],
            $record['postcode'],
            $record['status'],
            $record['pet_owner_id'],
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
            'INSERT INTO `pet_information` 
            (`petname`, `species`, `breed`, `birthdate`,`weight`,`comments`,`update_date`)
            VALUES
            (?,?,?,?,?,?,SYSDATE())'
        ); 
        $sql->bind_param(
            'ssssds', 
            $record['petname'],
            $record['species'],
            $record['breed'],
            $record['birthdate'],
            $record['weight'],
            $record['comments']
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
            'UPDATE `pet_information` 
            SET 
            petname=?, 
            species=?, 
            breed=?, 
            birthdate=?,
            weight=?,
            comments=?,
            update_date=SYSDATE()
            WHERE
            id =?'
        ); 
        $sql->bind_param(
            'ssssdsi', 
            $record['petname'],
            $record['species'],
            $record['breed'],
            $record['birthdate'],
            $record['weight'],
            $record['comments'],
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
        $sql = $this->connection->prepare(
            'DELETE `pet_information` 
            WHERE
            id =?'
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
     * Get pet information
     * Returns true or false 
     */
    public function getPet($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT * FROM `pet_information` 
            WHERE
            id =?'
        ); 
        $sql->bind_param(
            'i', 
            $record['id']
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
}

?>