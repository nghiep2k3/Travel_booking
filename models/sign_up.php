<?php
// Models sign_up.php
class Sign_up
{
    private $conn;

    private $table = 'sign_up';
    public $id;
    public $name;
    public $username;
    public $password;
    public $create_id;
    public $role;
    public $token;
    public $email;
    public $phone;
    public $hometown;

    public function __construct($db)
    {
        $this->conn = $db;
        $this->role = 'user';
    }

    public function create()
    {
        $query = "INSERT INTO " . $this->table . "(name, username, email, password, create_id, role, token, phone, hometown) 
                  VALUES (:name, :username,:email, :password, :create_id, :role, :token, :phone, :hometown)";
        $stmt = $this->conn->prepare($query);

        // Liên kết các giá trị
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':username', $this->username);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':password', $this->password);
        $stmt->bindParam(':create_id', $this->create_id);
        $stmt->bindParam(':role', $this->role);
        $stmt->bindParam(':phone', $this->phone);
        $stmt->bindParam(':hometown', $this->hometown);
        $stmt->bindParam(':token', $this->token);

        // Thực thi truy vấn
        if ($stmt->execute()) {
            // Lấy ID của user vừa tạo
            $this->id = $this->conn->lastInsertId();
            return true;
        }
        return false;
    }

    // Kiểm tra email có tồn tại trong CSDL không
    // Kiểm tra email có tồn tại trong CSDL không
    public function checkEmail($email)
    {
        $query = "SELECT id FROM " . $this->table . " WHERE email = :email LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        return $stmt->rowCount() > 0;
    }


    // Cập nhật mật khẩu mới cho người dùng
    public function updatePassword($email, $newPassword)
    {
        $query = "UPDATE " . $this->table . " SET password = :password WHERE email = :email";
        $stmt = $this->conn->prepare($query);
        $hashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);

        $stmt->bindParam(':password', $hashedPassword);
        $stmt->bindParam(':email', $email);

        return $stmt->execute();
    }
    public function getPasswordByEmail($email)
    {
        $query = "SELECT password FROM " . $this->table . " WHERE email = :email LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            return $row['password'];
        }
        return null;
    }
    public function checkAccountById($id)
    {
        $query = "SELECT id FROM " . $this->table . " WHERE id = :id LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        return $stmt->rowCount() > 0;
    }

    public function deleteAccount($id)
    {
        $query = "DELETE FROM " . $this->table . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);

        return $stmt->execute();
    }

    public function updateAccount($id, $name = null, $username = null, $email = null, $phone = null, $hometown = null)
    {
        // Bắt đầu xây dựng câu truy vấn SQL
        $query = "UPDATE " . $this->table . " SET ";
        $params = [];

        // Kiểm tra từng tham số và thêm vào câu truy vấn nếu có giá trị
        if ($name !== null) {
            $query .= "name = :name, ";
            $params[':name'] = $name;
        }

        if ($username !== null) {
            $query .= "username = :username, ";
            $params[':username'] = $username;
        }

        if ($email !== null) {
            $query .= "email = :email, ";
            $params[':email'] = $email;
        }

        if ($phone !== null) {
            $query .= "phone = :phone, ";
            $params[':phone'] = $phone;
        }

        if ($hometown !== null) {
            $query .= "hometown = :hometown, ";
            $params[':hometown'] = $hometown;
        }

        // Xóa dấu phẩy cuối cùng
        $query = rtrim($query, ', ');

        // Thêm điều kiện WHERE
        $query .= " WHERE id = :id";
        $params[':id'] = $id;

        // Chuẩn bị câu truy vấn
        $stmt = $this->conn->prepare($query);

        // Liên kết các tham số
        foreach ($params as $key => $value) {
            $stmt->bindValue($key, $value);
        }

        // Thực thi truy vấn
        return $stmt->execute();
    }



}
?>