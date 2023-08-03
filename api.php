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
 * Executed when doctor registers
 * A unique code will be generated to be entered by doctor later to be activated
 */
if ($action === 'register_doctor') {
    $rest_json = file_get_contents('php://input');
    $_POST = json_decode($rest_json, true);
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
        'status' => 0,
        'created_date' => date('Y-m-d H:i:s'),
    ];

    if ($doctor_id = $database->addDoctor($doctor)) {
        $doctor['id'] = $doctor_id;
        if ($code = $database->generateTokenForDoctor($doctor_id)) {
            $headers = ['alg' => 'HS256', 'typ' => 'JWT'];
            $payload = ['user' => $doctor];
            $jwt = generate_jwt_token($headers, $payload);
            return_json(['status' => $jwt]);
        }
    }
}  

/**
 * Executed when admin registers
 * A unique code will be generated to be entered by admin later to be activated
 */
if ($action === 'register_admin') {
    $rest_json = file_get_contents('php://input');
    $_POST = json_decode($rest_json, true);
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
        'status' => 0,
        'created_date' => date('Y-m-d H:i:s'),
    ];

    if ($admin_id = $database->addAdmin($admin)) {
        $admin['id'] = $admin_id;
        if ($code = $database->generateTokenForAdmin($admin_id)) {
            $headers = ['alg' => 'HS256', 'typ' => 'JWT'];
            $payload = ['user' => $admin];
            $jwt = generate_jwt_token($headers, $payload);
            return_json(['status' => $jwt]);
        }
    }
}  

/**
 * Executed when pet owner registers
 * A unique code will be generated to be entered by pet owner later to be activated
 */
if ($action === 'register_pet_owner') {
    $rest_json = file_get_contents('php://input');
    $_POST = json_decode($rest_json, true);
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
        'status' => 0,
        'created_date' => date('Y-m-d H:i:s'),
    ];

    if ($pet_owner_id = $database->addPetOwner($pet_owner)) {
        $pet_owner['id'] = $pet_owner_id;
        if ($code = $database->generateTokenForPetOwners($pet_owner_id)) {
            $headers = ['alg' => 'HS256', 'typ' => 'JWT'];
            $payload = ['user' => $pet_owner];
            $jwt = generate_jwt_token($headers, $payload);
            return_json(['status' => $jwt]);
        }
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

    if (
        $doctor = $database->loginDoctor(
            $_POST['username'],
            md5($_POST['password'])
        )
    ) {
        $headers = ['alg' => 'HS256', 'typ' => 'JWT'];
        $payload = ['user' => $doctor];
        $jwt = generate_jwt_token($headers, $payload);
        return_json(['credentials' => $jwt]);
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

    if (
        $admin = $database->loginAdmin(
            $_POST['username'],
            md5($_POST['password'])
        )
    ) {
        $headers = ['alg' => 'HS256', 'typ' => 'JWT'];
        $payload = ['user' => $admin];
        $jwt = generate_jwt_token($headers, $payload);
        return_json(['credentials' => $jwt]);
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

    if (
        $pet_owner = $database->loginPetOwner(
            $_POST['username'],
            md5($_POST['password'])
        )
    ) {
        $headers = ['alg' => 'HS256', 'typ' => 'JWT'];
        $payload = ['user' => $pet_owner];
        $jwt = generate_jwt_token($headers, $payload);
        return_json(['credentials' => $jwt]);
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
 * deleteDoctor method that deletes doctor record from database.php
 */ 
elseif ($action === 'delete_doctor') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);
        if ($doctor = $database->deleteDoctor($_POST['doctor_id'])) {
            return_json(['delete_doctor' => "success"]);
        }
    }
} 

/**
 * API endpoint when deleting admins
 * deleteAdmin method that deletes admin record from database.php
 */ 
elseif ($action === 'delete_admin') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);
        if ($admin = $database->deleteAdmin($_POST['admin_id'])) {
            return_json(['delete_admin' => "success"]);
        }
    }
} 

/**
 * API endpoint when deleting pet owners
 * deletePetOwner method that deletes pet owner record from database.php
 */ 
elseif ($action === 'delete_pet_owner') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);
        if ($pet_owner = $database->deletePetOwner($_POST['pet_owner_id'])) {
            return_json(['delete_pet_owner' => "success"]);
        }
    }
} 

/**
 * API endpoint when updating doctors
 * updateDoctor method that updates doctor record from database.php
 */ 
elseif ($action === 'update_doctor') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $doctor = [
            'user_id' => $_POST['user_id'],
            'firstname' => $_POST['firstname'],
            'lastname' => $_POST['lastname'],
            'address' => $_POST['address'],
            'state' => $_POST['state'],
            'email' => $_POST['email'],
            'phone' => $_POST['phone'],
            'postcode' => $_POST['postcode'],
            'status' => $_POST['status']
        ];

        if ($record = $database->updateDoctor($doctor)) {
            return_json(['update_doctor' => "success"]);
        }
    }
} 

/**
 * API endpoint when updating admins
 * updateAdmin method that updates doctor record from database.php
 */ 
elseif ($action === 'update_admin') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $admin = [
            'user_id' => $_POST['user_id'],
            'firstname' => $_POST['firstname'],
            'lastname' => $_POST['lastname'],
            'address' => $_POST['address'],
            'state' => $_POST['state'],
            'email' => $_POST['email'],
            'phone' => $_POST['phone'],
            'postcode' => $_POST['postcode'],
            'status' => $_POST['status']
        ];

        if ($record = $database->updateAdmin($admin)) {
            return_json(['update_admin' => "success"]);
        }
    }
} 

/**
 * API endpoint when updating pet_owner
 * updateAdmin method that updates doctor record from database.php
 */ 
elseif ($action === 'update_pet_owner') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $pet_owner = [
            'user_id' => $_POST['user_id'],
            'firstname' => $_POST['firstname'],
            'lastname' => $_POST['lastname'],
            'address' => $_POST['address'],
            'state' => $_POST['state'],
            'email' => $_POST['email'],
            'phone' => $_POST['phone'],
            'postcode' => $_POST['postcode'],
            'status' => $_POST['status']
        ];

        if ($record = $database->updatePetOwner($pet_owner)) {
            return_json(['update_pet_owner' => "success"]);
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

        $pet = [
            'petname' => $_POST['petname'],
            'species' => $_POST['species'],
            'breed' => $_POST['breed'],
            'birthdate' => $_POST['birthdate'],
            'weight' => $_POST['weight'],
            'comments' => $_POST['comments']
        ];

        if ($pet_id = $database->addPet($pet)) {
            return_json(['add_pet' => $pet_id]);
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

        $pet = [
            'id' => $id,
            'petname' => $_POST['petname'],
            'species' => $_POST['species'],
            'breed' => $_POST['breed'],
            'birthdate' => $_POST['birthdate'],
            'weight' => $_POST['weight'],
            'comments' => $_POST['comments']
        ];

        if ($record = $database->updatePet($pet)) {
            return_json(['update_pet' => "success"]);
        }
    }
}

/**
 * API endpoint when deleting pet information
 * deletePet method that deletes pet record from database.php
 */ 
elseif ($action === 'delete_pet') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $pet = [
            'id' => $id
        ];

        if ($record = $database->deletePet($pet)) {
            return_json(['delete_pet' => "success"]);
        }
    }
}

/**
 * API endpoint when selecting pet information
 * getPet method that retrieves pet record from database.php
 */ 
elseif ($action === 'get_pet') {
    if ($valid_jwt_token) {
        $rest_json = file_get_contents('php://input');
        $_POST = json_decode($rest_json, true);

        $pet = [
            'id' => $id
        ];

        if ($pet_record = $database->getPet($pet)) {
            return_json(['get_pet' => $pet_record]);
        }
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