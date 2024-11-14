<?php
// API delete_account.php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json');

include_once '../config/db.php';
include_once '../models/sign_up.php';

class DeleteAccountAPI
{
    private $signUp;
    private $data;

    public function __construct($db)
    {
        $this->signUp = new Sign_up($db);
        $this->data = json_decode(file_get_contents("php://input"));
    }

    // Hàm xử lý yêu cầu xóa tài khoản
    public function processDeleteAccount()
    {
        if (!empty($this->data->id)) {
            $id = $this->data->id;

            // Kiểm tra xem tài khoản có tồn tại không
            if ($this->signUp->checkAccountById($id)) {
                // Xóa tài khoản khỏi cơ sở dữ liệu
                if ($this->signUp->deleteAccount($id)) {
                    $this->sendResponse(true, 'Tài khoản đã được xóa thành công.');
                } else {
                    $this->sendResponse(false, 'Xóa tài khoản thất bại.');
                }
            } else {
                $this->sendResponse(false, 'Tài khoản không tồn tại.');
            }
        } else {
            $this->sendResponse(false, 'Vui lòng cung cấp ID tài khoản.');
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

// Khởi tạo DeleteAccountAPI và gọi phương thức xử lý yêu cầu xóa tài khoản
$api = new DeleteAccountAPI($db);
$api->processDeleteAccount();
?>
