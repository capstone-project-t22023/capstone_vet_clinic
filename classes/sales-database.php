<?php
/**
 * Database class where API call queries to be executed for billing information
 */
class SalesDatabase
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
     * Insert data into sales invoice table
     */
    public function createNewSalesInvoice($username)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'INSERT INTO `pawsome`.`sales_invoices`
            (`updated_date`,
            `updated_by`,
            `archived`)
            VALUES
            (SYSDATE(),
            (
                SELECT id from `pawsome`.`admins` 
                WHERE UPPER(username) = UPPER(?)
                AND archived = 0
            ),
            0)'
        );
        $sql->bind_param(
            's', $username
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
     * Insert data into sales invoice items table
     */
    public function createNewSalesInvoiceItem($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'INSERT INTO `pawsome`.`sales_invoice_items`
            (`sales_invoice_id`,
            `item_category_id`,
            `item_id`,
            `quantity`,
            `unit_amount`,
            `total_amount`)
            VALUES
            ((SELECT id 
             FROM `pawsome`.`sales_invoices`
             WHERE id = ?),
            (SELECT inventory_item_category_id 
             FROM `pawsome`.`inventory_items`
             WHERE id = ?),
            (SELECT id 
             FROM `pawsome`.`inventory_items`
             WHERE id = ?),?,
            (SELECT unit_price 
             FROM `pawsome`.`inventory_items` 
             WHERE id = ?),
            (SELECT (unit_price * ?) total_price 
             FROM `pawsome`.`inventory_items` 
             WHERE id = ?))'
        );
        $sql->bind_param(
            'iiiiiii', 
            $record['sales_invoice_id'],
            $record['item_id'],
            $record['item_id'],
            $record['quantity'],
            $record['item_id'],
            $record['quantity'],
            $record['item_id']
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
     * Delete data from sales invoice table
     */
    public function deleteSalesInvoicebyId($id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'DELETE FROM`pawsome`.`sales_invoices`
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
     * Delete data from sales invoice items table
     */
    public function deleteSalesInvoiceItembyInvoiceId($id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'DELETE FROM`pawsome`.`sales_invoice_items`
            WHERE sales_invoice_id = ?'
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
     * Update sales invoice amount
     */
    public function updateSalesInvoiceAmount($invoice_record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'UPDATE `pawsome`.`sales_invoices` 
             SET 
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
             ),
             invoice_amount = (
              SELECT SUM(total_amount) total_amount
              FROM `pawsome`.`sales_invoice_items`  
              WHERE sales_invoice_id = ?  
             ),
             payment_id = ?
             WHERE id=?'
        );
        $sql->bind_param(
            'siii',
            $invoice_record['username'],
            $invoice_record['sales_invoice_id'],
            $invoice_record['payment_id'],
            $invoice_record['sales_invoice_id'],
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