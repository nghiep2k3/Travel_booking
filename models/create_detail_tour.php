<?php
class CreateDetailTour
{
    private $conn;
    private $table_schedule = 'schedule';
    private $table_price_tour = 'price_tour';
    private $table_vehicle = 'vehicle';
    private $table_image_tour_detail = 'image_tour_detail';

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Hàm để tạo chi tiết tour
    public function createDetailTour($tour_id, $schedule, $price_tour, $priceEmBe, $priceTreEm, $vehicle, $imageUrl)
    {
        // Tạo id_query chung cho tất cả các bảng
        $id_query = $tour_id;

        // 1. Tạo bản ghi trong bảng schedule (có thể có nhiều bản ghi)
        foreach ($schedule as $item) {
            $this->createSchedule($id_query, $item); // Lặp qua mỗi lịch trình và tạo bản ghi
        }

        // 2. Tạo bản ghi trong bảng price_tour
        $this->createPriceTour($id_query, $price_tour, $priceEmBe, $priceTreEm);

        // 3. Tạo bản ghi trong bảng vehicle
        $this->createVehicle($id_query, $vehicle);

        // 4. Tạo bản ghi trong bảng image_tour_detail
        $this->createImageTourDetail($id_query, $imageUrl);

        return true;
    }

    // Tạo bản ghi trong bảng schedule
    private function createSchedule($id_query, $schedule)
    {
        $query = "INSERT INTO " . $this->table_schedule . " (title, content, id_query) 
                  VALUES (:title, :content, :id_query)";
        $stmt = $this->conn->prepare($query);

        // Liên kết các giá trị
        $stmt->bindParam(':title', $schedule['title']);
        $stmt->bindParam(':content', $schedule['content']);
        $stmt->bindParam(':id_query', $id_query);

        return $stmt->execute();
    }

    // Tạo bản ghi trong bảng price_tour
    private function createPriceTour($id_query, $price, $priceEmBe, $priceTreEm)
    {
        $query = "INSERT INTO " . $this->table_price_tour . " (price, priceEmBe, priceTreEm, id_query) 
                  VALUES (:price, :priceEmBe, :priceTreEm, :id_query)";
        $stmt = $this->conn->prepare($query);

        // Liên kết các giá trị
        $stmt->bindParam(':price', $price);
        $stmt->bindParam(':priceEmBe', $priceEmBe);
        $stmt->bindParam(':priceTreEm', $priceTreEm);
        $stmt->bindParam(':id_query', $id_query);

        return $stmt->execute();
    }

    // Tạo bản ghi trong bảng vehicle
    private function createVehicle($id_query, $vehicle)
    {
        $query = "INSERT INTO " . $this->table_vehicle . " (vehicle1, vehicle2, vehicle3, id_query) 
                  VALUES (:vehicle1, :vehicle2, :vehicle3, :id_query)";
        $stmt = $this->conn->prepare($query);

        // Liên kết các giá trị
        $stmt->bindParam(':vehicle1', $vehicle['vehicle1']);
        $stmt->bindParam(':vehicle2', $vehicle['vehicle2']);
        $stmt->bindParam(':vehicle3', $vehicle['vehicle3']);
        $stmt->bindParam(':id_query', $id_query);

        return $stmt->execute();
    }

    // Tạo bản ghi trong bảng image_tour_detail
    private function createImageTourDetail($id_query, $imageUrl)
    {
        $query = "INSERT INTO " . $this->table_image_tour_detail . " (ImgCrs1, ImgCrs2, ImgCrs3, id_query) 
                  VALUES (:ImgCrs1, '', '', :id_query)";
        $stmt = $this->conn->prepare($query);

        // Liên kết các giá trị
        $stmt->bindParam(':ImgCrs1', $imageUrl);
        $stmt->bindParam(':id_query', $id_query);

        return $stmt->execute();
    }
}

?>
