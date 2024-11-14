<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json');

include_once '../config/db.php';

class Detail_tour
{
    private $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    private function fetchData($table, $id)
    {
        $stmt = $this->conn->prepare("SELECT * FROM $table WHERE id = :id");
        $stmt->execute(['id' => $id]);

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return array_map(function ($row) {
            unset($row['id']);
            return array_filter($row, function ($value) {
                return !is_null($value);
            });
        }, $results);
    }

    public function doesPriceTourIdExist($id)
    {
        $stmt = $this->conn->prepare("SELECT id FROM price_tour WHERE id = :id LIMIT 1");
        $stmt->execute(['id' => $id]);

        return $stmt->fetch(PDO::FETCH_ASSOC) !== false;
    }

    public function getCombinedData($id)
    {
        if (!$this->doesPriceTourIdExist($id)) {
            $response = [
                'image_tour_detail' => [],
                'schedule' => [],
                'price_tour' => []
            ];
        } else {
            try {
                $imageTourDetail = $this->fetchData('image_tour_detail', $id);
                $schedule = $this->fetchData('schedule', $id);
                $priceTour = $this->fetchData('price_tour', $id);
                $vehicle = $this->fetchData('vehicle', $id);

                $response = [
                    'image_tour_detail' => $imageTourDetail,
                    'schedule' => $schedule,
                    'price_tour' => $priceTour,
                    'vehicle' => $vehicle
                ];
            } catch (PDOException $e) {
                echo "Error: " . $e->getMessage();
                return;
            }
        }

        header('Content-Type: application/json');
        echo json_encode($response);
    }
}

$db = new db();
$conn = $db->connect();
$tour = new Detail_tour($conn);

if (isset($_GET['id'])) {
    $tour->getCombinedData($_GET['id']);
}
?>
