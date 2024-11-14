<?php
class Tour
{
    private $conn;
    private $table = 'tour';

    // Thuộc tính của tour
    public $id;
    public $title;
    public $price;
    public $discount;
    public $time;
    public $srcImg;
    public $depart;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Lấy tất cả các tour
    public function getAllTours()
    {
        $query = "SELECT * FROM " . $this->table;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    // Lấy các tour theo type
    public function getToursByType($type)
    {
        $query = "SELECT * FROM " . $this->table . " WHERE type = :type";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':type', $type);
        $stmt->execute();

        return $stmt;
    }

    // Phương thức tạo tour mới
    public function create()
    {
        // Truy vấn SQL để chèn thông tin tour vào cơ sở dữ liệu
        $query = "INSERT INTO " . $this->table . " (title, price, discount, time, srcImg, depart) 
                  VALUES (:title, :price, :discount, :time, :srcImg, :depart)";
        $stmt = $this->conn->prepare($query);

        // Liên kết các giá trị
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':price', $this->price);
        $stmt->bindParam(':discount', $this->discount);
        $stmt->bindParam(':time', $this->time);
        $stmt->bindParam(':srcImg', $this->srcImg);
        $stmt->bindParam(':depart', $this->depart);

        // Thực thi truy vấn
        if ($stmt->execute()) {
            $this->id = $this->conn->lastInsertId(); // Lấy ID của tour vừa tạo
            return true;
        } else {
            // Lấy thông tin lỗi
            $errorInfo = $stmt->errorInfo();
            echo json_encode(["message" => "Tour creation failed", "error" => $errorInfo]);
            return false;
        }
    }

    // Method to check if a tour exists by ID
    public function checkTourById($id)
    {
        $query = "SELECT id FROM " . $this->table . " WHERE id = :id LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);

        $stmt->execute();

        return $stmt->rowCount() > 0;
    }

    // Method to delete a tour by ID
    public function deleteTour($id)
    {
        $query = "DELETE FROM " . $this->table . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);

        return $stmt->execute();
    }

    // Method to update an existing tour
    public function update()
    {
        $query = "UPDATE " . $this->table . " SET title = :title, price = :price, discount = :discount, time = :time, depart = :depart WHERE id = :id";
        $stmt = $this->conn->prepare($query);

        // Bind parameters
        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':price', $this->price);
        $stmt->bindParam(':discount', $this->discount);
        $stmt->bindParam(':time', $this->time);
        $stmt->bindParam(':depart', $this->depart);
    
        return $stmt->execute();
    }


}
?>