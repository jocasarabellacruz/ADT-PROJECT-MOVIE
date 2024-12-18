<?php
session_start();

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, Cookie");
header("Access-Control-Allow-Credentials: true");
require("codes/connection.php");
require 'vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    if(isset($_SESSION["USER_ID"])){
        $id = $_SESSION["USER_ID"];
        $stmt = $conn->prepare("Select * from users where userId = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result(); // Get the result of the query
        $user;
        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
        }

        echo json_encode(['status' => 'success', 'UserID' => $_SESSION["USER_ID"], "Role" => $user["role"]]);
    }
}

?>