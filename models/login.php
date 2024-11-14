<?php
class Sign_up
{
    private $conn;
    private $table = 'sign_up';

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Method to validate login by username or email
    public function validateLogin($identifier, $password)
    {
        $query = "SELECT * FROM " . $this->table . " WHERE (username = :identifier OR email = :identifier) LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':identifier', $identifier);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            // Verify password
            if (password_verify($password, $user['password'])) {
                return $user;  // Return user data if password matches
            }
        }
        return false; // Return false if login fails
    }
}
?>
