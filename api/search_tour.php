<?php
// API tour.php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json');

include_once '../config/db.php';
include_once '../models/Tour.php';

class Search_tour 
{
    private $tour;

    public function __construct($db)
    {
        // Khởi tạo đối tượng Tour với kết nối cơ sở dữ liệu
        $this->tour = new Tour($db);
    }

    // Phương thức để lấy tất cả các tour
    public function getAllTours()
    {
        $result = $this->tour->getAllTours();
        $tours = [];

        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            $tours[] = [
                'id' => $row['id'],
                'title' => $row['title'],
                'price' => $row['price'],
                'srcImg' => $row['srcImg'],
            ];
        }

        // Trả về dữ liệu dưới dạng JSON
        echo json_encode($tours);
    }
}

// Kết nối cơ sở dữ liệu
$database = new db();
$db = $database->connect();

// Khởi tạo đối tượng API và gọi phương thức lấy tất cả các tour
$tourAPI = new Search_tour($db);
$tourAPI->getAllTours();
?>
