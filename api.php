<?php 

/**
 * 
 * Main API file used by the web application
 * Fetch URLs check for corresponding action in this file
 * 
 */

 /**
  * File where queries called in the file are located
  */
include './classes/database.php';

 /**
  * File where JWT functions are called in the file are located
  */
include './classes/jwt.php';

 /**
  * File input validations are performed
  */
include './classes/validations.php';

 /**
  * Handling cross origin request headers
  * Define which methods can come through the API fetch URL
  */
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, UPDATE');
header("Access-Control-Allow-Headers: X-Requested-With");

 /**
  * Handle the path such that PHP can determine the endpoint used in the fetch URL
  * Divide the URL using / delimiter
  * Fetch URL example: http://localhost/capstone_vet_clinic/api.php/get_user/1
  * [0] localhost
  * [1] folder_name [capstone_vet_clinic]
  * [2] PHP file of API [api.php]
  * [3] action [get_user]
  * [4] unique record ID [1]
  */
$req = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$req = explode('/', $req);

$action = $req[3];
$id = $req[4];

/**
 * fetch("http://localhost/capstone_vet_clinic/api.php/user", {
 *      headers: {
 *          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
 *      },
 *      })
 * 
 * Must include this in headers for all fetch URLs in pages where user is expected to be authenticated
 * Calls on get_bearer_token function from jwt.php file
 * Checks if a token is present before verifying if token is valid using valid_jwt_token function
 * This is a secret key exchanged when traversing the pages or making API calls to ensure
 * user is authenticated whenever call is made
 * 
 */
$bearer_token = get_bearer_token();
$valid_jwt_token = isset($bearer_token) ? valid_jwt_token($bearer_token) : false;

/**
 * Initialize new instance of Database class
 */
$database = new Database();

/**
 * Authorization and User Management
 */

/**
 * Executed when doctor registers
 * A unique code will be generated to be entered by doctor later to be activated
 */
if ($action === 'register_doctor') {
    $rest_json = file_get_contents('php://input');
    $_POST = json_decode($rest_json, true);
    $check = false;

    if(validateLength($_POST['firstname'], 50)
        && validateAlpha($_POST['firstname'])){
        $check = true;
    } else {
        return_json(['register_user' =>  "Error: Firstname must be up to 50 letters only."]);
    }

    if(validateLength($_POST['lastname'], 50)
        && validateAlpha($_POST['lastname'])){
        $check = true;
    } else {
        return_json(['register_user' =>  "Error: Lastname must be up to 50 letters only."]);
    }

    if(validateUsername($_POST['username'])
        && validateLength($_POST['username'], 20)){
        $check = true;
    } else {
        return_json(['register_user' =>  "Error: Username must be up to 20 characters only."]);  
    }

    if(validatePassword($_POST['password'])
        && validateLength($_POST['password'], 20)){
        $check = true;
    } else {
        return_json(['register_user' =>  "Error: Password must be at least 8 letters, at least one number, one uppercase, one lowercase, and one special character only."]);  
    }

    if(validateAlphaNumeric($_POST['address'])
        && validateLength($_POST['address'], 100)){
        $check = true;
    } else {
        return_json(['register_user' =>  "Error: Address must be up to 100 letters only."]);  
    }

    if(validateAlpha($_POST['state'])
        && validateLength($_POST['state'], 100)){
        $check = true;
    } else {
        return_json(['register_user' =>  "Error: State must be up to 100 letters only."]);  
    }

    if(validateEmail($_POST['email'])
        && validateLength($_POST['email'], 100)){
        $check = true;
    } else {
        return_json(['register_user' =>  "Error: Email must be up to 100 letters only."]);  
    }

    if(validateNumeric($_POST['phone'])
        && validateLength($_POST['phone'], 9)){
        $check = true;
    } else {
        return_json(['register_user' =>  "Error: Phone number must be up to 9 numerical characters only."]);  
    }

    if(validateNumeric($_POST['postcode'])
        && validateLength($_POST['postcode'], 4)){
        $check = true;
    } else {
        return_json(['register_user' =>  "Error: Postcode must be up to 4 numerical characters only."]);  
    }

    if($check){
        $doctor = [
            'firstname' => $_POST['firstname'],
            'lastname' => $_POST['lastname'],
            'username' => $_POST['username'],
            'password' => md5($_POST['password']),
            'address' => $_POST['address'],
            'state' => $_POST['state'],
            'email' => $_POST['email'],
            'phone' => $_POST['phone'],
            'postcode' => $_POST['postcode'],
            'archived' => 1,
            'created_date' => date('Y-m-d H:i:s'),
            'updated_date' => date('Y-m-d H:i:s'),
        ];

        if ($doctor_id = $database->addDoctor($doctor)) {
            $doctor['id'] = $doctor_id;
            if ($code = $database->generateTokenForDoctor($doctor_id)) {
                $headers = ['alg' => 'HS256', 'typ' => 'JWT'];
                $payload = ['user' => $doctor];
                $jwt = generate_jwt_token($headers, $payload);
                return_json(['register_user' => $jwt]);
            }
        }
    } else {
        return_json(['register_user' => "Error occured."]);
    }
}  

/**
 * Executed when admin registers
 * A unique code will be generated to be entered by admin later to be activated
 */
if ($action === 'register_admin') {
    $rest_json = file_get_contents('php://input');
    $_POST = json_decode($rest_json, true);
    $check = false;

    if(validateLength($_POST['firstname'], 50)
        && validateAlpha($_POST['firstname'])){
        $check = true;
    } else {
        return_json(['register_user' =>  "Error: Firstname must be up to 50 letters only."]);
    }

    if(validateLength($_POST['lastname'], 50)
        && validateAlpha($_POST['lastname'])){
        $check = true;
    } else {
        return_json(['register_user' =>  "Error: Lastname must be up to 50 letters only."]);
    }

    if(validateUsername($_POST['username'])
        && validateLength($_POST['username'], 20)){
        $check = true;
    } else {
        return_json(['register_user' =>  "Error: Username must be up to 20 characters only."]);  
    }

    if(validatePassword($_POST['password'])
        && validateLength($_POST['password'], 20)){
        $check = true;
    } else {
        return_json(['register_user' =>  "Error: Password must be at least 8 letters, at least one number, one uppercase, one lowercase, and one special character only."]);  
    }

    if(validateAlphaNumeric($_POST['address'])
        && validateLength($_POST['address'], 100)){
        $check = true;
    } else {
        return_json(['register_user' =>  "Error: Address must be up to 100 letters only."]);  
    }

    if(validateAlpha($_POST['state'])
        && validateLength($_POST['state'], 100)){
        $check = true;
    } else {
        return_json(['register_user' =>  "Error: State must be up to 100 letters only."]);  
    }

    if(validateEmail($_POST['email'])
        && validateLength($_POST['email'], 100)){
        $check = true;
    } else {
        return_json(['register_user' =>  "Error: Email must be up to 100 letters only."]);  
    }

    if(validateNumeric($_POST['phone'])
        && validateLength($_POST['phone'], 9)){
        $check = true;
    } else {
        return_json(['register_user' =>  "Error: Phone number must be up to 9 numerical characters only."]);  
    }

    if(validateNumeric($_POST['postcode'])
        && validateLength($_POST['postcode'], 4)){
        $check = true;
    } else {
        return_json(['register_user' =>  "Error: Postcode must be up to 4 numerical characters only."]);  
    }

    $admin = [
        'firstname' => $_POST['firstname'],
        'lastname' => $_POST['lastname'],
        'username' => $_POST['username'],
        'password' => md5($_POST['password']),
        'address' => $_POST['address'],
        'state' => $_POST['state'],
        'email' => $_POST['email'],
        'phone' => $_POST['phone'],
        'postcode' => $_POST['postcode'],
        'archived' => 1,
        'created_date' => date('Y-m-d H:i:s'),
        'updated_date' => date('Y-m-d H:i:s'),
    ];

    if($check){
        if ($admin_id = $database->addAdmin($admin)) {
            $admin['id'] = $admin_id;
            if ($code = $database->generateTokenForAdmin($admin_id)) {
                $headers = ['alg' => 'HS256', 'typ' => 'JWT'];
                $payload = ['user' => $admin];
                $jwt = generate_jwt_token($headers, $payload);
                return_json(['register_user' => $jwt]);
            }
        }
    } else {
        return_json(['register_user' => "Error occured."]);
    }
}  

/**
 * Executed when pet owner registers
 * A unique code will be generated to be entered by pet owner later to be activated
 */
if ($action === 'register_pet_owner') {
    $rest_json = file_get_contents('php://input');
    $_POST = json_decode($rest_json, true);
    $check = false;

    if(validateLength($_POST['firstname'], 50)
        && validateAlpha($_POST['firstname'])){
        $check = true;
    } else {
        return_json(['register_user' =>  "Error: Firstname must be up to 50 letters only."]);
    }

    if(validateLength($_POST['lastname'], 50)
        && validateAlpha($_POST['lastname'])){
        $check = true;
    } else {
        return_json(['register_user' =>  "Error: Lastname must be up to 50 letters only."]);
    }

    if(validateUsername($_POST['username'])
        && validateLength($_POST['username'], 20)){
        $check = true;
    } else {
        return_json(['register_user' =>  "Error: Username must be up to 20 characters only."]);  
    }

    if(validatePassword($_POST['password'])
        && validateLength($_POST['password'], 20)){
        $check = true;
    } else {
        return_json(['register_user' =>  "Error: Password must be at least 8 letters, at least one number, one uppercase, one lowercase, and one special character only."]);  
    }

    if(validateAlphaNumeric($_POST['address'])
        && validateLength($_POST['address'], 100)){
        $check = true;
    } else {
        return_json(['register_user' =>  "Error: Address must be up to 100 letters only."]);  
    }

    if(validateAlpha($_POST['state'])
        && validateLength($_POST['state'], 100)){
        $check = true;
    } else {
        return_json(['register_user' =>  "Error: State must be up to 100 letters only."]);  
    }

    if(validateEmail($_POST['email'])
        && validateLength($_POST['email'], 100)){
        $check = true;
    } else {
        return_json(['register_user' =>  "Error: Email must be up to 100 letters only."]);  
    }

    if(validateNumeric($_POST['phone'])
        && validateLength($_POST['phone'], 9)){
        $check = true;
    } else {
        return_json(['register_user' =>  "Error: Phone number must be up to 9 numerical characters only."]);  
    }

    if(validateNumeric($_POST['postcode'])
        && validateLength($_POST['postcode'], 4)){
        $check = true;
    } else {
        return_json(['register_user' =>  "Error: Postcode must be up to 4 numerical characters only."]);  
    }

    $pet_owner = [
        'firstname' => $_POST['firstname'],
        'lastname' => $_POST['lastname'],
        'username' => $_POST['username'],
        'password' => md5($_POST['password']),
        'address' => $_POST['address'],
        'state' => $_POST['state'],
        'email' => $_POST['email'],
        'phone' => $_POST['phone'],
        'postcode' => $_POST['postcode'],
        'archived' => 1,
        'created_date' => date('Y-m-d H:i:s'),
        'updated_date' => date('Y-m-d H:i:s'),
    ];

    if($check){
        if ($pet_owner_id = $database->addPetOwner($pet_owner)) {
            $pet_owner['id'] = $pet_owner_id;
            if ($code = $database->generateTokenForPetOwners($pet_owner_id)) {
                $headers = ['alg' => 'HS256', 'typ' => 'JWT'];
                $payload = ['user' => $pet_owner];
                $jwt = generate_jwt_token($headers, $payload);
                return_json(['register_user' => $jwt]);
            }
        }
    } else {
        return_json(['register_user' => "Error occured."]);
    }
} 

/**
 * Executed when doctor sends confirmation code after signup
 * This method executes queries that will activate doctor
 */
elseif ($action === 'confirm_doctor') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);
        $doctor_id = getPayload($bearer_token)->user->id;

        if ($database->confirmTokenDoctor($doctor_id, $_POST['code'])) {
            if ($database->activateDoctor($doctor_id)) {
                return_json(['status' => 1]);
            }
        }
    }
} 

/**
 * Executed when admin sends confirmation code after signup
 * This method executes queries that will activate admin
 */
elseif ($action === 'confirm_admin') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);
        $admin_id = getPayload($bearer_token)->user->id;

        if ($database->confirmTokenAdmin($admin_id, $_POST['code'])) {
            if ($database->activateAdmin($admin_id)) {
                return_json(['status' => 1]);
            }
        }
    }
} 

/**
 * Executed when pet owner sends confirmation code after signup
 * This method executes queries that will activate pet owner
 */
elseif ($action === 'confirm_pet_owner') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);
        $pet_owner_id = getPayload($bearer_token)->user->id;

        if ($database->confirmTokenPetOwner($pet_owner_id, $_POST['code'])) {
            if ($database->activatePetOwner($pet_owner_id)) {
                return_json(['status' => 1]);
            }
        }
    }
} 

/**
 * Executed the unique token is retrieved for doctor confirmation
 */
elseif ($action === 'get_token_doctor') {
    if ($valid_jwt_token) {
        $doctor_id = getPayload($bearer_token)->user->id;
        $token = $database->getTokenDoctor($doctor_id);
        return_json(['token' => $token]);
    }
} 

/**
 * Executed the unique token is retrieved for admin confirmation
 */
elseif ($action === 'get_token_admin') {
    if ($valid_jwt_token) {
        $admin_id = getPayload($bearer_token)->user->id;
        $token = $database->getTokenAdmin($admin_id);
        return_json(['token' => $token]);
    }
} 

/**
 * Executed the unique token is retrieved for pet owner confirmation
 */
elseif ($action === 'get_token_pet_owner') {
    if ($valid_jwt_token) {
        $pet_owner_id = getPayload($bearer_token)->user->id;
        $token = $database->getTokenPetOwner($pet_owner_id);
        return_json(['token' => $token]);
    }
} 


/**
 * Executed when doctor logs in
 * Password is encrypted using PHP's md5 method
 * This helps conceal password characters when saved in the database
 */
elseif ($action === 'login_doctor') {
    $rest_json = file_get_contents('php://input');
    $_POST = json_decode($rest_json, true);
    $check = false;

    if(validateUsername($_POST['username'])
        && validateLength($_POST['username'], 20)){
        $check = true;
    } else {
        return_json(['login' =>  "Error: Username must be up to 20 characters only."]);  
    }

    if($check){
        if (
            $doctor = $database->loginDoctor(
                $_POST['username'],
                md5($_POST['password'])
            )
        ) {
            $headers = ['alg' => 'HS256', 'typ' => 'JWT'];
            $payload = ['user' => $doctor];
            $jwt = generate_jwt_token($headers, $payload);
            return_json(['login' => $jwt]);
        }
    } else {
        return_json(['login' => "Error occurred."]); 
    }
}

/**
 * Executed when admin logs in
 * Password is encrypted using PHP's md5 method
 * This helps conceal password characters when saved in the database
 */
elseif ($action === 'login_admin') {
    $rest_json = file_get_contents('php://input');
    $_POST = json_decode($rest_json, true);
    $check = false;

    if(validateUsername($_POST['username'])
        && validateLength($_POST['username'], 20)){
        $check = true;
    } else {
        return_json(['login' =>  "Error: Username must be up to 20 characters only."]);  
    }

    if($check){
        if (
            $admin = $database->loginAdmin(
                $_POST['username'],
                md5($_POST['password'])
            )
        ) {
            $headers = ['alg' => 'HS256', 'typ' => 'JWT'];
            $payload = ['user' => $admin];
            $jwt = generate_jwt_token($headers, $payload);
            return_json(['login' => $jwt]);
        }
    } else {
        return_json(['login' => "Error occurred."]); 
    }
}

/**
 * Executed when pet owner logs in
 * Password is encrypted using PHP's md5 method
 * This helps conceal password characters when saved in the database
 */
elseif ($action === 'login_pet_owner') {
    $rest_json = file_get_contents('php://input');
    $_POST = json_decode($rest_json, true);
    $check = false;

    if(validateUsername($_POST['username'])
        && validateLength($_POST['username'], 20)){
        $check = true;
    } else {
        return_json(['login' =>  "Error: Username must be up to 20 characters only."]);  
    }

    if($check){
        if (
            $pet_owner = $database->loginPetOwner(
                $_POST['username'],
                md5($_POST['password'])
            )
        ) {
            $headers = ['alg' => 'HS256', 'typ' => 'JWT'];
            $payload = ['user' => $pet_owner];
            $jwt = generate_jwt_token($headers, $payload);
            return_json(['login' => $jwt]);
        }
    } else {
        return_json(['login' => "Error occurred."]); 
    }
}

/**
 * API endpoint when getting doctor information
 * $doctor will execute getDoctor method that accepts $username parameter from database.php
 */ 
elseif ($action === 'get_doctor') {
   if ($valid_jwt_token) {
       $username = getPayload($bearer_token)->user->username;
        if ($doctor = $database->getDoctor($username)) {
            return_json(['user' => $doctor]);
        }
   }
} 

/**
 * API endpoint when getting admin information
 * $admin will execute getAdmin method that accepts $username parameter from database.php
 */ 
elseif ($action === 'get_admin') {
    if ($valid_jwt_token) {
        $username = getPayload($bearer_token)->user->username;
         if ($admin = $database->getAdmin($username)) {
             return_json(['user' => $admin]);
         }
    }
} 

/**
 * API endpoint when getting pet owner information
 * $pet_owner will execute getPetOwner method that accepts $username parameter from database.php
 */ 
elseif ($action === 'get_pet_owner') {
    if ($valid_jwt_token) {
        $username = getPayload($bearer_token)->user->username;
         if ($pet_owner = $database->getPetOwner($username)) {
             return_json(['user' => $pet_owner]);
         }
    }
} 

/**
 * API endpoint when getting all doctors that are active
 * $doctors will execute getAllDoctors method from database.php
 */ 
elseif ($action === 'get_all_doctors') {
    if ($doctors = $database->getAllDoctors()) {
        return_json(['doctors' => $doctors]);
    }
} 

/**
 * API endpoint when getting all admins that are active
 * $admin will execute getAllAdmins method from database.php
 */ 
elseif ($action === 'get_all_admins') {
    if ($admins = $database->getAllAdmins()) {
        return_json(['admins' => $admins]);
    }
} 

/**
 * API endpoint when getting all pet owners that are active
 * $pet_owners will execute getAllPetOwners method from database.php
 */ 
elseif ($action === 'get_all_pet_owners') {
    if ($pet_owners = $database->getAllPetOwners()) {
        return_json(['pet_owners' => $pet_owners]);
    }
} 

/**
 * API endpoint when deleting doctors
 */ 
elseif ($action === 'delete_doctor') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $role = $database->checkRoleByUsername($_POST['username']);
        $record = [
            'id' => $id,
            'username' => $_POST['username']
        ];

        if($role['role'] === 'admin'){
            if($affected_bookings=$database->getBookingsByDoctorId($id)){
                foreach($affected_bookings as $ab):
                    if($ab['booking_status'] === 'PENDING' || $ab['booking_status'] === 'CONFIRMED'){
                        $new_status = 'PENDING';
                        $prev_status = $ab['booking_status'];

                        $booking_info = [
                            'new_status' => $new_status,
                            'prev_status' => $prev_status,
                            'doctor_id' => null,
                            'username' => $_POST['username'],
                            'booking_id' => $ab['booking_id']
                        ];
                        if($database->updateBookingDoctorAndStatus($booking_info)){
                            if($database->addBookingHistoryRecord($booking_info)){
                                true;
                            } else {
                                return_json(['delete_doctor' => "Error encountered."]);
                            }
                        } else {
                            return_json(['delete_doctor' => "Error encountered."]);
                        }
                    }

                endforeach;
            }

            if ($database->deleteDoctor($record)) {
                return_json(['delete_doctor' => "success"]);
            } else {
                return_json(['delete_doctor' => "Error encountered."]);
            }
        } else {
            return_json(['delete_doctor' => "You don't have the necessary privileges to perform this action."]);
        }
    }
} 

/**
 * API endpoint when deleting admins
 */ 
elseif ($action === 'delete_admin') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $role = $database->checkRoleByUsername($_POST['username']);
        $record = [
            'id' => $id,
            'username' => $_POST['username']
        ];

        if($role['role'] === 'admin'){
            if ($database->deleteAdmin($record)) {
                return_json(['delete_admin' => "success"]);
            } else {
                return_json(['delete_admin' => "error"]);
            }
        } else {
            return_json(['delete_admin' => "You don't have the necessary privileges to perform this action."]);
        }
    }
} 

/**
 * API endpoint when deleting pet owners
 */ 
elseif ($action === 'delete_pet_owner') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);
        
        $role = $database->checkRoleByUsername($_POST['username']);
        $record = [
            'id' => $id,
            'username' => $_POST['username']
        ];

        if($role['role'] === 'admin'){

            if($affected_bookings=$database->getBookingsByPetOwnerId($id)){
                foreach($affected_bookings as $ab):
                    if($ab['booking_status'] === 'PENDING' || $ab['booking_status'] === 'CONFIRMED'){
                        $new_status = 'ARCHIVED';
                        $prev_status = $ab['booking_status'];

                        $booking_info = [
                            'new_status' => $new_status,
                            'prev_status' => $prev_status,
                            'username' => $_POST['username'],
                            'booking_id' => $ab['booking_id']
                        ];
                        if($database->archiveBooking($booking_info)){
                            if($database->deleteBookingSlot($ab['booking_id'])){
                                if($database->addBookingHistoryRecord($booking_info)){
                                    true;
                                } else {
                                    return_json(['delete_pet_owner' => "Error encountered."]);
                                }
                            }
                        } else {
                            return_json(['delete_pet_owner' => "Error encountered."]);
                        }
                    }

                endforeach;
            }

            if($affected_pets=$database->getAllPetsByPetOwnerId($id)){
                foreach($affected_pets as $p):
                    $pet_info = [
                        'username' => $_POST['username'],
                        'pet_id' => $p['pet_id']
                    ];
                    if($database->archivePet($pet_info)){
                        true;
                    } else {
                        return_json(['delete_pet_owner' => "Error encountered."]);
                    }
                endforeach;
            }

            if ($database->deletePetOwner($record)) {
                return_json(['delete_pet_owner' => "success"]);
            } else {
                return_json(['delete_pet_owner' => "Error encountered."]);
            }

        } else {
            return_json(['delete_pet_owner' => "You don't have the necessary privileges to perform this action."]);
        }
    }
} 

/**
 * API endpoint when adding user
 * add<Role> method that adds user record from database.php
 */ 
elseif ($action === 'add_user') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);
        $check = false;

        if(validateLength($_POST['firstname'], 50)
            && validateAlpha($_POST['firstname'])){
            $check = true;
        } else {
            return_json(['add_user' =>  "Error: Firstname must be up to 50 letters only."]);
        }

        if(validateLength($_POST['lastname'], 50)
            && validateAlpha($_POST['lastname'])){
            $check = true;
        } else {
            return_json(['add_user' =>  "Error: Lastname must be up to 50 letters only."]);
        }

        if(validateUsername($_POST['username'])
            && validateLength($_POST['username'], 20)){
            $check = true;
        } else {
            return_json(['add_user' =>  "Error: Username must be up to 20 characters only."]);  
        }

        if(validatePassword($_POST['password'])
            && validateLength($_POST['password'], 20)){
            $check = true;
        } else {
            return_json(['add_user' =>  "Error: Password must be at least 8 letters, at least one number, one uppercase, one lowercase, and one special character only."]);  
        }

        if(validateAlphaNumeric($_POST['address'])
            && validateLength($_POST['address'], 100)){
            $check = true;
        } else {
            return_json(['add_user' =>  "Error: Address must be up to 100 letters only."]);  
        }

        if(validateAlpha($_POST['state'])
            && validateLength($_POST['state'], 100)){
            $check = true;
        } else {
            return_json(['add_user' =>  "Error: State must be up to 100 letters only."]);  
        }

        if(validateEmail($_POST['email'])
            && validateLength($_POST['email'], 100)){
            $check = true;
        } else {
            return_json(['add_user' =>  "Error: Email must be up to 100 letters only."]);  
        }

        if(validateNumeric($_POST['phone'])
            && validateLength($_POST['phone'], 9)){
            $check = true;
        } else {
            return_json(['add_user' =>  "Error: Phone number must be up to 9 numerical characters only."]);  
        }

        if(validateNumeric($_POST['postcode'])
        && validateLength($_POST['postcode'], 4)){
            $check = true;
        } else {
            return_json(['add_user' =>  "Error: Postcode must be up to 4 numerical characters only."]);  
        }
        
        $user = [
            'role' => $_POST['role'],
            'firstname' => $_POST['firstname'],
            'lastname' => $_POST['lastname'],
            'username' => $_POST['username'],
            'password' => md5($_POST['password']),
            'address' => $_POST['address'],
            'state' => $_POST['state'],
            'email' => $_POST['email'],
            'phone' => $_POST['phone'],
            'postcode' => $_POST['postcode'],
            'created_by' => $_POST['created_by']
        ];

        if($_POST['role'] === 'pet_owner'){
            if ($user_id = $database->addPetOwnerByAdmin($user)) {
                return_json(['add_user' => $user_id]);
            } else {
                return_json(['add_user' => "error"]);
            }
        } elseif ($_POST['role'] === 'doctor'){
            if ($user_id = $database->addDoctorByAdmin($user)) {
                return_json(['add_user' => $user_id]);
            } else {
                return_json(['add_user' => "error"]);
            }
        } elseif ($_POST['role'] === 'admin'){
            if ($user_id = $database->addAdminByAdmin($user)) {
                return_json(['add_user' => $user_id]);
            } else {
                return_json(['add_user' => "error"]);
            }
        }
    }
} 

/**
 * API endpoint when updating user
 * update<Role> method that updates user record from database.php
 */ 
elseif ($action === 'update_user') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);
        $check = false;

        if(validateLength($_POST['firstname'], 50)
            && validateAlpha($_POST['firstname'])){
            $check = true;
        } else {
            return_json(['update_user' =>  "Error: Firstname must be up to 50 letters only."]);
        }

        if(validateLength($_POST['lastname'], 50)
            && validateAlpha($_POST['lastname'])){
            $check = true;
        } else {
            return_json(['update_user' =>  "Error: Lastname must be up to 50 letters only."]);
        }

        if(validateUsername($_POST['username'])
            && validateLength($_POST['username'], 20)){
            $check = true;
        } else {
            return_json(['update_user' =>  "Error: Username must be up to 20 characters only."]);  
        }

        if(validatePassword($_POST['password'])
            && validateLength($_POST['password'], 20)){
            $check = true;
        } else {
            return_json(['update_user' =>  "Error: Password must be at least 8 letters, at least one number, one uppercase, one lowercase, and one special character only."]);  
        }

        if(validateAlphaNumeric($_POST['address'])
            && validateLength($_POST['address'], 100)){
            $check = true;
        } else {
            return_json(['update_user' =>  "Error: Address must be up to 100 letters only."]);  
        }

        if(validateAlpha($_POST['state'])
            && validateLength($_POST['state'], 100)){
            $check = true;
        } else {
            return_json(['update_user' =>  "Error: State must be up to 100 letters only."]);  
        }

        if(validateEmail($_POST['email'])
            && validateLength($_POST['email'], 100)){
            $check = true;
        } else {
            return_json(['update_user' =>  "Error: Email must be up to 100 letters only."]);  
        }

        if(validateNumeric($_POST['phone'])
            && validateLength($_POST['phone'], 9)){
            $check = true;
        } else {
            return_json(['update_user' =>  "Error: Phone number must be up to 9 numerical characters only."]);  
        }

        if(validateNumeric($_POST['postcode'])
        && validateLength($_POST['postcode'], 4)){
            $check = true;
        } else {
            return_json(['update_user' =>  "Error: Postcode must be up to 4 numerical characters only."]);  
        }

        $user = [
            'id' => $id,
            'role' => $_POST['role'],
            'firstname' => $_POST['firstname'],
            'lastname' => $_POST['lastname'],
            'password' => md5($_POST['password']),
            'address' => $_POST['address'],
            'state' => $_POST['state'],
            'email' => $_POST['email'],
            'phone' => $_POST['phone'],
            'postcode' => $_POST['postcode'],
            'username' => $_POST['username'],
        ];

        if($_POST['role'] === 'pet_owner'){
            if ($database->updatePetOwner($user)) {
                return_json(['update_user' => "success"]);
            } else {
                return_json(['update_user' => "error"]);
            }
        } elseif ($_POST['role'] === 'doctor'){
            if ($database->updateDoctor($user)) {
                return_json(['update_user' => "success"]);
            } else {
                return_json(['update_user' => "error"]);
            }
        } elseif ($_POST['role'] === 'admin'){
            if ($database->updateAdmin($user)) {
                return_json(['update_user' => "success"]);
            } else {
                return_json(['update_user' => "error"]);
            }
        }
    }
} 

/**
 * Pet Management
 */

/**
 * API endpoint when getting all pet owners that are active
 * $pets will execute getAllPets method from database.php
 */ 
elseif ($action === 'get_all_pets') {
    if ($valid_jwt_token) {
        if ($pet_owners = $database->getAllPetOwners()) {
            $pet_info  = array();

            foreach($pet_owners as $y):

                $pet_records = array();
                if ($pets = $database->getAllPetsByPetOwnerId($y['id'])) {

                    foreach($pets as $p):
                        $pet_record = [
                            'pet_id' => $p['pet_id'],
                            'petname' => $p['petname'],
                            'species' => $p['species'],
                            'breed' => $p['breed'],
                            'birthdate' => $p['birthdate'],
                            'weight' => $p['weight'],
                            'sex' => $p['sex'],
                            'microchip_no' => $p['microchip_no'],
                            'insurance_membership' => $p['insurance_membership'],
                            'insurance_expiry' => $p['insurance_expiry'],
                            'comments' => $p['comments']
                        ];

                        array_push($pet_records, $pet_record);
                    endforeach;

                     $record = [
                        'pet_owner_id' => $y['id'],
                        'firstname' => $y['firstname'],
                        'lastname' => $y['lastname'],
                        'username' => $y['username'],
                        'pets' => $pet_records
                    ];
                    array_push($pet_info, $record);
                } else {
                    $record = [
                        'pet_owner_id' => $y['id'],
                        'firstname' => $y['firstname'],
                        'lastname' => $y['lastname'],
                        'username' => $y['username'],
                        'pets' => []
                    ];
                    array_push($pet_info, $record);
                }
               
            endforeach;

            return_json(['pets' => $pet_info]);
        } else {
            return_json(['pets' => "No pets found"]);
        }
    }
} 

/**
 * API endpoint when getting all pet owners that are active
 * $pets will execute getAllPetsBy<Filter> method from database.php
 */ 
elseif ($action === 'get_all_pets_by_filter') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);
        if ($_POST['filter'] == 'petname'){
            if ($pets = $database->getAllPetsByPetname($_POST['filter_value'])) {
                return_json(['pets' => $pets]);
            } 
        } elseif ($_POST['filter'] == 'firstname'){
            if ($pets = $database->getAllPetsByFname($_POST['filter_value'])) {
                return_json(['pets' => $pets]);
            } 
        } elseif ($_POST['filter'] == 'lastname'){
            if ($pets = $database->getAllPetsByLname($_POST['filter_value'])) {
                return_json(['pets' => $pets]);
            } 
        } elseif ($_POST['filter'] == 'pet_owner_id'){
            if ($pets = $database->getAllPetsByPetOwnerId($_POST['filter_value'])) {
                return_json(['pets' => $pets]);
            } 
        }
    }
} 

/**
 * API endpoint when adding pet information
 * addPet method that adds pet record from database.php
 */ 
elseif ($action === 'add_pet') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $check = false;

        if(validateNumeric($_POST['pet_owner_id'])){
            $check = true;
        } else {
            return_json(['add_pet' =>  "Error: Pet Owner ID must be a number."]);
        }

        if(validateLength($_POST['species'], 50)
        && validateAlpha($_POST['species'])){
            $check = true;
        } else {
            return_json(['add_pet' =>  "Error: Species must be up to 50 letters only."]);
        }

        if(validateLength($_POST['breed'], 50)
        && validateAlpha($_POST['breed'])){
            $check = true;
        } else {
            return_json(['add_pet' =>  "Error: Breed must be up to 50 letters only."]);
        }

        if(validateDate($_POST['birthdate'])){
            $check = true;
        } else {
            return_json(['add_pet' =>  "Error: Birthdate must be a valid date with format DD-MM-YYYY."]);
        }

        if(validateDecimal($_POST['weight'])){
            $check = true;
        } else {
            return_json(['add_pet' =>  "Error: Weight must be a valid number."]);
        }

        if(validateAlpha($_POST['sex'])){
            $check = true;
        } else {
            return_json(['add_pet' =>  "Error: Sex must only consist of letters."]);
        }

        if(validateLength($_POST['microchip_no'], 15)
        && validateNumeric($_POST['microchip_no'])){
            $check = true;
        } else {
            return_json(['add_pet' =>  "Error: Microchip Number must be up to 15 numeric characters only."]);
        }

        if(validateLength($_POST['insurance_membership'], 10)
        && validateNumeric($_POST['insurance_membership'])){
            $check = true;
        } else {
            return_json(['add_pet' =>  "Error: Insurance Membership Number must be up to 15 numeric characters only."]);
        }

        if(validateDate($_POST['insurance_expiry'])){
            $check = true;
        } else {
            return_json(['add_pet' =>  "Error: Insurance Expiration Date must be a valid date with format DD-MM-YYYY."]);
        }

        if(validateLength($_POST['comments'], 1000)){
            $check = true;
        } else {
            return_json(['add_pet' =>  "Error: Comments are allowed until 1000 characters only."]);
        }

        if($check){
            $pet = [
                'pet_owner_id' => $_POST['pet_owner_id'],
                'petname' => $_POST['petname'],
                'species' => $_POST['species'],
                'breed' => $_POST['breed'],
                'birthdate' => $_POST['birthdate'],
                'weight' => $_POST['weight'],
                'sex' => $_POST['sex'],
                'microchip_no' => $_POST['microchip_no'],
                'insurance_membership' => $_POST['insurance_membership'],
                'insurance_expiry' => $_POST['insurance_expiry'],
                'comments' => $_POST['comments'],
                'username' => $_POST['username']
            ];

            if ($pet_id = $database->addPet($pet)) {
                return_json(['add_pet' => $pet_id]);
            } else {
                return_json(['add_pet' => "error"]);
            }
        } else {
            return_json(['add_pet' => "Error encountered."]);
        }
    }
}

/**
 * API endpoint when updating pet information
 * updatePet method that updates pet record from database.php
 */ 
elseif ($action === 'update_pet') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);
        $check = false;

        if(validateLength($_POST['species'], 50)
        && validateAlpha($_POST['species'])){
            $check = true;
        } else {
            return_json(['update_pet' =>  "Error: Species must be up to 50 letters only."]);
        }

        if(validateLength($_POST['breed'], 50)
        && validateAlpha($_POST['breed'])){
            $check = true;
        } else {
            return_json(['update_pet' =>  "Error: Breed must be up to 50 letters only."]);
        }

        if(validateDate($_POST['birthdate'])){
            $check = true;
        } else {
            return_json(['update_pet' =>  "Error: Birthdate must be a valid date with format DD-MM-YYYY."]);
        }

        if(validateDecimal($_POST['weight'])){
            $check = true;
        } else {
            return_json(['update_pet' =>  "Error: Weight must be a valid number."]);
        }

        if(validateAlpha($_POST['sex'])){
            $check = true;
        } else {
            return_json(['update_pet' =>  "Error: Sex must only consist of letters."]);
        }

        if(validateLength($_POST['microchip_no'], 15)
        && validateNumeric($_POST['microchip_no'])){
            $check = true;
        } else {
            return_json(['update_pet' =>  "Error: Microchip Number must be up to 15 numeric characters only."]);
        }

        if(validateLength($_POST['insurance_membership'], 10)
        && validateNumeric($_POST['insurance_membership'])){
            $check = true;
        } else {
            return_json(['update_pet' =>  "Error: Insurance Membership Number must be up to 15 numeric characters only."]);
        }

        if(validateDate($_POST['insurance_expiry'])){
            $check = true;
        } else {
            return_json(['update_pet' =>  "Error: Insurance Expiration Date must be a valid date with format DD-MM-YYYY."]);
        }

        if(validateLength($_POST['comments'], 1000)){
            $check = true;
        } else {
            return_json(['update_pet' =>  "Error: Comments are allowed until 1000 characters only."]);
        }

        $pet = [
            'id' => $id,
            'petname' => $_POST['petname'],
            'species' => $_POST['species'],
            'breed' => $_POST['breed'],
            'birthdate' => $_POST['birthdate'],
            'weight' => $_POST['weight'],
            'sex' => $_POST['sex'],
            'microchip_no' => $_POST['microchip_no'],
            'insurance_membership' => $_POST['insurance_membership'],
            'insurance_expiry' => $_POST['insurance_expiry'],
            'username' => $_POST['username'],
            'comments' => $_POST['comments']
        ];

        if($check){
            if ($database->updatePet($pet)) {
                return_json(['update_pet' => "success"]);
            } else {
                return_json(['update_pet' => "error"]);
            }
        }  else {
            return_json(['update_pet' => "Error encountered."]);
        }
    }
}

/**
 * API endpoint when deleting pet information
 */ 
elseif ($action === 'delete_pet') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $role = $database->checkRoleByUsername($_POST['username']);
        $record = [
            'pet_id' => $id,
            'username' => $_POST['username']
        ];

        if($role['role'] === 'admin' || $role['role'] === 'pet_owner'){

            if($affected_bookings=$database->getBookingsByPetId($id)){
                foreach($affected_bookings as $ab):
                    if($ab['booking_status'] === 'PENDING' || $ab['booking_status'] === 'CONFIRMED'){
                        $new_status = 'CANCELED';
                        $prev_status = $ab['booking_status'];

                        $booking_info = [
                            'new_status' => $new_status,
                            'prev_status' => $prev_status,
                            'username' => $_POST['username'],
                            'booking_id' => $ab['booking_id']
                        ];
                        if($database->archiveBooking($booking_info)){
                            if($database->deleteBookingSlot($ab['booking_id'])){
                                if($database->addBookingHistoryRecord($booking_info)){
                                    true;
                                } else {
                                    return_json(['delete_pet' => "Error encountered."]);
                                }
                            }
                        } else {
                            return_json(['delete_pet' => "Error encountered."]);
                        }
                    }

                endforeach;
            }

            if ($database->archivePet($record)) {
                return_json(['delete_pet' => "success"]);
            } else {
                return_json(['delete_pet' => "Error encountered."]);
            }
        } else {
                return_json(['delete_pet' => "You don't have the necessary privileges to perform this action."]);
        }
    }
}

/**
 * API endpoint when selecting pet information
 * getPet method that retrieves pet record from database.php
 */ 
elseif ($action === 'get_pet') {
    if ($valid_jwt_token) {
        if ($pet_record = $database->getPet($id)) {
            return_json(['get_pet' => $pet_record]);
        }
    }
}

/**
 * Booking Management
 */

/**
 * API endpoint when getting taken slots
 * getBookingTypes method that retrieves taken slots by date
 */ 
elseif ($action === 'get_booking_types') {
    if ($valid_jwt_token) {
        if($booking_types = $database->getBookingTypes()){
            return_json(['booking_types' => $booking_types]);
        } else {
            return_json(['booking_types' => "No booking types"]);
        }
    }
}

/**
 * API endpoint when getting taken slots
 * getTakenSlotsByDate method that retrieves taken slots by date
 */ 
elseif ($action === 'get_taken_slots_by_date') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        if ($taken_slots = $database->getTakenSlotsByDate($_POST['selected_date'])) {
            $slots  = array();

            foreach($taken_slots as $y):
                $date = [
                    'booking_date' => $y['booking_date'],
                    'booking_time' => explode(',', $y['booking_time'])
                ];
                array_push($slots, $date);
            endforeach;

            return_json(['taken_slots_by_date' => $slots]);
        } else {
            return_json(['taken_slots_by_date' => []]);
        }
    }
}

/**
 * API endpoint when getting taken slots
 * getTakenSlotsAll method that retrieves taken slots by date
 */ 
elseif ($action === 'get_taken_slots_all') {
    if ($valid_jwt_token) {
        if ($taken_slots = $database->getTakenSlotsAll()) {
            $slots  = array();

            foreach($taken_slots as $y):
                $date = [
                    'booking_date' => $y['booking_date'],
                    'booking_time' => explode(',', $y['booking_time'])
                ];
                array_push($slots, $date);
            endforeach;

            return_json(['taken_slots_all' => $slots]);
        } else {
            return_json(['taken_slots_all' => []]);
        }
    }
}

/**
 * API endpoint when adding bookings
 * addBooking method that adds booking information in the database
 */ 
elseif ($action === 'add_booking') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $booking = [
            'booking_type' => $_POST['booking_type'],
            'pet_owner_id' => $_POST['pet_owner_id'],
            'pet_id' => $_POST['pet_id'],
            'username' => $_POST['username']
        ];

        $booking_slots = $_POST['booking_slots'];


        if ($booking_id = $database->addBooking($booking)) {
            foreach($booking_slots as $slot):
                $record = [
                    'booking_id' => $booking_id,
                    'booking_date' => $slot['booking_date'],
                    'booking_time' => $slot['booking_time']
                ];
                if($database->addBookingSlot($record)){
                    true;
                }
            endforeach;

            $booking_history_record = [
                'booking_id' => $booking_id,
                'prev_status' => null,
                'new_status' => "PENDING",
                'username' => $_POST['username']
            ];

            if($database->addBookingHistoryRecord($booking_history_record)){
                return_json(['add_booking' => $booking_id ]);
            }

        } else {
            return_json(['add_booking' => "error"]);
        }
    }
}

/**
 * API endpoint when updating bookings
 * updateBookingByAdmin method that updates booking information in the database
 */ 
elseif ($action === 'update_booking_by_admin') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $current_booking_status = $database->checkBookingStatus($id);
        $booking = [
            'booking_id' => $id,
            'prev_booking_status' => $current_booking_status,
            'new_booking_status' => "PENDING",
            'booking_type' => $_POST['booking_type'],
            'pet_owner_id' => $_POST['pet_owner_id'],
            'pet_id' => $_POST['pet_id'],
            'doctor_id' => $_POST['doctor_id'],
            'username' => $_POST['username'],
        ];

        $booking_slots = $_POST['booking_slots'];

        foreach($booking_slots as $new_slot):
            $booking_count = [
                'selected_date' => $new_slot['booking_date'],
                'selected_time' => $new_slot['booking_time']
            ];
            if($count = $database->slotCounter($booking_count)){
                if($count['slot_counter'] == 5){
                    return_json(['update_booking' => "All slots taken for at least one slot for ".$new_slot['booking_time']]);
                }
            }
        endforeach;

        if ($database->updateBookingByAdmin($booking)) {
            if($database->deleteBookingSlot($id)){
                foreach($booking_slots as $slot):
                    $record = [
                        'booking_id' => $id,
                        'booking_date' => $slot['booking_date'],
                        'booking_time' => $slot['booking_time']
                    ];
                    if($database->addBookingSlot($record)){
                        true;
                    }
                endforeach;

                $booking_history_record = [
                    'booking_id' => $id,
                    'prev_status' => $_POST['prev_booking_status'],
                    'new_status' => "PENDING",
                    'username' => $_POST['username']
                ];

                if($database->addBookingHistoryRecord($booking_history_record)){
                    return_json(['update_booking' => "success"]);
                } else {
                    return_json(['update_booking' => "error"]);
                }
            } else {
                return_json(['update_booking' => "error"]);
            }
        } else {
            return_json(['update_booking' => "error"]);
        }
    }
}

/**
 * API endpoint when updating bookings
 * updateBookingByPetOwner method that updates booking information in the database
 */ 
elseif ($action === 'update_booking_by_pet_owner') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $booking = [
            'booking_id' => $id,
            'prev_booking_status' => $_POST['prev_booking_status'],
            'new_booking_status' => "PENDING",
            'booking_type' => $_POST['booking_type'],
            'pet_owner_id' => $_POST['pet_owner_id'],
            'pet_id' => $_POST['pet_id'],
            'username' => $_POST['username'],
        ];

        $booking_slots = $_POST['booking_slots'];

        foreach($booking_slots as $new_slot):
            $booking_count = [
                'selected_date' => $new_slot['booking_date'],
                'selected_time' => $new_slot['booking_time']
            ];
            if($count = $database->slotCounter($booking_count)){
                if($count['slot_counter'] == 5){
                    return_json(['update_booking' => "All slots taken for at least one slot for ".$new_slot['booking_time']]);
                }
            }
        endforeach;

        if ($database->updateBookingByPetOwner($booking)) {
            if($database->deleteBookingSlot($id)){
                foreach($booking_slots as $slot):
                    $record = [
                        'booking_id' => $id,
                        'booking_date' => $slot['booking_date'],
                        'booking_time' => $slot['booking_time']
                    ];
                    if($database->addBookingSlot($record)){
                        true;
                    }
                endforeach;

                $booking_history_record = [
                    'booking_id' => $id,
                    'prev_status' => $_POST['prev_booking_status'],
                    'new_status' => "PENDING",
                    'username' => $_POST['username']
                ];

                if($database->addBookingHistoryRecord($booking_history_record)){
                    return_json(['update_booking' => "success"]);
                } else {
                    return_json(['update_booking' => "error"]);
                }
            } else {
                return_json(['update_booking' => "error"]);
            }
        } else {
            return_json(['update_booking' => "error"]);
        }
    }
}

/**
 * API endpoint when moving booking status to CONFIRMED
 */ 
elseif ($action === 'confirm_booking') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        

        $booking = [
            'booking_id' => $id,
            'prev_booking_status' => $_POST['prev_booking_status'],
            'new_booking_status' => $_POST['new_booking_status'],
            'booking_type' => $_POST['booking_type'],
            'pet_owner_id' => $_POST['pet_owner_id'],
            'pet_id' => $_POST['pet_id'],
            'doctor_id' => $_POST['doctor_id'],
            'username' => $_POST['username'],
        ];

        $booking_slots = $_POST['booking_slots'];
        $role = $database->checkRoleByUsername($_POST['username']);
        $current_booking_status = $database->checkBookingStatus($id);

        if($role['role'] === 'admin'){
            if($current_booking_status['booking_status'] === 'CONFIRMED'){
                foreach($booking_slots as $new_slot):
                    $booking_count = [
                        'selected_date' => $new_slot['booking_date'],
                        'selected_time' => $new_slot['booking_time']
                    ];
                    if($count = $database->slotCounter($booking_count)){
                        if($count['slot_counter'] == 5){
                            return_json(['update_booking' => "All slots taken for ".$new_slot['booking_date']." : ".$new_slot['booking_time']]);
                        }
                    }
                endforeach;

                if ($database->updateBookingByAdmin($booking)) {
                    if($database->deleteBookingSlot($id)){
                        foreach($booking_slots as $slot):
                            $record = [
                                'booking_id' => $id,
                                'booking_date' => $slot['booking_date'],
                                'booking_time' => $slot['booking_time']
                            ];
                            if($database->addBookingSlot($record)){
                                true;
                            }
                        endforeach;

                        $booking_history_record = [
                            'booking_id' => $id,
                            'prev_status' => $_POST['prev_booking_status'],
                            'new_status' => $_POST['new_booking_status'],
                            'username' => $_POST['username']
                        ];

                        if($database->addBookingHistoryRecord($booking_history_record)){
                            return_json(['confirm_booking' => "success"]);
                        } else {
                            return_json(['confirm_booking' => "error"]);
                        }
                    } else {
                        return_json(['confirm_booking' => "error"]);
                    }
                } else {
                    return_json(['confirm_booking' => "error"]);
                }
            } else {
                return_json(['confirm_booking' => "Booking status must be in PENDING status before moving to CONFIRMED. Current status is: " . $current_booking_status['booking_status']]);
            }
        } else {
            return_json(['confirm_booking' => "You don't have the privilege to perform this action. Only admins can move bookings to CONFIRMED status."]);
        }
    }
}

/**
 * API endpoint when moving booking status to FINISHED
 */ 
elseif ($action === 'finish_booking') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $booking_record = [
            'booking_id' => $id,
            'prev_status' => "CONFIRMED",
            'new_status' => "FINISHED",
            'username' => $_POST['username']
        ];

        $role = $database->checkRoleByUsername($_POST['username']);
        $current_booking_status = $database->checkBookingStatus($id);

        if($role['role'] === 'doctor')
        {
            if($current_booking_status['booking_status'] === 'CONFIRMED'){
                if ($database->finishBooking($booking_record)) {
                    if($database->addBookingHistoryRecord($booking_record)){
                        return_json(['finish_booking' => "success"]);
                    } else {
                        return_json(['finish_booking' => "error"]);
                    }
                } else {
                    return_json(['finish_booking' => "error"]);
                }
            } else {
                return_json(['finish_booking' => "Booking status must be in CONFIRMED status before moving to FINISHED. Current status is: " . $current_booking_status['booking_status']]);
            }
        } else {
            return_json(['finish_booking' => "You don't have the privilege to perform this action. Only doctors can move bookings to FINISHED status."]);
        }
    }
}

/**
 * API endpoint when getting single booking information by ID
 */ 
elseif ($action === 'get_booking') {
    if ($valid_jwt_token) {
        if ($record=$database->getBookingById($id)) {

            $booking_record = [
                'booking_id' => $record['booking_id'],
                'booking_date' => $record['booking_date'],
                'booking_time' => explode(',', $record['booking_time']),
                'booking_status' => $record['booking_status'],
                'booking_type' => $record['booking_type'],
                'doctor_id' => $record['doctor_id'],
                'invoice_id' => $record['invoice_id'],
                'receipt_id' => $record['receipt_id'],
                'updated_date' => $record['updated_date'],
                'pet_owner_id' => $record['pet_owner_id'],
                'username' => $record['username'],
                'pet_owner' => $record['pet_owner'],
                'pet_id' => $record['pet_id'],
                'petname' => $record['petname']
            ];

            return_json(['booking_record' => $booking_record]);
        } else {
            return_json(['booking_record' => "error"]);
        }
    }
}

/**
 * API endpoint when moving booking status to CANCELED
 */ 
elseif ($action === 'cancel_booking') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $booking_record = [
            'booking_id' => $id,
            'prev_status' => $_POST['prev_booking_status'],
            'new_status' => "CANCELED",
            'username' => $_POST['username']
        ];

        if ($database->cancelBooking($booking_record)) {
            if($database->deleteBookingSlot($id)){
                if($database->addBookingHistoryRecord($booking_record)){
                    return_json(['cancel_booking' => "success"]);
                } else {
                    return_json(['cancel_booking' => "error"]);
                }
            }
        } else {
            return_json(['cancel_booking' => "error"]);
        }
    }
}

/**
 * API endpoint when getting booking information
 * $bookings will execute getBookingsBy<Filter> method from database.php
 */ 
elseif ($action === 'search_booking') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        if ($_POST['filter'] == 'booking_id'){
            if ($bookings = $database->getBookingsByBookingId($_POST['filter_value'])) {
                return_json(['bookings' => $bookings]);
            } 
        } elseif ($_POST['filter'] == 'booking_date'){
            if ($bookings = $database->getBookingsByBookingDate($_POST['filter_value'])) {
                return_json(['bookings' => $bookings]);
            } 
        } elseif ($_POST['filter'] == 'booking_status'){
            if ($bookings = $database->getBookingsByBookingStatus($_POST['filter_value'])) {
                return_json(['bookings' => $bookings]);
            } 
        }  elseif ($_POST['filter'] == 'booking_type'){
            if ($bookings = $database->getBookingsByBookingType($_POST['filter_value'])) {
                return_json(['bookings' => $bookings]);
            } 
        }  elseif ($_POST['filter'] == 'username'){
            if ($bookings = $database->getBookingsByUsername($_POST['filter_value'])) {
                return_json(['bookings' => $bookings]);
            } 
        }  elseif ($_POST['filter'] == 'pet_name'){
            if ($bookings = $database->getBookingsByPetName($_POST['filter_value'])) {
                return_json(['bookings' => $bookings]);
            } 
        }  elseif ($_POST['filter'] == 'pet_id'){
            if ($bookings = $database->getBookingsByPetId($_POST['filter_value'])) {
                return_json(['bookings' => $bookings]);
            } 
        }  elseif ($_POST['filter'] == 'doctor_id'){
            if ($bookings = $database->getBookingsByDoctorId($_POST['filter_value'])) {
                return_json(['bookings' => $bookings]);
            } 
        }   elseif ($_POST['filter'] == 'pet_owner_id'){
            if ($bookings = $database->getBookingsByPetOwnerId($_POST['filter_value'])) {
                return_json(['bookings' => $bookings]);
            } 
        }
    }
} 

/**
 * Pet Health Record Management
 */

/**
 * Invoice/Billing Management
 */

/**
 * API endpoint when getting generating invoices
 */ 
elseif ($action === 'generate_invoice') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $invoice_info = [
            'username' => $_POST['username'],
            'booking_id' => $_POST['booking_id']
        ];

        $invoice_items = $_POST['invoice_items'];

        $role = $database->checkRoleByUsername($_POST['username']);
        $current_booking_status = $database->checkBookingStatus($_POST['booking_id']);
        $booking_fee = $database->checkBookingFee($_POST['booking_id']);

        if($role['role'] === 'doctor')
        {
            if($current_booking_status['booking_status'] === 'FINISHED'){
                if($invoice_id=$database->createNewInvoice($invoice_info)){ 
                    $booking_invoice_record = [
                        'invoice_id' => $invoice_id,
                        'item_category_id' => 1,
                        'item_id' => $_POST['booking_id'],
                        'quantity' => 1,
                        'booking_fee' => $booking_fee
                    ]; 
                    if($database->insertNewInvoiceBookingItem($booking_invoice_record)){
                        foreach($invoice_items as $item):
                            $invoice_record = [
                                'invoice_id' => $invoice_id,
                                'item_category_id' => $item['item_category_id'],
                                'item_id' => $item['item_id'],
                                'quantity' => $item['quantity']
                            ]; 
                            if($database->insertNewInvoiceItem($invoice_record)){
                                true;
                            } else {
                                return_json(['generate_invoice' => "Error encountered while inserting invoice item."]);
                            }
                        endforeach;

                        $invoice_amount_record = [
                            'username' => $_POST['username'],
                            'invoice_id' => $invoice_id,
                            'booking_id' => $_POST['booking_id']
                        ];
                        if($database->updateInvoiceAmount($invoice_amount_record)){
                            return_json(['generate_invoice' => $invoice_id]);
                        } else {
                            return_json(['generate_invoice' => "Invoice amount not calculated. Error encountered."]);
                        }

                    } else {
                        return_json(['generate_invoice' => "Booking invoice item encountered an error."]);
                    }
                }
            } else {
                return_json(['generate_invoice' => "Booking status must be in FINISHED status before invoice can be generated. Current status is: " . $current_booking_status['booking_status']]);
            }
        } else {
            return_json(['generate_invoice' => "You don't have the privilege to perform this action. Only doctors can create invoices."]);
        }
    }
}

/**
 * Inventory System Management
 */
/**
 * API endpoint when getting all inventory records
 */ 
elseif ($action === 'get_inventory_all') {
    if ($valid_jwt_token) {
        if ($inventory_categories = $database->getAllInventoryCategories()) {
            $inventory_records  = array();

            foreach($inventory_categories as $y):

                $inventory_items = array();
                if ($items = $database->getAllInventoryByCategory($y['category_id'])) {

                    foreach($items as $i):
                        $inventory_record = [
                            'item_id' => $i['item_id'],
                            'item_name' => $i['item_name'],
                            'in_use_qty' => $i['in_use_qty'],
                            'in_stock_qty' => $i['in_stock_qty'],
                            'threshold_qty' => $i['threshold_qty'],
                            'weight_volume' => $i['weight_volume'],
                            'item_unit' => $i['item_unit'],
                            'production_date' => $i['production_date'],
                            'expiration_date' => $i['expiration_date'],
                            'unit_price' => $i['unit_price']
                        ];

                        array_push($inventory_items, $inventory_record);
                    endforeach;

                    $record = [
                        'category_id' => $y['category_id'],
                        'category' => $y['category'],
                        'inventory_items' => $inventory_items
                    ];
                    array_push($inventory_records, $record);
                } else {
                    $record = [
                        'category_id' => $y['category_id'],
                        'category' => $y['category'],
                        'inventory_items' => []
                    ];
                    array_push($inventory_records, $record);
                }
               
            endforeach;

            return_json(['inventory_records' => $inventory_records]);
        } else {
            return_json(['inventory_records' => "No records found"]);
        }
    }
}

/**
 * API endpoint when getting inventory by category
 */ 
elseif ($action === 'get_inventory_by_category') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $inventory_items = array();
        if ($inventory_categories = $database->getInventoryCategoriesById($id)) {
            $inventory_records  = array();
                if ($items = $database->getAllInventoryByCategory($id)) {

                    foreach($items as $i):
                        $inventory_record = [
                            'item_id' => $i['item_id'],
                            'item_name' => $i['item_name'],
                            'in_use_qty' => $i['in_use_qty'],
                            'in_stock_qty' => $i['in_stock_qty'],
                            'threshold_qty' => $i['threshold_qty'],
                            'weight_volume' => $i['weight_volume'],
                            'item_unit' => $i['item_unit'],
                            'production_date' => $i['production_date'],
                            'expiration_date' => $i['expiration_date'],
                            'unit_price' => $i['unit_price']
                        ];

                        array_push($inventory_items, $inventory_record);
                    endforeach;

                    $record = [
                        'category_id' => $inventory_categories['category_id'],
                        'category' => $inventory_categories['category'],
                        'inventory_items' => $inventory_items
                    ];
                    array_push($inventory_records, $record);
                } else {
                    $record = [
                        'category_id' => $inventory_categories['category_id'],
                        'category' => $inventory_categories['category'],
                        'inventory_items' => []
                    ];
                    array_push($inventory_records, $record);
                }
            return_json(['inventory_records' => $inventory_records]);
        } else {
            return_json(['inventory_records' => "No records found"]);
        }
    }
}

/**
 * Lodging Management
 */

/**
 * Sales Management
 */

/**
 * Configuration Management
 */

return_json(['status' => 0]);

/**
  * Handling cross origin request headers
  * Define which methods can come through the API fetch URL
  */
function return_json($arr)
{
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: *');
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($arr);
    exit();
}

?>