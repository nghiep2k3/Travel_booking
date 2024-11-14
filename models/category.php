<?php
class Category{
    private $conn;
    
    private $table = "category";
    public $id;
    public $title;
    public $metaTile;
    public $type;

    public function __construct($db) {
        $this->conn = $db;
    }


    public function getCategory(){
        $query = "SELECT * FROM " . $this->table;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}

?>