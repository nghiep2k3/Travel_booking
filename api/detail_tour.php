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

    public function fetchSchedule($id)
    {
        // Sửa lại query để sử dụng id_schedule truyền vào
        $sql = "SELECT title, content FROM schedule WHERE id_query = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['id' => $id]); // Truyền id vào câu lệnh SQL
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Kiểm tra kết quả trả về và tạo mảng dữ liệu
        return array_map(function ($row) {
            return [
                'title' => $row['title'],
                'content' => $row['content']
            ];
        }, $result);
    }


    private function fetchData($table, $id, $additionalCondition = '')
    {
        // Kiểm tra lại tên cột trong bảng, dùng id_imgSrc thay vì id
        $sql = "SELECT * FROM $table WHERE id_query = :id $additionalCondition"; // Đảm bảo dùng id_imgSrc
        $stmt = $this->conn->prepare($sql);
        $stmt->execute(['id' => $id]);

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return array_map(function ($row) {
            unset($row['id']);
            unset($row['id_query']);
            return array_filter($row, function ($value) {
                return !is_null($value); // Filter out null values
            });
        }, $results);
    }


    // Method to fetch tour information
    public function fetchTourInfo($id)
    {
        $stmt = $this->conn->prepare("SELECT id, title, trip, depart FROM tour WHERE id = :id");
        $stmt->execute(['id' => $id]);

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Method to check if price_tour exists for the given id
    public function doesPriceTourIdExist($id)
    {
        $stmt = $this->conn->prepare("SELECT id_query FROM price_tour WHERE id_query = :id LIMIT 1");
        $stmt->execute(['id' => $id]);

        return $stmt->fetch(PDO::FETCH_ASSOC) !== false;
    }



    public function getCombinedData($id)
    {
        if (!$this->doesPriceTourIdExist($id)) {
            $response = [
                'id' => null,
                'title' => null,
                'trip' => null,
                'depart' => null,
                'image_tour_detail' => [],
                'schedule' => [], // Empty schedule initially
                'price_tour' => [],
                'vehicle' => []
            ];
        } else {
            try {
                // Fetch the tour information
                $tourInfo = $this->fetchTourInfo($id);

                // Fetch schedule data with id_schedule = 1
                $schedule = $this->fetchSchedule($id); // Fetch schedule from the 'schedule2' table

                // Fetch other data
                $imageTourDetail = $this->fetchData('image_tour_detail', $id);
                $priceTour = $this->fetchData('price_tour', $id);
                $vehicle = $this->fetchData('vehicle', $id);

                // Merge all the fetched data into the response
                $response = array_merge($tourInfo, [
                    'schedule' => $schedule,
                    'image_tour_detail' => $imageTourDetail,
                    'price_tour' => $priceTour,
                    'vehicle' => $vehicle
                ]);
            } catch (PDOException $e) {
                echo json_encode(["error" => $e->getMessage()]);
                return;
            }
        }

        // Return the response as JSON
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