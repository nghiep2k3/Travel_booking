<?php
// API forgot_password.php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json');

include_once '../config/db.php';
include_once '../models/sign_up.php';
require '../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class ForgotPasswordAPI
{
    private $signUp;
    private $data;

    public function __construct($db)
    {
        $this->signUp = new Sign_up($db);
        $this->data = json_decode(file_get_contents("php://input"));
    }

    // Hàm xử lý yêu cầu quên mật khẩu
    public function processForgotPassword()
    {
        if (!empty($this->data->email)) {
            $email = $this->data->email;

            // Kiểm tra email có tồn tại trong CSDL không
            if ($this->signUp->checkEmail($email)) {
                $newPassword = $this->generateRandomPassword();  // Tạo mật khẩu mới

                // Cập nhật mật khẩu mới vào cơ sở dữ liệu
                if ($this->signUp->updatePassword($email, $newPassword)) {
                    // Gửi mật khẩu mới qua email cho người dùng
                    if ($this->sendEmail($email, $newPassword)) {
                        $this->sendResponse(true, 'Mật khẩu mới đã được gửi về email của bạn.');
                    } else {
                        $this->sendResponse(false, 'Không thể gửi email, vui lòng thử lại.');
                    }
                } else {
                    $this->sendResponse(false, 'Cập nhật mật khẩu thất bại.');
                }
            } else {
                $this->sendResponse(false, 'Tài khoản chưa được đăng ký.');
            }
        } else {
            $this->sendResponse(false, 'Vui lòng nhập email.');
        }
    }

    // Tạo mật khẩu ngẫu nhiên
    private function generateRandomPassword($length = 8)
    {
        $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        return substr(str_shuffle($chars), 0, $length);
    }

    // Gửi email chứa mật khẩu mới
    private function sendEmail($email, $newPassword)
    {
        $mail = new PHPMailer(true);

        try {
            // Cấu hình SMTP của PHPMailer
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';  // SMTP của Gmail
            $mail->SMTPAuth = true;
            $mail->Username = 'nguyennghiep1320@gmail.com';  // Email của bạn
            $mail->Password = 'lpxt qnye udau jppj';  // Mật khẩu ứng dụng
            $mail->SMTPSecure = 'tls';
            $mail->Port = 587;

            // Cấu hình người gửi và người nhận
            $mail->setFrom('nguyennghiep1320@gmail.com', 'New Password');  // Thông tin người gửi
            $mail->addAddress($email);  // Thông tin người nhận

            // Nội dung email
            $mail->isHTML(true);
            $mail->Subject = 'New Password';
            $mail->Body    = "Mật khẩu mới của bạn là: <b>$newPassword</b>";

            $mail->send();
            return true;
        } catch (Exception $e) {
            return false;
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

// Khởi tạo ForgotPasswordAPI và gọi phương thức xử lý yêu cầu quên mật khẩu
$api = new ForgotPasswordAPI($db);
$api->processForgotPassword();
?>
