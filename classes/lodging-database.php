<?php
/**
 * Database class where API call queries to be executed for lodging information
 */
class LodgingDatabase
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
     * Add lodging
     */
    public function addLodging($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'INSERT INTO `pawsome`.`lodgings`
            (`cage_status`,
            `pet_id`,
            `assigned_doctor`,
            `confinement_date`,
            `discharge_date`,
            `comments`,
            `updated_date`,
            `updated_by`,
            `archived`)
            VALUES
            (?,
            (SELECT id from `pawsome`.`pets` WHERE id = ?),
            (SELECT id from `pawsome`.`doctors` WHERE id = ?),
            STR_TO_DATE(?, "%d-%m-%Y"),
            STR_TO_DATE(?, "%d-%m-%Y"),
            ?,
            SYSDATE(),
            (
                SELECT id from `pawsome`.`admins` 
                WHERE UPPER(username) = UPPER(?)
                AND archived = 0
            ),
            0)'
        ); 
        $sql->bind_param(
            'siissss', 
            $record['cage_status'],
            $record['pet_id'],
            $record['assigned_doctor'],
            $record['confinement_date'],
            $record['discharge_date'],
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
     * Update lodging
     */
    public function updateLodging($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'UPDATE `pawsome`.`lodgings`
            SET
            `cage_status` = ?,
            `pet_id`= (SELECT id from `pawsome`.`pets` WHERE id = ?),
            `assigned_doctor`= (SELECT id from `pawsome`.`doctors` WHERE id = ?),
            `confinement_date`= STR_TO_DATE(?, "%d-%m-%Y"),
            `comments`= ?,
            `updated_date`= SYSDATE(),
            `updated_by` = (
                SELECT id from `pawsome`.`admins` 
                WHERE UPPER(username) = UPPER(?)
                AND archived = 0
            )
            WHERE id = ?'
        ); 
        $sql->bind_param(
            'siisssi', 
            $record['cage_status'],
            $record['pet_id'],
            $record['assigned_doctor'],
            $record['confinement_date'],
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
     * Delete lodging
     */
    public function deleteLodging($id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'DELETE FROM `pawsome`.`lodgings`
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

    /**
     * Retrieves all lodging records
     */
    public function getAllLodging()
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
            l.id cage_id,
            l.cage_status,
            p.id pet_id,
            p.petname,
            po.id pet_owner_id,
            concat(po.firstname, " ", po.lastname) pet_owner_name,
            po.phone,
            d.id doctor_id,
            concat(d.firstname, " ", d.lastname) doctor_name,
            IF(l.confinement_date IS NULL || l.confinement_date = DATE_FORMAT("00-00-0000", "%d-%m-%Y"), null, DATE_FORMAT(l.confinement_date, "%d-%m-%Y")) confinement_date,
            IF(l.discharge_date IS NULL || l.discharge_date = DATE_FORMAT("00-00-0000", "%d-%m-%Y"), null, DATE_FORMAT(l.discharge_date, "%d-%m-%Y")) discharge_date,
            l.comments,
            l.updated_date,
            a.id admin_id,
            concat(a.firstname, " ", a.lastname) admin_name
            FROM 
            `pawsome`.`lodgings` l
            LEFT JOIN `pawsome`.`pets` p ON l.pet_id = p.id
            LEFT JOIN`pawsome`.`doctors` d ON l.assigned_doctor = d.id
            LEFT JOIN`pawsome`.`admins` a ON l.updated_by = a.id
            LEFT JOIN`pawsome`.`pet_owners` po ON  p.pet_owner_id = po.id'
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $cages = array();
            while($row=$result->fetch_assoc()){
                array_push($cages, $row);
            }
            $sql->close();
            $this->connection->close();
            return $cages;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Retrieves all lodging records by pet ID
     */
    public function getLodgingByPetId($pet_id)
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
            l.id cage_id,
            l.cage_status,
            p.id pet_id,
            p.petname,
            po.id pet_owner_id,
            concat(po.firstname, " ", po.lastname) pet_owner_name,
            po.phone,
            d.id doctor_id,
            concat(d.firstname, " ", d.lastname) doctor_name,
            STR_TO_DATE(l.confinement_date, "%d-%m-%Y") confinement_date,
            STR_TO_DATE(l.discharge_date, "%d-%m-%Y") discharge_date,
            l.comments,
            l.updated_date,
            a.id admin_id,
            concat(a.firstname, " ", a.lastname) admin_name
            FROM 
            `pawsome`.`lodgings` l
            LEFT JOIN `pawsome`.`pets` p ON l.pet_id = p.id
            LEFT JOIN`pawsome`.`doctors` d ON l.assigned_doctor = d.id
            LEFT JOIN`pawsome`.`admins` a ON l.updated_by = a.id
            LEFT JOIN`pawsome`.`pet_owners` po ON  p.pet_owner_id = po.id
            WHERE p.id = ?'
        );
        $sql->bind_param(
            'i', $pet_id
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $cages = array();
            while($row=$result->fetch_assoc()){
                array_push($cages, $row);
            }
            $sql->close();
            $this->connection->close();
            return $cages;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Discharge Pet
     */
    public function dischargePet($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'UPDATE `pawsome`.`lodgings`
            SET
            `cage_status` = "AVAILABLE",
            `pet_id`= null,
            `assigned_doctor`= null,
            `confinement_date`= null,
            `discharge_date`= null,
            `comments`= null,
            `updated_date`= SYSDATE(),
            `updated_by` = (
                SELECT id from `pawsome`.`admins` 
                WHERE UPPER(username) = UPPER(?)
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
}

?>