<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json');

require_once '../config/db.php';
require_once '../models/create_detail_tour.php';
require '../vendor/autoload.php';

$db = new db();
$conn = $db->connect();

use Cloudinary\Configuration\Configuration;
use Cloudinary\Api\Upload\UploadApi;
Configuration::instance('cloudinary://849775449392447:pqxCm2Hjh1CwEj6Lm2N1RgTcll8@dpf1lhf7x?secure=true');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $tour_id = $_POST['tour_id'];
    $schedule = $_POST['schedule']; // Mảng chứa các lịch trình (title và content)
    $price_tour = $_POST['price_tour'];
    $priceEmBe = $_POST['priceEmBe'];
    $priceTreEm = $_POST['priceTreEm'];
    $vehicle = $_POST['vehicle']; // Mảng phương tiện (vehicle1, vehicle2, vehicle3)
    
    // Ảnh chi tiết tour (upload)
    $imageUrl = '';
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

    // Khởi tạo lớp CreateDetailTour và tạo chi tiết tour
    $createDetailTour = new CreateDetailTour($conn);
    $createDetailTour->createDetailTour($tour_id, $schedule, $price_tour, $priceEmBe, $priceTreEm, $vehicle, $imageUrl);

    echo json_encode(["message" => "Tour details created successfully!"]);
}
?>
