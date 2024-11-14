<?php
// Các headers để API trả về JSON
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/db.php';
include_once '../models/category.php';

class CategoryApi
{
    private $category;

    public function __construct($db)
    {
        $this->category = new Category($db);
    }

    public function getCategories()
    {
        $stmt = $this->category->getCategory();
        $num = $stmt->rowCount();

        if ($num > 0) {
            $categories_arr = array();
            $categories_arr["categories"] = array();

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                // Kiểm tra các trường tồn tại trong $row
                $id = $row['id'] ?? null;
                $title = $row['title'] ?? null;
                $metaTile = $row['metaTile'] ?? null;
                $type = $row['type'] ?? null;

                $category_item = array(
                    "id" => $id,
                    "title" => $title,
                    "metaTile" => $metaTile,
                    "type" => $type
                );

                array_push($categories_arr["categories"], $category_item);
            }

            // Trả về kết quả JSON với mã 200 OK
            http_response_code(200);
            echo json_encode($categories_arr);
        } else {
            // Trả về kết quả JSON trống nếu không có dữ liệu
            http_response_code(404);
            echo json_encode(
                array("message" => "No categories found.")
            );
        }
    }

}


$database = new db();
$db = $database->connect();

$category = new CategoryApi($db);
$category->getCategories();
?>