<?php
/**
 * Database class where API call queries to be executed for booking information
 */
class BookingDatabase
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
     * Retrieves booking types
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
            $row=$result->fetch_assoc();
            $booking_date = $row['booking_date'];
            $booking_slots = explode(',', $row['booking_time']);
            $taken_slots = [
                'booking_date' => $booking_date,
                'booking_time' => $booking_slots
            ];
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
                SELECT id from all_users 
                WHERE UPPER(username) = UPPER(?)
                AND archived = 0
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
                SELECT id from all_users 
                WHERE UPPER(username) = UPPER(?)
                AND archived = 0
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
                SELECT id from all_users 
                WHERE UPPER(username) = UPPER(?)
                AND archived = 0
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
     * Update data in the bookings table resulting from doctor deletion
     */
    public function updateBookingDoctorAndStatus($booking)
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
                SELECT id from all_users 
                WHERE UPPER(username) = UPPER(?)
                AND archived = 0
            )
            WHERE
            `id` = ?
            '
        );
        $sql->bind_param(
            'sisi',
            $booking['new_status'],
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
                SELECT id from all_users 
                WHERE UPPER(username) = UPPER(?)
                AND archived = 0
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
     * Confirm booking
     */
    public function confirmBooking($booking_record)
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
            SET booking_status = ?,
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
            'UPDATE `pawsome`.`bookings`
            SET 
            archived = 1,
            booking_status = ?,
            updated_date = SYSDATE(),
            updated_by = (
                SELECT id 
                FROM `pawsome`.`doctors` 
                WHERE UPPER(username) = UPPER(?) 
                AND archived = 0)
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
     * Archive booking
     */
    public function archiveBooking($booking_record)
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
            archived = 1,
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
                SELECT id from all_users 
                WHERE UPPER(username) = UPPER(?)
                AND archived = 0
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
     * Archive booking
     */
    public function archiveBookingWoStatusUpdate($booking_record)
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
                SELECT id from all_users 
                WHERE UPPER(username) = UPPER(?)
                AND archived = 0
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
     * Retrieves booking fee
     */
    public function checkBookingFee($booking_id)
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
            bt.booking_fee
            FROM
            `pawsome`.`booking_types` bt,
            `pawsome`.`bookings` b
            WHERE 
            b.booking_type_id = bt.id
            AND b.id = ?'
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
            return $row['booking_fee'];
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Retrieves current booking status
     */
    public function checkBookingStatus($booking_id)
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
            b.booking_status
            FROM 
            `pawsome`.`bookings` b
            WHERE 
            b.id = ?'
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
            'WITH
            payment_info AS (
                SELECT 
                r.booking_id,
                i.id invoice_id,
                r.id receipt_id,
                i.invoice_amount,
                p.payment_status
                FROM
                `pawsome`.`invoices` i,
                `pawsome`.`receipts` r,
                `pawsome`.`payments` p
                WHERE
                r.invoice_id = i.id
                AND r.payment_id = p.id
                AND r.booking_id = i.booking_id
            ),
            booking_info AS (
                SELECT DISTINCT 
                b.id booking_id,
                bs.booking_date,
                GROUP_CONCAT(bs.booking_time separator ",") booking_time, 
                b.booking_status,
                bt.booking_type,
                b.doctor_id,
                b.updated_date,
                b.pet_owner_id,
                b.pet_id,
                IF(b.archived = 0, "ACTIVE", "ARCHIVED") record_status
                FROM 
                `pawsome`.`bookings` b, 
                `pawsome`.`booking_types` bt, 
                `pawsome`.`booking_slots` bs
                WHERE 
                b.booking_type_id = bt.id
                AND b.id = bs.booking_id
                GROUP BY b.id, bs.booking_date
                ORDER BY b.updated_date DESC
            ),
            pet_info AS (
                SELECT DISTINCT 
                po.id pet_owner_id,
                po.username,
                CONCAT(po.firstname," ",po.lastname) pet_owner,
                p.id pet_id,
                p.petname
                FROM 
                `pawsome`.`pet_owners` po, 
                `pawsome`.`pets` p
                WHERE 
                p.pet_owner_id = po.id 
            )
            SELECT DISTINCT 
                booking_info.booking_id,
                booking_info.booking_date,
                booking_info.booking_time, 
                booking_info.booking_status,
                booking_info.booking_type,
                booking_info.doctor_id,
                booking_info.updated_date,
                pet_info.pet_owner_id,
                pet_info.username,
                pet_info.pet_owner,
                pet_info.pet_id,
                pet_info.petname,
                payment_info.invoice_id,
                payment_info.receipt_id,
                payment_info.invoice_amount,
                payment_info.payment_status,
                booking_info.record_status
                FROM 
                booking_info 
                LEFT JOIN pet_info ON booking_info.pet_id = pet_info.pet_id
                LEFT JOIN payment_info ON booking_info.booking_id = payment_info.booking_id
                WHERE booking_info.booking_id LIKE ?'

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
                $row['booking_time'] = explode(',', $row['booking_time']);
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
            'WITH
            payment_info AS (
                SELECT 
                r.booking_id,
                i.id invoice_id,
                r.id receipt_id,
                i.invoice_amount,
                p.payment_status
                FROM
                `pawsome`.`invoices` i,
                `pawsome`.`receipts` r,
                `pawsome`.`payments` p
                WHERE
                r.invoice_id = i.id
                AND r.payment_id = p.id
                AND r.booking_id = i.booking_id
            ),
            booking_info AS (
                SELECT DISTINCT 
                b.id booking_id,
                bs.booking_date,
                GROUP_CONCAT(bs.booking_time separator ",") booking_time, 
                b.booking_status,
                bt.booking_type,
                b.doctor_id,
                b.updated_date,
                b.pet_owner_id,
                b.pet_id,
                IF(b.archived = 0, "ACTIVE", "ARCHIVED") record_status
                FROM 
                `pawsome`.`bookings` b, 
                `pawsome`.`booking_types` bt, 
                `pawsome`.`booking_slots` bs
                WHERE 
                b.booking_type_id = bt.id
                AND b.id = bs.booking_id
                GROUP BY b.id, bs.booking_date
                ORDER BY b.updated_date DESC
            ),
            pet_info AS (
                SELECT DISTINCT 
                po.id pet_owner_id,
                po.username,
                CONCAT(po.firstname," ",po.lastname) pet_owner,
                p.id pet_id,
                p.petname
                FROM 
                `pawsome`.`pet_owners` po, 
                `pawsome`.`pets` p
                WHERE 
                p.pet_owner_id = po.id 
            )
            SELECT DISTINCT 
                booking_info.booking_id,
                booking_info.booking_date,
                booking_info.booking_time, 
                booking_info.booking_status,
                booking_info.booking_type,
                booking_info.doctor_id,
                booking_info.updated_date,
                pet_info.pet_owner_id,
                pet_info.username,
                pet_info.pet_owner,
                pet_info.pet_id,
                pet_info.petname,
                payment_info.invoice_id,
                payment_info.receipt_id,
                payment_info.invoice_amount,
                payment_info.payment_status,
                booking_info.record_status
                FROM 
                booking_info 
                LEFT JOIN pet_info ON booking_info.pet_id = pet_info.pet_id
                LEFT JOIN payment_info ON booking_info.booking_id = payment_info.booking_id
                WHERE booking_info.booking_date = STR_TO_DATE(?,"%d-%m-%Y")'

        );
        $sql->bind_param(
            's', $filter_value
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $bookings = array();
            while($row=$result->fetch_assoc()){
                $row['booking_time'] = explode(',', $row['booking_time']);
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
            'WITH
            payment_info AS (
                SELECT 
                r.booking_id,
                i.id invoice_id,
                r.id receipt_id,
                i.invoice_amount,
                p.payment_status
                FROM
                `pawsome`.`invoices` i,
                `pawsome`.`receipts` r,
                `pawsome`.`payments` p
                WHERE
                r.invoice_id = i.id
                AND r.payment_id = p.id
                AND r.booking_id = i.booking_id
            ),
            booking_info AS (
                SELECT DISTINCT 
                b.id booking_id,
                bs.booking_date,
                GROUP_CONCAT(bs.booking_time separator ",") booking_time, 
                b.booking_status,
                bt.booking_type,
                b.doctor_id,
                b.updated_date,
                b.pet_owner_id,
                b.pet_id,
                IF(b.archived = 0, "ACTIVE", "ARCHIVED") record_status
                FROM 
                `pawsome`.`bookings` b, 
                `pawsome`.`booking_types` bt, 
                `pawsome`.`booking_slots` bs
                WHERE 
                b.booking_type_id = bt.id
                AND b.id = bs.booking_id
                GROUP BY b.id, bs.booking_date
                ORDER BY b.updated_date DESC
            ),
            pet_info AS (
                SELECT DISTINCT 
                po.id pet_owner_id,
                po.username,
                CONCAT(po.firstname," ",po.lastname) pet_owner,
                p.id pet_id,
                p.petname
                FROM 
                `pawsome`.`pet_owners` po, 
                `pawsome`.`pets` p
                WHERE 
                p.pet_owner_id = po.id 
            )
            SELECT DISTINCT 
                booking_info.booking_id,
                booking_info.booking_date,
                booking_info.booking_time, 
                booking_info.booking_status,
                booking_info.booking_type,
                booking_info.doctor_id,
                booking_info.updated_date,
                pet_info.pet_owner_id,
                pet_info.username,
                pet_info.pet_owner,
                pet_info.pet_id,
                pet_info.petname,
                payment_info.invoice_id,
                payment_info.receipt_id,
                payment_info.invoice_amount,
                payment_info.payment_status,
                booking_info.record_status
                FROM 
                booking_info 
                LEFT JOIN pet_info ON booking_info.pet_id = pet_info.pet_id
                LEFT JOIN payment_info ON booking_info.booking_id = payment_info.booking_id
                WHERE UPPER(booking_info.booking_status) LIKE UPPER(?)'
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
                $row['booking_time'] = explode(',', $row['booking_time']);
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
            'WITH
            payment_info AS (
                SELECT 
                r.booking_id,
                i.id invoice_id,
                r.id receipt_id,
                i.invoice_amount,
                p.payment_status
                FROM
                `pawsome`.`invoices` i,
                `pawsome`.`receipts` r,
                `pawsome`.`payments` p
                WHERE
                r.invoice_id = i.id
                AND r.payment_id = p.id
                AND r.booking_id = i.booking_id
            ),
            booking_info AS (
                SELECT DISTINCT 
                b.id booking_id,
                bs.booking_date,
                GROUP_CONCAT(bs.booking_time separator ",") booking_time, 
                b.booking_status,
                bt.booking_type,
                b.doctor_id,
                b.updated_date,
                b.pet_owner_id,
                b.pet_id,
                IF(b.archived = 0, "ACTIVE", "ARCHIVED") record_status
                FROM 
                `pawsome`.`bookings` b, 
                `pawsome`.`booking_types` bt, 
                `pawsome`.`booking_slots` bs
                WHERE 
                b.booking_type_id = bt.id
                AND b.id = bs.booking_id
                GROUP BY b.id, bs.booking_date
                ORDER BY b.updated_date DESC
            ),
            pet_info AS (
                SELECT DISTINCT 
                po.id pet_owner_id,
                po.username,
                CONCAT(po.firstname," ",po.lastname) pet_owner,
                p.id pet_id,
                p.petname
                FROM 
                `pawsome`.`pet_owners` po, 
                `pawsome`.`pets` p
                WHERE 
                p.pet_owner_id = po.id 
            )
            SELECT DISTINCT 
                booking_info.booking_id,
                booking_info.booking_date,
                booking_info.booking_time, 
                booking_info.booking_status,
                booking_info.booking_type,
                booking_info.doctor_id,
                booking_info.updated_date,
                pet_info.pet_owner_id,
                pet_info.username,
                pet_info.pet_owner,
                pet_info.pet_id,
                pet_info.petname,
                payment_info.invoice_id,
                payment_info.receipt_id,
                payment_info.invoice_amount,
                payment_info.payment_status,
                booking_info.record_status
                FROM 
                booking_info 
                LEFT JOIN pet_info ON booking_info.pet_id = pet_info.pet_id
                LEFT JOIN payment_info ON booking_info.booking_id = payment_info.booking_id
                WHERE UPPER(booking_info.booking_type) LIKE UPPER(?)'

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
                $row['booking_time'] = explode(',', $row['booking_time']);
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
            'WITH
            payment_info AS (
                SELECT 
                r.booking_id,
                i.id invoice_id,
                r.id receipt_id,
                i.invoice_amount,
                p.payment_status
                FROM
                `pawsome`.`invoices` i,
                `pawsome`.`receipts` r,
                `pawsome`.`payments` p
                WHERE
                r.invoice_id = i.id
                AND r.payment_id = p.id
                AND r.booking_id = i.booking_id
            ),
            booking_info AS (
                SELECT DISTINCT 
                b.id booking_id,
                bs.booking_date,
                GROUP_CONCAT(bs.booking_time separator ",") booking_time, 
                b.booking_status,
                bt.booking_type,
                b.doctor_id,
                b.updated_date,
                b.pet_owner_id,
                b.pet_id,
                IF(b.archived = 0, "ACTIVE", "ARCHIVED") record_status
                FROM 
                `pawsome`.`bookings` b, 
                `pawsome`.`booking_types` bt, 
                `pawsome`.`booking_slots` bs
                WHERE 
                b.booking_type_id = bt.id
                AND b.id = bs.booking_id
                GROUP BY b.id, bs.booking_date
                ORDER BY b.updated_date DESC
            ),
            pet_info AS (
                SELECT DISTINCT 
                po.id pet_owner_id,
                po.username,
                CONCAT(po.firstname," ",po.lastname) pet_owner,
                p.id pet_id,
                p.petname
                FROM 
                `pawsome`.`pet_owners` po, 
                `pawsome`.`pets` p
                WHERE 
                p.pet_owner_id = po.id 
            )
            SELECT DISTINCT 
                booking_info.booking_id,
                booking_info.booking_date,
                booking_info.booking_time, 
                booking_info.booking_status,
                booking_info.booking_type,
                booking_info.doctor_id,
                booking_info.updated_date,
                pet_info.pet_owner_id,
                pet_info.username,
                pet_info.pet_owner,
                pet_info.pet_id,
                pet_info.petname,
                payment_info.invoice_id,
                payment_info.receipt_id,
                payment_info.invoice_amount,
                payment_info.payment_status,
                booking_info.record_status
                FROM 
                booking_info 
                LEFT JOIN pet_info ON booking_info.pet_id = pet_info.pet_id
                LEFT JOIN payment_info ON booking_info.booking_id = payment_info.booking_id
                WHERE UPPER(pet_info.username) LIKE UPPER(?)'
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
                $row['booking_time'] = explode(',', $row['booking_time']);
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
            'WITH
            payment_info AS (
                SELECT 
                r.booking_id,
                i.id invoice_id,
                r.id receipt_id,
                i.invoice_amount,
                p.payment_status
                FROM
                `pawsome`.`invoices` i,
                `pawsome`.`receipts` r,
                `pawsome`.`payments` p
                WHERE
                r.invoice_id = i.id
                AND r.payment_id = p.id
                AND r.booking_id = i.booking_id
            ),
            booking_info AS (
                SELECT DISTINCT 
                b.id booking_id,
                bs.booking_date,
                GROUP_CONCAT(bs.booking_time separator ",") booking_time, 
                b.booking_status,
                bt.booking_type,
                b.doctor_id,
                b.updated_date,
                b.pet_owner_id,
                b.pet_id,
                IF(b.archived = 0, "ACTIVE", "ARCHIVED") record_status
                FROM 
                `pawsome`.`bookings` b, 
                `pawsome`.`booking_types` bt, 
                `pawsome`.`booking_slots` bs
                WHERE 
                b.booking_type_id = bt.id
                AND b.id = bs.booking_id
                GROUP BY b.id, bs.booking_date
                ORDER BY b.updated_date DESC
            ),
            pet_info AS (
                SELECT DISTINCT 
                po.id pet_owner_id,
                po.username,
                CONCAT(po.firstname," ",po.lastname) pet_owner,
                p.id pet_id,
                p.petname
                FROM 
                `pawsome`.`pet_owners` po, 
                `pawsome`.`pets` p
                WHERE 
                p.pet_owner_id = po.id 
            )
            SELECT DISTINCT 
                booking_info.booking_id,
                booking_info.booking_date,
                booking_info.booking_time, 
                booking_info.booking_status,
                booking_info.booking_type,
                booking_info.doctor_id,
                booking_info.updated_date,
                pet_info.pet_owner_id,
                pet_info.username,
                pet_info.pet_owner,
                pet_info.pet_id,
                pet_info.petname,
                payment_info.invoice_id,
                payment_info.receipt_id,
                payment_info.invoice_amount,
                payment_info.payment_status,
                booking_info.record_status
                FROM 
                booking_info 
                LEFT JOIN pet_info ON booking_info.pet_id = pet_info.pet_id
                LEFT JOIN payment_info ON booking_info.booking_id = payment_info.booking_id
                WHERE UPPER(pet_info.petname) LIKE UPPER(?)'

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
                $row['booking_time'] = explode(',', $row['booking_time']);
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
            'WITH
            payment_info AS (
                SELECT 
                r.booking_id,
                i.id invoice_id,
                r.id receipt_id,
                i.invoice_amount,
                p.payment_status
                FROM
                `pawsome`.`invoices` i,
                `pawsome`.`receipts` r,
                `pawsome`.`payments` p
                WHERE
                r.invoice_id = i.id
                AND r.payment_id = p.id
                AND r.booking_id = i.booking_id
            ),
            booking_info AS (
                SELECT DISTINCT 
                b.id booking_id,
                bs.booking_date,
                GROUP_CONCAT(bs.booking_time separator ",") booking_time, 
                b.booking_status,
                bt.booking_type,
                b.doctor_id,
                b.updated_date,
                b.pet_owner_id,
                b.pet_id,
                IF(b.archived = 0, "ACTIVE", "ARCHIVED") record_status
                FROM 
                `pawsome`.`bookings` b, 
                `pawsome`.`booking_types` bt, 
                `pawsome`.`booking_slots` bs
                WHERE 
                b.booking_type_id = bt.id
                AND b.id = bs.booking_id
                GROUP BY b.id, bs.booking_date
                ORDER BY b.updated_date DESC
            ),
            pet_info AS (
                SELECT DISTINCT 
                po.id pet_owner_id,
                po.username,
                CONCAT(po.firstname," ",po.lastname) pet_owner,
                p.id pet_id,
                p.petname
                FROM 
                `pawsome`.`pet_owners` po, 
                `pawsome`.`pets` p
                WHERE 
                p.pet_owner_id = po.id 
            )
            SELECT DISTINCT 
                booking_info.booking_id,
                booking_info.booking_date,
                booking_info.booking_time, 
                booking_info.booking_status,
                booking_info.booking_type,
                booking_info.doctor_id,
                booking_info.updated_date,
                pet_info.pet_owner_id,
                pet_info.username,
                pet_info.pet_owner,
                pet_info.pet_id,
                pet_info.petname,
                payment_info.invoice_id,
                payment_info.receipt_id,
                payment_info.invoice_amount,
                payment_info.payment_status,
                booking_info.record_status
                FROM 
                booking_info 
                LEFT JOIN pet_info ON booking_info.pet_id = pet_info.pet_id
                LEFT JOIN payment_info ON booking_info.booking_id = payment_info.booking_id
                WHERE pet_info.pet_id = ?'

        );
        $sql->bind_param(
            'i', $filter_value
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $bookings = array();
            while($row=$result->fetch_assoc()){
                $row['booking_time'] = explode(',', $row['booking_time']);
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
     * Retrieves all records of bookings by doctor ID
     */
    public function getBookingsByDoctorId($filter_value)
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
            payment_info AS (
                SELECT 
                r.booking_id,
                i.id invoice_id,
                r.id receipt_id,
                i.invoice_amount,
                p.payment_status
                FROM
                `pawsome`.`invoices` i,
                `pawsome`.`receipts` r,
                `pawsome`.`payments` p
                WHERE
                r.invoice_id = i.id
                AND r.payment_id = p.id
                AND r.booking_id = i.booking_id
            ),
            booking_info AS (
                SELECT DISTINCT 
                b.id booking_id,
                bs.booking_date,
                GROUP_CONCAT(bs.booking_time separator ",") booking_time, 
                b.booking_status,
                bt.booking_type,
                b.doctor_id,
                b.updated_date,
                b.pet_owner_id,
                b.pet_id,
                IF(b.archived = 0, "ACTIVE", "ARCHIVED") record_status
                FROM 
                `pawsome`.`bookings` b, 
                `pawsome`.`booking_types` bt, 
                `pawsome`.`booking_slots` bs
                WHERE 
                b.booking_type_id = bt.id
                AND b.id = bs.booking_id
                GROUP BY b.id, bs.booking_date
                ORDER BY b.updated_date DESC
            ),
            pet_info AS (
                SELECT DISTINCT 
                po.id pet_owner_id,
                po.username,
                CONCAT(po.firstname," ",po.lastname) pet_owner,
                p.id pet_id,
                p.petname
                FROM 
                `pawsome`.`pet_owners` po, 
                `pawsome`.`pets` p
                WHERE 
                p.pet_owner_id = po.id 
            )
            SELECT DISTINCT 
                booking_info.booking_id,
                booking_info.booking_date,
                booking_info.booking_time, 
                booking_info.booking_status,
                booking_info.booking_type,
                booking_info.doctor_id,
                booking_info.updated_date,
                pet_info.pet_owner_id,
                pet_info.username,
                pet_info.pet_owner,
                pet_info.pet_id,
                pet_info.petname,
                payment_info.invoice_id,
                payment_info.receipt_id,
                payment_info.invoice_amount,
                payment_info.payment_status,
                booking_info.record_status
                FROM 
                booking_info 
                LEFT JOIN pet_info ON booking_info.pet_id = pet_info.pet_id
                LEFT JOIN payment_info ON booking_info.booking_id = payment_info.booking_id
                WHERE booking_info.doctor_id = ?'

        );
        $sql->bind_param(
            'i', $filter_value
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $bookings = array();
            while($row=$result->fetch_assoc()){
                $row['booking_time'] = explode(',', $row['booking_time']);
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
     * Retrieves all records of bookings by pet owner ID
     */
    public function getBookingsByPetOwnerId($filter_value)
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
            payment_info AS (
                SELECT 
                r.booking_id,
                i.id invoice_id,
                r.id receipt_id,
                i.invoice_amount,
                p.payment_status
                FROM
                `pawsome`.`invoices` i,
                `pawsome`.`receipts` r,
                `pawsome`.`payments` p
                WHERE
                r.invoice_id = i.id
                AND r.payment_id = p.id
                AND r.booking_id = i.booking_id
            ),
            booking_info AS (
                SELECT DISTINCT 
                b.id booking_id,
                bs.booking_date,
                GROUP_CONCAT(bs.booking_time separator ",") booking_time, 
                b.booking_status,
                bt.booking_type,
                b.doctor_id,
                b.updated_date,
                b.pet_owner_id,
                b.pet_id,
                IF(b.archived = 0, "ACTIVE", "ARCHIVED") record_status
                FROM 
                `pawsome`.`bookings` b, 
                `pawsome`.`booking_types` bt, 
                `pawsome`.`booking_slots` bs
                WHERE 
                b.booking_type_id = bt.id
                AND b.id = bs.booking_id
                GROUP BY b.id, bs.booking_date
                ORDER BY b.updated_date DESC
            ),
            pet_info AS (
                SELECT DISTINCT 
                po.id pet_owner_id,
                po.username,
                CONCAT(po.firstname," ",po.lastname) pet_owner,
                p.id pet_id,
                p.petname
                FROM 
                `pawsome`.`pet_owners` po, 
                `pawsome`.`pets` p
                WHERE 
                p.pet_owner_id = po.id 
            )
            SELECT DISTINCT 
                booking_info.booking_id,
                booking_info.booking_date,
                booking_info.booking_time, 
                booking_info.booking_status,
                booking_info.booking_type,
                booking_info.doctor_id,
                booking_info.updated_date,
                pet_info.pet_owner_id,
                pet_info.username,
                pet_info.pet_owner,
                pet_info.pet_id,
                pet_info.petname,
                payment_info.invoice_id,
                payment_info.receipt_id,
                payment_info.invoice_amount,
                payment_info.payment_status,
                booking_info.record_status
                FROM 
                booking_info 
                LEFT JOIN pet_info ON booking_info.pet_id = pet_info.pet_id
                LEFT JOIN payment_info ON booking_info.booking_id = payment_info.booking_id
                WHERE pet_info.pet_owner_id = ?'

        );
        $sql->bind_param(
            'i', $filter_value
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $bookings = array();
            while($row=$result->fetch_assoc()){
                $row['booking_time'] = explode(',', $row['booking_time']);
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
     * Retrieves all records of bookings by invoice ID
     */
    public function getBookingsByInvoiceId($filter_value)
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
            payment_info AS (
                SELECT 
                r.booking_id,
                i.id invoice_id,
                r.id receipt_id,
                i.invoice_amount,
                p.payment_status
                FROM
                `pawsome`.`invoices` i,
                `pawsome`.`receipts` r,
                `pawsome`.`payments` p
                WHERE
                r.invoice_id = i.id
                AND r.payment_id = p.id
                AND r.booking_id = i.booking_id
            ),
            booking_info AS (
                SELECT DISTINCT 
                b.id booking_id,
                bs.booking_date,
                GROUP_CONCAT(bs.booking_time separator ",") booking_time, 
                b.booking_status,
                bt.booking_type,
                b.doctor_id,
                b.updated_date,
                b.pet_owner_id,
                b.pet_id,
                IF(b.archived = 0, "ACTIVE", "ARCHIVED") record_status
                FROM 
                `pawsome`.`bookings` b, 
                `pawsome`.`booking_types` bt, 
                `pawsome`.`booking_slots` bs
                WHERE 
                b.booking_type_id = bt.id
                AND b.id = bs.booking_id
                GROUP BY b.id, bs.booking_date
                ORDER BY b.updated_date DESC
            ),
            pet_info AS (
                SELECT DISTINCT 
                po.id pet_owner_id,
                po.username,
                CONCAT(po.firstname," ",po.lastname) pet_owner,
                p.id pet_id,
                p.petname
                FROM 
                `pawsome`.`pet_owners` po, 
                `pawsome`.`pets` p
                WHERE 
                p.pet_owner_id = po.id 
            )
            SELECT DISTINCT 
                booking_info.booking_id,
                booking_info.booking_date,
                booking_info.booking_time, 
                booking_info.booking_status,
                booking_info.booking_type,
                booking_info.doctor_id,
                booking_info.updated_date,
                pet_info.pet_owner_id,
                pet_info.username,
                pet_info.pet_owner,
                pet_info.pet_id,
                pet_info.petname,
                payment_info.invoice_id,
                payment_info.receipt_id,
                payment_info.invoice_amount,
                payment_info.payment_status,
                booking_info.record_status
                FROM 
                booking_info 
                LEFT JOIN pet_info ON booking_info.pet_id = pet_info.pet_id
                LEFT JOIN payment_info ON booking_info.booking_id = payment_info.booking_id
                WHERE payment_info.invoice_id = ?'

        );
        $sql->bind_param(
            'i', $filter_value
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $bookings = array();
            while($row=$result->fetch_assoc()){
                $row['booking_time'] = explode(',', $row['booking_time']);
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
     * Retrieves all records of bookings by receipt ID
     */
    public function getBookingsByReceiptId($filter_value)
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
            payment_info AS (
                SELECT 
                r.booking_id,
                i.id invoice_id,
                r.id receipt_id,
                i.invoice_amount,
                p.payment_status
                FROM
                `pawsome`.`invoices` i,
                `pawsome`.`receipts` r,
                `pawsome`.`payments` p
                WHERE
                r.invoice_id = i.id
                AND r.payment_id = p.id
                AND r.booking_id = i.booking_id
            ),
            booking_info AS (
                SELECT DISTINCT 
                b.id booking_id,
                bs.booking_date,
                GROUP_CONCAT(bs.booking_time separator ",") booking_time, 
                b.booking_status,
                bt.booking_type,
                b.doctor_id,
                b.updated_date,
                b.pet_owner_id,
                b.pet_id,
                IF(b.archived = 0, "ACTIVE", "ARCHIVED") record_status
                FROM 
                `pawsome`.`bookings` b, 
                `pawsome`.`booking_types` bt, 
                `pawsome`.`booking_slots` bs
                WHERE 
                b.booking_type_id = bt.id
                AND b.id = bs.booking_id
                GROUP BY b.id, bs.booking_date
                ORDER BY b.updated_date DESC
            ),
            pet_info AS (
                SELECT DISTINCT 
                po.id pet_owner_id,
                po.username,
                CONCAT(po.firstname," ",po.lastname) pet_owner,
                p.id pet_id,
                p.petname
                FROM 
                `pawsome`.`pet_owners` po, 
                `pawsome`.`pets` p
                WHERE 
                p.pet_owner_id = po.id 
            )
            SELECT DISTINCT 
                booking_info.booking_id,
                booking_info.booking_date,
                booking_info.booking_time, 
                booking_info.booking_status,
                booking_info.booking_type,
                booking_info.doctor_id,
                booking_info.updated_date,
                pet_info.pet_owner_id,
                pet_info.username,
                pet_info.pet_owner,
                pet_info.pet_id,
                pet_info.petname,
                payment_info.invoice_id,
                payment_info.receipt_id,
                payment_info.invoice_amount,
                payment_info.payment_status,
                booking_info.record_status
                FROM 
                booking_info 
                LEFT JOIN pet_info ON booking_info.pet_id = pet_info.pet_id
                LEFT JOIN payment_info ON booking_info.booking_id = payment_info.booking_id
                WHERE payment_info.receipt_id = ?'

        );
        $sql->bind_param(
            'i', $filter_value
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $bookings = array();
            while($row=$result->fetch_assoc()){
                $row['booking_time'] = explode(',', $row['booking_time']);
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
     * Retrieves current booking slots by booking ID
     */
    public function getBookingSlotByBookingId($booking_id)
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
                DATE_FORMAT(bs.booking_date, "%d-%m-%Y") booking_date,
                GROUP_CONCAT(bs.booking_time separator ",") booking_time
            FROM 
                `pawsome`.`booking_slots` bs
            WHERE 
                bs.booking_id = ? 
            GROUP BY bs.booking_date'

        );
        $sql->bind_param(
            'i', $booking_id
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $row=$result->fetch_assoc();
            $booking_date = $row['booking_date'];
            $booking_slots = explode(',', $row['booking_time']);
            $booking = [
                'booking_date' => $booking_date,
                'booking_time' => $booking_slots
            ];
            $sql->close();
            $this->connection->close();
            return $booking;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }
    
}

?>