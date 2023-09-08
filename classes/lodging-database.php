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
            `discharge_date`= STR_TO_DATE(?, "%d-%m-%Y"),
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
            'siissssi', 
            $record['cage_status'],
            $record['pet_id'],
            $record['assigned_doctor'],
            $record['confinement_date'],
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

}

?>