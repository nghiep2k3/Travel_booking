<?php
class db
{
    private $servername = 'localhost:4306';
    private $username = 'root';
    private $password = '';
    private $db = 'travel_database';

    public $conn;

    public function connect()
    {
        try {
            $this->conn = new PDO("mysql:host=" . $this->servername . ";dbname=" . $this->db, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }

        return $this->conn;
    }

    // Hàm để lấy dữ liệu từ bảng, lọc cột có giá trị NULL và loại bỏ cột id
    private function fetchData($table, $id)
    {
        $stmt = $this->conn->prepare("SELECT * FROM $table WHERE id = :id");
        $stmt->execute(['id' => $id]);

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Lọc cột NULL và loại bỏ cột id
        return array_map(function ($row) {
            unset($row['id']); // Loại bỏ cột id
            return array_filter($row, function ($value) {
                return !is_null($value);
            });
        }, $results);
    }

    // Hàm kiểm tra sự tồn tại của id trong bảng price_tour
    public function doesPriceTourIdExist($id)
    {
        $stmt = $this->conn->prepare("SELECT id FROM price_tour WHERE id = :id LIMIT 1");
        $stmt->execute(['id' => $id]);

        return $stmt->fetch(PDO::FETCH_ASSOC) !== false;
    }

    public function getCombinedData($id)
    {
        // Kiểm tra sự tồn tại của id
        if (!$this->doesPriceTourIdExist($id)) {
            // Trả về JSON với các trường rỗng nếu id không tồn tại
            $response = [
                'image_tour_detail' => [],
                'schedule' => [],
                'price_tour' => []
            ];
        } else {
            try {
                // Lấy dữ liệu từ từng bảng
                $imageTourDetail = $this->fetchData('image_tour_detail', $id);
                $schedule = $this->fetchData('schedule', $id);
                $priceTour = $this->fetchData('price_tour', $id);

                // Định dạng JSON theo yêu cầu
                $response = [
                    'image_tour_detail' => $imageTourDetail,
                    'schedule' => $schedule,
                    'price_tour' => $priceTour
                ];
            } catch (PDOException $e) {
                echo "Error: " . $e->getMessage();
                return;
            }
        }

        // Trả về JSON
        header('Content-Type: application/json');
        echo json_encode($response);
    }
}

// Tạo đối tượng db và gọi phương thức
$db = new db();
$db->connect();

if (isset($_GET['id'])) {
    $db->getCombinedData($_GET['id']);
}
?>
