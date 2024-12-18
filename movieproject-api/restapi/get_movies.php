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

    $stmt = $conn->prepare("Select * from movies");
    $stmt->execute();
    $result = $stmt->get_result(); // Get the result of the query

    $user = [];
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $user [] = $row;
        }
        echo json_encode($user);
    } else {
        echo json_encode(['status' => 'error', 'error' => 'No Movies Found.']);
    }
}

?>