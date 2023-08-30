<?php
/**
 * Database class where API call queries to be executed for billing information
 */
class BillingDatabase
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
     * Checks if existing invoice for booking
     */
    public function checkInvoiceByBookingId($booking_id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT COUNT(*) invoice_count
            FROM
            `pawsome`.`invoices`
            WHERE booking_id = ?'
        );

        $sql->bind_param(
            'i', $booking_id
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $invoice_count = $result->fetch_assoc();
            $sql->close();
            $this->connection->close();
            return $invoice_count;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Insert data into invoice table
     */
    public function createNewInvoice($invoice_info)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'INSERT INTO `pawsome`.`invoices`
            (`booking_id`,
            `updated_date`,
            `updated_by`,
            `archived`)
            VALUES
            (?,
            SYSDATE(),
            (SELECT id FROM doctors where UPPER(username) = UPPER(?)),
            0)'
        );
        $sql->bind_param(
            'is',
            $invoice_info['booking_id'],
            $invoice_info['username']
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
     * Delete data from invoice table
     */
    public function deleteInvoice($invoice_id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'DELETE FROM `pawsome`.`invoices`
            WHERE id=?'
        );
        $sql->bind_param(
            'i', $invoice_id
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
     * Delete data from payments table
     */
    public function deletePayment($payment_id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'DELETE FROM `pawsome`.`payments`
            WHERE id=?'
        );
        $sql->bind_param(
            'i', $payment_id
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
     * Delete data from payment history table
     */
    public function deletePaymentHistory($payment_id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'DELETE FROM `pawsome`.`payment_history`
            WHERE payment_id=?'
        );
        $sql->bind_param(
            'i', $payment_id
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
     * Insert data into invoice items table
     */
    public function insertNewInvoiceItem($invoice_record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'INSERT INTO `pawsome`.`invoice_items`
            (`invoice_id`,
            `item_category_id`,
            `item_id`,
            `quantity`,
            `unit_amount`,
            `total_amount`)
            VALUES
            ((SELECT id 
              FROM `pawsome`.`invoices` 
              WHERE id = ?),
            (SELECT inventory_item_category_id 
             FROM `pawsome`.`inventory_items`
             WHERE id = ?),
             ?,?,
            (SELECT unit_price 
             FROM `pawsome`.`inventory_items` 
             WHERE id = ?),
            (SELECT (unit_price * ?) total_price 
             FROM `pawsome`.`inventory_items` 
             WHERE id = ?))'
        );
        $sql->bind_param(
            'iiiiiii',
            $invoice_record['invoice_id'],
            $invoice_record['item_id'],
            $invoice_record['item_id'],
            $invoice_record['quantity'],
            $invoice_record['item_id'],
            $invoice_record['quantity'],
            $invoice_record['item_id']
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
     * Delete data from invoice_items table
     */
    public function deleteInvoiceItemByInvoiceId($invoice_id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'DELETE FROM `pawsome`.`invoice_items`
            WHERE invoice_id=?'
        );
        $sql->bind_param(
            'i', $invoice_id
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
     * Insert data into invoice items table
     */
    public function insertNewInvoiceBookingItem($booking_invoice_record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'INSERT INTO `pawsome`.`invoice_items`
            (`invoice_id`,
            `item_category_id`,
            `item_id`,
            `quantity`,
            `unit_amount`,
            `total_amount`)
            VALUES
            ((SELECT id 
              FROM `pawsome`.`invoices` 
              WHERE id = ?),
            (SELECT id 
             FROM `pawsome`.`inventory_item_categories`
             WHERE id = ?),?,?,?,?)'
        );
        $sql->bind_param(
            'iiiidd',
            $booking_invoice_record['invoice_id'],
            $booking_invoice_record['item_category_id'],
            $booking_invoice_record['item_id'],
            $booking_invoice_record['quantity'],
            $booking_invoice_record['booking_fee'],
            $booking_invoice_record['booking_fee']
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
     * Update invoice amount
     */
    public function updateInvoiceAmount($invoice_record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'UPDATE `pawsome`.`invoices` 
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
              FROM `pawsome`.`invoice_items`  
              WHERE invoice_id = ?  
             )
             WHERE booking_id=?'
        );
        $sql->bind_param(
            'sii',
            $invoice_record['username'],
            $invoice_record['invoice_id'],
            $invoice_record['booking_id']
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
     * Retrieves invoice item records by ID
     */
    public function getInvoiceItemsByInvoiceId($invoice_id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT `invoice_items`.`item_category_id`,
            `invoice_items`.`item_id`,
            `invoice_items`.`quantity`,
            `invoice_items`.`unit_amount`,
            `invoice_items`.`total_amount`
            FROM `pawsome`.`invoice_items`
            WHERE 
            invoice_id = ?'
        );
        $sql->bind_param(
            'i', $invoice_id
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $items = array();
            while($row=$result->fetch_assoc()){
                array_push($items, $row);
            }
            $sql->close();
            $this->connection->close();
            return $items;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Retrieves invoice records by ID
     */
    public function getInvoiceByInvoiceId($invoice_id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT `invoices`.`id`,
            `invoices`.`booking_id`,
            `invoices`.`invoice_amount`
            FROM `pawsome`.`invoices`
            WHERE 
            id = ?'
        );
        $sql->bind_param(
            'i', $invoice_id
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
     * Retrieves invoice records by ID
     */
    public function getCurrentPaymentStatus($payment_id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT `payments`.`payment_status`
            FROM `pawsome`.`payments`
            WHERE id = ?'
        );
        $sql->bind_param(
            'i', $payment_id
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
     * Insert data into receipts table
     */
    public function insertNewReceipt($receipt_record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'INSERT INTO `pawsome`.`receipts`
            (`booking_id`,
            `invoice_id`,
            `payment_id`,
            `updated_date`,
            `updated_by`,
            `archived`)
            VALUES
            (?,?,?,
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
            'iiis',
            $receipt_record['booking_id'],
            $receipt_record['invoice_id'],
            $receipt_record['payment_id'],
            $receipt_record['username']
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
     * Retrieves receipt records by ID
     */
    public function getReceiptByInvoiceId($invoice_id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT `receipts`.`id`,
                `receipts`.`payment_id`,
                `receipts`.`booking_id`,
                `receipts`.`invoice_id`
            FROM `pawsome`.`receipts`
            WHERE invoice_id = ?'
        );
        $sql->bind_param(
            'i', $invoice_id
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
     * Retrieves receipt records by ID
     */
    public function getReceiptByPaymentId($payment_id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT `receipts`.`id`,
                `receipts`.`payment_id`,
                `receipts`.`booking_id`,
                `receipts`.`invoice_id`
            FROM `pawsome`.`receipts`
            WHERE payment_id = ?'
        );
        $sql->bind_param(
            'i', $payment_id
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
     * Retrieves receipt records by ID
     */
    public function getAllReceiptInfoById($receipt_id)
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
            po.id pet_owner_id,
            po.username,
            pets.id pet_id,
            pets.petname,
            b.id as booking_id,
            b.booking_type_id,
            b.doctor_id,
            i.id as invoice_id,
            r.id as receipt_id,
            i.invoice_amount,
            p.payment_paid,
            p.payment_status,
            p.payment_date
            FROM 
            receipts r,
            invoices i,
            bookings b, 
            payments p,
            pet_owners po,
            pets pets
            WHERE r.booking_id = b.id
            AND r.invoice_id = i.id
            AND r.payment_id = p.id
            AND po.id = b.pet_owner_id
            AND pets.id = b.pet_id
            AND r.id = ?'
        );
        $sql->bind_param(
            'i', $receipt_id
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
     * Retrieves payment ID
     */
    public function getPaymentId($invoice_id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT `receipts`.`payment_id`
            FROM `pawsome`.`receipts`
            WHERE invoice_id = ?'
        );
        $sql->bind_param(
            'i', $invoice_id
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
     * Insert data into payments table
     */
    public function insertNewPayment($payment_record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'INSERT INTO `pawsome`.`payments`
            (`payment_status`,
            `payment_balance`,
            `payment_paid`,
            `payment_change`,
            `updated_by`,
            `updated_date`)
            VALUES
            (?,?,0,0,
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
            SYSDATE())'
        );
        $sql->bind_param(
            'sds',
            $payment_record['payment_status'],
            $payment_record['payment_balance'],
            $payment_record['username']
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
     * Update payments record
     */
    public function updatePaymentBalance($payment_record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'UPDATE `pawsome`.`payments`
            SET
            `payment_status` = ?,
            `payment_balance` = ?,
            `updated_by` = (
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
            `updated_date` = SYSDATE()
            WHERE `id` = ?'
        );
        $sql->bind_param(
            'sdsi',
            $payment_record['payment_status'],
            $payment_record['payment_balance'],
            $payment_record['username'],
            $payment_record['payment_id']
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
     * Retrieves payment information
     */
    public function getPaymentInformation($invoice_id)
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
                `payments`.`id`,
                `payments`.`payment_by`,
                `payments`.`payment_date`,
                `payments`.`payment_method`,
                `payments`.`payment_status`,
                `payments`.`payment_balance`
            FROM `pawsome`.`payments`
            WHERE id = (
                SELECT payment_id
                FROM `receipts`
                WHERE invoice_id = ?
            )'
        );
        $sql->bind_param(
            'i', $invoice_id
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
     * Update data into payments table
     */
    public function acceptPayment($payment_info)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'UPDATE `pawsome`.`payments`
            SET
            `payment_by` = (
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
            `payment_date` = SYSDATE(),
            `payment_method` = ?,
            `payment_status` = ?,
            `payment_balance` = ROUND(?,2),
            `payment_paid` = ROUND(?,2),
            `payment_change` = ROUND(?,2),
            `updated_by` = (
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
            `updated_date` = SYSDATE()
            WHERE `id` = ?'
        );
        $sql->bind_param(
            'sssdddsi',
            $payment_info['payment_by'],
            $payment_info['payment_method'],
            $payment_info['payment_status'],
            $payment_info['payment_balance'],
            $payment_info['payment_paid'],
            $payment_info['payment_change'],
            $payment_info['username'],
            $payment_info['payment_id']
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
     * Update data into receipts table
     */
    public function updateReceipts($receipt_record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'UPDATE `pawsome`.`receipts`
            SET
            `updated_by` = (
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
            `updated_date` = SYSDATE()
            WHERE `payment_id` = ?'
        );
        $sql->bind_param(
            'si',
            $receipt_record['username'],
            $receipt_record['payment_id']
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
     * Insert data into payment history table
     */
    public function addPaymentHistory($payment_history)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'INSERT INTO `pawsome`.`payment_history`
            (`payment_id`,
            `prev_payment_status`,
            `new_payment_status`,
            `updated_date`,
            `updated_by`)
            VALUES
            (?,?,?,
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
            ))'
        );
        $sql->bind_param(
            'isss',
            $payment_history['payment_id'],
            $payment_history['prev_payment_status'],
            $payment_history['new_payment_status'],
            $payment_history['username']
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
     * Archive invoice data
     */
    public function archiveInvoices($invoice_record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'UPDATE `pawsome`.`invoices`
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
            $invoice_record['username'],
            $invoice_record['invoice_id']
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
     * Archive receipts data
     */
    public function archiveReceipts($receipt_record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'UPDATE `pawsome`.`receipts`
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
            $receipt_record['username'],
            $receipt_record['receipt_id']
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