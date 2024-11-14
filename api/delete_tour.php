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
            // Check if the tour exists
            if ($this->tour->checkTourById($this->id)) {
                // Delete the tour from the database
                if ($this->tour->deleteTour($this->id)) {
                    $this->sendResponse(true, 'Tour has been successfully deleted.');
                } else {
                    $this->sendResponse(false, 'Failed to delete the tour.');
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
