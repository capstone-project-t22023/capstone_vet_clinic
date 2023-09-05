DROP DATABASE IF EXISTS `pawsome`;
CREATE DATABASE IF NOT EXISTS `pawsome`;
USE `pawsome`;
commit;

DROP USER IF EXISTS 'pawsome_admin'@'localhost';
CREATE USER 'pawsome_admin'@'localhost' IDENTIFIED BY 'pawsome_admin2023';
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, INDEX, ALTER, CREATE VIEW, EXECUTE ON *.* TO 'pawsome_admin'@'localhost' REQUIRE NONE WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;
FLUSH PRIVILEGES;
commit;

SET FOREIGN_KEY_CHECKS=0;
SET SQL_SAFE_UPDATES = 0;

DROP TABLE IF EXISTS `pawsome`.`admins`;
CREATE TABLE `pawsome`.`admins` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Unique key of this table',
  `firstname` varchar(50) NOT NULL COMMENT 'First name of admin',
  `lastname` varchar(50) DEFAULT NULL COMMENT 'Last name of admin',
  `username` varchar(20) NOT NULL COMMENT 'Username to be used for login',
  `password` varchar(255) NOT NULL COMMENT 'Password to be used for login',
  `address` varchar(100) NOT NULL COMMENT 'Address of user',
  `state` varchar(100) NOT NULL COMMENT 'State where address is found',
  `email` varchar(100) NOT NULL COMMENT 'Email of user',
  `phone` int(11) NOT NULL COMMENT 'Phone of user',
  `postcode` int(4) NOT NULL COMMENT 'Postcode of address entered by user',
  `archived` int(1) NOT NULL COMMENT 'Indicates id record is active or not',
  `created_date` datetime NOT NULL COMMENT 'Creation date of user account',
  `updated_date` datetime NOT NULL COMMENT 'Timestamp of update',
  `updated_by` int(10) DEFAULT NULL COMMENT 'User ID who updated the record',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) AUTO_INCREMENT=501;
commit;

DROP TABLE IF EXISTS `pawsome`.`admin_account_tokens`;
CREATE TABLE IF NOT EXISTS `pawsome`.`admin_account_tokens` (
  `admin_id` int(11) COMMENT "Foreign key from admins table" NOT NULL,
  `code` varchar(5) COMMENT "Unique token to confirm admin, used for JWT" NOT NULL,
  UNIQUE KEY `admin_id` (`admin_id`),
  FOREIGN KEY (`admin_id`) REFERENCES admins(`id`)
);
commit;

DROP TABLE IF EXISTS `pawsome`.`doctors`;
CREATE TABLE `pawsome`.`doctors` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Unique key of this table',
  `firstname` varchar(50) NOT NULL COMMENT 'First name of doctor',
  `lastname` varchar(50) DEFAULT NULL COMMENT 'Last name of doctor',
  `username` varchar(20) NOT NULL COMMENT 'Username to be used for login',
  `password` varchar(255) NOT NULL COMMENT 'Password to be used for login',
  `address` varchar(100) NOT NULL COMMENT 'Address of user',
  `state` varchar(100) NOT NULL COMMENT 'State where address is found',
  `email` varchar(100) NOT NULL COMMENT 'Email of user',
  `phone` int(11) NOT NULL COMMENT 'Phone of user',
  `postcode` int(4) NOT NULL COMMENT 'Postcode of address entered by user',
  `archived` int(1) NOT NULL COMMENT 'Indicates id record is active or not',
  `created_date` datetime NOT NULL COMMENT 'Creation date of user account',
  `updated_date` datetime NOT NULL COMMENT 'Timestamp of update',
  `updated_by` int(10) DEFAULT NULL COMMENT 'User ID who updated the record',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `id_UNIQUE` (`id`)
);
commit;

DROP TABLE IF EXISTS `pawsome`.`doctor_account_tokens`;
CREATE TABLE IF NOT EXISTS `pawsome`.`doctor_account_tokens` (
  `doctor_id` int(10) COMMENT "Foreign key from doctors table" NOT NULL,
  `code` varchar(5) COMMENT "Unique token to confirm doctor, used for JWT" NOT NULL,
  UNIQUE KEY `doctor_id` (`doctor_id`),
  FOREIGN KEY (`doctor_id`) REFERENCES doctors(`id`)
);
commit;

DROP TABLE IF EXISTS `pawsome`.`pet_owners`;
CREATE TABLE `pawsome`.`pet_owners` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Unique key of this table',
  `firstname` varchar(50) NOT NULL COMMENT 'First name of pet owner',
  `lastname` varchar(50) DEFAULT NULL COMMENT 'Last name of pet owner',
  `username` varchar(20) NOT NULL COMMENT 'Username to be used for login',
  `password` varchar(255) NOT NULL COMMENT 'Password to be used for login',
  `address` varchar(100) NOT NULL COMMENT 'Address of user',
  `state` varchar(100) NOT NULL COMMENT 'State where address is found',
  `email` varchar(100) NOT NULL COMMENT 'Email of user',
  `phone` int(11) NOT NULL COMMENT 'Phone of user',
  `postcode` int(4) NOT NULL COMMENT 'Postcode of address entered by user',
  `archived` int(1) NOT NULL COMMENT 'Indicates id record is active or not',
  `created_date` datetime NOT NULL COMMENT 'Creation date of user account',
  `updated_date` datetime NOT NULL COMMENT 'Timestamp of update',
  `updated_by` int(10) DEFAULT NULL COMMENT 'User ID who updated the record',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) AUTO_INCREMENT=1001;
commit;

DROP TABLE IF EXISTS `pawsome`.`pet_owners_account_tokens`;
CREATE TABLE IF NOT EXISTS `pawsome`.`pet_owners_account_tokens` (
  `pet_owner_id` int(10) COMMENT "Foreign key from pet_owners table" NOT NULL,
  `code` varchar(5) COMMENT "Unique token to confirm pet owners, used for JWT" NOT NULL,
  UNIQUE KEY `pet_owner_id` (`pet_owner_id`),
  FOREIGN KEY (`pet_owner_id`) REFERENCES pet_owners(`id`)
);
commit;

DROP TABLE IF EXISTS `pawsome`.`pets`;
CREATE TABLE `pawsome`.`pets` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Unique key of this table',
  `pet_owner_id` int(10) NOT NULL COMMENT 'Referenced pet owner',
  `petname` varchar(50) NOT NULL COMMENT 'Name of pet',
  `species` varchar(50) NOT NULL COMMENT 'Species of pet',
  `breed` varchar(50) NOT NULL COMMENT 'Breed of pet',
  `birthdate` date NOT NULL COMMENT 'Birthdate of pet',
  `weight` decimal(5,2) NOT NULL COMMENT 'Weight of pet',
  `sex` varchar(10) NOT NULL COMMENT 'Sex of pet',
  `microchip_no` varchar(15) DEFAULT NULL COMMENT 'Microchip identifier of pet',
  `insurance_membership` varchar(10) DEFAULT NULL COMMENT 'Insurance owned under pet’s name',
  `insurance_expiry` date DEFAULT NULL COMMENT 'Expiration date of insurance under pet’s name',
  `comments` varchar(1000) DEFAULT NULL COMMENT 'Other comments for pet information like colour, behaviour, allergies',
  `updated_date` datetime NOT NULL COMMENT 'Update date of record',
  `updated_by` int(10) NOT NULL COMMENT 'User ID who updated the record',
  `archived` int(1) DEFAULT NULL COMMENT 'Indicates if pet record is still actively used or not',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `microchip_n_UNIQUE` (`microchip_no`),
  CONSTRAINT `fk_pet_po` FOREIGN KEY (`pet_owner_id`) REFERENCES `pet_owners` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);
commit;

DROP TABLE IF EXISTS `pawsome`.`booking_types`;
CREATE TABLE `pawsome`.`booking_types` (
  `id` INT(10) NOT NULL AUTO_INCREMENT,
  `booking_type` VARCHAR(50) NOT NULL COMMENT 'Description of booking',
  `booking_fee` FLOAT(2) NOT NULL COMMENT 'Fee associated with booking type',
  `updated_date` datetime NOT NULL COMMENT 'Update date of record',
  `updated_by` int(10) NOT NULL COMMENT 'User ID who updated the record',
  `archived` INT(1) NULL COMMENT 'Indicates id record is active or not',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `booking_type_id_UNIQUE` (`id`),
  UNIQUE INDEX `booking_type_UNIQUE` (`booking_type`));
commit;


DROP TABLE IF EXISTS `pawsome`.`invoices`;
CREATE TABLE `pawsome`.`invoices` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Unique key of this table',
  `booking_id` int(10) NOT NULL COMMENT 'Referenced booking ID',
  `invoice_amount` decimal(5,2) DEFAULT NULL,
  `updated_date` datetime NOT NULL COMMENT 'Update date of record',
  `updated_by` int(10) NOT NULL COMMENT 'User ID who updated the record',
  `archived` int(1) DEFAULT NULL COMMENT 'Indicates id record is active or not',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `booking_id_UNIQUE` (`booking_id`),
  KEY `fk_invoices_b_idx` (`booking_id`),
  CONSTRAINT `fk_invoices_b` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) AUTO_INCREMENT=300000;

DROP TABLE IF EXISTS `pawsome`.`invoice_items`;
CREATE TABLE `pawsome`.`invoice_items` (
  `invoice_id` int(10) NOT NULL COMMENT 'Reference invoice ID',
  `item_category_id` int(10) NOT NULL COMMENT 'Reference item category ID',
  `item_id` int(10) NOT NULL COMMENT 'Item identifier',
  `quantity` int(11) NOT NULL COMMENT 'Quantity of items',
  `unit_amount` decimal(5,2) NOT NULL COMMENT 'Amount per unit',
  `total_amount` decimal(5,2) NOT NULL COMMENT 'Total amount times quantity',
  KEY `fk_invoice_items_i_idx` (`invoice_id`),
  CONSTRAINT `fk_invoice_items_i` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `pawsome`.`receipts`;
CREATE TABLE `pawsome`.`receipts` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Unique key of this table',
  `booking_id` int(10) NOT NULL COMMENT 'Referenced booking ID',
  `invoice_id` int(10) NOT NULL COMMENT 'Referenced invoice ID',
  `payment_id` int(10) DEFAULT NULL COMMENT 'Referenced payment ID',
  `updated_date` datetime NOT NULL COMMENT 'Update date of record',
  `updated_by` int(10) NOT NULL COMMENT 'User ID who updated the record',
  `archived` int(1) DEFAULT NULL COMMENT 'Indicates id record is active or not',
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `invoice_id_UNIQUE` (`invoice_id`),
  UNIQUE KEY `booking_id_UNIQUE` (`booking_id`),
  KEY `fk_receipts_p_idx` (`payment_id`),
  CONSTRAINT `fk_receipts_b` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_receipts_i` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_receipts_p` FOREIGN KEY (`payment_id`) REFERENCES `payments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) AUTO_INCREMENT=500000;

DROP TABLE IF EXISTS `pawsome`.`bookings`;
CREATE TABLE `pawsome`.`bookings` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Unique key of this table',
  `booking_status` varchar(15) NOT NULL COMMENT 'Status of booking',
  `booking_type_id` int(10) NOT NULL COMMENT 'Referenced booking type',
  `pet_owner_id` int(10) NOT NULL COMMENT 'Referenced pet owner',
  `pet_id` int(10) NOT NULL COMMENT 'Referenced pet',
  `doctor_id` int(10) DEFAULT NULL COMMENT 'Referenced doctor',
  `updated_date` datetime NOT NULL COMMENT 'Update date of record',
  `updated_by` int(10) NOT NULL COMMENT 'User ID who updated the record',
  `archived` int(1) NOT NULL COMMENT 'Indicates id record is active or not',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_booking_p` (`pet_id`),
  KEY `fk_booking_po` (`pet_owner_id`),
  KEY `fk_booking_bt` (`booking_type_id`),
  KEY `fk_booking_d_idx` (`doctor_id`),
  CONSTRAINT `fk_booking_bt` FOREIGN KEY (`booking_type_id`) REFERENCES `booking_types` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_booking_d` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_booking_p` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_booking_po` FOREIGN KEY (`pet_owner_id`) REFERENCES `pet_owners` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) AUTO_INCREMENT=10000000;
commit;

DROP TABLE IF EXISTS `pawsome`.`booking_slots`;
CREATE TABLE `pawsome`.`booking_slots` (
  `booking_id` int(10) NOT NULL COMMENT 'Referenced booking ',
  `booking_date` date NOT NULL COMMENT 'Date of booking',
  `booking_time` varchar(45) NOT NULL COMMENT 'Time slot of booking'
);

DROP TABLE IF EXISTS `pawsome`.`booking_history`;
CREATE TABLE `pawsome`.`booking_history` (
  `booking_id` int(10) NOT NULL COMMENT 'Referenced booking ',
  `prev_status` varchar(15) DEFAULT NULL COMMENT 'Previous booking state',
  `new_status` varchar(15) DEFAULT NULL COMMENT 'New booking state',
  `updated_date` datetime NOT NULL COMMENT 'Booking update date',
  `updated_by` int(10) NOT NULL COMMENT 'Booking updated by user ID'
);

DROP TABLE IF EXISTS `pawsome`.`inventory_item_categories`;
CREATE TABLE `pawsome`.`inventory_item_categories` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier',
  `item_category` varchar(50) NOT NULL COMMENT 'Category name of item',
  `updated_by` int(10) DEFAULT NULL COMMENT 'Updated by user ID',
  `updated_date` datetime DEFAULT NULL COMMENT 'Updated date',
  `archived` int(1) DEFAULT NULL COMMENT 'Archived indicator',
  PRIMARY KEY (`id`),
  UNIQUE KEY `item_category_UNIQUE` (`item_category`),
  UNIQUE KEY `id_UNIQUE` (`id`)
);

DROP TABLE IF EXISTS `pawsome`.`inventory_items`;
CREATE TABLE `pawsome`.`inventory_items` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier',
  `inventory_item_category_id` int(10) NOT NULL COMMENT 'Referenced category ID',
  `item_name` varchar(100) NOT NULL COMMENT 'Name of item',
  `in_use_qty` int(11) NOT NULL DEFAULT 0 COMMENT 'Out of storage quantity',
  `in_stock_qty` int(11) NOT NULL DEFAULT 0 COMMENT 'Stored inventory',
  `threshold_qty` int(11) NOT NULL DEFAULT 0 COMMENT 'Ordering level of inventory',
  `weight_volume` decimal(5,2) NOT NULL COMMENT 'Weight or volume of item',
  `item_unit` varchar(20) NOT NULL COMMENT 'Unit (grams, pieces, tablets, etc.)',
  `production_date` date DEFAULT NULL COMMENT 'Production date',
  `expiration_date` date DEFAULT NULL COMMENT 'Expiration date',
  `unit_price` decimal(5,2) NOT NULL COMMENT 'Price per item',
  `updated_by` int(10) DEFAULT NULL COMMENT 'Updated by user',
  `updated_date` datetime DEFAULT NULL COMMENT 'Updated date',
  `archived` int(1) DEFAULT NULL COMMENT 'Archived indicator',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_inventory_items_iic_idx` (`inventory_item_category_id`),
  CONSTRAINT `fk_inventory_items_iic` FOREIGN KEY (`inventory_item_category_id`) REFERENCES `inventory_item_categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

DROP TABLE IF EXISTS `pawsome`.`lodgings`;
CREATE TABLE `pawsome`.`lodgings` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Unique key of this table',
  `cage_status` varchar(20) NOT NULL DEFAULT 'AVAILABLE' COMMENT 'Status of cage/lodging',
  `pet_id` int(10) DEFAULT NULL COMMENT 'Referenced pet ID',
  `assigned_doctor` int(10) DEFAULT NULL COMMENT 'Referenced doctor ID',
  `confinement_date` datetime DEFAULT NULL COMMENT 'Start of confinement date',
  `discharge_date` datetime DEFAULT NULL COMMENT 'Start of discharge date',
  `comments` varchar(500) DEFAULT NULL COMMENT 'Additional comments',
  `updated_date` date DEFAULT NULL COMMENT 'Date of update',
  `updated_by` int(10) DEFAULT NULL COMMENT 'Updated by user',
  `archived` int(1) DEFAULT NULL COMMENT 'Archived indicator',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_lodgings_d_idx` (`assigned_doctor`),
  KEY `fk_lodgings_p_idx` (`pet_id`),
  CONSTRAINT `fk_lodgings_d` FOREIGN KEY (`assigned_doctor`) REFERENCES `doctors` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_lodgings_p` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

DROP TABLE IF EXISTS `pawsome`.`payments`;
CREATE TABLE `pawsome`.`payments` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier',
  `payment_by` int(10) DEFAULT NULL COMMENT 'Payment made by user ID',
  `payment_date` datetime DEFAULT NULL COMMENT 'Date of payment',
  `payment_method` varchar(50) DEFAULT NULL COMMENT 'Method of payment',
  `payment_status` varchar(50) NOT NULL COMMENT 'Status of payment',
  `payment_balance` decimal(5,2) NOT NULL COMMENT 'Remaining balance',
  `payment_paid` decimal(5,2) NOT NULL COMMENT 'Amount received from customer',
  `payment_change` decimal(5,2) DEFAULT NULL COMMENT 'Change returned from payment made',
  `updated_by` int(10) NOT NULL COMMENT 'Updated by user',
  `updated_date` datetime NOT NULL COMMENT 'Updated date',
  PRIMARY KEY (`id`),
  KEY `fk_payments_po_idx` (`payment_by`),
  CONSTRAINT `fk_payments_po` FOREIGN KEY (`payment_by`) REFERENCES `pet_owners` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

DROP TABLE IF EXISTS `pawsome`.`payment_history`;
CREATE TABLE `pawsome`.`payment_history` (
  `payment_id` int(10) NOT NULL COMMENT 'Referenced payment ID',
  `prev_payment_status` varchar(15) DEFAULT NULL COMMENT 'Previous payment status',
  `new_payment_status` varchar(15) DEFAULT NULL COMMENT 'New payment status',
  `updated_date` datetime DEFAULT NULL COMMENT 'Update date of record',
  `updated_by` int(10) DEFAULT NULL COMMENT 'User ID who updated the record',
  KEY `fk_payment_history_p_idx` (`payment_id`),
  CONSTRAINT `fk_payment_history_p` FOREIGN KEY (`payment_id`) REFERENCES `payments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `pawsome`.`prescriptions`;
CREATE TABLE `pawsome`.`prescriptions` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier',
  `pet_id` int(10) NOT NULL COMMENT 'Referenced pet ID',
  `doctor_id` int(10) NOT NULL COMMENT 'Referenced doctor ID',
  `prescription_date` date NOT NULL COMMENT 'Date of prescription',
  `updated_date` datetime DEFAULT NULL COMMENT 'Updated date',
  `updated_by` int(10) DEFAULT NULL COMMENT 'Updated by user ID',
  `archived` int(1) DEFAULT NULL COMMENT 'Archived indicator',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_prescriptions_p_idx` (`pet_id`),
  KEY `fk_prescriptions_d_idx` (`doctor_id`),
  CONSTRAINT `fk_prescriptions_d` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_prescriptions_p` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

DROP TABLE IF EXISTS `pawsome`.`pet_diet_records`;
CREATE TABLE `pawsome`.`pet_diet_records` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier',
  `prescription_id` int(10) NOT NULL COMMENT 'Referenced prescription ID',
  `product` varchar(100) NOT NULL COMMENT 'Product to be consumed',
  `serving_portion` varchar(100) NOT NULL COMMENT 'Weight or volume of serving',
  `morning` varchar(1) DEFAULT NULL COMMENT 'Meal should be given in the morning',
  `evening` varchar(1) DEFAULT NULL COMMENT 'Meal should be given in the evening',
  `comments` varchar(500) DEFAULT NULL COMMENT 'Additional comments',
  `updated_date` date DEFAULT NULL COMMENT 'Updated date',
  `updated_by` int(10) DEFAULT NULL COMMENT 'Updated by user ID',
  `archived` int(1) DEFAULT NULL COMMENT 'Archived indicator',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_diet_pres_idx` (`prescription_id`),
  CONSTRAINT `fk_diet_pres` FOREIGN KEY (`prescription_id`) REFERENCES `prescriptions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

DROP TABLE IF EXISTS `pawsome`.`pet_doc_uploads`;
CREATE TABLE `pawsome`.`pet_doc_uploads` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier',
  `pet_id` int(10) NOT NULL COMMENT 'Referenced pet ID',
  `file_type` varchar(100) NOT NULL COMMENT 'Document type (referral, lab, invoice, other)',
  `file_name` varchar(100) NOT NULL COMMENT 'Name of file',
  `upload_date` date NOT NULL COMMENT 'Upload date',
  `uploaded_by` int(10) NOT NULL COMMENT 'Uploaded by user',
  `archived` int(1) DEFAULT NULL COMMENT 'Archived indicator',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_uploads_p_idx` (`pet_id`),
  CONSTRAINT `fk_uploads_p` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

DROP TABLE IF EXISTS `pawsome`.`pet_immun_records`;
CREATE TABLE `pawsome`.`pet_immun_records` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier',
  `pet_id` int(10) NOT NULL COMMENT 'Referenced pet ID',
  `doctor_id` int(10) NOT NULL COMMENT 'Referenced doctor ID',
  `vaccine_date` date NOT NULL COMMENT 'Vaccination date',
  `vaccine` varchar(100) NOT NULL COMMENT 'Vaccine name/description',
  `comments` varchar(500) DEFAULT NULL COMMENT 'Additional comments',
  `updated_date` datetime DEFAULT NULL COMMENT 'Update date',
  `updated_by` int(10) DEFAULT NULL COMMENT 'Updated by user ID',
  `archived` int(1) DEFAULT NULL COMMENT 'Archived indicator',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_immune_p_idx` (`pet_id`),
  KEY `fk_immun_d_idx` (`doctor_id`),
  CONSTRAINT `fk_immun_d` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_immun_p` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

DROP TABLE IF EXISTS `pawsome`.`referrals`;
CREATE TABLE `pawsome`.`referrals` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier',
  `doctor_id` int(10) NOT NULL COMMENT 'Referenced doctor ID',
  `pet_id` int(10) NOT NULL COMMENT 'Referenced pet ID',
  `referral_date` date NOT NULL COMMENT 'Date of referral',
  `diagnosis` varchar(100) NOT NULL COMMENT 'Diagnosis indicated in referral',
  `updated_by` int(10) DEFAULT NULL COMMENT 'Updated by user',
  `updated_date` datetime DEFAULT NULL COMMENT 'Updated date',
  `archived` int(1) DEFAULT NULL COMMENT 'Archived indicator',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_referrals_p_idx` (`pet_id`),
  KEY `fk_referrals_d_idx` (`doctor_id`),
  CONSTRAINT `fk_referrals_d` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_referrals_p` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

DROP TABLE IF EXISTS `pawsome`.`pet_rehab_records`;
CREATE TABLE `pawsome`.`pet_rehab_records` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier',
  `referral_id` int(10) NOT NULL COMMENT 'Referenced referral',
  `treatment_date` date NOT NULL COMMENT 'Date of treatments',
  `attended` varchar(1) DEFAULT NULL COMMENT 'Pet attended session',
  `comments` varchar(500) DEFAULT NULL COMMENT 'Additional comments',
  `updated_date` datetime DEFAULT NULL COMMENT 'Updated date',
  `updated_by` int(10) DEFAULT NULL COMMENT 'Updated by user',
  `archived` int(1) DEFAULT NULL COMMENT 'Archived indicator',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_rehab_r_idx` (`referral_id`),
  CONSTRAINT `fk_rehab_r` FOREIGN KEY (`referral_id`) REFERENCES `referrals` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

DROP TABLE IF EXISTS `pawsome`.`pet_surgery_records`;
CREATE TABLE `pawsome`.`pet_surgery_records` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier',
  `pet_id` int(10) NOT NULL COMMENT 'Referenced pet ID',
  `doctor_id` int(10) NOT NULL COMMENT 'Referenced doctor ID',
  `surgery` varchar(100) NOT NULL COMMENT 'Surgery name',
  `surgery_date` date NOT NULL COMMENT 'Date of surgery',
  `discharge_date` date DEFAULT NULL COMMENT 'Date discharged',
  `comments` varchar(500) DEFAULT NULL COMMENT 'Additional comments',
  `updated_date` datetime DEFAULT NULL COMMENT 'Date updated',
  `updated_by` int(10) DEFAULT NULL COMMENT 'Updated by user',
  `archived` int(1) DEFAULT NULL COMMENT 'Archived indicator',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_surgery_p_idx` (`pet_id`),
  KEY `fk_surgery_d_idx` (`doctor_id`),
  CONSTRAINT `fk_surgery_d` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_surgery_p` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

DROP TABLE IF EXISTS `pawsome`.`sales_invoices`;
CREATE TABLE `pawsome`.`sales_invoices` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Unique key of this table',
  `payment_id` int(10) DEFAULT NULL COMMENT 'Referenced payment ID',
  `invoice_amount` decimal(5,2) NOT NULL,
  `updated_date` datetime NOT NULL COMMENT 'Update date of record',
  `updated_by` int(10) NOT NULL COMMENT 'User ID who updated the record',
  `archived` int(1) DEFAULT NULL COMMENT 'Indicates id record is active or not',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_sales_inv_p_idx` (`payment_id`),
  CONSTRAINT `fk_sales_inv_p` FOREIGN KEY (`payment_id`) REFERENCES `payments` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) AUTO_INCREMENT=100000;

DROP TABLE IF EXISTS `pawsome`.`sales_invoice_items`;
CREATE TABLE `pawsome`.`sales_invoice_items` (
  `sales_invoice_id` int(10) NOT NULL COMMENT 'Reference invoice ID',
  `item_category_id` int(10) NOT NULL COMMENT 'Reference item category ID',
  `item_id` int(10) NOT NULL COMMENT 'Item identifier',
  `quantity` int(11) NOT NULL COMMENT 'Quantity of items',
  `unit_amount` decimal(5,2) NOT NULL COMMENT 'Amount per unit',
  `total_amount` decimal(5,2) NOT NULL COMMENT 'Total amount times quantity',
  KEY `fk_sales_inv_si_idx` (`sales_invoice_id`),
  KEY `fk_sales_inv_ic_idx` (`item_category_id`),
  KEY `fk_sales_inv_i_idx` (`item_id`),
  CONSTRAINT `fk_sales_inv_items_i` FOREIGN KEY (`item_id`) REFERENCES `inventory_items` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sales_inv_items_ic` FOREIGN KEY (`item_category_id`) REFERENCES `item_categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sales_inv_items_si` FOREIGN KEY (`sales_invoice_id`) REFERENCES `sales_invoices` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ;

DROP TABLE IF EXISTS `pawsome`.`service_categories`;
CREATE TABLE `pawsome`.`service_categories` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier',
  `category_name` varchar(50) DEFAULT NULL COMMENT 'Category name or description',
  `updated_date` datetime DEFAULT NULL COMMENT 'Updated date',
  `updated_by` int(10) DEFAULT NULL COMMENT 'Updated by user ID',
  `archived` int(1) DEFAULT NULL COMMENT 'Archived indicator',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
);

DROP TABLE IF EXISTS `pawsome`.`service_categories_items`;
CREATE TABLE `pawsome`.`service_categories_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier',
  `service_category_id` int(10) NOT NULL COMMENT 'Category of service item',
  `item_description` varchar(50) NOT NULL COMMENT 'Description of item',
  `item_amount` decimal(5,2) NOT NULL COMMENT 'Amount charged for single item',
  `updated_by` int(10) DEFAULT NULL COMMENT 'Updated by user',
  `updated_date` datetime DEFAULT NULL COMMENT 'Updated date',
  `archived` int(1) DEFAULT NULL COMMENT 'Archived indicator',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_sci_sc_idx` (`service_category_id`),
  CONSTRAINT `fk_sci_sc` FOREIGN KEY (`service_category_id`) REFERENCES `service_categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

DROP TABLE IF EXISTS `pawsome`.`subscribers`;
CREATE TABLE `pawsome`.`subscribers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `date_subbed` datetime NOT NULL,
  PRIMARY KEY (`id`)
);

/** 
DATA SET UP
*/

INSERT INTO `pawsome`.`admins`
(`firstname`, `lastname`, `username`, `password`, `address`, `state`, `email`, `phone`, `postcode`, `archived`, `created_date`,`updated_date`)
VALUES
('Pawsome','Admin','pawsome_admin',md5('pawsome_admin2023'),'40 Romawi Road','NSW','pawsome_admin@pawsome.com.au',123456789,2570,0,SYSDATE(),SYSDATE());
commit;

INSERT INTO `pawsome`.`doctors`
(`firstname`, `lastname`, `username`, `password`, `address`, `state`, `email`, `phone`, `postcode`, `archived`, `created_date`,`updated_date`)
VALUES
('Joe','Mcguire','sneeringbovril',md5('sneeringbovril_2023'),'33 Arthur Street','NSW','sneeringbovril@pawsome.com.au',832775073,2761,0,SYSDATE(),SYSDATE()),
('Rafael','Johnston','cutemarmite',md5('cutemarmite_2023'),'31 Learmouth Street','NSW','cutemarmite@pawsome.com.au',761788124,2233,0,SYSDATE(),SYSDATE()),
('Nona','Zuniga','athleticsauerkraut',md5('athleticsauerkraut_2023'),'95 Norton Street','NSW','athleticsauerkraut@pawsome.com.au',337838789,2101,0,SYSDATE(),SYSDATE()),
('Gino','Stanley','downrightrapeseed',md5('downrightrapeseed_2023'),'96 McLachlan Street','NSW','downrightrapeseed@pawsome.com.au',560420894,4000,0,SYSDATE(),SYSDATE()),
('Sherman','Bray','teemingbroth',md5('teemingbroth_2023'),'56 Boonah Qld','NSW','teemingbroth@pawsome.com.au',734111089,4022,0,SYSDATE(),SYSDATE());
commit;

INSERT INTO `pawsome`.`pet_owners`
(`firstname`, `lastname`, `username`, `password`, `address`, `state`, `email`, `phone`, `postcode`, `archived`, `created_date`,`updated_date`)
VALUES
('Gilbert','Lynch','ritzydonut',md5('ritzydonut_2023'),'4 Taylor Street','NSW','ritzydonut@pawsome.com.au',515335785,3000,0,SYSDATE(),SYSDATE()),
('Luigi','Swanson','moaningcasserole',md5('moaningcasserole_2023'),'11 Mnimbah Road','NSW','moaningcasserole@pawsome.com.au',838842364,3097,0,SYSDATE(),SYSDATE()),
('Flora','Short','abundantasparagus',md5('abundantasparagus_2023'),'2 Stanley Drive','NSW','abundantasparagus@pawsome.com.au',628402963,3787,0,SYSDATE(),SYSDATE()),
('Horace','Blanchard','abortivevanilla',md5('abortivevanilla_2023'),'74 Hodgson St','NSW','abortivevanilla@pawsome.com.au',508469679,3930,0,SYSDATE(),SYSDATE()),
('Brent','Davenport','grubbybolognase',md5('grubbybolognase_2023'),'90 McKillop Street','NSW','grubbybolognase@pawsome.com.au',344679468,3810,0,SYSDATE(),SYSDATE()),
('Alexis','Tucker','earnestpork',md5('earnestpork_2023'),'50 Halsey Road','NSW','earnestpork@pawsome.com.au',161424403,4507,0,SYSDATE(),SYSDATE()),
('Nicholas','Wu','unreliablecaviar',md5('unreliablecaviar_2023'),'56 Farnell Street','NSW','unreliablecaviar@pawsome.com.au',634183205,5000,0,SYSDATE(),SYSDATE()),
('Man','Leonard','laboredcandy',md5('laboredcandy_2023'),'65 Rupara Street','NSW','laboredcandy@pawsome.com.au',282080938,5076,0,SYSDATE(),SYSDATE()),
('Gertrude','Cooke','tearfullimes',md5('tearfullimes_2023'),'61 Webb Road','NSW','tearfullimes@pawsome.com.au',378058056,5127,0,SYSDATE(),SYSDATE()),
('Eugenio','Wolfe','efficientcornbread',md5('efficientcornbread_2023'),'87 Hummocky Road','NSW','efficientcornbread@pawsome.com.au',203051269,5156,0,SYSDATE(),SYSDATE()),
('Lucinda','Fernandez','ossifiedchips',md5('ossifiedchips_2023'),'45 Faunce Crescent','NSW','ossifiedchips@pawsome.com.au',803744694,5800,0,SYSDATE(),SYSDATE()),
('Oscar','Stevens','essentialpapaya',md5('essentialpapaya_2023'),'85 Bowden Street','NSW','essentialpapaya@pawsome.com.au',927538088,6000,0,SYSDATE(),SYSDATE()),
('Benjamin','Andersen','wonderfullemongrass',md5('wonderfullemongrass_2023'),'13 Roseda-Tinamba Road','NSW','wonderfullemongrass@pawsome.com.au',414619482,6981,0,SYSDATE(),SYSDATE()),
('Keneth','Clay','maternalburger',md5('maternalburger_2023'),'3 Flinstone Drive','NSW','maternalburger@pawsome.com.au',390620848,6872,0,SYSDATE(),SYSDATE()),
('Neal','Hampton','traumaticseaweed',md5('traumaticseaweed_2023'),'69 Beach Street','NSW','traumaticseaweed@pawsome.com.au',381962002,6209,0,SYSDATE(),SYSDATE()),
('Hector','Fuller','ferociouseggs',md5('ferociouseggs_2023'),'34 Ashton Road','NSW','ferociouseggs@pawsome.com.au',239227192,6939,0,SYSDATE(),SYSDATE()),
('Vicki','Oliver','immodestdill',md5('immodestdill_2023'),'60 Atkinson Way','NSW','immodestdill@pawsome.com.au',936522672,2600,0,SYSDATE(),SYSDATE()),
('Booker','Buckley','uptightcornetto',md5('uptightcornetto_2023'),'28 Moruya Street','NSW','uptightcornetto@pawsome.com.au',331875756,2620,0,SYSDATE(),SYSDATE()),
('Fausto','Booker','pushyherring',md5('pushyherring_2023'),'17 Butler Crescent','NSW','pushyherring@pawsome.com.au',282846040,2900,0,SYSDATE(),SYSDATE()),
('Courtney','Carter','exultantmarmalade',md5('exultantmarmalade_2023'),'41 Insignia Way','NSW','exultantmarmalade@pawsome.com.au',763003389,2906,0,SYSDATE(),SYSDATE()),
('Rhea','Mcintyre','lyingescargot',md5('lyingescargot_2023'),'76 Avondale Drive','NSW','lyingescargot@pawsome.com.au',971961927,2914,0,SYSDATE(),SYSDATE()),
('Bryon','Estrada','warmcinnamon',md5('warmcinnamon_2023'),'20 Banksia Court','NSW','warmcinnamon@pawsome.com.au',296551885,7000,0,SYSDATE(),SYSDATE()),
('Barton','Holland','unbecomingfritter',md5('unbecomingfritter_2023'),'99 Henry Street','NSW','unbecomingfritter@pawsome.com.au',651613918,7019,0,SYSDATE(),SYSDATE()),
('Mathew','Mccarty','cheerytruffle',md5('cheerytruffle_2023'),'46 Yarra Street','NSW','cheerytruffle@pawsome.com.au',404505637,7030,0,SYSDATE(),SYSDATE())
;
commit;

INSERT INTO `pawsome`.`pets`
(`pet_owner_id`,
`petname`,
`species`,
`breed`,
`birthdate`,
`weight`,
`sex`,
`comments`,
`insurance_membership`,
`insurance_expiry`,
`updated_date`,
`updated_by`,
`archived`)
VALUES
(1001, 'Paws', 'Dog', 'Golden Retriever', STR_TO_DATE("22-01-2021","%d-%m-%Y"),36.3,'Female','No allergies','5988040028',STR_TO_DATE("30-05-2025","%d-%m-%Y"),SYSDATE(),501,0),
(1001, 'Buttons', 'Dog', 'Maltese', STR_TO_DATE("11-02-2020","%d-%m-%Y"),4,'Female','No allergies','8291669232',STR_TO_DATE("30-04-2026","%d-%m-%Y"),SYSDATE(),501,0),
(1001, 'Sunny', 'Hamster', 'Campbell''s Dwarf', STR_TO_DATE("21-02-2021","%d-%m-%Y"),0.13,'Male','No allergies',null,null,SYSDATE(),501,0),
(1002, 'Snickers', 'Guinea Pig', 'Teddy', STR_TO_DATE("14-03-2021","%d-%m-%Y"),1,'Male','No allergies',null,null,SYSDATE(),501,0),
(1002, 'Maple', 'Cat', 'Exotic Shorthair', STR_TO_DATE("21-07-2018","%d-%m-%Y"),4.37,'Female','No allergies','9086804387',STR_TO_DATE("30-06-2024","%d-%m-%Y"),SYSDATE(),501,0),
(1003, 'Luna', 'Guinea Pig', 'Peruvian', STR_TO_DATE("23-03-2022","%d-%m-%Y"),0.93,'Female','No allergies',null,null,SYSDATE(),501,0),
(1003, 'Muffin', 'Dog', 'Rottweiler', STR_TO_DATE("12-04-2020","%d-%m-%Y"),54.5,'Male','No allergies','9382754683',STR_TO_DATE("30-06-2027","%d-%m-%Y"),SYSDATE(),501,0),
(1004, 'Pudding', 'Dog', 'Beagle', STR_TO_DATE("30-05-2021","%d-%m-%Y"),16,'Female','No allergies','5647291745',STR_TO_DATE("30-07-2028","%d-%m-%Y"),SYSDATE(),501,0),
(1005, 'Mocha', 'Cat', 'Siamese', STR_TO_DATE("29-06-2020","%d-%m-%Y"),4.6,'Female','No allergies','7543759385',STR_TO_DATE("30-08-2026","%d-%m-%Y"),SYSDATE(),501,0),
(1006, 'Sniffles', 'Dog', 'Chihuahua', STR_TO_DATE("29-05-2020","%d-%m-%Y"),4.6,'Female','No allergies','7543569385',STR_TO_DATE("30-08-2026","%d-%m-%Y"),SYSDATE(),501,0),
(1007, 'Biscuit', 'Hamster', 'Roborovski Dwarf', STR_TO_DATE("18-07-2021","%d-%m-%Y"),0.15,'Female','No allergies',null,null,SYSDATE(),501,0),
(1008, 'Oreo', 'Dog', 'Samoyed', STR_TO_DATE("16-08-2021","%d-%m-%Y"),25,'Male','No allergies','1606852875',STR_TO_DATE("30-09-2026","%d-%m-%Y"),SYSDATE(),501,0),
(1008, 'Puffy', 'Rabbit', 'Dutch', STR_TO_DATE("17-01-2020","%d-%m-%Y"),4.9,'Female','No allergies',null,null,SYSDATE(),501,0),
(1009, 'Peanut', 'Rabbit', 'Mini Lop', STR_TO_DATE("23-09-2020","%d-%m-%Y"),4.2,'Male','No allergies',null,null,SYSDATE(),501,0),
(1009, 'Lady', 'Cat', 'Abyssinian', STR_TO_DATE("15-12-2018","%d-%m-%Y"),4.26,'Female','No allergies','8673170001',STR_TO_DATE("30-08-2026","%d-%m-%Y"),SYSDATE(),501,0),
(1010, 'Cocoa', 'Dog', 'Bulldog', STR_TO_DATE("21-10-2019","%d-%m-%Y"),25,'Male','No allergies','3075355527',STR_TO_DATE("30-01-2025","%d-%m-%Y"),SYSDATE(),501,0),
(1010, 'Peaches', 'Cat', 'British Shorthair', STR_TO_DATE("19-11-2020","%d-%m-%Y"),4.65,'Male','No allergies','8171549774',STR_TO_DATE("30-10-2025","%d-%m-%Y"),SYSDATE(),501,0),
(1011, 'Waffles', 'Cat', 'Persian', STR_TO_DATE("17-12-2019","%d-%m-%Y"),4.53,'Female','No allergies','5837259435',STR_TO_DATE("30-11-2024","%d-%m-%Y"),SYSDATE(),501,0),
(1011, 'Riley', 'Dog', 'Siberian Husky', STR_TO_DATE("15-01-2018","%d-%m-%Y"),27,'Female','No allergies','2560253352',STR_TO_DATE("30-04-2025","%d-%m-%Y"),SYSDATE(),501,0),
(1012, 'Taylor', 'Dog', 'German Shepherd', STR_TO_DATE("01-02-2016","%d-%m-%Y"),38.5,'Female','No allergies','8872866253',STR_TO_DATE("30-03-2024","%d-%m-%Y"),SYSDATE(),501,0),
(1013, 'Jamie', 'Cat', 'Sphynx', STR_TO_DATE("09-03-2020","%d-%m-%Y"),4.31,'Female','No allergies',null,null,SYSDATE(),501,0),
(1014, 'Sam', 'Dog', 'Chihuahua', STR_TO_DATE("23-04-2019","%d-%m-%Y"),2.7,'Male','No allergies','6254619187',STR_TO_DATE("30-09-2025","%d-%m-%Y"),SYSDATE(),501,0),
(1015, 'Rain', 'Cat', 'Burmese', STR_TO_DATE("28-05-2018","%d-%m-%Y"),4.23,'Male','No allergies','7028076622',STR_TO_DATE("30-05-2024","%d-%m-%Y"),SYSDATE(),501,0),
(1016, 'Daisy', 'Dog', 'Dachshund', STR_TO_DATE("22-06-2015","%d-%m-%Y"),12,'Male','No allergies',null,null,SYSDATE(),501,0),
(1017, 'Stormy', 'Dog', 'Poodle', STR_TO_DATE("18-08-2017","%d-%m-%Y"),35,'Female','No allergies','7766577891',STR_TO_DATE("30-07-2025","%d-%m-%Y"),SYSDATE(),501,0),
(1018, 'Pippin', 'Guinea Pig', 'Texel', STR_TO_DATE("16-09-2020","%d-%m-%Y"),0.9,'Male','No allergies',null,null,SYSDATE(),501,0),
(1019, 'Yoda', 'Dog', 'Border Collie', STR_TO_DATE("11-10-2015","%d-%m-%Y"),24,'Female','No allergies','9833517263',STR_TO_DATE("30-08-2025","%d-%m-%Y"),SYSDATE(),501,0),
(1020, 'Toto', 'Dog', 'Bichon Frisé', STR_TO_DATE("13-11-2018","%d-%m-%Y"),9,'Male','No allergies','1054943276',STR_TO_DATE("30-07-2024","%d-%m-%Y"),SYSDATE(),501,0),
(1021, 'Affie', 'Dog', 'Afghan Hound', STR_TO_DATE("20-11-2018","%d-%m-%Y"),16,'Female','No allergies','1021343276',STR_TO_DATE("30-07-2024","%d-%m-%Y"),SYSDATE(),501,0),
(1022, 'Yorkie', 'Dog', 'Yorkshire Terrier', STR_TO_DATE("13-08-2022","%d-%m-%Y"),9,'Male','No allergies','1054654376',STR_TO_DATE("30-07-2024","%d-%m-%Y"),SYSDATE(),501,0),
(1022, 'Blue', 'Bird', 'Parrot', STR_TO_DATE("13-08-2022","%d-%m-%Y"),9,'Male','No allergies','1054654763',STR_TO_DATE("30-07-2024","%d-%m-%Y"),SYSDATE(),501,0),
(1022, 'Marge', 'Bird', 'Lovebird', STR_TO_DATE("13-12-2022","%d-%m-%Y"),4,'Female','No allergies','1054124376',STR_TO_DATE("30-07-2024","%d-%m-%Y"),SYSDATE(),501,0),
(1022, 'Homer', 'Bird', 'Lovebird', STR_TO_DATE("13-12-2022","%d-%m-%Y"),3,'Male','No allergies','8154654376',STR_TO_DATE("30-07-2024","%d-%m-%Y"),SYSDATE(),501,0),
(1023, 'Foundy', 'Dog', 'Newfoundland', STR_TO_DATE("18-04-2021","%d-%m-%Y"),25.2,'Female','No allergies','7651943276',STR_TO_DATE("30-07-2024","%d-%m-%Y"),SYSDATE(),501,0),
(1023, 'Birrie', 'Cat', 'Birman', STR_TO_DATE("18-03-2021","%d-%m-%Y"),5.2,'Male','No allergies','7651943276',STR_TO_DATE("30-07-2024","%d-%m-%Y"),SYSDATE(),501,0),
(1024, 'Turks', 'Cat', 'Turkish Van', STR_TO_DATE("18-03-2021","%d-%m-%Y"),4.56,'Female','No allergies','7935943276',STR_TO_DATE("30-07-2024","%d-%m-%Y"),SYSDATE(),501,0),
(1024, 'Poo', 'Dog', 'Maltipoo', STR_TO_DATE("11-02-2020","%d-%m-%Y"),9,'Female','No allergies','0943943276',STR_TO_DATE("30-07-2024","%d-%m-%Y"),SYSDATE(),501,0);
commit;

TRUNCATE TABLE `pawsome`.`booking_types`;
INSERT INTO `pawsome`.`booking_types`
(`booking_type`,
`booking_fee`,
`updated_date`,
`updated_by`,
`archived`)
VALUES
('Standard Consultation', 100.00, SYSDATE(), 501, 0),
('Diet Consultation', 100.00, SYSDATE(), 501, 0),
('Rehab', 100.00, SYSDATE(), 501, 0),
('Vaccine', 90.00, SYSDATE(), 501, 0),
('Surgery', 100.00, SYSDATE(), 501, 0);
commit;

INSERT INTO `pawsome`.`inventory_item_categories`
(`item_category`,`updated_by`,`updated_date`,`archived`)
VALUES
('Booking',(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
('Medicines',(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
('Pet Care',(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
('Pet Toys',(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
('Pet Food and Treats',(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
('Clinical Supplies',(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
('Others',(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0);
commit;

INSERT INTO `pawsome`.`inventory_items`
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
(1,'Standard Consultation',0,0,0,0,'',null,null,89,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(1,'Diet Consultation',0,0,0,0,'',null,null,86,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(1,'Rehab',0,0,0,0,'',null,null,90,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(1,'Vaccine',0,0,0,0,'',null,null,80,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(1,'Surgery',0,0,0,0,'',null,null,120,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Canine distemper virus (CDV) vaccine',10,20,15,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),89,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Canine adenovirus (CAV) vaccine',10,17,15,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),86,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Canine parvovirus (CPV-2) vaccine',10,10,15,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),90,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Parainfluenza virus (PI) vaccine',10,18,15,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),80,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Bordetella bronchiseptica (Bb) vaccine',10,16,15,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),120,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Leptospira interrogans vaccine',10,14,15,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),94,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Feline parvovirus (FPV) vaccine',10,13,15,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),87,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Feline calicivirus (FCV) vaccine',10,10,15,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),90,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Feline herpesvirus (FHV-1) vaccine',10,16,15,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),80,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Feline leukaemia virus (FeLV) vaccine',10,17,15,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),85,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Chlamydia felis vaccine',10,18,15,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),85,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Feline immunodeficiency virus (FIV) vaccine',10,18,15,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),85,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Rabies vaccine',10,25,15,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),95,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Deworming tablets 8kg',6,60,24,6,'tablets',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),15,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Deworming tablets 15kg',6,60,24,6,'tablets',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),25,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Deworming tablets 30kg',6,60,24,6,'tablets',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),35,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Deworming tablets 60kg',6,60,24,6,'tablets',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),45,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Silver sulfadiazine',10,30,20,60,'grams',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),22,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Propofol',10,10,8,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),154,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Rafoxanide',10,10,8,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),130,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Phenylpropanolamine',10,10,8,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),148,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Phenobarbital',10,10,8,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),151,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Oxymorphone',10,10,8,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),143,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Maropitant',10,10,8,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),134,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Metacam',10,10,8,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),120,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Levetiracetam',10,10,8,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),150,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Lufenuron',10,10,8,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),165,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Ketoprofen',10,10,8,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),141,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Ivermectin',10,10,8,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),167,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Hydroxyzine',10,10,8,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),144,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Gabapentin',10,10,8,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),198,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Frunevetmab',10,10,8,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),176,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Dexamethasone',10,10,8,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),153,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Propofol',10,10,8,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),101,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Ciprofloxacin',10,10,8,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),100,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Clomipramine',10,10,8,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),146,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Buprenorphine',10,10,8,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),143,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Bethanechol',10,10,8,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),152,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Amoxicillin',10,10,8,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),154,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Aminophylline',10,10,8,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),181,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Alprazolam',10,10,8,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),197,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Zonisamide',10,10,8,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),132,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Tylosin',10,10,8,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),139,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Telazol',10,10,8,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),126,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Sucralfate',10,10,8,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),120,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Ponazuril',10,10,8,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),121,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Ofloxacin',10,10,8,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),143,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(2,'Nystatin',10,10,8,10,'millilitres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),135,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(3,'Medicated Shampoo for Dogs 250 ml',10,50,20,250,'millilitres',STR_TO_DATE("30-10-2022", "%d-%m-%Y"),STR_TO_DATE("30-10-2025", "%d-%m-%Y"),25.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(3,'Medicated Shampoo for Dogs 500 ml',10,15,15,500,'millilitres',STR_TO_DATE("30-11-2022", "%d-%m-%Y"),STR_TO_DATE("30-11-2025", "%d-%m-%Y"),40.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(3,'Medicated Shampoo for Dogs 1L',5,10,10,1,'litres',STR_TO_DATE("30-09-2022", "%d-%m-%Y"),STR_TO_DATE("30-09-2025", "%d-%m-%Y"),70.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(3,'Dental Treats for Dogs (3-7 kg) 180g',15,30,10,180,'grams',STR_TO_DATE("30-08-2022", "%d-%m-%Y"),STR_TO_DATE("30-10-2025", "%d-%m-%Y"),25.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(3,'Dental Treats for Dogs (11-22 kg) 180g',10,20,10,180,'grams',STR_TO_DATE("30-08-2022", "%d-%m-%Y"),STR_TO_DATE("30-10-2025", "%d-%m-%Y"),25.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(3,'Dental Treats for Dogs (7-11 kg) 180g',10,20,10,180,'grams',STR_TO_DATE("30-08-2022", "%d-%m-%Y"),STR_TO_DATE("30-10-2025", "%d-%m-%Y"),25.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(3,'Flea Shampoo 100ml',10,20,5,100,'millilitres',STR_TO_DATE("30-10-2022", "%d-%m-%Y"),STR_TO_DATE("30-10-2025", "%d-%m-%Y"),20.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(3,'Natural Shampoo 100ml',10,15,5,100,'millilitres',STR_TO_DATE("30-10-2022", "%d-%m-%Y"),STR_TO_DATE("30-10-2025", "%d-%m-%Y"),35.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(3,'Conditioner 100 ml',10,20,5,100,'millilitres',STR_TO_DATE("30-10-2022", "%d-%m-%Y"),STR_TO_DATE("30-10-2025", "%d-%m-%Y"),30.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(3,'Spritzer 100ml',10,15,5,100,'millilitres',STR_TO_DATE("30-10-2022", "%d-%m-%Y"),STR_TO_DATE("30-10-2025", "%d-%m-%Y"),25.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(3,'Puppy Shampoo 100ml',10,20,5,100,'millilitres',STR_TO_DATE("30-10-2022", "%d-%m-%Y"),STR_TO_DATE("30-10-2025", "%d-%m-%Y"),20.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(3,'Kitten Shampoo 100ml',10,30,5,100,'millilitres',STR_TO_DATE("30-10-2022", "%d-%m-%Y"),STR_TO_DATE("30-10-2025", "%d-%m-%Y"),35.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(3,'Dog Oil 100ml',10,35,5,100,'millilitres',STR_TO_DATE("30-10-2022", "%d-%m-%Y"),STR_TO_DATE("30-10-2025", "%d-%m-%Y"),30.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(3,'Collar 45cm',10,30,5,45,'centimetres',STR_TO_DATE("30-10-2022", "%d-%m-%Y"),STR_TO_DATE("30-10-2025", "%d-%m-%Y"),90.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(3,'Collar 70cm',10,20,5,70,'centimetres',STR_TO_DATE("30-10-2022", "%d-%m-%Y"),STR_TO_DATE("30-10-2025", "%d-%m-%Y"),100.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(3,'Health Chews for Dogs 200g',10,20,5,200,'grams',STR_TO_DATE("30-10-2022", "%d-%m-%Y"),STR_TO_DATE("30-10-2025", "%d-%m-%Y"),45.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(3,'Eye Drops for Dogs 15ml',10,20,5,15,'millilitres',STR_TO_DATE("30-10-2022", "%d-%m-%Y"),STR_TO_DATE("30-10-2025", "%d-%m-%Y"),20.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(3,'Eye Drops for Cats 15ml',10,20,5,15,'millilitres',STR_TO_DATE("30-10-2022", "%d-%m-%Y"),STR_TO_DATE("30-10-2025", "%d-%m-%Y"),20.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(3,'Ear Cleanser for Dogs 120ml',10,20,5,120,'millilitres',STR_TO_DATE("30-10-2022", "%d-%m-%Y"),STR_TO_DATE("30-10-2025", "%d-%m-%Y"),30.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(3,'Ear Cleanser for Cats 120ml',10,20,5,120,'millilitres',STR_TO_DATE("30-10-2022", "%d-%m-%Y"),STR_TO_DATE("30-10-2025", "%d-%m-%Y"),30.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(3,'Dental Kit for Dogs 74ml',10,20,5,74,'millilitres',STR_TO_DATE("30-10-2022", "%d-%m-%Y"),STR_TO_DATE("30-10-2025", "%d-%m-%Y"),20.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(3,'Dental Kit for Cats 74ml',10,20,5,74,'millilitres',STR_TO_DATE("30-10-2022", "%d-%m-%Y"),STR_TO_DATE("30-10-2025", "%d-%m-%Y"),20.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(3,'Cat Supplements 60tablets',10,20,5,60,'tablets',STR_TO_DATE("30-10-2022", "%d-%m-%Y"),STR_TO_DATE("30-10-2025", "%d-%m-%Y"),50.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(3,'Dog Supplements 60tablets',10,20,5,60,'tablets',STR_TO_DATE("30-10-2022", "%d-%m-%Y"),STR_TO_DATE("30-10-2025", "%d-%m-%Y"),50.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(4,'Tasty Bone Nylon Chicken Trio Bone Dog Toy XSmall',2,1,3,1,'piece',null,null,23.23,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(4,'Tasty Bone Nylon Chicken Trio Bone Dog Toy Small',2,1,3,1,'piece',null,null,28.43,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(4,'Tasty Bone Nylon Chicken Trio Bone Dog Toy Large',2,1,3,1,'piece',null,null,33.32,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(4,'Treat Maze Dog Toy Puzzle Green',2,1,3,1,'piece',null,null,20.21,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(4,'Treat Maze Dog Toy Puzzle Blue',2,1,3,1,'piece',null,null,20.21,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(4,'Treat Maze Dog Toy Puzzle Black',2,1,3,1,'piece',null,null,20.21,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(4,'Treat Maze Dog Toy Puzzle Pink',2,1,3,1,'piece',null,null,20.21,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(4,'Treat Maze Dog Toy Puzzle Yellow',2,1,3,1,'piece',null,null,20.21,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(4,'Automatic Ball Launcher Dog Toy',2,1,3,1,'piece',null,null,350.33,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(4,'Board Activity Dog Feeder',2,1,3,1,'piece',null,null,24.21,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(4,'Fetch Medley Dog Toy Medium 3 Pack',2,1,3,3,'pieces',null,null,16.34,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(4,'Fetch Medley Dog Toy Small 3 Pack',2,1,3,3,'pieces',null,null,12.32,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(4,'Fetch Medley Dog Toy Large 3 Pack',2,1,3,3,'pieces',null,null,20.09,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(4,'Night Creatures 5 in 1 Teaser Cat Toy Navy',2,1,3,1,'piece',null,null,20.67,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(4,'Night Creatures 5 in 1 Teaser Cat Toy Moss',2,1,3,1,'piece',null,null,20.67,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(4,'Night Creatures 5 in 1 Teaser Cat Toy Cream',2,1,3,1,'piece',null,null,20.67,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(4,'Kitty Tunnel Cat Toy Blue Purple Assorted',2,1,3,1,'piece',null,null,25.34,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(4,'Kitty Tunnel Cat Toy Red Yellow Assorted',2,1,3,1,'piece',null,null,25.34,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(4,'Kitty Tunnel Cat Toy Green Brown Assorted',2,1,3,1,'piece',null,null,25.34,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(4,'3 Tier Track Tower With Balls Cat Toy Green',2,1,3,1,'piece',null,null,27.05,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(4,'3 Tier Track Tower With Balls Cat Toy Blue',2,1,3,1,'piece',null,null,27.05,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(4,'3 Tier Track Tower With Balls Cat Toy Yellow',2,1,3,1,'piece',null,null,27.05,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(4,'3 Tier Track Tower With Balls Cat Toy Red',2,1,3,1,'piece',null,null,27.05,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(4,'3 Tier Track Tower With Balls Cat Toy Pink',2,1,3,1,'piece',null,null,27.05,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(4,'Small Animal Hide Plastic Igloo Blue Large',2,1,3,1,'piece',null,null,18.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(4,'Small Animal Hide Plastic Igloo Yellow Large',2,1,3,1,'piece',null,null,18.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(4,'Small Animal Hide Plastic Igloo Green Large',2,1,3,1,'piece',null,null,18.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(4,'Small Animal Hide Plastic Igloo Red Large',2,1,3,1,'piece',null,null,18.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(4,'Small Animal Hide Plastic Igloo Pink Large',2,1,3,1,'piece',null,null,18.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Indoor Adult Cat Food 400g',5,20,5,400,'grams',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),14,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Indoor Adult Cat Food 2kg',5,20,5,2,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),44.54,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Indoor Adult Cat Food 4kg',5,20,5,4,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),63.89,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Indoor Adult Cat Food 10kg',2,15,5,10,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),130.66,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Growth Kitten Cat Food 400g',5,20,5,400,'grams',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),11.72,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Growth Kitten Cat Food 2kg',5,20,5,2,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),44.87,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Growth Kitten Cat Food 4kg',5,20,5,4,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),66.94,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Growth Kitten Cat Food 10kg',2,15,5,10,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),150.10,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Oral Care Adult Cat Food 400g',5,20,5,400,'grams',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),13.08,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Oral Care Adult Cat Food 1.5kg',5,20,5,1.5,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),13.08,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Oral Care Adult Cat Food 3.5kg',5,20,5,3.5,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),13.08,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Oral Care Adult Cat Food 8kg',5,20,5,8,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),13.08,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Digestive Care Adult Cat Food 400g',5,20,5,400,'grams',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),14,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Digestive Care Adult Cat Food 2kg',5,20,5,2,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),44.54,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Digestive Care Adult Cat Food 4kg',5,20,5,4,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),63.89,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Urinary Care Adult Cat Food 400g',5,20,5,400,'grams',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),14,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Urinary Care Adult Cat Food 2kg',5,20,5,2,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),44.54,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Urinary Care Adult Cat Food 4kg',5,20,5,4,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),63.89,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Light Care Adult Cat Food 400g',5,20,5,400,'grams',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),14,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Light Care Adult Cat Food 1.5kg',5,20,5,1.5,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),44.54,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Light Care Adult Cat Food 3kg',5,20,5,3,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),63.89,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Veterinary Diet Urinary S/O Adult Cat Food 1.5kg',5,10,5,1.5,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),14,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Veterinary Diet Urinary S/O Adult Cat Food 3.5kg',5,10,5,3.5,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),44.54,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Veterinary Diet Urinary S/O Adult Cat Food 7kg',5,10,5,7,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),63.89,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Feline Hairball Care Cat Food 400g',5,20,5,400,'grams',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),14,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Feline Hairball Care Cat Food 2kg',5,20,5,2,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),44.54,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Feline In & Out Fit Cat Food 4kg',5,20,5,4,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),63.89,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Feline In & Out Fit Cat Food 400g',5,20,5,400,'grams',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),14,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Feline In & Out Fit Cat Food 2kg',5,20,5,2,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),44.54,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Feline British Shorthair Adult Cat Food 4kg',5,20,5,4,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),63.89,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Feline British Shorthair Adult Cat Food 400g',5,20,5,400,'grams',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),14,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Feline British Shorthair Adult Cat Food 2kg',5,20,5,2,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),44.54,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Mini Junior Dog Food 800g',5,20,10,800,'grams',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),17.14,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Mini Junior Dog Food 2kg',5,20,10,2,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),38.27,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Mini Junior Dog Food 4kg',5,20,10,4,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),69.48,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Mini Junior Dog Food 8kg',5,10,5,8,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),102.74,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Mini Adult Dog Food 800g',5,20,10,800,'grams',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),18.04,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Mini Adult Dog Food 2kg',5,20,10,2,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),30.27,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Mini Adult Dog Food 4kg',5,20,10,4,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),55.52,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Mini Adult Dog Food 8kg',5,10,5,8,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),95,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Maxi Breed Puppy Food 1kg',5,10,5,1,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),18.89,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Maxi Breed Puppy Food 4kg',5,10,5,4,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),65.88,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Maxi Breed Puppy Food 15kg',5,10,5,15,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),192.01,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Medium Breed Puppy Food 1kg',5,10,5,1,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),18.89,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Medium Breed Puppy Food 4kg',5,10,5,4,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),64.98,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Medium Breed Puppy Food 15kg',5,10,5,15,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),151.69,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Veterinary Diet Hypoallergenic Adult Dog Dry Food 2kg',5,10,5,2,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),51.89,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Veterinary Diet Hypoallergenic Adult Dog Dry Food 7kg',5,10,5,7,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),137.89,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Veterinary Diet Hypoallergenic Adult Dog Dry Food 14kg',5,10,5,14,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),207.89,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Veterinary Diet Gastro Low Fat Adult Dog Food 1.5kg',5,10,5,1.5,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),51.89,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Veterinary Diet Gastro Low Fat Adult Dog Food 6kg',5,10,5,6,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),137.89,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Veterinary Diet Gastro Low Fat Adult Dog Food 12kg',5,10,5,12,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),207.89,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Veterinary Diet Satiety Adult Dog Food 6kg',5,10,5,6,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),116.57,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Veterinary Diet Satiety Adult Dog Food 12kg',5,10,5,12,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),179.84,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Grain Free Salmon Adult Dog Food 2.5kg',5,10,5,2.5,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),45.59,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Grain Free Salmon Adult Dog Food 7kg',5,10,5,7,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),84.54,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Grain Free Salmon Adult Dog Food 15kg',5,10,5,15,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),164.24,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Lamb & Rice Medium Puppy Food 3kg',5,10,5,3,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),45.31,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Lamb & Rice Medium Puppy Food 10kg',5,10,5,10,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),101.69,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Lamb & Rice Medium Puppy Food 20kg',5,10,5,20,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),150.98,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Beef & Vegetable Large Breed Adult Dog Food 2.5kg',5,10,5,2.5,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),45.59,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Beef & Vegetable Large Breed Adult Dog Food 7kg',5,10,5,7,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),84.54,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Beef & Vegetable Large Breed Adult Dog Food 15kg',5,10,5,15,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),164.24,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Veterinary Diet Mobility C2P+ Adult Dog Food 2kg',5,10,5,2,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),45.59,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Veterinary Diet Mobility C2P+ Adult Dog Food 7kg',5,10,5,7,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),84.54,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Veterinary Diet Mobility C2P+ Adult Dog Food 15kg',5,10,5,15,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),164.24,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Chicken & Rice Medium Puppy Food 3kg',5,10,5,3,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),45.31,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Chicken & Rice Medium Puppy Food 10kg',5,10,5,10,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),101.69,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Chicken & Rice Medium Puppy Food 20kg',5,10,5,20,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),150.98,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Kangaroo & Vegetable Adult Dog Food 2kg',5,10,5,2,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),45.59,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Kangaroo & Vegetable Adult Dog Food 7kg',5,10,5,7,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),84.54,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Kangaroo & Vegetable Adult Dog Food 15kg',5,10,5,15,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),164.24,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Fish And Potato Adult Dog Food 3kg',5,10,5,3,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),44.64,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Fish And Potato Adult Dog Food 10kg',5,10,5,10,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),107.34,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Fish And Potato Adult Dog Food 20kg',5,10,5,20,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),138.69,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Diet Adult 7+ Senior Dog Food 3kg',5,10,5,3,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),50.12,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Diet Adult 7+ Senior Dog Food 7.5kg',5,10,5,7.5,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),102.05,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Diet Adult 7+ Senior Dog Food 12kg',5,10,5,12,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2024", "%d-%m-%Y"),131.71,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Sensitive Skin Dog Patties 3kg',5,10,5,3,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2023", "%d-%m-%Y"),35.49,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Allergy Kangaroo Dog Food 3kg',5,10,5,3,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2023", "%d-%m-%Y"),35.49,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Salmon & Tapioca Roll Dog Food 2kg',5,10,5,2,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2023", "%d-%m-%Y"),23.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Beef Bone Broth Concentrate Dog Food 350g',5,10,5,350,'grams',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2023", "%d-%m-%Y"),24.22,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Sinking Spirulina Algae Wafers 1kg',5,10,5,1,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2023", "%d-%m-%Y"),17.59,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Bloodworm Fish Food Punch Out Pack 100g',5,10,5,100,'grams',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2023", "%d-%m-%Y"),12.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Goldfish Flakes Fish Food 12g',5,10,5,12,'grams',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2023", "%d-%m-%Y"),6.39,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Goldfish Flakes Fish Food 28g',5,10,5,28,'grams',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2023", "%d-%m-%Y"),7.19,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Goldfish Flakes Fish Food 62g',5,10,5,62,'grams',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2023", "%d-%m-%Y"),16.79,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Goldfish Flakes Fish Food 200g',5,10,5,200,'grams',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2023", "%d-%m-%Y"),26.24,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Micro Pellets Fish Food 45g',5,10,5,45,'grams',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2023", "%d-%m-%Y"),10.39,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Seedmix 20kg',5,10,5,20,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2023", "%d-%m-%Y"),42.49,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Meal Worms 100g',5,10,5,100,'grams',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2023", "%d-%m-%Y"),13.59,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Grey Sunflower Tasty Whole Seed Mix 4kg',5,10,5,4,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2023", "%d-%m-%Y"),18.39,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Wild Bird Seed Mix 2.5kg',5,10,5,2.5,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2023", "%d-%m-%Y"),10.39,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Wild Bird Seed Mix 5kg',5,10,5,5,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2023", "%d-%m-%Y"),11.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Wild Bird Seed Mix 15kg',5,10,5,15,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2023", "%d-%m-%Y"),23.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Adult Mice 7 Pack',5,10,5,7,'pieces',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2023", "%d-%m-%Y"),39.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Weaner Mice 7 Pack',5,10,5,7,'pieces',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2023", "%d-%m-%Y"),31.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Hopper Rats 5 Pack',5,10,5,5,'pieces',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2023", "%d-%m-%Y"),41.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Pinkie Mice 10 Pack',5,10,5,10,'pieces',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2023", "%d-%m-%Y"),29.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Large Rats 3 Pack',5,10,5,3,'pieces',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2023", "%d-%m-%Y"),52.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Medium Rats 3 Pack',5,10,5,3,'pieces',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2023", "%d-%m-%Y"),40.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Rabbit Pellets 1.5',5,10,5,1.5,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2023", "%d-%m-%Y"),23.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Rabbit Pellets 1.8kg',5,10,5,1.8,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2023", "%d-%m-%Y"),28.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Guinea Pig Pellets 2kg',5,10,5,2,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2023", "%d-%m-%Y"),29.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Guinea Pig & Rabbit Pellets 3kg',5,10,5,2,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2023", "%d-%m-%Y"),11.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Guinea Pig & Rabbit Pellets 6kg',5,10,5,6,'kilograms',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2023", "%d-%m-%Y"),17.59,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Chicken with Manuka Honey Dog Treat 100g',5,10,5,100,'grams',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2023", "%d-%m-%Y"),9.59,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Chicken with Manuka Honey Dog Treat 185g',5,10,5,185,'grams',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2023", "%d-%m-%Y"),15.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Dog Training Treats Australian Kangaroo 165g',5,10,5,165,'grams',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2023", "%d-%m-%Y"),13.50,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Dog Training Treats Australian Chicken 165g',5,10,5,165,'grams',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2023", "%d-%m-%Y"),13.50,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Peanut Butter Biscuits Dog Treat 750g',5,10,5,750,'grams',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2023", "%d-%m-%Y"),7.19,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(5,'Variety Bone Biscuit Dog Treat 750g',5,10,5,750,'grams',STR_TO_DATE("01-02-2023", "%d-%m-%Y"),STR_TO_DATE("01-11-2023", "%d-%m-%Y"),7.19,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(6,'IV Solution 500ml',5,10,5,500,'millilitres',STR_TO_DATE("01-01-2023", "%d-%m-%Y"),STR_TO_DATE("31-12-2023", "%d-%m-%Y"),3.67,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(6,'IV Solution 1L',5,10,5,1,'litres',STR_TO_DATE("01-01-2023", "%d-%m-%Y"),STR_TO_DATE("31-12-2023", "%d-%m-%Y"),6.20,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(6,'Dressing Pack',50,100,50,1,'piece',STR_TO_DATE("07-09-2023", "%d-%m-%Y"),STR_TO_DATE("07-09-2023", "%d-%m-%Y"),1.46,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(6,'Burn Gel Sachet 3.5g',20,50,10,1,'sachet',STR_TO_DATE("07-09-2023", "%d-%m-%Y"),STR_TO_DATE("07-09-2023", "%d-%m-%Y"),0.8,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(6,'Gauze Swabs Peel Pack 2s',50,100,50,1,'piece',STR_TO_DATE("07-09-2023", "%d-%m-%Y"),STR_TO_DATE("07-09-2023", "%d-%m-%Y"),0.72,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(6,'Catheters with Vacuum Control',5,40,10,1,'piece',STR_TO_DATE("07-09-2023", "%d-%m-%Y"),STR_TO_DATE("07-09-2023", "%d-%m-%Y"),2.50,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(6,'Specimen Container Sterile 70ml',10,100,10,70,'millilitres',STR_TO_DATE("07-09-2023", "%d-%m-%Y"),STR_TO_DATE("07-09-2023", "%d-%m-%Y"),0.82,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(6,'Gauze Swabs',100,300,50,1,'piece',STR_TO_DATE("07-09-2023", "%d-%m-%Y"),STR_TO_DATE("07-09-2023", "%d-%m-%Y"),0.18,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(6,'Cotton Tip Applicator',100,300,50,1,'piece',STR_TO_DATE("07-09-2023", "%d-%m-%Y"),STR_TO_DATE("07-09-2023", "%d-%m-%Y"),0.29,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(6,'Crepe Bandage 1.5m',5,50,20,1.5,'metres',STR_TO_DATE("07-09-2023", "%d-%m-%Y"),STR_TO_DATE("07-09-2023", "%d-%m-%Y"),2.53,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(6,'Antiseptic Cream Sachet 1g',20,200,50,1,'grams',STR_TO_DATE("07-09-2023", "%d-%m-%Y"),STR_TO_DATE("07-09-2023", "%d-%m-%Y"),1.48,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(6,'Syringe 1ml',20,200,50,1,'millilitres',STR_TO_DATE("07-09-2023", "%d-%m-%Y"),STR_TO_DATE("07-09-2023", "%d-%m-%Y"),1.35,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(6,'Syringe 3ml',20,200,50,3,'millilitres',STR_TO_DATE("07-09-2023", "%d-%m-%Y"),STR_TO_DATE("07-09-2023", "%d-%m-%Y"),1.35,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(6,'Syringe 5ml',20,200,50,5,'millilitres',STR_TO_DATE("07-09-2023", "%d-%m-%Y"),STR_TO_DATE("07-09-2023", "%d-%m-%Y"),1.35,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(7,'Leather Dog Collar Black Medium',10,0,0,1,'piece',null,null,45,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(7,'Leather Dog Collar Black Large',10,0,0,1,'piece',null,null,56,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(7,'Leather Dog Collar Black XLarge',10,0,0,1,'piece',null,null,64,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(7,'Pup Crew Pro Nightrunner Dog Lead Purple 120cm',10,0,0,1,'piece',null,null,14.8,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(7,'Pup Crew Pro Nightrunner Dog Lead Red 120cm',10,0,0,1,'piece',null,null,14.8,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(7,'Pup Crew Pro Nightrunner Dog Lead Black 120cm',10,0,0,1,'piece',null,null,14.8,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(7,'Dog Muzzle XSmall',10,0,0,1,'piece',null,null,17,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(7,'Dog Muzzle Small',10,0,0,1,'piece',null,null,17,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(7,'Dog Muzzle Medium',10,0,0,1,'piece',null,null,19,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(7,'Dog Muzzle Large',10,0,0,1,'piece',null,null,19,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(7,'Dog Muzzle XLarge',10,0,0,1,'piece',null,null,19.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(7,'Dog Harness Black Medium',10,0,0,1,'piece',null,null,139.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(7,'Dog Harness Black Large',10,0,0,1,'piece',null,null,149.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(7,'Dog Harness Black Small',10,0,0,1,'piece',null,null,114.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(7,'Cat Harness & Lead Set Mint',10,0,0,1,'piece',null,null,34.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(7,'Cat Harness & Lead Set Purple',10,0,0,1,'piece',null,null,34.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(7,'Cat Harness & Lead Set Navy',10,0,0,1,'piece',null,null,34.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(7,'Cat Harness & Lead Set Yellow',10,0,0,1,'piece',null,null,34.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(7,'Aquarium Gravel Cleaner 12.5cm',10,0,0,12.5,'centimetres',null,null,19.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(7,'Glass Heater 300W',10,0,0,1,'piece',null,null,69.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(7,'Glass Heater 55W',10,0,0,1,'piece',null,null,51.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(7,'Bird Flight Cage Black Small',10,0,0,1,'piece',null,null,78.54,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(7,'Bird Flight Cage White Small',10,0,0,1,'piece',null,null,78.54,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(7,'Curve Top Bird Cage Black',10,0,0,1,'piece',null,null,42.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(7,'Curve Top Bird Cage White',10,0,0,1,'piece',null,null,42.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(7,'Pet Carrier Medium',5,0,0,1,'piece',null,null,29.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(7,'Single Door Dog Carrier Cream Red Small',2,0,0,1,'piece',null,null,44.81,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(7,'Single Door Dog Carrier Cream Red Medium',2,0,0,1,'piece',null,null,54.77,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(7,'Single Door Dog Carrier Cream Red Large',2,0,0,1,'piece',null,null,89.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(7,'Single Door Dog Carrier Cream Black Small',2,0,0,1,'piece',null,null,44.81,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(7,'Single Door Dog Carrier Cream Black Medium',2,0,0,1,'piece',null,null,54.77,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(7,'Single Door Dog Carrier Cream Black Large',2,0,0,1,'piece',null,null,89.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(7,'Single Door Dog Carrier Cream Blue Small',2,0,0,1,'piece',null,null,44.81,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(7,'Single Door Dog Carrier Cream Blue Medium',2,0,0,1,'piece',null,null,54.77,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(7,'Single Door Dog Carrier Cream Blue Large',2,0,0,1,'piece',null,null,89.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(7,'Single Door Dog Carrier Cream White Small',2,0,0,1,'piece',null,null,44.81,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(7,'Single Door Dog Carrier Cream White Medium',2,0,0,1,'piece',null,null,54.77,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0),
(7,'Single Door Dog Carrier Cream White Large',2,0,0,1,'piece',null,null,89.99,(SELECT id FROM `pawsome`.`admins` WHERE username = 'pawsome_admin'),SYSDATE(),0);
commit;

INSERT INTO `pawsome`.`bookings`
(`booking_status`,
`booking_type_id`,
`pet_owner_id`,
`pet_id`,
`doctor_id`,
`updated_date`,
`updated_by`,
`archived`)
VALUES
('CONFIRMED',1,1001,1,1,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',3,1001,2,3,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',2,1002,5,2,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',1,1003,6,1,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',3,1006,10,3,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',5,1006,10,5,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',1,1008,12,1,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',3,1008,12,3,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',2,1008,13,2,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',1,1009,15,1,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',1,1010,16,1,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',2,1010,17,2,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',3,1011,18,3,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',2,1011,18,2,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',4,1011,19,4,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',5,1011,19,5,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',4,1013,21,4,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',5,1013,21,5,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',5,1014,22,5,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',2,1016,24,2,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',1,1017,25,1,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',1,1018,26,1,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',2,1019,27,2,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',5,1020,28,5,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',3,1022,31,3,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',4,1022,33,4,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',2,1023,35,2,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',5,1024,36,5,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),

('CONFIRMED',3,1001,1,3,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',5,1001,3,5,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',5,1002,4,5,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',5,1003,7,5,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',1,1004,8,1,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',3,1005,9,3,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',1,1008,13,1,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',2,1009,14,2,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',4,1009,15,4,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',3,1013,21,3,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',1,1014,22,1,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',5,1015,23,5,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',4,1016,24,4,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',3,1021,29,3,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',3,1022,30,3,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',1,1022,31,1,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',2,1022,32,2,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('CONFIRMED',2,1023,34,2,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),

('FINISHED',4,1001,1,4,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),4,1),
('FINISHED',2,1001,2,2,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),2,1),
('FINISHED',4,1001,3,2,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),4,1),
('FINISHED',5,1002,4,5,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),5,1),
('FINISHED',2,1003,7,2,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),2,1),
('FINISHED',3,1004,8,3,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),3,1),
('FINISHED',4,1005,9,4,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),4,1),
('FINISHED',4,1007,11,4,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),4,1),
('FINISHED',1,1009,14,1,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1,1),
('FINISHED',5,1012,20,5,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),5,1),
('FINISHED',3,1015,23,3,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),3,1),
('FINISHED',1,1021,29,1,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1,1),
('FINISHED',1,1022,30,1,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1,1),
('FINISHED',3,1022,32,3,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),3,1),
('FINISHED',4,1023,34,4,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),4,1),
('FINISHED',4,1023,35,4,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),4,1),
('FINISHED',4,1024,37,4,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),4,1),

('FINISHED',3,1001,2,3,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),3,1),
('FINISHED',2,1002,5,2,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),2,1),
('FINISHED',2,1003,6,2,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),2,1),
('FINISHED',5,1006,10,5,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),5,1),
('FINISHED',4,1007,11,4,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),4,1),
('FINISHED',2,1008,12,2,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),2,1),
('FINISHED',4,1010,16,4,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),4,1),
('FINISHED',2,1010,17,2,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),2,1),
('FINISHED',5,1011,18,5,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),5,1),
('FINISHED',1,1011,19,1,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1,1),
('FINISHED',3,1012,20,3,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),3,1),
('FINISHED',4,1017,25,4,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),4,1),
('FINISHED',2,1018,26,2,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),2,1),
('FINISHED',5,1019,27,5,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),5,1),
('FINISHED',1,1020,28,1,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1,1),
('FINISHED',4,1022,33,4,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),4,1),
('FINISHED',5,1023,35,5,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),5,1),
('FINISHED',1,1024,36,1,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1,1),
('FINISHED',3,1024,37,3,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),3,1),

('CANCELED',3,1006,10,3,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1,1),
('CANCELED',2,1019,27,2,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),4,1),
('CANCELED',3,1022,30,3,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),5,1),
('CANCELED',4,1001,3,4,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1,1),
('CANCELED',5,1017,25,5,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),3,1),

('PENDING',1,1001,1,null,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('PENDING',2,1001,2,null,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('PENDING',3,1001,3,null,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('PENDING',4,1002,4,null,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('PENDING',5,1002,5,null,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('PENDING',5,1003,6,null,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('PENDING',4,1003,7,null,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('PENDING',3,1004,8,null,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('PENDING',1,1005,9,null,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('PENDING',1,1006,10,null,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('PENDING',3,1007,11,null,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('PENDING',2,1008,12,null,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('PENDING',4,1008,13,null,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('PENDING',5,1009,14,null,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('PENDING',5,1009,15,null,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('PENDING',2,1010,16,null,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('PENDING',1,1010,17,null,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('PENDING',1,1011,18,null,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('PENDING',2,1011,19,null,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('PENDING',3,1012,20,null,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('PENDING',4,1013,21,null,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('PENDING',5,1014,22,null,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('PENDING',3,1015,23,null,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0),
('PENDING',4,1016,24,null,DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501,0);

INSERT INTO `pawsome`.`booking_slots`
(`booking_id`,
`booking_date`,
`booking_time`)
VALUES
(10000000, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"08:00"),
(10000000, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"08:30"),
(10000000, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"09:00"),
(10000001, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"08:30"),
(10000001, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"09:00"),
(10000001, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"09:30"),
(10000002, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"17:00"),
(10000002, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"17:30"),
(10000003, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"09:30"),
(10000004, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"16:00"),
(10000005, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"10:30"),
(10000005, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"11:00"),
(10000005, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"11:30"),
(10000005, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"12:00"),
(10000006, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"15:30"),
(10000006, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"16:00"),
(10000007, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"10:30"),
(10000007, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"11:00"),
(10000007, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"11:30"),
(10000008, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"11:00"),
(10000009, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"11:00"),
(10000010, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"11:30"),
(10000010, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"12:00"),
(10000010, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"12:30"),
(10000010, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"13:00"),
(10000011, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"12:00"),
(10000011, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"12:30"),
(10000012, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"12:30"),
(10000012, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"13:00"),
(10000013, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"09:00"),
(10000013, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"09:30"),
(10000013, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"10:00"),
(10000013, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"10:30"),
(10000014, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"12:00"),
(10000014, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"12:30"),
(10000014, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"13:00"),
(10000015, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"14:00"),
(10000015, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"14:30"),
(10000015, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"15:00"),
(10000015, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"15:30"),
(10000016, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"09:30"),
(10000016, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"10:00"),
(10000016, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"10:30"),
(10000017, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"13:30"),
(10000018, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"17:30"),
(10000019, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"15:00"),
(10000019, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"15:30"),
(10000019, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"16:00"),
(10000020, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"15:00"),
(10000021, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"17:00"),
(10000022, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"16:30"),
(10000023, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"17:00"),
(10000024, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"14:00"),
(10000024, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"14:30"),
(10000024, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"15:00"),
(10000024, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"15:30"),
(10000025, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"15:30"),
(10000025, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"16:00"),
(10000025, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"16:30"),
(10000027, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"16:00"),
(10000028, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"10:30"),
(10000029, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"08:00"),
(10000030, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"17:00"),
(10000031, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"13:30"),
(10000032, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"12:30"),
(10000033, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"14:30"),
(10000034, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"16:30"),
(10000034, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"17:00"),
(10000034, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"17:30"),
(10000035, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"16:30"),
(10000035, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"17:00"),
(10000035, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"17:30"),
(10000036, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"17:00"),
(10000036, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"17:30"),
(10000037, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"13:00"),
(10000037, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"13:30"),
(10000038, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"12:00"),
(10000038, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"12:30"),
(10000039, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"13:00"),
(10000039, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"13:30"),
(10000039, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"14:00"),
(10000040, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"12:30"),
(10000040, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"13:00"),
(10000040, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"13:30"),
(10000041, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"11:00"),
(10000041, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"11:30"),
(10000041, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"12:00"),
(10000041, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"12:30"),
(10000042, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"09:00"),
(10000042, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"09:30"),
(10000042, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"10:00"),
(10000043, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"10:00"),
(10000043, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"10:30"),
(10000044, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"10:00"),
(10000044, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"10:30"),
(10000045, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"08:30"),
(10000045, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"09:00"),
(10000046, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"13:30"),
(10000047, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"13:00"),
(10000048, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"08:00"),
(10000048, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"08:30"),
(10000049, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"08:00"),
(10000049, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"08:30"),
(10000049, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"09:00"),
(10000049, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"09:30"),
(10000050, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"08:30"),
(10000051, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"10:00"),
(10000052, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"09:00"),
(10000053, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"11:30"),
(10000054, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"10:00"),
(10000054, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"10:30"),
(10000055, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"12:30"),
(10000056, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"16:30"),
(10000056, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"17:00"),
(10000056, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"17:30"),
(10000057, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"14:00"),
(10000057, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"14:30"),
(10000058, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"17:30"),
(10000059, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"13:30"),
(10000060, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"17:30"),
(10000061, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"17:00"),
(10000062, 
IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),
"15:00"),
(10000063, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"13:00"),
(10000064, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"13:00"),
(10000065, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"11:00"),
(10000066, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"14:30"),
(10000067, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"10:30"),
(10000068, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"14:00"),
(10000068, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"14:30"),
(10000068, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"15:00"),
(10000069, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"15:00"),
(10000069, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"15:30"),
(10000069, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"16:00"),
(10000070, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"15:30"),
(10000070, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"16:00"),
(10000071, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"15:30"),
(10000071, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"16:00"),
(10000071, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"16:30"),
(10000072, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"14:00"),
(10000072, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"14:30"),
(10000073, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"15:30"),
(10000073, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"16:00"),
(10000074, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"11:00"),
(10000074, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"11:30"),
(10000075, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"11:30"),
(10000075, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"12:00"),
(10000075, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"12:30"),
(10000076, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"11:30"),
(10000076, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"12:00"),
(10000077, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"11:00"),
(10000077, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"11:30"),
(10000078, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"09:00"),
(10000078, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"09:30"),
(10000078, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"10:00"),
(10000079, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"09:00"),
(10000079, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"09:30"),
(10000079, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"10:00"),
(10000080, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"08:30"),
(10000080, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"09:00"),
(10000080, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"09:30"),
(10000081, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"08:00"),
(10000081, 
IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),
"08:30"),
(10000087, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"08:00"),
(10000087, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"08:30"),
(10000087, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"09:00"),
(10000087, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"09:30"),
(10000088, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"09:00"),
(10000088, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"09:30"),
(10000088, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"10:00"),
(10000089, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"08:00"),
(10000089, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"08:30"),
(10000090, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"09:00"),
(10000090, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"09:30"),
(10000090, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"10:00"),
(10000090, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"10:30"),
(10000091, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"08:00"),
(10000091, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"08:30"),
(10000092, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"10:00"),
(10000092, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"10:30"),
(10000093, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"10:30"),
(10000093, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"11:00"),
(10000094, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"10:00"),
(10000094, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"10:30"),
(10000094, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"11:00"),
(10000095, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"10:00"),
(10000095, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"10:30"),
(10000096, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"11:30"),
(10000096, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"12:00"),
(10000096, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"12:30"),
(10000097, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"12:30"),
(10000097, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"13:00"),
(10000097, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"13:30"),
(10000098, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"11:30"),
(10000098, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"12:00"),
(10000099, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"11:30"),
(10000099, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"12:00"),
(10000100, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"12:00"),
(10000100, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"12:30"),
(10000100, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"13:00"),
(10000101, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"14:30"),
(10000101, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"15:00"),
(10000102, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"13:30"),
(10000102, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"14:00"),
(10000102, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"14:30"),
(10000103, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"13:00"),
(10000103, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"13:30"),
(10000103, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"14:00"),
(10000103, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"14:30"),
(10000104, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"15:30"),
(10000104, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"16:00"),
(10000105, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"16:00"),
(10000105, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"16:30"),
(10000105, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"17:00"),
(10000106, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"15:00"),
(10000106, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"15:30"),
(10000107, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"15:30"),
(10000107, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"16:00"),
(10000107, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"16:30"),
(10000108, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"16:00"),
(10000108, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"16:30"),
(10000108, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"17:00"),
(10000109, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"17:00"),
(10000109, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"17:30"),
(10000110, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"12:30"),
(10000110, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"13:00"),
(10000110, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"13:30"),
(10000110, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"14:00"),
(10000110, 
IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 2 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 2 DAY, INTERVAL +1 DAY)
                )
			)
),
"14:30");

INSERT INTO `pawsome`.`booking_history`
(`booking_id`,
`prev_status`,
`new_status`,
`updated_date`,
`updated_by`)
VALUES
(10000000, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1001),
(10000000,'PENDING', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000000, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000001, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1001),
(10000001,'PENDING', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000001, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000002, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1002),
(10000002,'PENDING', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000002, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000003, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1003),
(10000003,'PENDING', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000003, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000004, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1006),
(10000004,'PENDING', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000004, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000005, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1006),
(10000005,'PENDING', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000005, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000006, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1008),
(10000006, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000007, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1008),
(10000007, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000008, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1008),
(10000008, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000009, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1009),
(10000009,'PENDING', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000009, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000010, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1010),
(10000010, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000011, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1010),
(10000011, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000011, 'CONFIRMED', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000011, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000012, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1011),
(10000012, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000013, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1011),
(10000013, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000013, 'CONFIRMED', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000013, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000014, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1011),
(10000014, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000014, 'CONFIRMED', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000014, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000015, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1011),
(10000015, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000016, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1013),
(10000016, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000017, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1013),
(10000017,'PENDING', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000017, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000018, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1014),
(10000018, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000018, 'CONFIRMED', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000018, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000019, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1016),
(10000019, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000020, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1017),
(10000020, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000021, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1018),
(10000021, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000022, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1019),
(10000022, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000023, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1020),
(10000023,'PENDING', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000023, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000024, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1022),
(10000024, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000025, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1022),
(10000025, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000025, 'CONFIRMED', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000025, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000027, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1024),
(10000027, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000027, 'CONFIRMED', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000027, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000028, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1001),
(10000028,'PENDING', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000028, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000029, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1001),
(10000029, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000030, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1002),
(10000030, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000031, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1003),
(10000031, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000032, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1004),
(10000032, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000033, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1005),
(10000033,'PENDING', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000033, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000034, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1008),
(10000034, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000034, 'CONFIRMED', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000034, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000035, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1009),
(10000035,'PENDING', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000035, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000036, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1009),
(10000036, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000037, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1013),
(10000037, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000038, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1014),
(10000038, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000039, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1015),
(10000039, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000040, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1016),
(10000040, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000041, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1021),
(10000041,'PENDING', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000041, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000042, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1022),
(10000042, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000042, 'CONFIRMED', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000042, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000043, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1022),
(10000043,'PENDING', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000043, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000044, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1022),
(10000044,'PENDING', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000044, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000045, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1023),
(10000045,'PENDING', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000045, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000046, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1001),
(10000046, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000046, 'CONFIRMED', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000046, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000046, 'CONFIRMED', 'FINISHED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),4),

(10000047, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1001),
(10000047, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000047, 'CONFIRMED', 'FINISHED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),2),

(10000048, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1001),
(10000048, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000048, 'CONFIRMED', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000048, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000048, 'CONFIRMED', 'FINISHED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),4),

(10000049, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1002),
(10000049, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000049, 'CONFIRMED', 'FINISHED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),5),

(10000050, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1003),
(10000050, 'PENDING', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000050, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000050, 'CONFIRMED', 'FINISHED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),2),

(10000051, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1004),
(10000051, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000051, 'CONFIRMED', 'FINISHED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),3),

(10000052, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1005),
(10000052, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000052, 'CONFIRMED', 'FINISHED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),4),

(10000053, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1007),
(10000053, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000053, 'CONFIRMED', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000053, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000053, 'CONFIRMED', 'FINISHED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),4),

(10000054, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1009),
(10000054, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000054, 'CONFIRMED', 'FINISHED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1),

(10000055, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1012),
(10000055, 'PENDING', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000055, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000055, 'CONFIRMED', 'FINISHED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),5),

(10000056, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1015),
(10000056, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000056, 'CONFIRMED', 'FINISHED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),3),

(10000057, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1021),
(10000057, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000057, 'CONFIRMED', 'FINISHED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1),

(10000058, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1022),
(10000058, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000058, 'CONFIRMED', 'FINISHED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1),

(10000059, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1022),
(10000059, 'PENDING', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000059, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000059, 'CONFIRMED', 'FINISHED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),3),

(10000060, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1023),
(10000060, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000060, 'CONFIRMED', 'FINISHED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),4),

(10000061, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1023),
(10000061, 'PENDING', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000061, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000061, 'CONFIRMED', 'FINISHED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),4),

(10000062, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1024),
(10000062, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000062, 'CONFIRMED', 'FINISHED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),4),

(10000063, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1001),
(10000063, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000063, 'CONFIRMED', 'FINISHED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),3),

(10000064, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1002),
(10000064, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000064, 'CONFIRMED', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000064, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000064, 'CONFIRMED', 'FINISHED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),2),

(10000065, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1003),
(10000065, 'PENDING', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000065, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000065, 'CONFIRMED', 'FINISHED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),2),

(10000066, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1006),
(10000066, 'PENDING', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000066, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000066, 'CONFIRMED', 'FINISHED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),5),

(10000067, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1007),
(10000067, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000067, 'CONFIRMED', 'FINISHED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),4),

(10000068, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1008),
(10000068, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000068, 'CONFIRMED', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000068, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000068, 'CONFIRMED', 'FINISHED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),2),

(10000069, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1010),
(10000069, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000069, 'CONFIRMED', 'FINISHED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),4),

(10000070, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1010),
(10000070, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000070, 'CONFIRMED', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000070, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000070, 'CONFIRMED', 'FINISHED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),2),

(10000071, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1011),
(10000071, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000071, 'CONFIRMED', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000071, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000071, 'CONFIRMED', 'FINISHED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),5),

(10000072, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1011),
(10000072, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000072, 'CONFIRMED', 'FINISHED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1),

(10000073, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1012),
(10000073, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000073, 'CONFIRMED', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000073, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000073, 'CONFIRMED', 'FINISHED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),3),

(10000074, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1017),
(10000074, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000074, 'CONFIRMED', 'FINISHED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),4),

(10000075, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1018),
(10000075, 'PENDING', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000075, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000075, 'CONFIRMED', 'FINISHED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),2),

(10000076, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1019),
(10000076, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000076, 'CONFIRMED', 'FINISHED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),5),

(10000077, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1020),
(10000077, 'PENDING', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000077, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000077, 'CONFIRMED', 'FINISHED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1),

(10000078, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1022),
(10000078, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000078, 'CONFIRMED', 'FINISHED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),4),

(10000079, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1023),
(10000079, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000079, 'CONFIRMED', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000079, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000079, 'CONFIRMED', 'FINISHED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),5),

(10000080, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1024),
(10000080, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000080, 'CONFIRMED', 'FINISHED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1),

(10000081, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1024),
(10000081, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000081, 'CONFIRMED', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000081, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000081, 'CONFIRMED', 'FINISHED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),3),

(10000082, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1006),
(10000082, 'PENDING', 'CANCELED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000083, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1019),
(10000083, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000083, 'CONFIRMED', 'CANCELED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000084, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1022),
(10000084, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000084, 'CONFIRMED', 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000084, 'PENDING', 'CANCELED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000085, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1001),
(10000085, 'PENDING', 'CANCELED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000086, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1017),
(10000086, 'PENDING', 'CONFIRMED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),
(10000086, 'CONFIRMED', 'CANCELED', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),501),

(10000087, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1001),
(10000088, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1001),
(10000089, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1001),
(10000090, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1002),
(10000091, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1002),
(10000092, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1003),
(10000093, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1003),
(10000094, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1004),
(10000095, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1005),
(10000096, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1006),
(10000097, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1007),
(10000098, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1008),
(10000099, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1008),
(10000100, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1009),
(10000101, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1009),
(10000102, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1010),
(10000103, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1010),
(10000104, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1011),
(10000105, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1011),
(10000106, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1012),
(10000107, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1013),
(10000108, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1014),
(10000109, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1014),
(10000110, null, 'PENDING', DATE_ADD(SYSDATE(), INTERVAL -7 DAY),1016);

INSERT INTO `pawsome`.`invoices`
(`booking_id`,
`invoice_amount`,
`updated_date`,
`updated_by`,
`archived`)
VALUES
(10000046,0.00,IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),4,0),
(10000047,0.00,IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),2,0),
(10000048,0.00,IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),4,0),
(10000049,0.00,IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),5,0),
(10000050,0.00,IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),2,0),
(10000051,0.00,IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),3,0),
(10000052,0.00,IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),4,0),
(10000053,0.00,IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),4,0),
(10000054,0.00,IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),1,0),
(10000055,0.00,IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),5,0),
(10000056,0.00,IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),3,0),
(10000057,0.00,IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),1,0),
(10000058,0.00,IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),1,0),
(10000059,0.00,IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),3,0),
(10000060,0.00,IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),4,0),
(10000061,0.00,IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),4,0),
(10000062,0.00,IF (DAYNAME(SYSDATE()) = 'Friday', 
			DATE_ADD(SYSDATE(), INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE()) = 'Thursday', 
				DATE_ADD(SYSDATE(), INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE()) = 'Saturday', 
					DATE_ADD(SYSDATE(), INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE(), INTERVAL +1 DAY)
                )
			)
),4,0),


(10000063,0.00,IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),3,0),
(10000064,0.00,IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),2,0),
(10000065,0.00,IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),2,0),
(10000066,0.00,IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),5,0),
(10000067,0.00,IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),4,0),
(10000068,0.00,IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),2,0),
(10000069,0.00,IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),4,0),
(10000070,0.00,IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),2,0),
(10000071,0.00,IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),5,0),
(10000072,0.00,IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),1,0),
(10000073,0.00,IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),3,0),
(10000074,0.00,IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),4,0),
(10000075,0.00,IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),2,0),
(10000076,0.00,IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),5,0),
(10000077,0.00,IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),1,0),
(10000078,0.00,IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),4,0),
(10000079,0.00,IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),5,0),
(10000080,0.00,IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),1,0),
(10000081,0.00,IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Friday', 
			DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY),
			IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Thursday', 
				DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +3 DAY), 
                IF (DAYNAME(SYSDATE() + INTERVAL 1 DAY) = 'Saturday', 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +2 DAY), 
					DATE_ADD(SYSDATE() + INTERVAL 1 DAY, INTERVAL +1 DAY)
                )
			)
),3,0);




SET FOREIGN_KEY_CHECKS=1;



