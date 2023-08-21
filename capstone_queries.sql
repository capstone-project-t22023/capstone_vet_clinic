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
  `weight` decimal(10,2) NOT NULL COMMENT 'Weight of pet',
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
  `updated_date` datetime NOT NULL COMMENT 'Update date of record',
  `updated_by` int(10) NOT NULL COMMENT 'User ID who updated the record',
  `archived` INT(1) NULL COMMENT 'Indicates id record is active or not',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) AUTO_INCREMENT=10000000;
commit;

DROP TABLE IF EXISTS `pawsome`.`receipts`;
CREATE TABLE `pawsome`.`receipts` (
  `id` INT(10) NOT NULL AUTO_INCREMENT COMMENT 'Unique key of this table',
  `invoice_id` INT(10) NOT NULL COMMENT 'Referenced invoice ID',
  `updated_date` datetime NOT NULL COMMENT 'Update date of record',
  `updated_by` int(10) NOT NULL COMMENT 'User ID who updated the record',
  `archived` INT(1) NULL COMMENT 'Indicates id record is active or not',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id`),
  UNIQUE INDEX `invoice_id_UNIQUE` (`invoice_id`),
  CONSTRAINT `fk_receipts_i`
    FOREIGN KEY (`id`)
    REFERENCES `pawsome`.`invoices` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) AUTO_INCREMENT=10000000;

DROP TABLE IF EXISTS `pawsome`.`bookings`;
CREATE TABLE `pawsome`.`bookings` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Unique key of this table',
  `booking_status` varchar(15) NOT NULL COMMENT 'Status of booking',
  `booking_type_id` int(10) NOT NULL COMMENT 'Referenced booking type',
  `pet_owner_id` int(10) NOT NULL COMMENT 'Referenced pet owner',
  `pet_id` int(10) NOT NULL COMMENT 'Referenced pet',
  `doctor_id` int(10) DEFAULT NULL COMMENT 'Referenced doctor',
  `invoice_id` int(10) DEFAULT NULL COMMENT 'Referenced invoice',
  `receipt_id` int(10) DEFAULT NULL COMMENT 'Referenced receipt',
  `updated_date` datetime NOT NULL COMMENT 'Update date of record',
  `updated_by` int(10) NOT NULL COMMENT 'User ID who updated the record',
  `archived` int(1) NOT NULL COMMENT 'Indicates id record is active or not',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `invoice_id_UNIQUE` (`invoice_id`),
  UNIQUE KEY `receipt_id_UNIQUE` (`receipt_id`),
  KEY `fk_booking_p` (`pet_id`),
  KEY `fk_booking_po` (`pet_owner_id`),
  KEY `fk_booking_bt` (`booking_type_id`),
  KEY `fk_booking_d_idx` (`doctor_id`),
  CONSTRAINT `fk_booking_bt` FOREIGN KEY (`booking_type_id`) REFERENCES `booking_types` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_booking_d` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_booking_i` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_booking_p` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_booking_po` FOREIGN KEY (`pet_owner_id`) REFERENCES `pet_owners` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_booking_r` FOREIGN KEY (`receipt_id`) REFERENCES `receipts` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
  `in-stock_qty` int(11) NOT NULL DEFAULT 0 COMMENT 'Stored inventory',
  `threshold_qty` int(11) NOT NULL DEFAULT 0 COMMENT 'Ordering level of inventory',
  `weight_volume` decimal(10,2) NOT NULL COMMENT 'Weight or volume of item',
  `item_unit` varchar(20) NOT NULL COMMENT 'Unit (grams, pieces, tablets, etc.)',
  `production_date` date NOT NULL COMMENT 'Production date',
  `expiration_date` date NOT NULL COMMENT 'Expiration date',
  `unit_price` decimal(10,2) NOT NULL COMMENT 'Price per item',
  `updated_by` int(10) DEFAULT NULL COMMENT 'Updated by user',
  `updated_date` datetime DEFAULT NULL COMMENT 'Updated date',
  `archived` int(1) DEFAULT NULL COMMENT 'Archived indicator',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_inventory_items_iic_idx` (`inventory_item_category_id`),
  CONSTRAINT `fk_inventory_items_iic` FOREIGN KEY (`inventory_item_category_id`) REFERENCES `inventory_item_categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

DROP TABLE IF EXISTS `pawsome`.`invoices`;
CREATE TABLE `pawsome`.`invoices` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Unique key of this table',
  `booking_id` int(10) NOT NULL COMMENT 'Referenced booking ID',
  `receipt_id` int(10) DEFAULT NULL COMMENT 'Reference receipt ID',
  `invoice_amount` decimal(10,2) NOT NULL,
  `updated_date` datetime NOT NULL COMMENT 'Update date of record',
  `updated_by` int(10) NOT NULL COMMENT 'User ID who updated the record',
  `archived` int(1) DEFAULT NULL COMMENT 'Indicates id record is active or not',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `booking_id_UNIQUE` (`booking_id`),
  UNIQUE KEY `receipt_id_UNIQUE` (`receipt_id`),
  KEY `fk_invoices_b_idx` (`booking_id`),
  KEY `fk_invoices_r_idx` (`receipt_id`),
  CONSTRAINT `fk_invoices_b` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_invoices_r` FOREIGN KEY (`receipt_id`) REFERENCES `receipts` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

DROP TABLE IF EXISTS `pawsome`.`invoice_items`;
CREATE TABLE `pawsome`.`invoice_items` (
  `invoice_id` int(10) NOT NULL COMMENT 'Reference invoice ID',
  `item_category_id` int(10) NOT NULL COMMENT 'Reference item category ID',
  `item_id` int(10) NOT NULL COMMENT 'Item identifier',
  `quantity` int(11) NOT NULL COMMENT 'Quantity of items',
  `unit_amount` decimal(10,2) NOT NULL COMMENT 'Amount per unit',
  `total_amount` decimal(5,2) NOT NULL COMMENT 'Total amount times quantity',
  KEY `fk_invoice_items_i_idx` (`invoice_id`),
  KEY `fk_invoice_items_ic_idx` (`item_category_id`),
  CONSTRAINT `fk_invoice_items_i` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_invoice_items_ic` FOREIGN KEY (`item_category_id`) REFERENCES `item_categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
  `payment_method` varchar(50) NOT NULL COMMENT 'Method of payment',
  `payment_status` varchar(50) NOT NULL COMMENT 'Status of payment',
  `payment_balance` decimal(10,2) NOT NULL COMMENT 'Remaining balance',
  `payment_paid` decimal(10,2) NOT NULL COMMENT 'Amount received from customer',
  `payment_change` decimal(10,2) NOT NULL COMMENT 'Change returned from payment made',
  `updated_by` int(10) DEFAULT NULL COMMENT 'Updated by user',
  `updated_date` datetime DEFAULT NULL COMMENT 'Updated date',
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
  CONSTRAINT `fk_payment_history_p` FOREIGN KEY (`payment_id`) REFERENCES `payments` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

DROP TABLE IF EXISTS `pawsome`.`prescriptions`;
CREATE TABLE `pawsome`.`prescriptions` (
  `id` int(10) NOT NULL COMMENT 'Unique identifier',
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
  `file` blob NOT NULL COMMENT 'File attached',
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
  `pet_id` int(10) NOT NULL COMMENT 'Referenced pet ID',
  `referral_id` int(10) NOT NULL COMMENT 'Referenced referral',
  `treatment_date` date NOT NULL COMMENT 'Date of treatments',
  `attended` varchar(1) DEFAULT NULL COMMENT 'Pet attended session',
  `comments` varchar(500) DEFAULT NULL COMMENT 'Additional comments',
  `updated_date` datetime DEFAULT NULL COMMENT 'Updated date',
  `updated_by` int(10) DEFAULT NULL COMMENT 'Updated by user',
  `archived` int(1) DEFAULT NULL COMMENT 'Archived indicator',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_rehab_p_idx` (`pet_id`),
  KEY `fk_rehab_r_idx` (`referral_id`),
  CONSTRAINT `fk_rehab_p` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
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
  CONSTRAINT `fk_receipts_i` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_receipts_p` FOREIGN KEY (`payment_id`) REFERENCES `payments` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

DROP TABLE IF EXISTS `pawsome`.`sales_invoices`;
CREATE TABLE `pawsome`.`sales_invoices` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'Unique key of this table',
  `payment_id` int(10) DEFAULT NULL COMMENT 'Referenced payment ID',
  `invoice_amount` decimal(10,2) NOT NULL,
  `updated_date` datetime NOT NULL COMMENT 'Update date of record',
  `updated_by` int(10) NOT NULL COMMENT 'User ID who updated the record',
  `archived` int(1) DEFAULT NULL COMMENT 'Indicates id record is active or not',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_sales_inv_p_idx` (`payment_id`),
  CONSTRAINT `fk_sales_inv_p` FOREIGN KEY (`payment_id`) REFERENCES `payments` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

DROP TABLE IF EXISTS `pawsome`.`sales_invoice_items`;
CREATE TABLE `pawsome`.`sales_invoice_items` (
  `sales_invoice_id` int(10) NOT NULL COMMENT 'Reference invoice ID',
  `item_category_id` int(10) NOT NULL COMMENT 'Reference item category ID',
  `item_id` int(10) NOT NULL COMMENT 'Item identifier',
  `quantity` int(11) NOT NULL COMMENT 'Quantity of items',
  `unit_amount` decimal(10,2) NOT NULL COMMENT 'Amount per unit',
  `total_amount` decimal(5,2) NOT NULL COMMENT 'Total amount times quantity',
  KEY `fk_sales_inv_si_idx` (`sales_invoice_id`),
  KEY `fk_sales_inv_ic_idx` (`item_category_id`),
  KEY `fk_sales_inv_i_idx` (`item_id`),
  CONSTRAINT `fk_sales_inv_items_i` FOREIGN KEY (`item_id`) REFERENCES `inventory_items` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sales_inv_items_ic` FOREIGN KEY (`item_category_id`) REFERENCES `item_categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sales_inv_items_si` FOREIGN KEY (`sales_invoice_id`) REFERENCES `sales_invoices` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

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
  `item_amount` decimal(10,2) NOT NULL COMMENT 'Amount charged for single item',
  `updated_by` int(10) DEFAULT NULL COMMENT 'Updated by user',
  `updated_date` datetime DEFAULT NULL COMMENT 'Updated date',
  `archived` int(1) DEFAULT NULL COMMENT 'Archived indicator',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_sci_sc_idx` (`service_category_id`),
  CONSTRAINT `fk_sci_sc` FOREIGN KEY (`service_category_id`) REFERENCES `service_categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

/** 
Stored Procedures
*/

DROP PROCEDURE IF EXISTS delete_pet;
DELIMITER //
CREATE PROCEDURE delete_pet(
	IN pet_id INT(10), 
    IN username VARCHAR(20)
)
BEGIN
	DECLARE done INT DEFAULT FALSE;
	DECLARE prev_status VARCHAR(15);
    DECLARE new_status VARCHAR(15);
    DECLARE b_status VARCHAR(15);
    DECLARE b_id INT(10);
    DECLARE booking_records CURSOR FOR 
		SELECT DISTINCT 
            b.id booking_id,
            b.booking_status
            FROM 
            `pawsome`.`bookings` b, 
            `pawsome`.`pets` p
            WHERE 
            b.pet_id = p.id 
            AND b.archived = 0
            AND p.id = pet_id;
	DECLARE
		CONTINUE HANDLER FOR NOT FOUND
		SET done = TRUE;
     DECLARE EXIT HANDLER FOR SQLEXCEPTION
		BEGIN
			ROLLBACK;
			SELECT 'An error has occurred, operation rollbacked and the stored procedure was terminated';
		END; 
            
    OPEN booking_records;
    read_loop: 
    LOOP
		FETCH booking_records INTO b_id, b_status;
        IF done THEN LEAVE read_loop;
		END IF;
        IF b_status = 'PENDING' || b_status = 'CONFIRMED' THEN
			SET new_status = 'CANCELED';
            SET prev_status = b_status;
            
            UPDATE `pawsome`.`bookings`
            SET archived = 1,
            booking_status = new_status,
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
                SELECT a.id from all_users a WHERE UPPER(a.username) = UPPER(username)
            )
            WHERE id = b_id;
            
            SET SQL_SAFE_UPDATES = 0;
            DELETE FROM `pawsome`.`booking_slots` WHERE booking_id = b_id;
            
            INSERT INTO `pawsome`.`booking_history`
            (`booking_id`,
            `prev_status`,
            `new_status`,
            `updated_date`,
            `updated_by`)
            VALUES
            (b_id,prev_status,new_status,SYSDATE(),
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
                SELECT a.id from all_users a WHERE UPPER(a.username) = UPPER(username)
            )
            );
        END IF;
    END LOOP read_loop;
    
    UPDATE `pawsome`.`pets`
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
                  SELECT a.id from all_users a WHERE UPPER(a.username) = UPPER(username)
    )
	  WHERE id = pet_id;
    
    COMMIT;
             
    CLOSE booking_records;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS delete_pet_owner;
DELIMITER //
CREATE PROCEDURE delete_pet_owner(
	IN pet_owner_id INT(10), 
    IN username VARCHAR(20)
)
BEGIN
	DECLARE done INT DEFAULT FALSE;
	DECLARE prev_status VARCHAR(15);
    DECLARE new_status VARCHAR(15);
    DECLARE b_status VARCHAR(15);
    DECLARE b_id INT(10);
    DECLARE p_id INT(10);
    DECLARE pet_records CURSOR FOR 
		SELECT DISTINCT 
            p.id pet_id
            FROM 
            `pawsome`.`pets` p
            WHERE 
            p.archived = 0
            AND p.pet_owner_id = pet_owner_id;
    DECLARE booking_records CURSOR FOR 
		SELECT DISTINCT 
            b.id booking_id,
            b.booking_status
            FROM 
            `pawsome`.`bookings` b, 
            `pawsome`.`pet_owners` p
            WHERE 
            b.pet_owner_id = p.id 
            AND b.archived = 0
            AND p.id = pet_owner_id;
	DECLARE
		CONTINUE HANDLER FOR NOT FOUND
		SET done = TRUE;
     DECLARE EXIT HANDLER FOR SQLEXCEPTION
		BEGIN
			ROLLBACK;
			SELECT 'An error has occurred, operation rollbacked and the stored procedure was terminated';
		END; 
            
    OPEN pet_records;        
    OPEN booking_records;
    
    SET done = FALSE;
    booking_loop: 
    LOOP
		FETCH booking_records INTO b_id, b_status;
        IF done THEN LEAVE booking_loop;
		END IF;
        IF b_status = 'PENDING' || b_status = 'CONFIRMED' THEN
			SET new_status = 'ARCHIVED';
            SET prev_status = b_status;
            
            UPDATE `pawsome`.`bookings`
            SET archived = 1,
            booking_status = new_status,
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
                SELECT a.id from all_users a WHERE UPPER(a.username) = UPPER(username)
            )
            WHERE id = b_id;
            
            SET SQL_SAFE_UPDATES = 0;
            DELETE FROM `pawsome`.`booking_slots` WHERE booking_id = b_id;
            
            INSERT INTO `pawsome`.`booking_history`
            (`booking_id`,
            `prev_status`,
            `new_status`,
            `updated_date`,
            `updated_by`)
            VALUES
            (b_id,prev_status,new_status,SYSDATE(),
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
                SELECT a.id from all_users a WHERE UPPER(a.username) = UPPER(username)
            )
            );
        END IF;
    END LOOP booking_loop;
    
    SET done = FALSE;
    pet_loop:
    LOOP
		FETCH pet_records INTO p_id;
        IF done THEN LEAVE pet_loop;
		END IF;
        
        UPDATE `pawsome`.`pets`
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
					  SELECT a.id from all_users a WHERE UPPER(a.username) = UPPER(username)
		)
		WHERE id = p_id;
    END LOOP pet_loop;
    
    SET SQL_SAFE_UPDATES = 0;
	DELETE FROM `pawsome`.`pet_owners_account_tokens` WHERE `pet_owners_account_tokens`.pet_owner_id = pet_owner_id;
    
    UPDATE `pawsome`.`pet_owners`
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
					  SELECT a.id from all_users a WHERE UPPER(a.username) = UPPER(username)
		)
		WHERE id = pet_owner_id;
    
    COMMIT;
             
    CLOSE pet_records;
    CLOSE booking_records;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS delete_doctor;
DELIMITER //
CREATE PROCEDURE delete_doctor(
	IN doctor_id INT(10), 
    IN username VARCHAR(20)
)
BEGIN
	DECLARE done INT DEFAULT FALSE;
	DECLARE prev_status VARCHAR(15);
    DECLARE new_status VARCHAR(15);
    DECLARE b_status VARCHAR(15);
    DECLARE b_id INT(10);
    DECLARE booking_records CURSOR FOR 
		SELECT DISTINCT 
            b.id booking_id,
            b.booking_status
            FROM 
            `pawsome`.`bookings` b, 
            `pawsome`.`doctors` d
            WHERE 
            b.doctor_id = d.id 
            AND b.archived = 0
            AND d.id = doctor_id;
	DECLARE
		CONTINUE HANDLER FOR NOT FOUND
		SET done = TRUE;
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
		BEGIN
			ROLLBACK;
			SELECT 'An error has occurred, operation rollbacked and the stored procedure was terminated';
		END; 
            
    OPEN booking_records;
    
    SET done = FALSE;
    booking_loop: 
    LOOP
		FETCH booking_records INTO b_id, b_status;
        IF done THEN LEAVE booking_loop;
		END IF;
        IF b_status = 'PENDING' || b_status = 'CONFIRMED' THEN
			SET new_status = 'PENDING';
            SET prev_status = b_status;
            
            UPDATE `pawsome`.`bookings`
            SET 
            doctor_id = null,
            booking_status = new_status,
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
                SELECT a.id from all_users a WHERE UPPER(a.username) = UPPER(username)
            )
            WHERE id = b_id;
            
            INSERT INTO `pawsome`.`booking_history`
            (`booking_id`,
            `prev_status`,
            `new_status`,
            `updated_date`,
            `updated_by`)
            VALUES
            (b_id,prev_status,new_status,SYSDATE(),
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
                SELECT a.id from all_users a WHERE UPPER(a.username) = UPPER(username)
            )
            );
        END IF;
    END LOOP booking_loop;
    
    SET SQL_SAFE_UPDATES = 0;
	DELETE FROM `pawsome`.`doctor_account_tokens` WHERE `doctor_account_tokens`.doctor_id = doctor_id;
    
    UPDATE `pawsome`.`doctors`
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
					  SELECT a.id from all_users a WHERE UPPER(a.username) = UPPER(username)
		)
		WHERE id = doctor_id;
    
    COMMIT;
             
    CLOSE booking_records;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS delete_admin;
DELIMITER //
CREATE PROCEDURE delete_admin(
	IN admin_id INT(10), 
    IN username VARCHAR(20)
)
BEGIN
	DECLARE done INT DEFAULT FALSE;
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
		BEGIN
			ROLLBACK;
			SELECT 'An error has occurred, operation rollbacked and the stored procedure was terminated';
		END; 
    
    SET SQL_SAFE_UPDATES = 0;
	DELETE FROM `pawsome`.`admin_account_tokens` WHERE `admin_account_tokens`.admin_id = admin_id;
    
    UPDATE `pawsome`.`admins`
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
					  SELECT a.id from all_users a WHERE UPPER(a.username) = UPPER(username)
		)
		WHERE id = admin_id;
    
    COMMIT;
             
END //

DELIMITER ;

/** 
Initial data scripts
*/

TRUNCATE TABLE `pawsome`.`admins`;
ALTER TABLE `pawsome`.`admins` AUTO_INCREMENT=501;
INSERT INTO `pawsome`.`admins`
(`firstname`, `lastname`, `username`, `password`, `address`, `state`, `email`, `phone`, `postcode`, `archived`, `created_date`,`updated_date`)
VALUES
('Pawsome','Admin','pawsome_admin',md5('pawsome_admin2023'),'40 Romawi Road','NSW','pawsome_admin@pawsome.com.au',123456789,2570,0,SYSDATE(),SYSDATE());
commit;

TRUNCATE TABLE `pawsome`.`doctors`;
INSERT INTO `pawsome`.`doctors`
(`firstname`, `lastname`, `username`, `password`, `address`, `state`, `email`, `phone`, `postcode`, `archived`, `created_date`,`updated_date`)
VALUES
('Joe','Mcguire','sneeringbovril',md5('sneeringbovril_2023'),'33 Arthur Street','NSW','sneeringbovril@pawsome.com.au',832775073,2761,0,SYSDATE(),SYSDATE()),
('Rafael','Johnston','cutemarmite',md5('cutemarmite_2023'),'31 Learmouth Street','NSW','cutemarmite@pawsome.com.au',761788124,2233,0,SYSDATE(),SYSDATE()),
('Nona','Zuniga','athleticsauerkraut',md5('athleticsauerkraut_2023'),'95 Norton Street','NSW','athleticsauerkraut@pawsome.com.au',337838789,2101,0,SYSDATE(),SYSDATE()),
('Gino','Stanley','downrightrapeseed',md5('downrightrapeseed_2023'),'96 McLachlan Street','NSW','downrightrapeseed@pawsome.com.au',560420894,4000,0,SYSDATE(),SYSDATE()),
('Sherman','Bray','teemingbroth',md5('teemingbroth_2023'),'56 Boonah Qld','NSW','teemingbroth@pawsome.com.au',734111089,4022,0,SYSDATE(),SYSDATE());
commit;

TRUNCATE TABLE `pawsome`.`pet_owners`;
ALTER TABLE `pawsome`.`pet_owners` AUTO_INCREMENT=1001;
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

TRUNCATE TABLE `pawsome`.`pets`;
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
(1002, 'Snickers', 'Guinea Pig', 'Teddy', STR_TO_DATE("14-03-2021","%d-%m-%Y"),1,'Male','No allergies',null,null,SYSDATE(),501,0),
(1003, 'Muffin', 'Dog', 'Rottweiler', STR_TO_DATE("12-04-2020","%d-%m-%Y"),54.5,'Male','No allergies','9382754683',STR_TO_DATE("30-06-2027","%d-%m-%Y"),SYSDATE(),501,0),
(1004, 'Pudding', 'Dog', 'Beagle', STR_TO_DATE("30-05-2021","%d-%m-%Y"),16,'Female','No allergies','5647291745',STR_TO_DATE("30-07-2028","%d-%m-%Y"),SYSDATE(),501,0),
(1005, 'Mocha', 'Cat', 'Siamese', STR_TO_DATE("29-06-2020","%d-%m-%Y"),4.6,'Female','No allergies','7543759385',STR_TO_DATE("30-08-2026","%d-%m-%Y"),SYSDATE(),501,0),
(1007, 'Biscuit', 'Hamster', 'Roborovski Dwarf', STR_TO_DATE("18-07-2021","%d-%m-%Y"),0.15,'Female','No allergies',null,null,SYSDATE(),501,0),
(1008, 'Oreo', 'Dog', 'Samoyed', STR_TO_DATE("16-08-2021","%d-%m-%Y"),25,'Male','No allergies','1606852875',STR_TO_DATE("30-09-2026","%d-%m-%Y"),SYSDATE(),501,0),
(1009, 'Peanut', 'Rabbit', 'Mini Lop', STR_TO_DATE("23-09-2020","%d-%m-%Y"),4.2,'Male','No allergies',null,null,SYSDATE(),501,0),
(1010, 'Cocoa', 'Dog', 'Bulldog', STR_TO_DATE("21-10-2019","%d-%m-%Y"),25,'Male','No allergies','3075355527',STR_TO_DATE("30-01-2025","%d-%m-%Y"),SYSDATE(),501,0),
(1010, 'Peaches', 'Cat', 'British Shorthair', STR_TO_DATE("19-11-2020","%d-%m-%Y"),4.65,'Male','No allergies','8171549774',STR_TO_DATE("30-10-2025","%d-%m-%Y"),SYSDATE(),501,0),
(1011, 'Waffles', 'Cat', 'Persian', STR_TO_DATE("17-12-2019","%d-%m-%Y"),4.53,'Female','No allergies','5837259435',STR_TO_DATE("30-11-2024","%d-%m-%Y"),SYSDATE(),501,0),
(1011, 'Riley', 'Dog', 'Siberian Husky', STR_TO_DATE("15-01-2018","%d-%m-%Y"),27,'Female','No allergies','2560253352',STR_TO_DATE("30-04-2025","%d-%m-%Y"),SYSDATE(),501,0),
(1012, 'Taylor', 'Dog', 'German Shepherd', STR_TO_DATE("01-02-2016","%d-%m-%Y"),38.5,'Female','No allergies','8872866253',STR_TO_DATE("30-03-2024","%d-%m-%Y"),SYSDATE(),501,0),
(1013, 'Jamie', 'Cat', 'Sphynx', STR_TO_DATE("09-03-2020","%d-%m-%Y"),4.31,'Female','No allergies',null,null,SYSDATE(),501,0),
(1014, 'Sam', 'Dog', 'Chihuahua', STR_TO_DATE("23-04-2019","%d-%m-%Y"),2.7,'Male','No allergies','6254619187',STR_TO_DATE("30-09-2025","%d-%m-%Y"),SYSDATE(),501,0),
(1015, 'Rain', 'Cat', 'Burmese', STR_TO_DATE("28-05-2018","%d-%m-%Y"),4.23,'Male','No allergies','7028076622',STR_TO_DATE("30-05-2024","%d-%m-%Y"),SYSDATE(),501,0),
(1016, 'Daisy', 'Dog', 'Dachshund', STR_TO_DATE("22-06-2015","%d-%m-%Y"),12,'Male','No allergies',null,null,SYSDATE(),501,0),
(1002, 'Maple', 'Cat', 'Exotic Shorthair', STR_TO_DATE("21-07-2018","%d-%m-%Y"),4.37,'Female','No allergies','9086804387',STR_TO_DATE("30-06-2024","%d-%m-%Y"),SYSDATE(),501,0),
(1017, 'Stormy', 'Dog', 'Poodle', STR_TO_DATE("18-08-2017","%d-%m-%Y"),35,'Female','No allergies','7766577891',STR_TO_DATE("30-07-2025","%d-%m-%Y"),SYSDATE(),501,0),
(1018, 'Pippin', 'Guinea Pig', 'Texel', STR_TO_DATE("16-09-2020","%d-%m-%Y"),0.9,'Male','No allergies',null,null,SYSDATE(),501,0),
(1019, 'Yoda', 'Dog', 'Border Collie', STR_TO_DATE("11-10-2015","%d-%m-%Y"),24,'Female','No allergies','9833517263',STR_TO_DATE("30-08-2025","%d-%m-%Y"),SYSDATE(),501,0),
(1020, 'Toto', 'Dog', 'Bichon Frisé', STR_TO_DATE("13-11-2018","%d-%m-%Y"),9,'Male','No allergies','1054943276',STR_TO_DATE("30-07-2024","%d-%m-%Y"),SYSDATE(),501,0),
(1009, 'Lady', 'Cat', 'Abyssinian', STR_TO_DATE("15-12-2018","%d-%m-%Y"),4.26,'Female','No allergies','8673170001',STR_TO_DATE("30-08-2026","%d-%m-%Y"),SYSDATE(),501,0),
(1008, 'Puffy', 'Rabbit', 'Dutch', STR_TO_DATE("17-01-2020","%d-%m-%Y"),4.9,'Female','No allergies',null,null,SYSDATE(),501,0),
(1001, 'Sunny', 'Hamster', 'Campbell''s Dwarf', STR_TO_DATE("21-02-2021","%d-%m-%Y"),0.13,'Male','No allergies',null,null,SYSDATE(),501,0),
(1003, 'Luna', 'Guinea Pig', 'Peruvian', STR_TO_DATE("23-03-2022","%d-%m-%Y"),0.93,'Female','No allergies',null,null,SYSDATE(),501,0);
commit;

TRUNCATE TABLE `pawsome`.`bookings`;
ALTER TABLE `pawsome`.`bookings` AUTO_INCREMENT=10000000;
INSERT INTO `pawsome`.`bookings`
(`booking_status`,
`booking_type_id`,
`pet_owner_id`,
`pet_id`,
`invoice_id`,
`receipt_id`,
`updated_date`,
`updated_by`,
`archived`)
VALUES
("PENDING", 1, 1001, 1, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1001, 2, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1001, 26, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1002, 3, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1002, 19, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1003, 4, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1003, 27, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1004, 5, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1005, 6, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1007, 7, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1008, 8, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1008, 25, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1009, 9, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1009, 24, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1010, 10, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1010, 11, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1011, 12, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1011, 13, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1012, 14, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1013, 15, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1014, 16, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1015, 17, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1016, 18, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1017, 20, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1018, 21, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1019, 22, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1020, 23, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1001, 1, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1001, 2, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1001, 26, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1002, 3, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1002, 19, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1003, 4, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1003, 27, null, null, SYSDATE(),501, 0),
("PENDING", 1, 1004, 5, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1005, 6, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1007, 7, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1008, 8, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1008, 25, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1009, 9, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1009, 24, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1010, 10, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1010, 11, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1011, 12, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1011, 13, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1012, 14, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1013, 15, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1014, 16, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1015, 17, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1016, 18, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1017, 20, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1018, 21, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1019, 22, null, null, SYSDATE(), 501, 0),
("PENDING", 1, 1020, 23, null, null, SYSDATE(), 501, 0);
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

TRUNCATE TABLE `pawsome`.`booking_slots`;
INSERT INTO `pawsome`.`booking_slots`
(`booking_id`,
`booking_date`,
`booking_time`)
VALUES
(10000000, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"08:30"),
(10000001, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"09:00"),
(10000001, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"09:30"),
(10000001, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"10:00"),
(10000002, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"10:30"),
(10000003, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"11:30"),
(10000004, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"13:30"),
(10000004, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"14:00"),
(10000004, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"14:30"),
(10000005, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"15:00"),
(10000006, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"16:00"),
(10000007, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"09:00"),
(10000008, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"08:00"),
(10000009, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"09:00"),
(10000009, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"17:00"),
(10000010, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"09:00"),
(10000011, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"09:00"),
(10000012, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"14:00"),
(10000013, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"13:30"),
(10000013, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"14:00"),
(10000014, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"16:00"),
(10000015, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"16:00"),
(10000016, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"16:00"),
(10000017, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"15:00"),
(10000018, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"08:00"),
(10000019, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"14:30"),
(10000020, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"14:00"),
(10000020, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"14:30"),
(10000020, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"15:00"),
(10000020, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"15:30"),
(10000021, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"15:00"),
(10000022, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"15:00"),
(10000023, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"09:30"),
(10000023, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"11:30"),
(10000024, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"08:00"),
(10000025, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"16:00"),
(10000025, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"16:30"),
(10000025, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"17:00"),
(10000026, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"08:00"),
(10000026, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"14:00"),
(10000027, STR_TO_DATE("08-09-2023", "%d-%m-%Y"),"08:00"),
(10000028, STR_TO_DATE("07-09-2023", "%d-%m-%Y"),"08:00"),
(10000029, STR_TO_DATE("07-09-2023", "%d-%m-%Y"),"09:00"),
(10000030, STR_TO_DATE("07-09-2023", "%d-%m-%Y"),"10:30"),
(10000031, STR_TO_DATE("07-09-2023", "%d-%m-%Y"),"11:30"),
(10000032, STR_TO_DATE("07-09-2023", "%d-%m-%Y"),"13:30"),
(10000032, STR_TO_DATE("07-09-2023", "%d-%m-%Y"),"14:00"),
(10000033, STR_TO_DATE("07-09-2023", "%d-%m-%Y"),"14:30"),
(10000035, STR_TO_DATE("07-09-2023", "%d-%m-%Y"),"15:00"),
(10000035, STR_TO_DATE("07-09-2023", "%d-%m-%Y"),"16:00"),
(10000036, STR_TO_DATE("07-09-2023", "%d-%m-%Y"),"09:00"),
(10000037, STR_TO_DATE("07-09-2023", "%d-%m-%Y"),"08:00"),
(10000038, STR_TO_DATE("07-09-2023", "%d-%m-%Y"),"09:00"),
(10000039, STR_TO_DATE("07-09-2023", "%d-%m-%Y"),"17:00"),
(10000040, STR_TO_DATE("07-09-2023", "%d-%m-%Y"),"09:00"),
(10000041, STR_TO_DATE("07-09-2023", "%d-%m-%Y"),"09:00"),
(10000042, STR_TO_DATE("07-09-2023", "%d-%m-%Y"),"14:00"),
(10000042, STR_TO_DATE("07-09-2023", "%d-%m-%Y"),"13:30"),
(10000042, STR_TO_DATE("07-09-2023", "%d-%m-%Y"),"14:00"),
(10000043, STR_TO_DATE("07-09-2023", "%d-%m-%Y"),"16:00"),
(10000044, STR_TO_DATE("07-09-2023", "%d-%m-%Y"),"16:00"),
(10000045, STR_TO_DATE("07-09-2023", "%d-%m-%Y"),"16:00"),
(10000046, STR_TO_DATE("07-09-2023", "%d-%m-%Y"),"15:00"),
(10000047, STR_TO_DATE("07-09-2023", "%d-%m-%Y"),"08:00"),
(10000048, STR_TO_DATE("07-09-2023", "%d-%m-%Y"),"14:30"),
(10000049, STR_TO_DATE("07-09-2023", "%d-%m-%Y"),"14:00"),
(10000049, STR_TO_DATE("07-09-2023", "%d-%m-%Y"),"14:30"),
(10000050, STR_TO_DATE("07-09-2023", "%d-%m-%Y"),"15:00"),
(10000050, STR_TO_DATE("07-09-2023", "%d-%m-%Y"),"15:30"),
(10000051, STR_TO_DATE("07-09-2023", "%d-%m-%Y"),"15:00"),
(10000052, STR_TO_DATE("07-09-2023", "%d-%m-%Y"),"15:00"),
(10000053, STR_TO_DATE("07-09-2023", "%d-%m-%Y"),"09:30");
commit;

TRUNCATE TABLE `pawsome`.`booking_history`;
INSERT INTO `pawsome`.`booking_history`
(`booking_id`,
`new_status`,
`updated_date`,
`updated_by`)
VALUES
(10000000, 'PENDING', SYSDATE(),501),
(10000001, 'PENDING', SYSDATE(),501),
(10000002, 'PENDING', SYSDATE(),501),
(10000003, 'PENDING', SYSDATE(),501),
(10000004, 'PENDING', SYSDATE(),501),
(10000005, 'PENDING', SYSDATE(),501),
(10000006, 'PENDING', SYSDATE(),501),
(10000007, 'PENDING', SYSDATE(),501),
(10000008, 'PENDING', SYSDATE(),501),
(10000009, 'PENDING', SYSDATE(),501),
(10000010, 'PENDING', SYSDATE(),501),
(10000011, 'PENDING', SYSDATE(),501),
(10000012, 'PENDING', SYSDATE(),501),
(10000013, 'PENDING', SYSDATE(),501),
(10000014, 'PENDING', SYSDATE(),501),
(10000015, 'PENDING', SYSDATE(),501),
(10000016, 'PENDING', SYSDATE(),501),
(10000017, 'PENDING', SYSDATE(),501),
(10000018, 'PENDING', SYSDATE(),501),
(10000019, 'PENDING', SYSDATE(),501),
(10000020, 'PENDING', SYSDATE(),501),
(10000021, 'PENDING', SYSDATE(),501),
(10000022, 'PENDING', SYSDATE(),501),
(10000023, 'PENDING', SYSDATE(),501),
(10000024, 'PENDING', SYSDATE(),501),
(10000025, 'PENDING', SYSDATE(),501),
(10000026, 'PENDING', SYSDATE(),501),
(10000027, 'PENDING', SYSDATE(),501),
(10000028, 'PENDING', SYSDATE(),501),
(10000029, 'PENDING', SYSDATE(),501),
(10000030, 'PENDING', SYSDATE(),501),
(10000031, 'PENDING', SYSDATE(),501),
(10000032, 'PENDING', SYSDATE(),501),
(10000033, 'PENDING', SYSDATE(),501),
(10000035, 'PENDING', SYSDATE(),501),
(10000036, 'PENDING', SYSDATE(),501),
(10000037, 'PENDING', SYSDATE(),501),
(10000038, 'PENDING', SYSDATE(),501),
(10000039, 'PENDING', SYSDATE(),501),
(10000040, 'PENDING', SYSDATE(),501),
(10000041, 'PENDING', SYSDATE(),501),
(10000042, 'PENDING', SYSDATE(),501),
(10000043, 'PENDING', SYSDATE(),501),
(10000044, 'PENDING', SYSDATE(),501),
(10000045, 'PENDING', SYSDATE(),501),
(10000046, 'PENDING', SYSDATE(),501),
(10000047, 'PENDING', SYSDATE(),501),
(10000048, 'PENDING', SYSDATE(),501),
(10000049, 'PENDING', SYSDATE(),501),
(10000050, 'PENDING', SYSDATE(),501),
(10000050, 'PENDING', SYSDATE(),501),
(10000051, 'PENDING', SYSDATE(),501),
(10000052, 'PENDING', SYSDATE(),501),
(10000053, 'PENDING', SYSDATE(),501);
commit;

SET FOREIGN_KEY_CHECKS=1;
