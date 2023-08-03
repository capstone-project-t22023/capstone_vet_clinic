DROP DATABASE IF EXISTS `pawsome`;
CREATE DATABASE IF NOT EXISTS `pawsome`;
USE `pawsome`;
commit;

DROP USER IF EXISTS 'pawsome_admin'@'localhost';
CREATE USER 'pawsome_admin'@'localhost' IDENTIFIED BY 'pawsome_admin2023';
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, INDEX, ALTER, CREATE VIEW, EXECUTE ON *.* TO 'pawsome_admin'@'localhost' REQUIRE NONE WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;
FLUSH PRIVILEGES;
commit;

DROP TABLE IF EXISTS `doctors`;
CREATE TABLE IF NOT EXISTS `doctors` (
  `id` int(11) COMMENT "Unique key of this table" NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) COMMENT "First name of doctor" NOT NULL,
  `lastname` varchar(50) COMMENT "Last name of doctor" DEFAULT NULL,
  `username` varchar(20) COMMENT "Username to be used for login" NOT NULL,
  `password` varchar(255) COMMENT "Password to be used for login" NOT NULL,
  `address` varchar(100) COMMENT "Address of user" NOT NULL,
  `state` varchar(100) COMMENT "State where address is found" NOT NULL,
  `email` varchar(100) COMMENT "Email of user" NOT NULL,
  `phone` int(11) COMMENT "Phone of user" NOT NULL,
  `postcode` int(4) COMMENT "Postcode of address entered by user" NOT NULL,
  `status` int(11) COMMENT "User status" NOT NULL,
  `created_date` datetime COMMENT "Creation date of user account" NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
);
commit;

DROP TABLE IF EXISTS `doctor_account_tokens`;
CREATE TABLE IF NOT EXISTS `doctor_account_tokens` (
  `doctor_id` int(11) COMMENT "Foreign key from doctors table" NOT NULL,
  `code` varchar(5) COMMENT "Unique token to confirm doctor, used for JWT" NOT NULL,
  UNIQUE KEY `doctor_id` (`doctor_id`),
  FOREIGN KEY (`doctor_id`) REFERENCES doctors(`id`)
);
commit;

DROP TABLE IF EXISTS `admins`;
CREATE TABLE IF NOT EXISTS `admins` (
  `id` int(11) COMMENT "Unique key of this table" NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) COMMENT "First name of admin" NOT NULL,
  `lastname` varchar(50) COMMENT "Last name of admin" DEFAULT NULL,
  `username` varchar(20) COMMENT "Username to be used for login" NOT NULL,
  `password` varchar(255) COMMENT "Password to be used for login" NOT NULL,
  `address` varchar(100) COMMENT "Address of user" NOT NULL,
  `state` varchar(100) COMMENT "State where address is found" NOT NULL,
  `email` varchar(100) COMMENT "Email of user" NOT NULL,
  `phone` int(11) COMMENT "Phone of user" NOT NULL,
  `postcode` int(4) COMMENT "Postcode of address entered by user" NOT NULL,
  `status` int(11) COMMENT "User status" NOT NULL,
  `created_date` datetime COMMENT "Creation date of user account" NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
);
commit;

DROP TABLE IF EXISTS `admin_account_tokens`;
CREATE TABLE IF NOT EXISTS `admin_account_tokens` (
  `admin_id` int(11) COMMENT "Foreign key from admins table" NOT NULL,
  `code` varchar(5) COMMENT "Unique token to confirm admin, used for JWT" NOT NULL,
  UNIQUE KEY `admin_id` (`admin_id`),
  FOREIGN KEY (`admin_id`) REFERENCES admins(`id`)
);
commit;

DROP TABLE IF EXISTS `pet_owners`;
CREATE TABLE IF NOT EXISTS `pet_owners` (
  `id` int(11) COMMENT "Unique key of this table" NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) COMMENT "First name of pet owner" NOT NULL,
  `lastname` varchar(50) COMMENT "Last name of pet owner" DEFAULT NULL,
  `username` varchar(20) COMMENT "Username to be used for login" NOT NULL,
  `password` varchar(255) COMMENT "Password to be used for login" NOT NULL,
  `address` varchar(100) COMMENT "Address of user" NOT NULL,
  `state` varchar(100) COMMENT "State where address is found" NOT NULL,
  `email` varchar(100) COMMENT "Email of user" NOT NULL,
  `phone` int(11) COMMENT "Phone of user" NOT NULL,
  `postcode` int(4) COMMENT "Postcode of address entered by user" NOT NULL,
  `status` int(11) COMMENT "User status" NOT NULL,
  `created_date` datetime COMMENT "Creation date of user account" NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
);
commit;

DROP TABLE IF EXISTS `pet_owners_account_tokens`;
CREATE TABLE IF NOT EXISTS `pet_owners_account_tokens` (
  `pet_owner_id` int(11) COMMENT "Foreign key from pet_owners table" NOT NULL,
  `code` varchar(5) COMMENT "Unique token to confirm pet owners, used for JWT" NOT NULL,
  UNIQUE KEY `pet_owner_id` (`pet_owner_id`),
  FOREIGN KEY (`pet_owner_id`) REFERENCES pet_owners(`id`)
);
commit;

ALTER TABLE admins AUTO_INCREMENT=501;
commit;

ALTER TABLE pet_owners AUTO_INCREMENT=1001;
commit;

INSERT INTO `admins`
(`firstname`, `lastname`, `username`, `password`, `address`, `state`, `email`, `phone`, `postcode`, `status`, `created_date`)
VALUES
('Pawsome','Admin','pawsome_admin',md5('pawsome_admin2023'),'40 Romawi Road','NSW','pawsome_admin@pawsome.com.au',123456789,2570,1,SYSDATE());
commit;

INSERT INTO `doctors`
(`firstname`, `lastname`, `username`, `password`, `address`, `state`, `email`, `phone`, `postcode`, `status`, `created_date`)
VALUES
('Joe','Mcguire','sneeringbovril',md5('sneeringbovril_2023'),'33 Arthur Street','NSW','sneeringbovril@pawsome.com.au',832775073,2761,1,SYSDATE()),
('Rafael','Johnston','cutemarmite',md5('cutemarmite_2023'),'31 Learmouth Street','NSW','cutemarmite@pawsome.com.au',761788124,2233,1,SYSDATE()),
('Nona','Zuniga','athleticsauerkraut',md5('athleticsauerkraut_2023'),'95 Norton Street','NSW','athleticsauerkraut@pawsome.com.au',337838789,2101,1,SYSDATE()),
('Gino','Stanley','downrightrapeseed',md5('downrightrapeseed_2023'),'96 McLachlan Street','QLD','downrightrapeseed@pawsome.com.au',560420894,4000,1,SYSDATE()),
('Sherman','Bray','teemingbroth',md5('teemingbroth_2023'),'56 Boonah Qld','QLD','teemingbroth@pawsome.com.au',734111089,4022,1,SYSDATE());
commit;

INSERT INTO `pet_owners`
(`firstname`, `lastname`, `username`, `password`, `address`, `state`, `email`, `phone`, `postcode`, `status`, `created_date`)
VALUES
('Gilbert','Lynch','ritzydonut',md5('ritzydonut_2023'),'4 Taylor Street','VIC','ritzydonut@pawsome.com.au',515335785,3000,1,SYSDATE()),
('Luigi','Swanson','moaningcasserole',md5('moaningcasserole_2023'),'11 Mnimbah Road','VIC','moaningcasserole@pawsome.com.au',838842364,3097,1,SYSDATE()),
('Flora','Short','abundantasparagus',md5('abundantasparagus_2023'),'2 Stanley Drive','VIC','abundantasparagus@pawsome.com.au',628402963,3787,1,SYSDATE()),
('Horace','Blanchard','abortivevanilla',md5('abortivevanilla_2023'),'74 Hodgson St','VIC','abortivevanilla@pawsome.com.au',508469679,3930,1,SYSDATE()),
('Brent','Davenport','grubbybolognase',md5('grubbybolognase_2023'),'90 McKillop Street','VIC','grubbybolognase@pawsome.com.au',344679468,3810,1,SYSDATE());
commit;

DROP TABLE IF EXISTS `pet_information`;
CREATE TABLE IF NOT EXISTS `pet_information` (
  `id` int(11) COMMENT "Unique key of this table" NOT NULL AUTO_INCREMENT,
  `petname` varchar(50) COMMENT "Name of pet" NOT NULL,
  `species` varchar(50) COMMENT "Species of pet" NOT NULL,
  `breed` varchar(50) COMMENT "Breed of pet" NOT NULL,
  `birthdate` datetime COMMENT "Birthdate of pet" NOT NULL,
  `weight` int(4) COMMENT "Weight of pet" NOT NULL,
  `comments` varchar(1000) COMMENT "Other comments for pet information like colour, behaviour, allergies",
  `update_date` datetime COMMENT "Update date of record" NOT NULL,
  PRIMARY KEY (`id`)
);
commit;