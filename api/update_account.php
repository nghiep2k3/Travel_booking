<?php
// API update_account.php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../config/db.php';
include_once '../models/sign_up.php';

class UpdateAccountAPI
{
    private $signUp;
    private $data;

    public function __construct($db)
    {
        $this->signUp = new Sign_up($db);
        $this->data = json_decode(file_get_contents("php://input"));
    }

    public function updateAccount()
    {
        // Kiểm tra nếu ID có trong dữ liệu yêu cầu
        if (!empty($this->data->id)) {
            // Cập nhật thông tin tài khoản
            $updated = $this->signUp->updateAccount(
                $this->data->id,
                $this->data->name ?? null,
                $this->data->username ?? null,
                $this->data->email ?? null,
                $this->data->phone ?? null,
                $this->data->hometown ?? null
            );

            // Kiểm tra kết quả cập nhật
            if ($updated) {
                echo json_encode(["message" => "Account updated successfully."]);
            } else {
                echo json_encode(["message" => "Unable to update account."]);
            }
        } else {
            // Trả về thông báo lỗi nếu không có ID
            echo json_encode(["message" => "ID is required."]);
        }
    }
}

// Khởi tạo kết nối cơ sở dữ liệu
$database = new db();
$db = $database->connect();

// Khởi tạo đối tượng API và gọi phương thức cập nhật tài khoản
$updateAccountAPI = new UpdateAccountAPI($db);
$updateAccountAPI->updateAccount();
