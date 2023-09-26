<?php
/**
 * Database class where API call queries to be executed for inventory information
 */
class InventoryDatabase
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
     * Retrieves all inventory categories records
     */
    public function getAllInventoryCategories()
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
            iic.id category_id,
            iic.item_category category
            FROM
            inventory_item_categories iic
            WHERE iic.archived = 0'
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
     * Retrieves all mapped inventory categories and items
     */
    public function getAllMappedInventory()
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
                `inventory_items`.`inventory_item_category_id` item_category_id,
                `inventory_item_categories`.`item_category`,
                `inventory_items`.`id` item_id,
                `inventory_items`.`item_name`,
                `inventory_items`.`in_use_qty`,
                `inventory_items`.`in_stock_qty`,
                `inventory_items`.`threshold_qty`,
                `inventory_items`.`weight_volume`,
                `inventory_items`.`item_unit`,
                `inventory_items`.`production_date`,
                `inventory_items`.`expiration_date`,
                `inventory_items`.`unit_price`
            FROM 
            `pawsome`.`inventory_items`,
            `pawsome`.`inventory_item_categories`
            WHERE
            `inventory_items`.inventory_item_category_id = `inventory_item_categories`.id'
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
     * Retrieves all inventory categories records
     */
    public function getInventoryCategoriesById($category_id)
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
            iic.id category_id,
            iic.item_category category
            FROM
            inventory_item_categories iic
            WHERE iic.archived = 0
            AND iic.id = ?'
        );

        $sql->bind_param(
            'i', $category_id
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $item = $result->fetch_assoc();
            $sql->close();
            $this->connection->close();
            return $item;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Retrieves all inventory records
     */
    public function getAllInventoryByCategory($category_id)
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
            ii.id item_id,
            ii.item_name,
            ii.in_use_qty,
            ii.in_stock_qty,
            ii.threshold_qty,
            ii.weight_volume,
            ii.item_unit,
            ii.production_date,
            ii.expiration_date,
            ii.unit_price
            FROM
            inventory_item_categories iic,
            inventory_items ii
            WHERE
            iic.id = ii.inventory_item_category_id
            AND iic.archived = 0
            AND ii.archived = 0
            AND iic.id = ?
            ORDER BY iic.id,ii.item_name'
        );
        $sql->bind_param(
            'i', $category_id
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
     * Update inventory qty
     */
    public function updateInUseQty($inventory_record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'UPDATE `pawsome`.`inventory_items`
            SET
            `in_use_qty` = ?,
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
            'isi',
            $inventory_record['in_use_qty'],
            $inventory_record['username'],
            $inventory_record['item_id']
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
     * Retrieves current quantity by item_id
     */
    public function getCurrentInUseQty($item_id)
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
            in_use_qty
            FROM
            `pawsome`.`inventory_items`
            WHERE archived = 0
            AND id = ?'
        );

        $sql->bind_param(
            'i', $item_id
        );
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $in_use_qty = $result->fetch_assoc();
            $sql->close();
            $this->connection->close();
            return $in_use_qty;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    /**
     * Add inventory category
     */
    public function addInventoryCategory($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'INSERT INTO `pawsome`.`inventory_item_categories`
            (`item_category`,
            `updated_by`,
            `updated_date`,
            `archived`)
            VALUES
            (?,
            (
                SELECT id from `pawsome`.`admins` 
                WHERE UPPER(username) = UPPER(?)
                AND archived = 0
            ),
            SYSDATE(),
            0)'
        ); 
        $sql->bind_param(
            'ss', 
            $record['item_category'],
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
     * Update inventory category
     */
    public function updateInventoryCategory($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'UPDATE `pawsome`.`inventory_item_categories`
            SET
            `item_category` = ?,
            `updated_by` = (
                SELECT id from `pawsome`.`admins` 
                WHERE UPPER(username) = UPPER(?)
                AND archived = 0
            ),
            `updated_date` = SYSDATE()
            WHERE id = ?'
        ); 
        $sql->bind_param(
            'ssi', 
            $record['item_category'],
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
     * Delete inventory category
     */
    public function deleteInventoryCategory($id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'DELETE FROM `pawsome`.`inventory_item_categories`
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
     * Add inventory category item
     */
    public function addInventoryItem($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'INSERT INTO `pawsome`.`inventory_items`
            (`inventory_item_category_id`,
            `item_name`,
            `in_use_qty`,
            `in_stock_qty`,
            `threshold_qty`,
            `weight_volume`,
            `item_unit`,
            `production_date`,
            `expiration_date`,
            `unit_price`,
            `updated_by`,
            `updated_date`,
            `archived`)
            VALUES
            (
            (SELECT id FROM
            inventory_item_categories
            WHERE id = ?),
            ?,?,?,?,?,?,
            STR_TO_DATE(?, "%d-%m-%Y"),
            STR_TO_DATE(?, "%d-%m-%Y"),
            ?,
            (
                SELECT id from `pawsome`.`admins` 
                WHERE UPPER(username) = UPPER(?)
                AND archived = 0
            ),
            SYSDATE(),0)'
        ); 
        $sql->bind_param(
            'isiiidsssds', 
            $record['inventory_item_category_id'],
            $record['item_name'],
            $record['in_use_qty'],
            $record['in_stock_qty'],
            $record['threshold_qty'],
            $record['weight_volume'],
            $record['item_unit'],
            $record['production_date'],
            $record['expiration_date'],
            $record['unit_price'],
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
     * Update inventory category item
     */
    public function updateInventoryItem($record)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'UPDATE `pawsome`.`inventory_items`
            SET
            `inventory_item_category_id` = (
                SELECT id FROM
                inventory_item_categories
                WHERE id = ?
            ),
            `item_name`= ?,
            `in_use_qty`= ?,
            `in_stock_qty`= ?,
            `threshold_qty`= ?,
            `weight_volume`= ?,
            `item_unit`= ?,
            `production_date` = STR_TO_DATE(?, "%d-%m-%Y"),
            `expiration_date` = STR_TO_DATE(?, "%d-%m-%Y"),
            `unit_price` =?,
            `updated_by` = (
                SELECT id from `pawsome`.`admins` 
                WHERE UPPER(username) = UPPER(?)
                AND archived = 0
            ),
            `updated_date` = SYSDATE()
            WHERE id = ?'
        ); 
        $sql->bind_param(
            'isiiidsssdsi', 
            $record['inventory_item_category_id'],
            $record['item_name'],
            $record['in_use_qty'],
            $record['in_stock_qty'],
            $record['threshold_qty'],
            $record['weight_volume'],
            $record['item_unit'],
            $record['production_date'],
            $record['expiration_date'],
            $record['unit_price'],
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
     * Delete inventory item
     */
    public function deleteInventoryItem($id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'DELETE FROM `pawsome`.`inventory_items`
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
     * Delete inventory item by name --- for lodgings
     */
    public function deleteInventoryItemByName($inv_item_name)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'DELETE FROM `pawsome`.`inventory_items`
            WHERE item_name = ?'
        ); 
        $sql->bind_param(
            's', $inv_item_name
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
     * Delete inventory item by category
     */
    public function deleteInventoryItemByCategory($id)
    {
        $this->connection = new mysqli(
            $this->server,
            $this->db_uname,
            $this->db_pwd,
            $this->db_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'DELETE FROM `pawsome`.`inventory_items`
            WHERE inventory_item_category_id = ?'
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