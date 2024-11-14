<?php
// Api sign_up.php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json');

include_once '../config/db.php';
include_once '../models/sign_up.php';
require '../vendor/autoload.php';

use \Firebase\JWT\JWT;

class SignUpAPI
{
    private $signUp;
    private $data;
    private $secretKey = "nghiep1320"; // Thay thế bằng khóa bí mật thực tế của bạn
    private $issuer = "http://localhost:8081/travel_database/api"; // Issuer của token

    public function __construct($db)
    {
        $this->signUp = new Sign_up($db);
        $this->data = json_decode(file_get_contents("php://input"));
    }

    public function register()
    {
        if (
            !empty($this->data->name) &&
            !empty($this->data->email) &&
            !empty($this->data->username) &&
            !empty($this->data->password)
        ) {
            $this->signUp->name = $this->data->name;
            $this->signUp->username = $this->data->username;
            $this->signUp->email = $this->data->email;
            $this->signUp->phone = $this->data->phone;
            $this->signUp->hometown = $this->data->hometown;
            $this->signUp->password = password_hash($this->data->password, PASSWORD_BCRYPT);
            $this->signUp->create_id = date('Y-m-d H:i:s');

            // Tạo token JWT và lưu vào thuộc tính token của đối tượng Sign_up
            $token = $this->generateJWT($this->signUp->username);
            $this->signUp->token = $token;

            if ($this->signUp->create()) {
                $this->sendResponse(true, 'Đăng ký thành công', [
                    'id' => $this->signUp->id,
                    'name' => $this->signUp->name,
                    'username' => $this->signUp->username,
                    'email' => $this->signUp->email,
                    'phone' => $this->signUp->phone,
                    'hometown' => $this->signUp->hometown,
                    'create_id' => $this->signUp->create_id,
                    'role' => $this->signUp->role,
                    'token' => $token
                ]);
            } else {
                $this->sendResponse(false, 'Đăng ký thất bại');
            }
        } else {
            $this->sendResponse(false, 'Vui lòng điền đầy đủ thông tin');
        }
    }

    private function generateJWT($username)
    {
        $payload = [
            'iss' => $this->issuer,
            'aud' => $this->issuer,
            'iat' => time(),
            'exp' => time() + (60 * 60),
            'data' => [
                'username' => $username
            ]
        ];

        return JWT::encode($payload, $this->secretKey, 'HS256');
    }

    private function sendResponse($success, $message, $additionalData = [])
    {
        $response = [
            'success' => $success,
            'message' => $message
        ];

        if (!empty($additionalData)) {
            $response = array_merge($response, $additionalData);
        }

        echo json_encode($response);
    }
}

$database = new db();
$db = $database->connect();
$api = new SignUpAPI($db);
$api->register();
?>
