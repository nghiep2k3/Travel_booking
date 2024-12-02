<?php
// API create_tour.php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json');

include_once '../config/db.php';
include_once '../models/tour.php';
require '../vendor/autoload.php';

// Sử dụng không gian tên
use Cloudinary\Configuration\Configuration;
use Cloudinary\Api\Upload\UploadApi;

// Cấu hình Cloudinary
Configuration::instance('cloudinary://849775449392447:pqxCm2Hjh1CwEj6Lm2N1RgTcll8@dpf1lhf7x?secure=true');

class CreateTourAPI
{
    private $tour;
    private $data;

    public function __construct($db)
    {
        $this->tour = new Tour($db);
        $this->data = json_decode(file_get_contents("php://input"), true);
    }

    public function create()
{
    // Debugging
    var_dump($_POST);
    var_dump($_FILES);

    // Kiểm tra xem có hình ảnh nào được tải lên không
    if (isset($_FILES['srcImg']) && $_FILES['srcImg']['error'] == UPLOAD_ERR_OK) {
        $filePath = $_FILES['srcImg']['tmp_name'];

        try {
            // Tải hình ảnh lên Cloudinary
            $uploadApi = new UploadApi();
            $uploadResult = $uploadApi->upload($filePath, [
                'public_id' => 'tour_' . uniqid(),
                'overwrite' => true
            ]);

            // Lấy URL của hình ảnh đã tải lên
            $imageUrl = $uploadResult['secure_url'];
        } catch (Exception $e) {
            echo json_encode(["message" => "Upload failed: " . $e->getMessage()]);
            return;
        }
    } else {
        echo json_encode(["message" => "No image uploaded", "error" => $_FILES['srcImg']['error'] ?? null]);
        return;
    }

    // Set tour details from POST data
    $this->tour->title = $_POST['title'] ?? null;
    $this->tour->price = $_POST['price'] ?? null;
    $this->tour->discount = $_POST['discount'] ?? null;
    $this->tour->time = $_POST['time'] ?? null;
    $this->tour->depart = $_POST['depart'] ?? null;
    $this->tour->type = $_POST['type'] ?? null;
    $this->tour->trip = $_POST['trip'] ?? null;
    $this->tour->srcImg = $imageUrl;

    // Kiểm tra các giá trị
    if (empty($this->tour->title) || empty($this->tour->price) || empty($this->tour->depart)) {
        echo json_encode(["message" => "Some required fields are missing"]);
        return;
    }

    // Tạo tour mới
    if ($this->tour->create()) {
        echo json_encode([
            "message" => "Tour created successfully",
            "tour" => [
                "id" => $this->tour->id,
                "title" => $this->tour->title,
                "price" => $this->tour->price,
                "discount" => $this->tour->discount,
                "time" => $this->tour->time,
                "srcImg" => $this->tour->srcImg,
                "depart" => $this->tour->depart,
                "type" => $this->tour->type,
                "trip" => $this->tour->trip
            ]
        ]);
    } else {
        echo json_encode(["message" => "Tour creation failed"]);
    }
}


}

// Tạo một kết nối đến cơ sở dữ liệu mới
$database = new db();
$db = $database->connect();

// Tạo một thể hiện tour API mới và gọi phương thức create
$tourAPI = new CreateTourAPI($db);
$tourAPI->create();
?>