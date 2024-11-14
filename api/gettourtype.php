<?php
// Cho phép mọi nguồn truy cập và đặt kiểu nội dung trả về là JSON
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json');

// Import file db.php để kết nối cơ sở dữ liệu
include_once '../config/db.php';
include_once '../models/tour.php';

class getTourType
{
    private $tour;

    public function __construct($db)
    {
        $this->tour = new Tour($db);
    }

    public function fetchToursByType($type)
    {
        // Kiểm tra nếu không có tham số type
        if (!$type) {
            echo json_encode(["message" => "Type parameter is missing."]);
            return;
        }

        // Lấy danh sách các tour theo type
        $stmt = $this->tour->getToursByType($type);
        $num = $stmt->rowCount();

        if ($num > 0) {
            $tours_arr = [];

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $tour_item = [
                    "id" => $row['id'],
                    "title" => $row['title'],
                    "price" => $row['price'],
                    "discount" => $row['discount'],
                    "time" => $row['time'],
                    "srcImg" => $row['srcImg'],
                    "depart" => $row['depart'],
                    "type" => $row['type']
                ];

                $tours_arr[] = $tour_item;
            }

            // Trả về danh sách tour dưới dạng JSON
            echo json_encode($tours_arr);
        } else {
            // Nếu không tìm thấy tour nào với type này
            echo json_encode(["message" => "No tours found for this type."]);
        }
    }
}

// Tạo kết nối cơ sở dữ liệu
$database = new db();
$db = $database->connect();

// Lấy tham số type từ URL
$type = isset($_GET['type']) ? $_GET['type'] : null;

// Tạo một instance của getTourType và gọi hàm fetchToursByType
$tourAPI = new getTourType($db);
$tourAPI->fetchToursByType($type);

?>
