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

            // Set the PDO error mode to exception
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }

        return $this->conn;
    }
}
// $db = new db();
// $connect = $db->connect();


?>