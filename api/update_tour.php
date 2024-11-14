<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json');

include_once '../config/db.php';
include_once '../models/tour.php';

class UpdateTourAPI
{
    private $tour;

    public function __construct($db)
    {
        $this->tour = new Tour($db);
    }

    public function updateTour()
    {
        // Lấy dữ liệu JSON từ body
        $data = json_decode(file_get_contents("php://input"), true); // Đọc dữ liệu JSON và chuyển đổi thành mảng

        // Truy cập dữ liệu từ mảng
        $this->tour->id = $data['id'] ?? null; // Nhận giá trị 'id'
        $this->tour->title = $data['title'] ?? null; // Nhận giá trị 'title'
        $this->tour->price = $data['price'] ?? null; // Nhận giá trị 'price'
        $this->tour->discount = $data['discount'] ?? null; // Nhận giá trị 'discount'
        $this->tour->time = $data['time'] ?? null; // Nhận giá trị 'time'
        $this->tour->depart = $data['depart'] ?? null; // Nhận giá trị 'depart'

        // Kiểm tra xem ID có tồn tại không
        if (!empty($this->tour->id)) {
            // Cập nhật thông tin tour
            if ($this->tour->update()) {
                echo json_encode(["message" => "Tour updated successfully."]);
            } else {
                echo json_encode(["message" => "Unable to update tour."]);
            }
        } else {
            echo json_encode(["message" => "ID is required."]);
        }
    }
}

// Tạo kết nối
$database = new db();
$db = $database->connect();
$updateTourAPI = new UpdateTourAPI($db);
$updateTourAPI->updateTour();
?>
