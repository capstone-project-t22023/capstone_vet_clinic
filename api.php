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
include './classes/pet-database.php';
include './classes/billing-database.php';
include './classes/inventory-database.php';
include './classes/booking-database.php';
include './classes/lodging-database.php';
include './classes/sales-database.php';

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
 *          Authorization: 'Bearer ' + localStorage.getItem('token'),
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
$req_username = isset($bearer_token) ? getPayload($bearer_token)->user->username : false;

/**
 * Initialize new instance of Database class
 */
$database = new Database();
$pet_database = new PetDatabase();
$billing_database = new BillingDatabase();
$inventory_database = new InventoryDatabase();
$booking_database = new BookingDatabase();
$lodging_database = new LodgingDatabase();
$sales_database = new SalesDatabase();

/**
 * Upload directory
 */
$upload_dir = "/Applications/XAMPP/xamppfiles/uploads/"; 

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
        return_json(['register_user' => false]);
    }
}  

/**
 * Executed when admin registers
 * A unique code will be generated to be entered by admin later to be activated
 */
elseif ($action === 'register_admin') {
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
        return_json(['register_user' => false]);
    }
}  

/**
 * Executed when pet owner registers
 * A unique code will be generated to be entered by pet owner later to be activated
 */
elseif ($action === 'register_pet_owner') {
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
        return_json(['register_user' => false]);
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
        return_json(['login' => false]); 
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
        return_json(['login' => false]); 
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
        return_json(['login' => false]); 
    }
}

/**
 * API endpoint when getting doctor information
 */ 
elseif ($action === 'get_doctor') {
   if ($valid_jwt_token) {
        if ($doctor = $database->getDoctor($req_username)) {
            return_json(['user' => $doctor]);
        }  else {
            return_json(['user' => false]); 
        }
   }  else {
        return_json(['ERROR:' => "UNAUTHORIZED"]);  
    }
} 

/**
 * API endpoint when getting admin information
 */ 
elseif ($action === 'get_admin') {
    if ($valid_jwt_token) {
        if ($admin = $database->getAdmin($req_username)) {
            return_json(['user' => $admin]);
        }  else {
            return_json(['user' => false]); 
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
} 

/**
 * API endpoint when getting pet owner information
 */ 
elseif ($action === 'get_pet_owner') {
    if ($valid_jwt_token) {
        if ($pet_owner = $database->getPetOwner($req_username)) {
             return_json(['user' => $pet_owner]);
        }  else {
            return_json(['user' => false]); 
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
} 

/**
 * API endpoint when getting all doctors that are active
 */ 
elseif ($action === 'get_all_doctors') {
    if ($doctors = $database->getAllDoctors()) {
        return_json(['doctors' => $doctors]);
    }  else {
        return_json(['doctors' => false]); 
    }
} 

/**
 * API endpoint when getting all admins that are active
 */ 
elseif ($action === 'get_all_admins') {
    if ($admins = $database->getAllAdmins()) {
        return_json(['admins' => $admins]);
    }  else {
        return_json(['admins' => false]); 
    }
} 

/**
 * API endpoint when getting all pet owners that are active
 */ 
elseif ($action === 'get_all_pet_owners') {
    if ($pet_owners = $database->getAllPetOwners()) {
        return_json(['pet_owners' => $pet_owners]);
    }  else {
        return_json(['pet_owners' => false]); 
    }
} 

/**
 * API endpoint when deleting doctors
 */ 
elseif ($action === 'delete_doctor') {
    if ($valid_jwt_token) {
        $role = $database->checkRoleByUsername($req_username);
        $record = [
            'id' => $id,
            'username' => $req_username
        ];
        
        if($role['role'] === 'admin'){
            if($affected_bookings=$booking_database->getBookingsByDoctorId($id)){
                foreach($affected_bookings as $ab):
                    if($ab['booking_status'] === 'PENDING' || $ab['booking_status'] === 'CONFIRMED'){
                        $new_status = 'PENDING';
                        $prev_status = $ab['booking_status'];

                        $booking_info = [
                            'new_status' => $new_status,
                            'prev_status' => $prev_status,
                            'doctor_id' => null,
                            'username' => $req_username,
                            'booking_id' => $ab['booking_id']
                        ];
                        if($booking_database->updateBookingDoctorAndStatus($booking_info)){
                            if($booking_database->addBookingHistoryRecord($booking_info)){
                                true;
                            } else {
                                return_json(['delete_doctor' => false]);
                            }
                        } else {
                            return_json(['delete_doctor' => false]);
                        }
                    }

                endforeach;
            }

            if ($database->deleteDoctor($record)) {
                return_json(['delete_doctor' => true]);
            } else {
                return_json(['delete_doctor' => false]);
            }
        } else {
            return_json(['delete_doctor' => "You don't have the necessary privileges to perform this action."]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
} 

/**
 * API endpoint when deleting admins
 */ 
elseif ($action === 'delete_admin') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $role = $database->checkRoleByUsername($req_username);
        $record = [
            'id' => $id,
            'username' => $req_username
        ];

        if($role['role'] === 'admin'){
            if ($database->deleteAdmin($record)) {
                return_json(['delete_admin' => true]);
            } else {
                return_json(['delete_admin' => false]);
            }
        } else {
            return_json(['delete_admin' => "You don't have the necessary privileges to perform this action."]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
} 

/**
 * API endpoint when deleting pet owners
 */ 
elseif ($action === 'delete_pet_owner') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);
        
        $role = $database->checkRoleByUsername($req_username);
        $record = [
            'id' => $id,
            'username' => $req_username
        ];

        if($role['role'] === 'admin'){

            if($affected_bookings=$booking_database->getBookingsByPetOwnerId($id)){
                foreach($affected_bookings as $ab):
                    if($ab['booking_status'] === 'PENDING' || $ab['booking_status'] === 'CONFIRMED'){
                        $new_status = 'ARCHIVED';
                        $prev_status = $ab['booking_status'];

                        $booking_info = [
                            'new_status' => $new_status,
                            'prev_status' => $prev_status,
                            'username' => $req_username,
                            'booking_id' => $ab['booking_id']
                        ];
                        if($booking_database->archiveBooking($booking_info)){
                            if($booking_database->deleteBookingSlot($ab['booking_id'])){
                                if($booking_database->addBookingHistoryRecord($booking_info)){
                                    true;
                                } else {
                                    return_json(['delete_pet_owner' => false]);
                                }
                            }
                        } else {
                            return_json(['delete_pet_owner' => false]);
                        }
                    }

                endforeach;
            }

            if($affected_pets=$pet_database->getAllPetsByPetOwnerId($id)){
                foreach($affected_pets as $p):
                    $pet_info = [
                        'username' => $req_username,
                        'pet_id' => $p['pet_id']
                    ];
                    if($pet_database->archivePet($pet_info)){
                        true;
                    } else {
                        return_json(['delete_pet_owner' => false]);
                    }
                endforeach;
            }

            if ($database->deletePetOwner($record)) {
                return_json(['delete_pet_owner' => true]);
            } else {
                return_json(['delete_pet_owner' => false]);
            }

        } else {
            return_json(['delete_pet_owner' => "You don't have the necessary privileges to perform this action."]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
} 

/**
 * API endpoint when adding user
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
                return_json(['add_user' => false]);
            }
        } elseif ($_POST['role'] === 'doctor'){
            if ($user_id = $database->addDoctorByAdmin($user)) {
                return_json(['add_user' => $user_id]);
            } else {
                return_json(['add_user' => false]);
            }
        } elseif ($_POST['role'] === 'admin'){
            if ($user_id = $database->addAdminByAdmin($user)) {
                return_json(['add_user' => $user_id]);
            } else {
                return_json(['add_user' => false]);
            }
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
} 

/**
 * API endpoint when updating user
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
            'username' => $req_username,
        ];

        if($_POST['role'] === 'pet_owner'){
            if ($database->updatePetOwner($user)) {
                return_json(['update_user' => true]);
            } else {
                return_json(['update_user' => false]);
            }
        } elseif ($_POST['role'] === 'doctor'){
            if ($database->updateDoctor($user)) {
                return_json(['update_user' => true]);
            } else {
                return_json(['update_user' => false]);
            }
        } elseif ($_POST['role'] === 'admin'){
            if ($database->updateAdmin($user)) {
                return_json(['update_user' => true]);
            } else {
                return_json(['update_user' => false]);
            }
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
} 

/**
 * Pet Management
 */

/**
 * API endpoint when getting all pet owners that are active
 */ 
elseif ($action === 'get_all_pets') {
    if ($valid_jwt_token) {
        if ($pet_owners = $database->getAllPetOwners()) {
            $pet_info  = array();

            foreach($pet_owners as $y):

                $pet_records = array();
                if ($pets = $pet_database->getAllPetsByPetOwnerId($y['id'])) {

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
            return_json(['pets' => []]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
} 

/**
 * API endpoint when getting all pet owners that are active
 */ 
elseif ($action === 'get_all_pets_by_filter') {
    if ($valid_jwt_token) {
        if ($_GET['filter'] == 'petname'){
            if ($pets = $pet_database->getAllPetsByPetname($_GET['filter_value'])) {
                return_json(['pets' => $pets]);
            }  else {
                return_json(['pets' => []]);
            }
        } elseif ($_GET['filter'] == 'firstname'){
            if ($pets = $pet_database->getAllPetsByFname($_GET['filter_value'])) {
                return_json(['pets' => $pets]);
            }  else {
                return_json(['pets' => []]);
            }
        } elseif ($_GET['filter'] == 'lastname'){
            if ($pets = $pet_database->getAllPetsByLname($_GET['filter_value'])) {
                return_json(['pets' => $pets]);
            }  else {
                return_json(['pets' => []]);
            }
        } elseif ($_GET['filter'] == 'pet_owner_id'){
            if ($pets = $pet_database->getAllPetsByPetOwnerId($_GET['filter_value'])) {
                return_json(['pets' => $pets]);
            }  else {
                return_json(['pets' => []]);
            }
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
} 

/**
 * API endpoint when adding pet information
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
                'username' => $req_username
            ];
            
            if ($pet_id = $pet_database->addPet($pet)) {
                return_json(['add_pet' => $pet_id]);
            } else {
                return_json(['add_pet' => false]);
            }
        } else {
            return_json(['add_pet' => false]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when updating pet information
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
            'username' => $req_username,
            'comments' => $_POST['comments']
        ];

        if($check){
            if ($pet_database->updatePet($pet)) {
                return_json(['update_pet' => true]);
            } else {
                return_json(['update_pet' => false]);
            }
        }  else {
            return_json(['update_pet' => false]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when deleting pet information
 */ 
elseif ($action === 'delete_pet') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $role = $database->checkRoleByUsername($req_username);
        $record = [
            'pet_id' => $id,
            'username' => $req_username
        ];

        if($role['role'] === 'admin' || $role['role'] === 'pet_owner'){

            if($affected_bookings=$booking_database->getBookingsByPetId($id)){
                foreach($affected_bookings as $ab):
                    if($ab['booking_status'] === 'PENDING' || $ab['booking_status'] === 'CONFIRMED'){
                        $new_status = 'CANCELED';
                        $prev_status = $ab['booking_status'];

                        $booking_info = [
                            'new_status' => $new_status,
                            'prev_status' => $prev_status,
                            'username' => $req_username,
                            'booking_id' => $ab['booking_id']
                        ];
                        if($booking_database->archiveBooking($booking_info)){
                            if($booking_database->deleteBookingSlot($ab['booking_id'])){
                                if($booking_database->addBookingHistoryRecord($booking_info)){
                                    true;
                                } else {
                                    return_json(['delete_pet' => false]);
                                }
                            }
                        } else {
                            return_json(['delete_pet' => false]);
                        }
                    }

                endforeach;
            }

            if ($pet_database->deletePet($record)) {
                return_json(['delete_pet' => true]);
            } else {
                return_json(['delete_pet' => false]);
            }
        } else {
                return_json(['delete_pet' => "You don't have the necessary privileges to perform this action."]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when selecting pet information
 */ 
elseif ($action === 'get_pet') {
    if ($valid_jwt_token) {
        if ($pet_record = $pet_database->getPet($id)) {
            return_json(['get_pet' => $pet_record]);
        } else {
            return_json(['get_pet' => false]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * Booking Management
 */

/**
 * API endpoint when getting taken slots
 */ 
elseif ($action === 'get_booking_types') {
    if ($valid_jwt_token) {
        if($booking_types = $booking_database->getBookingTypes()){
            return_json(['booking_types' => $booking_types]);
        } else {
            return_json(['booking_types' => "No booking types"]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when getting taken slots
 */ 
elseif ($action === 'get_taken_slots_by_date') {
    if ($valid_jwt_token) {
        if ($taken_slots = $booking_database->getTakenSlotsByDate($_GET['selected_date'])) {
            return_json(['taken_slots_by_date' => $taken_slots]);
        } else {
            return_json(['taken_slots_by_date' => []]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when getting taken slots
 */ 
elseif ($action === 'get_taken_slots_all') {
    if ($valid_jwt_token) {

        if ($taken_slots = $booking_database->getTakenSlotsAll()) {
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
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when adding bookings
 */ 
elseif ($action === 'add_booking') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $booking = [
            'booking_type' => $_POST['booking_type'],
            'pet_owner_id' => $_POST['pet_owner_id'],
            'pet_id' => $_POST['pet_id'],
            'username' => $req_username
        ];

        $booking_slots = $_POST['booking_slots'];

        $ns = array();
        $bd = "";
        foreach($booking_slots as $new_slot):
            $bd = $new_slot['booking_date'];
            array_push($ns, $new_slot['booking_time']);    
        endforeach;
        $new_slots = [
            'booking_date' => $bd,
            'booking_time' => $ns
        ];

        $taken_slots = $booking_database->getTakenSlotsByDate($new_slots['booking_date']);

        if($taken_slots){
            $allowed_slot = array_values(array_diff($new_slots['booking_time'], $taken_slots['booking_time']));
            $decision = 'no';
            $disallowed = array_values($allowed_slot);
        } else {
            $disallowed = array();
        }

        if(count($disallowed) === 0){
            if ($booking_id = $booking_database->addBooking($booking)) {
                foreach($booking_slots as $slot):
                    $record = [
                        'booking_id' => $booking_id,
                        'booking_date' => $slot['booking_date'],
                        'booking_time' => $slot['booking_time']
                    ];
                    if($booking_database->addBookingSlot($record)){
                        true;
                    }
                endforeach;

                $booking_history_record = [
                    'booking_id' => $booking_id,
                    'prev_status' => null,
                    'new_status' => "PENDING",
                    'username' => $req_username
                ];

                if($booking_database->addBookingHistoryRecord($booking_history_record)){
                    return_json(['add_booking' => $booking_id ]);
                }

            } else {
                return_json(['add_booking' => false]);
            }
        } else {
            return_json([
                'taken_slots' => $taken_slots,
                'allowed_slot' => $allowed_slot,
                'disallowed_slot' => $disallowed,
                'decision' => "One of the new slots are full. Please check your selection."
            ]);
        }

        
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when updating bookings
 */ 
elseif ($action === 'update_booking_by_admin') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        
        $role = $database->checkRoleByUsername($req_username);
        $current_slots = $booking_database->getBookingSlotByBookingId($id);
        
        $current_booking_status = $booking_database->checkBookingStatus($id);
        $booking = [
            'booking_id' => $id,
            'prev_booking_status' => $current_booking_status,
            'new_booking_status' => "PENDING",
            'booking_type' => $_POST['booking_type'],
            'pet_owner_id' => $_POST['pet_owner_id'],
            'pet_id' => $_POST['pet_id'],
            'doctor_id' => $_POST['doctor_id'],
            'username' => $req_username,
        ];

        $booking_slots = $_POST['booking_slots'];

        $ns = array();
        $bd = "";
        foreach($booking_slots as $new_slot):
            $bd = $new_slot['booking_date'];
            array_push($ns, $new_slot['booking_time']);    
        endforeach;
        $new_slots = [
            'booking_date' => $bd,
            'booking_time' => $ns
        ];

        $taken_slots = $booking_database->getTakenSlotsByDate($new_slots['booking_date']);
        
        if($role['role'] === 'admin'){
            if ($current_slots['booking_date'] === $new_slots['booking_date']){

                if($taken_slots){
                    $diff_slot = array_values(array_diff($new_slots['booking_time'], $current_slots['booking_time']));
                    $allowed_slot = array_values(array_diff($diff_slot, $taken_slots['booking_time']));
                    $decision = 'no';
                    $disallowed = array_values(array_diff($diff_slot, $allowed_slot));
                } else {
                    $disallowed = array();
                }

                if(count($disallowed) === 0){
                    $decision = 'yes';
                    
                    if ($booking_database->updateBookingByAdmin($booking)) {
                        if($booking_database->deleteBookingSlot($id)){
                            foreach($booking_slots as $slot):
                                $record = [
                                    'booking_id' => $id,
                                    'booking_date' => $slot['booking_date'],
                                    'booking_time' => $slot['booking_time']
                                ];
                                if($booking_database->addBookingSlot($record)){
                                    true;
                                }
                            endforeach;

                            $booking_history_record = [
                                'booking_id' => $id,
                                'prev_status' => $_POST['prev_booking_status'],
                                'new_status' => "PENDING",
                                'username' => $req_username
                            ];

                            if($booking_database->addBookingHistoryRecord($booking_history_record)){
                                return_json([
                                    'current_slots:' => $current_slots,
                                    'new_slots:' => $new_slots,
                                    'taken_slots' => $taken_slots,
                                    'diff_slot' => $diff_slot,
                                    'allowed_slot' => $allowed_slot,
                                    'decision' => $decision,
                                    'disallowed_slot' => $disallowed,
                                    'update_booking' => true
                                ]);
                            } else {
                                return_json(['update_booking' => false]);
                            }
                        } else {
                            return_json(['update_booking' => false]);
                        }
                    } else {
                        return_json(['update_booking' => false]);
                    }
                } else {
                    return_json([
                        'current_slots' => $current_slots,
                        'new_slots' => $new_slots,
                        'taken_slots' => $taken_slots,
                        'diff_slot' => $diff_slot,
                        'allowed_slot' => $allowed_slot,
                        'disallowed_slot' => $disallowed,
                        'decision' => "One of the new slots are full. Please check your selection."
                    ]);
                }
            } else {
                
                if($taken_slots){
                    $allowed_slot = array_values(array_diff($new_slots['booking_time'], $taken_slots['booking_time']));
                    $decision = 'no';
                    $disallowed = array_values(array_diff($new_slots['booking_time'], $allowed_slot));
                } else {
                    $disallowed = array();
                }

                if(count($disallowed) === 0){
                    $decision = 'yes';
                    if ($booking_database->updateBookingByAdmin($booking)) {
                        if($booking_database->deleteBookingSlot($id)){
                            foreach($booking_slots as $slot):
                                $record = [
                                    'booking_id' => $id,
                                    'booking_date' => $slot['booking_date'],
                                    'booking_time' => $slot['booking_time']
                                ];
                                if($booking_database->addBookingSlot($record)){
                                    true;
                                }
                            endforeach;

                            $booking_history_record = [
                                'booking_id' => $id,
                                'prev_status' => $_POST['prev_booking_status'],
                                'new_status' => "PENDING",
                                'username' => $req_username
                            ];

                            if($booking_database->addBookingHistoryRecord($booking_history_record)){
                                return_json([
                                    'current_slots:' => $current_slots,
                                    'new_slots:' => $new_slots,
                                    'taken_slots' => $taken_slots,
                                    'allowed_slot' => $allowed_slot,
                                    'disallowed_slot' => $disallowed,
                                    'update_booking' => true,
                                    'decision' => $decision
                                ]);
                            } else {
                                return_json(['update_booking' => false]);
                            }
                        } else {
                            return_json(['update_booking' => false]);
                        }
                    } else {
                        return_json(['update_booking' => false]);
                    }
                } else {
                    
                    return_json([
                        'current_slots' => $current_slots,
                        'new_slots' => $new_slots,
                        'taken_slots' => $taken_slots,
                        'allowed_slot' => $allowed_slot,
                        'disallowed_slot' => $disallowed,
                        'decision' => "One of the new slots are full. Please check your selection."
                    ]);
                }
            }
            
            
        } else {
            return_json(['update_booking' => "You don't have the privilege to perform this action."]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when updating bookings
 */ 
elseif ($action === 'update_booking_by_pet_owner') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        
        $role = $database->checkRoleByUsername($req_username);
        $current_slots = $booking_database->getBookingSlotByBookingId($id);
        
        $current_booking_status = $booking_database->checkBookingStatus($id);
        $booking = [
            'booking_id' => $id,
            'prev_booking_status' => $current_booking_status,
            'new_booking_status' => "PENDING",
            'booking_type' => $_POST['booking_type'],
            'pet_owner_id' => $_POST['pet_owner_id'],
            'pet_id' => $_POST['pet_id'],
            'username' => $req_username,
        ];

        $booking_slots = $_POST['booking_slots'];

        $ns = array();
        $bd = "";
        foreach($booking_slots as $new_slot):
            $bd = $new_slot['booking_date'];
            array_push($ns, $new_slot['booking_time']);    
        endforeach;
        $new_slots = [
            'booking_date' => $bd,
            'booking_time' => $ns
        ];

        $taken_slots = $booking_database->getTakenSlotsByDate($new_slots['booking_date']);

        if($role['role'] === 'pet_owner'){
            if ($current_slots['booking_date'] === $new_slots['booking_date']){

                if($taken_slots){
                    $diff_slot = array_values(array_diff($new_slots['booking_time'], $current_slots['booking_time']));
                    $allowed_slot = array_values(array_diff($diff_slot, $taken_slots['booking_time']));
                    $decision = 'no';
                    $disallowed = array_values(array_diff($diff_slot, $allowed_slot));
                } else {
                    $disallowed = array();
                }

                if(count($disallowed) === 0){
                    $decision = 'yes';
                    
                    if ($booking_database->updateBookingByPetOwner($booking)) {
                        if($booking_database->deleteBookingSlot($id)){
                            foreach($booking_slots as $slot):
                                $record = [
                                    'booking_id' => $id,
                                    'booking_date' => $slot['booking_date'],
                                    'booking_time' => $slot['booking_time']
                                ];
                                if($booking_database->addBookingSlot($record)){
                                    true;
                                }
                            endforeach;

                            $booking_history_record = [
                                'booking_id' => $id,
                                'prev_status' => $_POST['prev_booking_status'],
                                'new_status' => "PENDING",
                                'username' => $req_username
                            ];

                            if($booking_database->addBookingHistoryRecord($booking_history_record)){
                                return_json([
                                    'current_slots:' => $current_slots,
                                    'new_slots:' => $new_slots,
                                    'taken_slots' => $taken_slots,
                                    'diff_slot' => $diff_slot,
                                    'allowed_slot' => $allowed_slot,
                                    'decision' => $decision,
                                    'disallowed_slot' => $disallowed,
                                    'update_booking' => true
                                ]);
                            } else {
                                return_json(['update_booking' => false]);
                            }
                        } else {
                            return_json(['update_booking' => false]);
                        }
                    } else {
                        return_json(['update_booking' => false]);
                    }
                } else {
                    return_json([
                        'current_slots' => $current_slots,
                        'new_slots' => $new_slots,
                        'taken_slots' => $taken_slots,
                        'diff_slot' => $diff_slot,
                        'allowed_slot' => $allowed_slot,
                        'disallowed_slot' => $disallowed,
                        'decision' => "One of the new slots are full. Please check your selection."
                    ]);
                }
            } else {

                if($taken_slots){
                    $allowed_slot = array_values(array_diff($new_slots['booking_time'], $taken_slots['booking_time']));
                    $decision = 'no';
                    $disallowed = array_values(array_diff($new_slots['booking_time'], $allowed_slot));
                } else {
                    $disallowed = array();
                }

                if(count($disallowed) === 0){
                    $decision = 'yes';
                    if ($booking_database->updateBookingByPetOwner($booking)) {
                        if($booking_database->deleteBookingSlot($id)){
                            foreach($booking_slots as $slot):
                                $record = [
                                    'booking_id' => $id,
                                    'booking_date' => $slot['booking_date'],
                                    'booking_time' => $slot['booking_time']
                                ];
                                if($booking_database->addBookingSlot($record)){
                                    true;
                                }
                            endforeach;

                            $booking_history_record = [
                                'booking_id' => $id,
                                'prev_status' => $_POST['prev_booking_status'],
                                'new_status' => "PENDING",
                                'username' => $req_username
                            ];

                            if($booking_database->addBookingHistoryRecord($booking_history_record)){
                                return_json([
                                    'current_slots:' => $current_slots,
                                    'new_slots:' => $new_slots,
                                    'taken_slots' => $taken_slots,
                                    'allowed_slot' => $allowed_slot,
                                    'disallowed_slot' => $disallowed,
                                    'update_booking' => true,
                                    'decision' => $decision
                                ]);
                            } else {
                                return_json(['update_booking' => false]);
                            }
                        } else {
                            return_json(['update_booking' => false]);
                        }
                    } else {
                        return_json(['update_booking' => false]);
                    }
                } else {
                    
                    return_json([
                        'current_slots' => $current_slots,
                        'new_slots' => $new_slots,
                        'taken_slots' => $taken_slots,
                        'allowed_slot' => $allowed_slot,
                        'disallowed_slot' => $disallowed,
                        'decision' => "One of the new slots are full. Please check your selection."
                    ]);
                }
            }
            
            
        } else {
            return_json(['update_booking' => "You don't have the privilege to perform this action."]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when moving booking status to CONFIRMED
 */ 
elseif ($action === 'confirm_booking') {
    if ($valid_jwt_token) {
        
        $role = $database->checkRoleByUsername($req_username);
        $current_booking_status = $booking_database->checkBookingStatus($id);

        $booking_record = [
            'booking_id' => $id,
            'prev_status' => $current_booking_status['booking_status'],
            'new_status' => "CONFIRMED",
            'username' => $req_username
        ];

        if($role['role'] === 'admin')
        {
            if($current_booking_status['booking_status'] === 'PENDING'){
                if ($booking_database->confirmBooking($booking_record)) {
                    if($booking_database->addBookingHistoryRecord($booking_record)){
                        return_json(['confirm_booking' => true]);
                    } else {
                        return_json(['confirm_booking' => false]);
                    }
                } else {
                    return_json(['confirm_booking' => false]);
                }
            } else {
                return_json(['confirm_booking' => "Booking status must be in PENDING status before moving to CONFIRMED. Current status is: " . $current_booking_status['booking_status']]);
            }
        } else {
            return_json(['confirm_booking' => "You don't have the privilege to perform this action. Only admins can move bookings to CONFIRMED status."]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when moving booking status to FINISHED
 */ 
elseif ($action === 'finish_booking') {
    if ($valid_jwt_token) {
        
        $role = $database->checkRoleByUsername($req_username);
        $current_booking_status = $booking_database->checkBookingStatus($id);

        $booking_record = [
            'booking_id' => $id,
            'prev_status' => $current_booking_status['booking_status'],
            'new_status' => "FINISHED",
            'username' => $req_username
        ];

        if($role['role'] === 'doctor')
        {
            if($current_booking_status['booking_status'] === 'CONFIRMED'){
                if ($booking_database->finishBooking($booking_record)) {
                    if($booking_database->addBookingHistoryRecord($booking_record)){
                        return_json(['finish_booking' => true]);
                    } else {
                        return_json(['finish_booking' => false]);
                    }
                } else {
                    return_json(['finish_booking' => false]);
                }
            } else {
                return_json(['finish_booking' => "Booking status must be in CONFIRMED status before moving to FINISHED. Current status is: " . $current_booking_status['booking_status']]);
            }
        } else {
            return_json(['finish_booking' => "You don't have the privilege to perform this action. Only doctors can move bookings to FINISHED status."]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when getting single booking information by ID
 */ 
elseif ($action === 'get_booking') {
    if ($valid_jwt_token) {
        if ($record=$booking_database->getBookingsByBookingId($id)) {
            return_json(['booking_record' => $record]);
        } else {
            return_json(['booking_record' => false]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when moving booking status to CANCELED
 */ 
elseif ($action === 'cancel_booking') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $current_booking_status = $booking_database->checkBookingStatus($id);
        
        $booking_record = [
            'booking_id' => $id,
            'prev_status' => $current_booking_status['booking_status'],
            'new_status' => "CANCELED",
            'username' => $req_username
        ];

        if ($booking_database->cancelBooking($booking_record)) {
            if($booking_database->deleteBookingSlot($id)){
                if($booking_database->addBookingHistoryRecord($booking_record)){
                    return_json(['cancel_booking' => true]);
                } else {
                    return_json(['cancel_booking' => false]);
                }
            }
        } else {
            return_json(['cancel_booking' => false]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when getting booking information
 */ 
elseif ($action === 'search_booking') {
    if ($valid_jwt_token) {
        if ($_GET['filter'] == 'booking_id'){
            if ($bookings = $booking_database->getBookingsByBookingId($_GET['filter_value'])) {
                return_json(['bookings' => $bookings]);
            } else {
                return_json(['bookings' => []]);
            } 
        } elseif ($_GET['filter'] == 'booking_date'){
            if ($bookings = $booking_database->getBookingsByBookingDate($_GET['filter_value'])) {
                return_json(['bookings' => $bookings]);
            } else {
                return_json(['bookings' => []]);
            } 
        } elseif ($_GET['filter'] == 'booking_status'){
            if ($bookings = $booking_database->getBookingsByBookingStatus($_GET['filter_value'])) {
                return_json(['bookings' => $bookings]);
            } else {
                return_json(['bookings' => []]);
            } 
        }  elseif ($_GET['filter'] == 'booking_type'){
            if ($bookings = $booking_database->getBookingsByBookingType($_GET['filter_value'])) {
                return_json(['bookings' => $bookings]);
            } else {
                return_json(['bookings' => []]);
            } 
        }  elseif ($_GET['filter'] == 'username'){
            if ($bookings = $booking_database->getBookingsByUsername($_GET['filter_value'])) {
                return_json(['bookings' => $bookings]);
            } else {
                return_json(['bookings' => []]);
            } 
        }  elseif ($_GET['filter'] == 'pet_name'){
            if ($bookings = $booking_database->getBookingsByPetName($_GET['filter_value'])) {
                return_json(['bookings' => $bookings]);
            } else {
                return_json(['bookings' => []]);
            } 
        }  elseif ($_GET['filter'] == 'pet_id'){
            if ($bookings = $booking_database->getBookingsByPetId($_GET['filter_value'])) {
                return_json(['bookings' => $bookings]);
            } else {
                return_json(['bookings' => []]);
            } 
        }  elseif ($_GET['filter'] == 'doctor_id'){
            if ($bookings = $booking_database->getBookingsByDoctorId($_GET['filter_value'])) {
                return_json(['bookings' => $bookings]);
            } else {
                return_json(['bookings' => []]);
            } 
        }   elseif ($_GET['filter'] == 'pet_owner_id'){
            if ($bookings = $booking_database->getBookingsByPetOwnerId($_GET['filter_value'])) {
                return_json(['bookings' => $bookings]);
            } else {
                return_json(['bookings' => []]);
            } 
        }    elseif ($_GET['filter'] == 'invoice_id'){
            if ($bookings = $booking_database->getBookingsByInvoiceId($_GET['filter_value'])) {
                return_json(['bookings' => $bookings]);
            } else {
                return_json(['bookings' => []]);
            } 
        }    elseif ($_GET['filter'] == 'receipt_id'){
            if ($bookings = $booking_database->getBookingsByReceiptId($_GET['filter_value'])) {
                return_json(['bookings' => $bookings]);
            } else {
                return_json(['bookings' => []]);
            } 
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
} 

/**
 * Pet Health Record Management
 */
/**
 * API endpoint when getting vaccines
 */ 
elseif ($action === 'get_all_vaccines') {
    if ($valid_jwt_token) {
        if ($vaccines=$pet_database->getAllVaccines()) {
            return_json(['get_all_vaccines' => $vaccines]);
        } else {
            return_json(['get_all_vaccines' => false]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when adding immunisation record
 */ 
elseif ($action === 'add_immun_record') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $role = $database->checkRoleByUsername($req_username);

        if($role['role'] == 'pet_owner'){
            return_json(['add_immun_record' => "You don't have the privilege to perform this action"]);
        } else {
            $record = [
                "pet_id" => $_POST['pet_id'],
                "doctor_id" => $_POST['doctor_id'],
                "booking_id" => $_POST['booking_id'],
                "vaccine_date" => $_POST['vaccine_date'],
                "vaccine" => $_POST['vaccine'],
                "comments" => $_POST['comments'],
                "username" => $req_username
            ];
            if($pet_database->addPetVaccine($record)){
                return_json(['add_immun_record' => true]);
            } else {
                return_json(['add_immun_record' => false]);
            }
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when updating immunisation record
 */ 
elseif ($action === 'update_immun_record') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $role = $database->checkRoleByUsername($req_username);

        if($role['role'] == 'pet_owner'){
            return_json(['update_immun_record' => "You don't have the privilege to perform this action"]);
        } else {
            $record = [
                "pet_id" => $_POST['pet_id'],
                "doctor_id" => $_POST['doctor_id'],
                "booking_id" => $_POST['booking_id'],
                "vaccine_date" => $_POST['vaccine_date'],
                "vaccine" => $_POST['vaccine'],
                "comments" => $_POST['comments'],
                "username" => $req_username,
                "id" => $id,
            ];
            if($pet_database->updatePetVaccine($record)){
                return_json(['update_immun_record' => true]);
            } else {
                return_json(['update_immun_record' => false]);
            }
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when deleting immunisation record
 */ 
elseif ($action === 'delete_immun_record') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $role = $database->checkRoleByUsername($req_username);

        if($role['role'] == 'pet_owner'){
            return_json(['delete_immun_record' => "You don't have the privilege to perform this action"]);
        } else {
            $record = [
                "id" => $id,
                "username" => $req_username
            ];
            if($pet_database->deletePetVaccine($record)){
                return_json(['delete_immun_record' => true]);
            } else {
                return_json(['delete_immun_record' => false]);
            }
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when getting immunisation record
 */ 
elseif ($action === 'get_immun_record') {
    if ($valid_jwt_token) {
        if($pet_info=$pet_database->getPetVaccineByPetId($id)){
            return_json(['vaccine_record' => $pet_info]);
        } else {
            return_json(['get_immun_record' => "No record " . $id . " existing."]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when adding prescription record
 */ 
elseif ($action === 'add_prescription') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $role = $database->checkRoleByUsername($req_username);

        if($role['role'] == 'pet_owner'){
            return_json(['add_prescription' => "You don't have the privilege to perform this action"]);
        } else {
            $record = [
                "pet_id" => $_POST['pet_id'],
                "doctor_id" => $_POST['doctor_id'],
                "booking_id" => $_POST['booking_id'],
                "prescription_date" => $_POST['prescription_date'],
                "username" => $req_username
            ];
            if($prescription_id=$pet_database->addPrescription($record)){
                return_json(['add_prescription' => $prescription_id]);
            } else {
                return_json(['add_prescription' => false]);
            }
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when updating prescription record
 */ 
elseif ($action === 'update_prescription') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $role = $database->checkRoleByUsername($req_username);

        if($role['role'] == 'pet_owner'){
            return_json(['add_prescription' => "You don't have the privilege to perform this action"]);
        } else {
            $record = [
                "pet_id" => $_POST['pet_id'],
                "doctor_id" => $_POST['doctor_id'],
                "booking_id" => $_POST['booking_id'],
                "prescription_date" => $_POST['prescription_date'],
                "username" => $req_username,
                "id" => $id
            ];
            if($pet_database->updatePrescription($record)){
                return_json(['update_prescription' => true]);
            } else {
                return_json(['update_prescription' => false]);
            }
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when deleting prescription record
 */ 
elseif ($action === 'delete_prescription') {
    if ($valid_jwt_token) {
        $role = $database->checkRoleByUsername($req_username);

        if($role['role'] == 'pet_owner'){
            return_json(['delete_prescription' => "You don't have the privilege to perform this action"]);
        } else {
            $diet_records = $pet_database->getDietRecordIdsByPrescriptionId($id);
            foreach($diet_records as $d):
                $diet_record = [
                    "id" => $d,
                    "username" => $req_username
                ];
                if($pet_database->deleteDietRecord($diet_record)){
                    true;
                } else {
                    return_json(['delete_prescription' => false]);
                }
            endforeach;

            $record = [
                "id" => $id,
                "username" => $req_username
            ];
            if($pet_database->deletePrescription($record)){
                return_json(['delete_prescription' => true]);
            } else {
                return_json(['delete_prescription' => false]);
            }
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when adding diet record
 */ 
elseif ($action === 'add_diet_record') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $role = $database->checkRoleByUsername($req_username);

        if($role['role'] == 'pet_owner'){
            return_json(['add_diet_record' => "You don't have the privilege to perform this action"]);
        } else {
            $record = [
                "prescription_id" => $_POST['prescription_id'],
                "product" => $_POST['product'],
                "serving_portion" => $_POST['serving_portion'],
                "morning" => $_POST['morning'],
                "evening" => $_POST['evening'],
                "comments" => $_POST['comments'],
                "username" => $req_username
            ];
            if($pet_database->addDietRecord($record)){
                return_json(['add_diet_record' => true]);
            } else {
                return_json(['add_diet_record' => false]);
            }
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when updating diet record
 */ 
elseif ($action === 'update_diet_record') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $role = $database->checkRoleByUsername($req_username);

        if($role['role'] == 'pet_owner'){
            return_json(['update_diet_record' => "You don't have the privilege to perform this action"]);
        } else {
            $record = [
                "product" => $_POST['product'],
                "serving_portion" => $_POST['serving_portion'],
                "morning" => $_POST['morning'],
                "evening" => $_POST['evening'],
                "comments" => $_POST['comments'],
                "username" => $req_username,
                "id" => $id
            ];
            if($pet_database->updateDietRecord($record)){
                return_json(['update_diet_record' => true]);
            } else {
                return_json(['update_diet_record' => false]);
            }
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when deleting diet record
 */ 
elseif ($action === 'delete_diet_record') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $role = $database->checkRoleByUsername($req_username);

        if($role['role'] == 'pet_owner'){
            return_json(['delete_diet_record' => "You don't have the privilege to perform this action"]);
        } else {
            $record = [
                "id" => $id,
                "username" => $req_username
            ];
            if($pet_database->deleteDietRecord($record)){
                return_json(['delete_diet_record' => true]);
            } else {
                return_json(['delete_diet_record' => false]);
            }
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when getting prescription diet records
 */ 
elseif ($action === 'get_diet_record') {
    if ($valid_jwt_token) {
        if($prescriptions=$pet_database->getPrescriptionById($id)){
            if($diet_records=$pet_database->getDietRecordsByPrescriptionId($id)){
                $prescription_diet=[
                    "pet_id" => $prescriptions['pet_id'],
                    "doctor_id" => $prescriptions['doctor_id'],
                    "booking_id" => $prescriptions['booking_id'],
                    "veterinarian" => $prescriptions['veterinarian'],
                    "prescription_date" => $prescriptions['prescription_date'],
                    "diet_records" => $diet_records
                ];
                return_json(['diet_record' => $prescription_diet]);
            }
        } else {
            return_json(['get_diet_record' => "No record " . $id . " existing."]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when getting prescription diet records
 */ 
elseif ($action === 'get_all_diet_record_by_pet') {
    if ($valid_jwt_token) {
        if($prescriptions=$pet_database->getAllPrescriptionByPetId($id)){
            $prescription_diet_arr=array();
            foreach($prescriptions as $p):
                if($diet_records=$pet_database->getDietRecordsByPrescriptionId($p['id'])){
                    $prescription_diet=[
                        "pet_id" => $p['pet_id'],
                        "doctor_id" => $p['doctor_id'],
                        "booking_id" => $p['booking_id'],
                        "veterinarian" => $p['veterinarian'],
                        "prescription_date" => $p['prescription_date'],
                        "diet_records" => $diet_records
                    ];
                    array_push($prescription_diet_arr, $prescription_diet);
                }    
            endforeach;
            return_json(['diet_record' => $prescription_diet_arr]);
        } else {
            return_json(['get_diet_record' => "No record " . $id . " existing."]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when adding referral record
 */ 
elseif ($action === 'add_referral') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $role = $database->checkRoleByUsername($req_username);

        if($role['role'] == 'pet_owner'){
            return_json(['add_referral' => "You don't have the privilege to perform this action"]);
        } else {
            $record = [
                "pet_id" => $_POST['pet_id'],
                "doctor_id" => $_POST['doctor_id'],
                "booking_id" => $_POST['booking_id'],
                "referral_date" => $_POST['referral_date'],
                "diagnosis" => $_POST['diagnosis'],
                "username" => $req_username
            ];
            if($referral_id=$pet_database->addReferral($record)){
                return_json(['add_referral' => $referral_id]);
            } else {
                return_json(['add_referral' => false]);
            }
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when updating referral record
 */ 
elseif ($action === 'update_referral') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $role = $database->checkRoleByUsername($req_username);

        if($role['role'] == 'pet_owner'){
            return_json(['update_referral' => "You don't have the privilege to perform this action"]);
        } else {
            $record = [
                "pet_id" => $_POST['pet_id'],
                "doctor_id" => $_POST['doctor_id'],
                "booking_id" => $_POST['booking_id'],
                "referral_date" => $_POST['referral_date'],
                "diagnosis" => $_POST['diagnosis'],
                "username" => $req_username,
                "id" => $id
            ];
            if($pet_database->updateReferral($record)){
                return_json(['update_referral' => true]);
            } else {
                return_json(['update_referral' => false]);
            }
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when deleting referral record
 */ 
elseif ($action === 'delete_referral') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $role = $database->checkRoleByUsername($req_username);

        if($role['role'] == 'pet_owner'){
            return_json(['delete_referral' => "You don't have the privilege to perform this action"]);
        } else {
            $rehab_records = $pet_database->getRehabRecordIdsByReferralId($id);
            foreach($rehab_records as $r):
                $rehab_record = [
                    "id" => $r,
                    "username" => $req_username
                ];
                if($pet_database->deleteRehabRecord($rehab_record)){
                    true;
                } else {
                    return_json(['delete_referral' => false]);
                }
            endforeach;

            $record = [
                "id" => $id,
                "username" => $req_username
            ];
            if($pet_database->deleteReferral($record)){
                return_json(['delete_referral' => true]);
            } else {
                return_json(['delete_referral' => false]);
            }
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when adding rehab record
 */ 
elseif ($action === 'add_rehab_record') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $role = $database->checkRoleByUsername($req_username);

        if($role['role'] == 'pet_owner'){
            return_json(['add_rehab_record' => "You don't have the privilege to perform this action"]);
        } else {
            $record = [
                "referral_id" => $_POST['referral_id'],
                "treatment_date" => $_POST['treatment_date'],
                "attended" => $_POST['attended'],
                "comments" => $_POST['comments'],
                "username" => $req_username
            ];
            if($pet_database->addRehabRecord($record)){
                return_json(['add_rehab_record' => true]);
            } else {
                return_json(['add_rehab_record' => false]);
            }
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when updating rehab record
 */ 
elseif ($action === 'update_rehab_record') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $role = $database->checkRoleByUsername($req_username);

        if($role['role'] == 'pet_owner'){
            return_json(['update_rehab_record' => "You don't have the privilege to perform this action"]);
        } else {
            $record = [
               "treatment_date" => $_POST['treatment_date'],
                "attended" => $_POST['attended'],
                "comments" => $_POST['comments'],
                "username" => $req_username,
                "id" => $id
            ];
            if($pet_database->updateRehabRecord($record)){
                return_json(['update_rehab_record' => true]);
            } else {
                return_json(['update_rehab_record' => false]);
            }
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when deleting rehab record
 */ 
elseif ($action === 'delete_rehab_record') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $role = $database->checkRoleByUsername($req_username);

        if($role['role'] == 'pet_owner'){
            return_json(['delete_rehab_record' => "You don't have the privilege to perform this action"]);
        } else {
            $record = [
                "id" => $id,
                "username" => $req_username
            ];
            if($pet_database->deleteRehabRecord($record)){
                return_json(['delete_rehab_record' => true]);
            } else {
                return_json(['delete_rehab_record' => false]);
            }
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when getting rehab records
 */ 
elseif ($action === 'get_rehab_record') {
    if ($valid_jwt_token) {
        if($referrals=$pet_database->getReferralById($id)){
            if($rehab_records=$pet_database->getRehabRecordsByReferralId($id)){
                $referral_rehab=[
                    "pet_id" => $referrals['pet_id'],
                    "doctor_id" => $referrals['doctor_id'],
                    "booking_id" => $referrals['booking_id'],
                    "veterinarian" => $referrals['veterinarian'],
                    "referral_date" => $referrals['referral_date'],
                    "diagnosis" => $referrals['diagnosis'],
                    "archived" => $referrals['archived'],
                    "rehab_records" => $rehab_records
                ];
                return_json(['rehab_record' => $referral_rehab]);
            } else {
                $referral_rehab=[
                    "pet_id" => $referrals['pet_id'],
                    "doctor_id" => $referrals['doctor_id'],
                    "veterinarian" => $referrals['veterinarian'],
                    "referral_date" => $referrals['referral_date'],
                    "diagnosis" => $referrals['diagnosis'],
                    "rehab_records" => []
                ];
                return_json(['rehab_record' => $referral_rehab]);
            }
        } else {
            return_json(['get_rehab_record' => "No record " . $id . " existing."]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when getting rehab records
 */ 
elseif ($action === 'get_all_rehab_record_by_pet') {
    if ($valid_jwt_token) {
        if($referrals=$pet_database->getAllReferralsByPetId($id)){
            $referral_rehab_arr=array();
            foreach($referrals as $r):
                if($rehab_records=$pet_database->getRehabRecordsByReferralId($r['id'])){
                    $referral_rehab=[
                        "pet_id" => $r['pet_id'],
                        "doctor_id" => $r['doctor_id'],
                        "booking_id" => $r['booking_id'],
                        "veterinarian" => $r['veterinarian'],
                        "referral_date" => $r['referral_date'],
                        "diagnosis" => $r['diagnosis'],
                        "archived" => $r['archived'],
                        "rehab_records" => $rehab_records
                    ];
                    array_push($referral_rehab_arr, $referral_rehab);
                } else {
                    $referral_rehab=[
                        "pet_id" => $r['pet_id'],
                        "doctor_id" => $r['doctor_id'],
                        "veterinarian" => $r['veterinarian'],
                        "referral_date" => $r['referral_date'],
                        "diagnosis" => $r['diagnosis'],
                        "archived" => $r['archived'],
                        "rehab_records" => []
                    ];
                    array_push($referral_rehab_arr, $referral_rehab);
                }    
            endforeach;
            return_json(['rehab_record' => $referral_rehab_arr]);
        } else {
            return_json(['get_rehab_record' => "No record " . $id . " existing."]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when adding surgery record
 */ 
elseif ($action === 'add_surgery') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $role = $database->checkRoleByUsername($req_username);

        if($role['role'] == 'pet_owner'){
            return_json(['add_surgery' => "You don't have the privilege to perform this action"]);
        } else {
            $record = [
                "pet_id" => $_POST['pet_id'],
                "doctor_id" => $_POST['doctor_id'],
                "booking_id" => $_POST['booking_id'],
                "surgery" => $_POST['surgery'],
                "surgery_date" => $_POST['surgery_date'],
                "discharge_date" => $_POST['discharge_date'],
                "comments" => $_POST['comments'],
                "username" => $req_username
            ];
            if($pet_database->addSurgery($record)){
                return_json(['add_surgery' => true]);
            } else {
                return_json(['add_surgery' => false]);
            }
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when updating surgery record
 */ 
elseif ($action === 'update_surgery') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $role = $database->checkRoleByUsername($req_username);

        if($role['role'] == 'pet_owner'){
            return_json(['update_surgery' => "You don't have the privilege to perform this action"]);
        } else {
            $record = [
                "doctor_id" => $_POST['doctor_id'],
                "booking_id" => $_POST['booking_id'],
                "surgery" => $_POST['surgery'],
                "surgery_date" => $_POST['surgery_date'],
                "discharge_date" => $_POST['discharge_date'],
                "comments" => $_POST['comments'],
                "username" => $req_username,
                "id" => $id
            ];
            if($pet_database->updateSurgery($record)){
                return_json(['update_surgery' => true]);
            } else {
                return_json(['update_surgery' => false]);
            }
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when deleting surgery record
 */ 
elseif ($action === 'delete_surgery') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $role = $database->checkRoleByUsername($req_username);

        if($role['role'] == 'pet_owner'){
            return_json(['delete_surgery' => "You don't have the privilege to perform this action"]);
        } else {
            $record = [
                "id" => $id,
                "username" => $req_username
            ];
            if($pet_database->deleteSurgery($record)){
                return_json(['delete_surgery' => true]);
            } else {
                return_json(['delete_surgery' => false]);
            }
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when getting rehab records
 */ 
elseif ($action === 'get_all_surgery_record_by_pet') {
    if ($valid_jwt_token) {
        if($surgeries=$pet_database->getAllSurgeriesByPetId($id)){
            return_json(['surgery_record' => $surgeries]);
        } else {
            return_json(['get_surgery_record' => "No record " . $id . " existing."]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when uploading documents
 */ 
elseif ($action === 'upload_file') {
    if ($valid_jwt_token) {
        if(!empty($_FILES["file"]["name"])){
            $file_name = basename($_FILES["file"]["name"]);
            $tmp_file = $_FILES["file"]["tmp_name"]; 
            $file_path = $upload_dir . $file_name; 
            $file_extension = pathinfo($file_path,PATHINFO_EXTENSION);
            $file_info = [
                "file_name" => $file_name,
                "pet_id" => $_POST['pet_id'],
                "file_type" => $_POST['file_type'],
                "username" => $req_username,
                "metadata" => $_FILES
            ];
            
            if($file_id = $pet_database->uploadFile($file_info)){
                if(move_uploaded_file($tmp_file, $file_path)){
                    return_json(['file_info' => $file_id]);
                } else {
                    return_json(['file_info' => false]);
                }
            }  else {
                return_json(['file_info' => "Insertion error"]);
            }
        }  else {
            return_json(['file_info' => "No file attached"]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when download documents
 */ 
elseif ($action === 'download_file') {
    if ($valid_jwt_token) {
        $upload_dir = "/Applications/XAMPP/xamppfiles/uploads/";
        $file_requested = $upload_dir . $_GET['filename']; 

        clearstatcache();
        
        if(file_exists($file_requested)){
            header('Content-Description: File Transfer');
            header('Content-Type: application/octet-stream');
            header('Content-Disposition: attachment; filename="'.basename($file_requested).'"');
            header('Content-Length: ' . filesize($file_requested));
            header('Pragma: public');

            flush();

            return readfile($file_requested, true);
        } else {
            return_json(['download_file' => false]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when uploading documents
 */ 
elseif ($action === 'delete_file') {
    if ($valid_jwt_token) {
        if($pet_database->deleteFile($id)){
            return_json(['delete_file' => true]);
        }  else {
            return_json(['delete_file' => false]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * Invoice/Billing Management
 */

/**
 * API endpoint when generating invoices
 */ 
elseif ($action === 'generate_invoice') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $invoice_info = [
            'username' => $req_username,
            'booking_id' => $_POST['booking_id']
        ];

        $invoice_items = $_POST['invoice_items'];

        $role = $database->checkRoleByUsername($req_username);
        $current_booking_status = $booking_database->checkBookingStatus($_POST['booking_id']);
        $booking_fee = $booking_database->checkBookingFee($_POST['booking_id']);
        $invoice_count = $billing_database->checkInvoiceByBookingId($_POST['booking_id']);
        
        if($role['role'] === 'doctor')
        {
            if($current_booking_status['booking_status'] === 'FINISHED'){
                if($invoice_count['invoice_count'] === 0){
                    if($invoice_id=$billing_database->createNewInvoice($invoice_info)){ 
                            foreach($invoice_items as $item):
                                $invoice_record = [
                                    'invoice_id' => $invoice_id,
                                    'item_id' => $item['item_id'],
                                    'quantity' => $item['quantity']
                                ]; 

                                if($billing_database->insertNewInvoiceItem($invoice_record)){
                                    true;
                                } else {
                                    return_json(['generate_invoice' => "Error encountered while inserting invoice item."]);
                                }

                                //update inventory
                                if($in_use_qty=$inventory_database->getCurrentInUseQty($item['item_id'])){
                                    $new_qty = $in_use_qty['in_use_qty'] - $item['quantity'];
                                    $inventory_record = [
                                        'in_use_qty' => $new_qty,
                                        'item_id' => $item['item_id'],
                                        'username' => $req_username
                                    ]; 
                                    if($new_qty >= 0){
                                        if($inventory_database->updateInUseQty($inventory_record)){
                                            true;
                                        } else {
                                            return_json(['generate_invoice' => "Error encountered while updating inventory."]);
                                        }
                                    } else {
                                        $billing_database->deleteInvoiceItemByInvoiceId($invoice_id);
                                        $billing_database->deleteInvoice($invoice_id);
                                        return_json(['generate_invoice' => "In-use Inventory below zero. Please update inventory to proceed."]);

                                    }
                                }

                            endforeach;

                            $invoice_amount_record = [
                                'username' => $req_username,
                                'invoice_id' => $invoice_id,
                                'booking_id' => $_POST['booking_id']
                            ];
                            if($billing_database->updateInvoiceAmount($invoice_amount_record)){
                                if($invoice=$billing_database->getInvoiceByInvoiceId($invoice_id)){
                                    
                                    $payment_record = [
                                        "payment_status" => "NOT PAID",
                                        "payment_balance" => $invoice['invoice_amount'],
                                        'username' => $req_username
                                    ];
                                    
                                    if($payment_id=$billing_database->insertNewPayment($payment_record)){
                                        $receipt_record = [
                                            "booking_id" => $_POST['booking_id'],
                                            "invoice_id" => $invoice_id,
                                            "payment_id" => $payment_id,
                                            "username" => $req_username
                                        ];
                                        
                                        if($billing_database->insertNewReceipt($receipt_record)){
                                            $payment_history = [
                                                "payment_id" => $payment_id,
                                                "prev_payment_status" => null,
                                                "new_payment_status" => "NOT PAID",
                                                "username" => $req_username
                                            ];
                                            if($billing_database->addPaymentHistory($payment_history)){
                                                return_json(['generate_invoice' => $invoice_id]);
                                            }
                                        }
                                    }
                                }
                            } else {
                                return_json(['generate_invoice' => "Invoice amount not calculated. Error encountered."]);
                            }
                    }
                }  else {
                    return_json(['generate_invoice' => "An existing invoice is already created for this booking."]);
                }
            } else {
                return_json(['generate_invoice' => "Booking status must be in FINISHED status before invoice can be generated. Current status is: " . $current_booking_status['booking_status']]);
            }
        } else {
            return_json(['generate_invoice' => "You don't have the privilege to perform this action. Only doctors can create invoices."]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when updating invoices
 */ 
elseif ($action === 'update_invoice') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $invoice_info = [
            'username' => $req_username,
            'booking_id' => $_POST['booking_id']
        ];

        $invoice_items = $_POST['invoice_items'];

        $role = $database->checkRoleByUsername($req_username);
        $current_booking_status = $booking_database->checkBookingStatus($_POST['booking_id']);
        $booking_fee = $booking_database->checkBookingFee($_POST['booking_id']);
        $current_invoice_items = $billing_database->getInvoiceItemsByInvoiceId($id);

        if($role['role'] === 'doctor')
        {
            if($current_booking_status['booking_status'] === 'FINISHED'){
                    if($billing_database->deleteInvoiceItemByInvoiceId($id)){ 
                            foreach($invoice_items as $item):
                                $invoice_record = [
                                    'invoice_id' => $id,
                                    'item_id' => $item['item_id'],
                                    'quantity' => $item['quantity']
                                ]; 
                                
                                if($billing_database->insertNewInvoiceItem($invoice_record)){
                                    true;

                                } else {
                                    return_json(['update_invoice' => "Error encountered while inserting invoice item."]);
                                }

                                //update inventory
                                if($in_use_qty=$inventory_database->getCurrentInUseQty($item['item_id'])){
                                    $current_qty = 0;
                                    foreach($current_invoice_items as $current_item):
                                        if($current_item['item_id'] === $item['item_id']){
                                            $current_qty = $current_item['quantity'];
                                            break;
                                        }
                                    endforeach;

                                    $new_qty = $in_use_qty['in_use_qty'] + $current_qty - $item['quantity'];
                                    $inventory_record = [
                                        'in_use_qty' => $new_qty,
                                        'item_id' => $item['item_id'],
                                        'username' => $req_username
                                    ]; 

                                    if($new_qty >= 0){
                                        if($inventory_database->updateInUseQty($inventory_record)){
                                            true;
                                        } else {
                                            foreach($current_invoice_items as $current_item):
                                                $current_invoice_record = [
                                                    'invoice_id' => $id,
                                                    'item_id' => $current_item['item_id'],
                                                    'quantity' => $current_item['quantity']
                                                ]; 
                                                $current_inventory_record = [
                                                    'in_use_qty' => $in_use_qty['in_use_qty'],
                                                    'item_id' => $item['item_id'],
                                                    'username' => $req_username
                                                ]; 
                                                if($billing_database->insertNewInvoiceItem($current_invoice_record)){
                                                    if($inventory_database->updateInUseQty($current_inventory_record)){
                                                        true;
                                                    } else {
                                                        return_json(['update_invoice' => "Error encountered while inserting invoice item."]);
                                                    }
                                                } else {
                                                    return_json(['update_invoice' => "Error encountered while inserting invoice item."]);
                                                }
                                            endforeach;    
                                            return_json(['update_invoice' => "Error encountered while updating inventory."]);
                                        }
                                    } else {

                                        return_json(['update_invoice' => "In-use Inventory below zero. Please update inventory to proceed."]);
                                    }
                                }
                                
                            endforeach;

                            $invoice_amount_record = [
                                'username' => $req_username,
                                'invoice_id' => $id,
                                'booking_id' => $_POST['booking_id']
                            ];

                            if($billing_database->updateInvoiceAmount($invoice_amount_record)){
                                if($invoice=$billing_database->getInvoiceByInvoiceId($id)){
                                    $payment_id = $billing_database->getPaymentId($id);
                                    $payment_record = [
                                        "payment_status" => "NOT PAID",
                                        "payment_balance" => $invoice['invoice_amount'],
                                        'username' => $req_username,
                                        "payment_id" => $payment_id['payment_id']
                                    ];
                                    if($billing_database->updatePaymentBalance($payment_record)){
                                        $prev_status = $billing_database->getCurrentPaymentStatus($payment_id);
                                        $payment_history = [
                                            "payment_id" => $payment_id['payment_id'],
                                            "prev_payment_status" => $prev_status['payment_status'],
                                            "new_payment_status" => "NOT PAID",
                                            "username" => $req_username
                                        ];
                                        if($billing_database->addPaymentHistory($payment_history)){
                                            return_json(['update_invoice' => (int)$id]);
                                        }
                                    }
                                }
                            } else {
                                return_json(['update_invoice' => "Invoice amount not calculated. Error encountered."]);
                            }
                    }
            } else {
                return_json(['update_invoice' => "Booking status must be in FINISHED status before invoice can be generated. Current status is: " . $current_booking_status['booking_status']]);
            }
        } else {
            return_json(['update_invoice' => "You don't have the privilege to perform this action. Only doctors can create invoices."]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when getting invoices
 */ 
elseif ($action === 'get_invoice') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        if($invoice_info = $billing_database->getInvoiceByInvoiceId($id)){
            if($invoice_items = $billing_database->getInvoiceItemsByInvoiceId($id)){
                $invoice_record = [
                    'invoice_id' => $id,
                    'booking_id' => $invoice_info['booking_id'],
                    'invoice_amount' => $invoice_info['invoice_amount'],
                    'invoice_items' => $invoice_items
                ];        
                return_json(['get_invoice' => $invoice_record]);
            }  else {
                return_json(['get_invoice' => false]);
            }            
        }  else {
            return_json(['get_invoice' => "Invoice doesn't exist."]);
        }
        
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when getting invoices
 */ 
elseif ($action === 'delete_invoice') {
    if ($valid_jwt_token) {
        $role = $database->checkRoleByUsername($req_username);
        $current_invoice_items = $billing_database->getInvoiceItemsByInvoiceId($id);
        if($role['role'] === 'doctor')
        {
            foreach($current_invoice_items as $current_item):
                $in_use_qty=$inventory_database->getCurrentInUseQty($current_item['item_id']);
                $current_inventory_record = [
                    'in_use_qty' => $in_use_qty['in_use_qty'] + $current_item['quantity'],
                    'item_id' => $current_item['item_id'],
                    'username' => $req_username
                ]; 
                if($inventory_database->updateInUseQty($current_inventory_record)){
                    true;
                } else {
                    return_json(['delete_invoice' => "Error encountered while inserting invoice item."]);
                }
            endforeach;    
                $receipt_info = $billing_database->getReceiptByInvoiceId($id);
                if($billing_database->deletePaymentHistory($receipt_info['payment_id'])){
                    if($billing_database->deletePayment($receipt_info['payment_id'])){
                            if($billing_database->deleteInvoice($id)){
                                return_json(['delete_invoice' => "Invoice " . $id . " deleted."]);
                            } else {
                                return_json(['delete_invoice' => "Error deleting invoice."]);
                            }
                    }  else {
                        return_json(['delete_invoice' => "Error deleting payment information."]);
                    }
                }  else {
                    return_json(['delete_invoice' => "Error payment history."]);
                }
        } else {
            return_json(['delete_invoice' => "You don't have the privilege to perform this action. Only doctors can delete invoices."]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when accepting payments
 */ 
elseif ($action === 'accept_payment') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $role = $database->checkRoleByUsername($req_username);
        //payments   
        if($role['role'] === 'admin'){
            if($payment_info = $billing_database->getPaymentInformation($_POST['invoice_id'])){
                $new_balance = $payment_info['payment_balance'] - $_POST['payment_paid'];
                $change = $_POST['payment_paid'] - $payment_info['payment_balance'];

                $status = "NOT PAID";
                if($new_balance <= 0){
                    $status = "PAID";
                }

                $amount = 0;
                if($change <= 0){
                    $amount = $change;
                }
                
                $payment_record = [
                    "payment_by" => $_POST['payee_username'],
                    "payment_method" => $_POST['payment_method'],
                    "payment_status" => $status,
                    "payment_balance" => $new_balance,
                    "payment_paid" => $_POST['payment_paid'],
                    "payment_change" => $amount,
                    "payment_id" => $payment_info['id'],
                    "username" => $req_username
                ];

                if($billing_database->acceptPayment($payment_record)){
                    //payment_history
                    $payment_history = [
                        "payment_id" => $payment_info['id'],
                        "prev_payment_status" => $payment_info['payment_status'],
                        "new_payment_status" => $status,
                        "username" => $req_username
                    ];
                    
                    if($billing_database->addPaymentHistory($payment_history)){
                        $receipt_record = [
                            "username" => $req_username,
                            "payment_id" => $payment_info['id']
                        ];

                        if($billing_database->updateReceipts($receipt_record)){
                            if($new_balance <= 0){
                                if($info=$billing_database->getReceiptByPaymentId($payment_info['id'])){
                                    $archive_records = [
                                        "receipt_id" => $info['id'],
                                        "payment_id" => $info['payment_id'],
                                        "booking_id" => $info['booking_id'],
                                        "invoice_id" => $info['invoice_id'],
                                        "username" => $req_username
                                    ];
                                    $booking_database->archiveBookingWoStatusUpdate($archive_records);
                                    $billing_database->archiveInvoices($archive_records);
                                    $billing_database->archiveReceipts($archive_records);
                                    return_json(['accept_payment' => "Payment has been accepted."]);
                                }
                            } else {
                                return_json(['accept_payment' => "Remaining balance: " . $new_balance]);
                            }
                        } else {
                            return_json(['accept_payment' => "Error while updating receipts."]);
                        }
                    } else {
                        return_json(['accept_payment' => "Error while updating payment history."]);
                    }
                } else {
                    return_json(['accept_payment' => "Error while updating payments."]);
                }
            }
        }  else {
            return_json(['accept_payment' => "You don't have the privilege to perform this action. Only admins can accept payments."]);
        }
        
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when getting receipts
 */ 
elseif ($action === 'get_receipt') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        if($receipt_info = $billing_database->getAllReceiptInfoById($id)){
            if($invoice_items = $billing_database->getInvoiceItemsByInvoiceId($receipt_info['invoice_id'])){ 
                $receipt_record = [
                    "pet_owner_id" => $receipt_info['pet_owner_id'],
                    "username" => $receipt_info['username'],
                    "pet_id" => $receipt_info['pet_id'],
                    "petname" => $receipt_info['petname'],
                    "booking_id" => $receipt_info['booking_id'],
                    "booking_type_id" => $receipt_info['booking_type_id'],
                    "doctor_id" => $receipt_info['doctor_id'],
                    "invoice_id" => $receipt_info['invoice_id'],
                    "receipt_id" => $receipt_info['receipt_id'],
                    "invoice_amount" => $receipt_info['invoice_amount'],
                    "payment_paid" => $receipt_info['payment_paid'],
                    "payment_status" => $receipt_info['payment_status'],
                    "payment_date" => $receipt_info['payment_date'],
                    "invoice_items" => $invoice_items
                ];     
                return_json(['get_receipt' => $receipt_record]);
            }  else {
                return_json(['get_receipt' => false]);
            }            
        }  else {
            return_json(['get_receipt' => "Receipt doesn't exist."]);
        }
        
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}
/**
 * API endpoint when getting all billing info
 */ 
elseif ($action === 'get_all_billing_info') {
    if ($valid_jwt_token) {
        $role = $database->checkRoleByUsername($req_username);

        if($role['role'] !== 'pet_owner'){
            if($billing_info = $billing_database->getAllBillingInfo()){
                return_json(['billing_info' => $billing_info]); 
            } else {
                return_json(['billing_info' => []]); 
            }
        } else {
            return_json(['ERROR:' => "UNAUTHORIZED"]); 
        }

    }
}
/**
 * API endpoint when getting billing info by doctor
 */ 
elseif ($action === 'get_billing_by_doctor') {
    if ($valid_jwt_token) {
        $role = $database->checkRoleByUsername($req_username);

        if($role['role'] === 'doctor'){
            if($billing_info = $billing_database->getBillingByDoctor($id)){
                return_json(['billing_info' => $billing_info]); 
            } else {
                return_json(['billing_info' => []]); 
            }
        } else {
            return_json(['ERROR:' => "UNAUTHORIZED"]); 
        }

    }
}
/**
 * API endpoint when getting billing info by pet owner
 */ 
elseif ($action === 'get_billing_by_pet_owner') {
    if ($valid_jwt_token) {
        $role = $database->checkRoleByUsername($req_username);

        if($role['role'] === 'pet_owner'){
            if($billing_info = $billing_database->getBillingByPetOwner($id)){
                return_json(['billing_info' => $billing_info]); 
            } else {
                return_json(['billing_info' => []]); 
            }
        } else {
            return_json(['ERROR:' => "UNAUTHORIZED"]); 
        }

    }
}

/**
 * Inventory System Management
 */
/**
 * API endpoint when getting inventory categories and item mapping
 */ 
elseif ($action === 'get_mapped_inventory') {
    if ($valid_jwt_token) {
        if ($inventory = $inventory_database->getAllMappedInventory()) {
            return_json(['inventory' => $inventory]);
        } else {
            return_json(['inventory' => []]); 
        }
    }
}

/**
 * API endpoint when getting all inventory records
 */ 
elseif ($action === 'get_inventory_all') {
    if ($valid_jwt_token) {
        if ($inventory_categories = $inventory_database->getAllInventoryCategories()) {
            $inventory_records  = array();

            foreach($inventory_categories as $y):

                $inventory_items = array();
                if ($items = $inventory_database->getAllInventoryByCategory($y['category_id'])) {

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
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when getting inventory categories
 */ 
elseif ($action === 'get_inventory_categories') {
    if ($valid_jwt_token) {
        if ($inventory_categories = $inventory_database->getAllInventoryCategories()) {
            return_json(['inventory_categories' => $inventory_categories]);
        } else {
            return_json(['inventory_categories' => []]); 
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
        if ($inventory_categories = $inventory_database->getInventoryCategoriesById($id)) {
            $inventory_records  = array();
                if ($items = $inventory_database->getAllInventoryByCategory($id)) {

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
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when adding inventory category
 */ 
elseif ($action === 'add_inventory_category') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $role = $database->checkRoleByUsername($req_username);
        if($role['role'] === 'admin'){
            $record = [
                'item_category' => $_POST['item_category'],
                'username' => $req_username
            ];
            if($category_id=$inventory_database->addInventoryCategory($record)){
                return_json(['add_inventory_category' => $category_id]);
            } else {
                return_json(['add_inventory_category' => false]);
            }
        } else {
            return_json(['add_inventory_category' => "You don't have the privilege to perform this action. Only admins can adjust configurations."]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when updating inventory category
 */ 
elseif ($action === 'update_inventory_category') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $role = $database->checkRoleByUsername($req_username);
        if($role['role'] === 'admin'){
            $record = [
                'item_category' => $_POST['item_category'],
                'username' => $req_username,
                'id' => $id
            ];

            if($inventory_database->updateInventoryCategory($record)){
                return_json(['update_inventory_category' => true]);
            } else {
                return_json(['update_inventory_category' => false]);
            }
        } else {
            return_json(['update_inventory_category' => "You don't have the privilege to perform this action. Only admins can adjust configurations."]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when deleting inventory category
 */ 
elseif ($action === 'delete_inventory_category') {
    if ($valid_jwt_token) {
        $role = $database->checkRoleByUsername($req_username);
        if($role['role'] === 'admin'){
            if($inventory_database->deleteInventoryItemByCategory($id)){
                if($inventory_database->deleteInventoryCategory($id)){
                    return_json(['delete_inventory_category' => true]);
                } else {
                    return_json(['delete_inventory_category' => false]);
                }
            } else {
                return_json(['delete_inventory_category' => false]);
            }
        } else {
            return_json(['delete_inventory_category' => "You don't have the privilege to perform this action. Only admins can adjust configurations."]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when adding inventory item
 */ 
elseif ($action === 'add_inventory_item') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $role = $database->checkRoleByUsername($req_username);
        if($role['role'] === 'admin'){
            $record = [
                'inventory_item_category_id' => $_POST['inventory_item_category_id'],
                'item_name' => $_POST['item_name'],
                'in_use_qty' => $_POST['in_use_qty'],
                'in_stock_qty' => $_POST['in_stock_qty'],
                'threshold_qty' => $_POST['threshold_qty'],
                'weight_volume' => $_POST['weight_volume'],
                'item_unit' => $_POST['item_unit'],
                'production_date' => $_POST['production_date'],
                'expiration_date' => $_POST['expiration_date'],
                'unit_price' => $_POST['unit_price'],
                'username' => $req_username
            ];
            if($item_id=$inventory_database->addInventoryItem($record)){
                return_json(['add_inventory_item' => $item_id]);
            } else {
                return_json(['add_inventory_item' => false]);
            }
        } else {
            return_json(['add_inventory_item' => "You don't have the privilege to perform this action. Only admins can adjust configurations."]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when updating inventory item
 */ 
elseif ($action === 'update_inventory_item') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $role = $database->checkRoleByUsername($req_username);
        if($role['role'] === 'admin'){
            $record = [
                'inventory_item_category_id' => $_POST['inventory_item_category_id'],
                'item_name' => $_POST['item_name'],
                'in_use_qty' => $_POST['in_use_qty'],
                'in_stock_qty' => $_POST['in_stock_qty'],
                'threshold_qty' => $_POST['threshold_qty'],
                'weight_volume' => $_POST['weight_volume'],
                'item_unit' => $_POST['item_unit'],
                'production_date' => $_POST['production_date'],
                'expiration_date' => $_POST['expiration_date'],
                'unit_price' => $_POST['unit_price'],
                'username' => $req_username,
                'id' => $id
            ];
            if($inventory_database->updateInventoryItem($record)){
                return_json(['update_inventory_item' => true]);
            } else {
                return_json(['update_inventory_item' => false]);
            }
        } else {
            return_json(['update_inventory_item' => "You don't have the privilege to perform this action. Only admins can adjust configurations."]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when deleting inventory item
 */ 
elseif ($action === 'delete_inventory_item') {
    if ($valid_jwt_token) {
        $role = $database->checkRoleByUsername($req_username);
        if($role['role'] === 'admin'){
            if($inventory_database->deleteInventoryItem($id)){
                return_json(['delete_inventory_item' => true]);
            } else {
                return_json(['delete_inventory_item' => false]);
            }
        } else {
            return_json(['delete_inventory_item' => "You don't have the privilege to perform this action. Only admins can adjust configurations."]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * Lodging Management
 */
/**
 * API endpoint when adding lodging
 */ 
elseif ($action === 'add_lodging') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $role = $database->checkRoleByUsername($req_username);
        if($role['role'] === 'admin'){
            $record = [
                'cage_status' => $_POST['cage_status'],
                'pet_id' => $_POST['pet_id'],
                'assigned_doctor' => $_POST['assigned_doctor'],
                'confinement_date' => $_POST['confinement_date'],
                'discharge_date' => $_POST['discharge_date'],
                'comments' => $_POST['comments'],
                'username' => $req_username
            ];
            if($lodging_id=$lodging_database->addLodging($record)){
                $cage_name = "Cage " . $lodging_id;
                $inv_record = [
                    'inventory_item_category_id' => 8,
                    'item_name' => $cage_name,
                    'in_use_qty' => 0,
                    'in_stock_qty' => 0,
                    'threshold_qty' => 0,
                    'weight_volume' => 0,
                    'item_unit' => ' ',
                    'production_date' => null,
                    'expiration_date' => null,
                    'unit_price' => 100,
                    'username' => $req_username
                ];
                if($inventory_database->addInventoryItem($inv_record)){
                    return_json(['add_lodging' => $lodging_id]);
                }
            } else {
                return_json(['add_lodging' => false]);
            }
        } else {
            return_json(['add_lodging' => "You don't have the privilege to perform this action. Only admins can adjust configurations."]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when updating lodging
 */ 
elseif ($action === 'update_lodging') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $role = $database->checkRoleByUsername($req_username);
        if($role['role'] === 'admin'){
            $record = [
                'cage_status' => $_POST['cage_status'],
                'pet_id' => $_POST['pet_id'],
                'assigned_doctor' => $_POST['assigned_doctor'],
                'confinement_date' => $_POST['confinement_date'],
                'discharge_date' => $_POST['discharge_date'],
                'comments' => $_POST['comments'],
                'username' => $req_username,
                'id' => $id
            ];
            if($lodging_database->updateLodging($record)){
                return_json(['update_lodging' => true]);
            } else {
                return_json(['update_lodging' => false]);
            }
        } else {
            return_json(['update_lodging' => "You don't have the privilege to perform this action. Only admins can adjust configurations."]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when deleting lodging
 */ 
elseif ($action === 'delete_lodging') {
    

    if ($valid_jwt_token) {
        
        $role = $database->checkRoleByUsername($req_username);
        $cage_name = "Cage " . $id;
        
        if($role['role'] === 'admin'){
            if($lodging_database->deleteLodging($id)){
                if($inventory_database->deleteInventoryItemByName($cage_name)){
                    return_json(['delete_lodging' => true]);
                }
            } else {
                return_json(['delete_lodging' => false]);
            }
        } else {
            return_json(['delete_lodging' => "You don't have the privilege to perform this action. Only admins can adjust configurations."]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when getting lodging
 */ 
elseif ($action === 'get_all_lodging') {
    if ($valid_jwt_token) {
        $role = $database->checkRoleByUsername($req_username);
        if($role['role'] === 'admin'){
            if($cages=$lodging_database->getAllLodging()){
                return_json(['lodging' => $cages]);
            } else {
                return_json(['lodging' => false]);
            }
        } else {
            return_json(['lodging' => "You don't have the privilege to perform this action. Only admins can adjust configurations."]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when getting lodging by pet ID
 */ 
elseif ($action === 'get_lodging_by_pet') {
    if ($valid_jwt_token) {
        $role = $database->checkRoleByUsername($req_username);
        if($role['role'] === 'admin'){
            if($cages=$lodging_database->getLodgingByPetId($id)){
                return_json(['lodging' => $cages]);
            } else {
                return_json(['lodging' => []]);
            }
        } else {
            return_json(['lodging' => "You don't have the privilege to perform this action. Only admins can adjust configurations."]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * API endpoint when getting lodging by pet ID
 */ 
elseif ($action === 'discharge') {
    if ($valid_jwt_token) {
        $role = $database->checkRoleByUsername($req_username);
        if($role['role'] === 'admin'){
            $record = [
                'username' => $req_username,
                'id' => $id
            ];
            if($lodging_database->dischargePet($record)){
                return_json(['discharge' => true]);
            } else {
                return_json(['discharge' => false]);
            }
        } else {
            return_json(['discharge' => "You don't have the privilege to perform this action. Only admins can adjust configurations."]);
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}

/**
 * Sales Management
 */
/**
 * API endpoint when adding sales item
 */ 
elseif ($action === 'generate_sales_invoice') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $invoice_items = $_POST['sales_items'];

        $role = $database->checkRoleByUsername($req_username);
        if($role['role'] === 'admin'){
            if($invoice_id=$sales_database->createNewSalesInvoice($req_username)){
                
                foreach($invoice_items as $items):
                    $record = [
                        'sales_invoice_id' => $invoice_id,
                        'item_id' => $items['item_id'],
                        'quantity' => $items['quantity']
                    ];
                    if($sales_database->createNewSalesInvoiceItem($record)){
                        true;
                    } else {
                        $sales_database->deleteSalesInvoiceItembyInvoiceId($invoice_id);
                        $sales_database->deleteSalesInvoicebyId($invoice_id);
                        return_json(['generate_sales_invoice' => false]); 
                    }
                endforeach;

                $record = [
                    'username' => $req_username,
                    'sales_invoice_id' => $invoice_id,
                    'payment_by' => $_POST['payment_by']
                ];

                if($payment_id=$billing_database->insertNewPaymentSales($record)){
                    $payment_record = [
                        'payment_id' => $payment_id,
                        'username' => $req_username,
                        'sales_invoice_id' => $invoice_id,
                        "prev_payment_status" => "NOT PAID",
                        "new_payment_status" => "PAID",
                    ];
                    if($sales_database->updateSalesInvoiceAmount($payment_record)){
                        if($billing_database->addPaymentHistory($payment_record)){
                            return_json(['generate_sales_invoice' => $invoice_id]); 
                        }
                    } else {
                        $sales_database->deleteSalesInvoiceItembyInvoiceId($invoice_id);
                        $sales_database->deleteSalesInvoicebyId($invoice_id);
                        return_json(['generate_sales_invoice' => false]);
                    }
                } else {
                    $sales_database->deleteSalesInvoiceItembyInvoiceId($invoice_id);
                    $sales_database->deleteSalesInvoicebyId($invoice_id);
                    return_json(['generate_sales_invoice' => false]);
                }
            } else {
                return_json(['generate_sales_invoice' => false]); 
            }
        }
    } else {
        return_json(['ERROR:' => "UNAUTHORIZED"]); 
    }
}
/**
 * API endpoint when adding sales item
 */ 
elseif ($action === 'subscribe') {

    if(validateEmail($_POST['email_addr'])
        && validateLength($_POST['email_addr'], 100)){
            if($database->subscribe($_POST['email_addr'])){
                return_json(["status" => "success", "msg" => "Thank you for subscribing!"]); 
            } else {
                return_json(["status" => "failed", "msg" => "You're already a subscriber!"]); 
            }
    } else {
        return_json(["status" => "failed", "msg" => "Please provide a valid email address!"]);  
    }
    
}

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