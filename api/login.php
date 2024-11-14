<?php
// API login.php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json');

include_once '../config/db.php';
include_once '../models/login.php';

class LoginAPI
{
    private $signUp;
    private $data;

    public function __construct($db)
    {
        $this->signUp = new Sign_up($db);
        $this->data = json_decode(file_get_contents("php://input"));
    }

    // Process login request
    public function processLogin()
    {
        if (!empty($this->data->identifier) && !empty($this->data->password)) {
            $identifier = $this->data->identifier;
            $password = $this->data->password;

            // Validate user login with username or email
            $user = $this->signUp->validateLogin($identifier, $password);

            if ($user) {
                // Successful login
                $this->sendResponse(true, 'Đăng nhập thành công', [
                    'id' => $user['id'],
                    'name' => $user['name'],
                    'username' => $user['username'],
                    'email' => $user['email'],
                    'role' => $user['role']
                ]);
            } else {
                // Failed login
                $this->sendResponse(false, 'Tài khoản hoặc mật khẩu không đúng.');
            }
        } else {
            $this->sendResponse(false, 'Vui lòng nhập đầy đủ thông tin đăng nhập.');
        }
    }

    // Send JSON response
    private function sendResponse($success, $message, $userData = null)
    {
        $response = [
            'success' => $success,
            'message' => $message
        ];

        if ($userData) {
            $response['user'] = $userData;
        }

        echo json_encode($response);
    }
}

// Initialize database connection
$database = new db();
$db = $database->connect();

// Initialize LoginAPI and process login request
$api = new LoginAPI($db);
$api->processLogin();
?>