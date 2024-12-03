<?php
// API delete_tour.php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json');

include_once '../config/db.php';
include_once '../models/Tour.php';

class DeleteTourAPI
{
    private $tour;
    private $id;

    public function __construct($db)
    {
        $this->tour = new Tour($db);
        $this->id = isset($_GET['id']) ? $_GET['id'] : null; // Get ID from URL parameters
    }

    // Method to process the tour deletion request
    public function processDeleteTour()
    {
        if (!empty($this->id)) {
            // Kiểm tra xem tour có tồn tại hay không
            if ($this->tour->checkTourById($this->id)) {
                // Gọi phương thức để xóa tour và các dữ liệu liên quan
                if ($this->tour->deleteRelatedData($this->id)) {
                    $this->sendResponse(true, 'Tour and all related data have been successfully deleted.');
                } else {
                    $this->sendResponse(false, 'Failed to delete the tour and related data.');
                }
            } else {
                $this->sendResponse(false, 'Tour does not exist.');
            }
        } else {
            $this->sendResponse(false, 'Please provide a tour ID.');
        }
    }

    // Method to send JSON response
    private function sendResponse($success, $message)
    {
        echo json_encode([
            'success' => $success,
            'message' => $message
        ]);
    }
}

// Initialize the database connection
$database = new db();
$db = $database->connect();

// Initialize DeleteTourAPI and call the delete tour process method
$api = new DeleteTourAPI($db);
$api->processDeleteTour();
?>
