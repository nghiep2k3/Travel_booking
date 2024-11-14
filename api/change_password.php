<?php
// API change_password.php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json');

include_once '../config/db.php';
include_once '../models/sign_up.php';

class ChangePasswordAPI
{
    private $signUp;
    private $data;

    public function __construct($db)
    {
        $this->signUp = new Sign_up($db);
        $this->data = json_decode(file_get_contents("php://input"));
    }

    // Hàm xử lý yêu cầu đổi mật khẩu
    public function processChangePassword()
    {
        if (!empty($this->data->email) && !empty($this->data->currentPassword) && !empty($this->data->newPassword)) {
            $email = $this->data->email;
            $currentPassword = $this->data->currentPassword;
            $newPassword = $this->data->newPassword;

            // Kiểm tra xem email có tồn tại trong CSDL không
            if ($this->signUp->checkEmail($email)) {
                // Lấy mật khẩu hiện tại từ cơ sở dữ liệu
                $currentDbPassword = $this->signUp->getPasswordByEmail($email);

                // Kiểm tra mật khẩu hiện tại có đúng không
                if (password_verify($currentPassword, $currentDbPassword)) {
                    // Cập nhật mật khẩu mới vào cơ sở dữ liệu
                    if ($this->signUp->updatePassword($email, $newPassword)) {
                        $this->sendResponse(true, 'Mật khẩu đã được thay đổi thành công.');
                    } else {
                        $this->sendResponse(false, 'Cập nhật mật khẩu thất bại.');
                    }
                } else {
                    $this->sendResponse(false, 'Mật khẩu hiện tại không đúng.');
                }
            } else {
                $this->sendResponse(false, 'Email không tồn tại.');
            }
        } else {
            $this->sendResponse(false, 'Vui lòng nhập đầy đủ thông tin.');
        }
    }

    // Hàm gửi phản hồi JSON
    private function sendResponse($success, $message)
    {
        echo json_encode([
            'success' => $success,
            'message' => $message
        ]);
    }
}

// Khởi tạo kết nối cơ sở dữ liệu
$database = new db();
$db = $database->connect();

// Khởi tạo ChangePasswordAPI và gọi phương thức xử lý yêu cầu đổi mật khẩu
$api = new ChangePasswordAPI($db);
$api->processChangePassword();
?>
