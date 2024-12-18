<?php
session_start();

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, Cookie");
header("Access-Control-Allow-Credentials: true");
require("codes/connection.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $data = json_decode(file_get_contents("php://input"));

    if(isset($data->search)){
        $search = $data->search;

        $stmt = $conn->prepare("SELECT * FROM movies WHERE title LIKE ?");
        $searchTerm = "%$search%";
        $stmt->bind_param("s", $searchTerm);
        $stmt->execute();
        $result = $stmt->get_result();

        $user = [];
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $user [] = $row;
            }
            echo json_encode($user);
        } else {
            echo json_encode(['status' => 'error', 'error' => 'No Movies Found.']);
        }
        
    } else {
        echo json_encode(['status' => 'error', 'error' => 'Search anything.']);
    }

} else {
    echo json_encode(['status' => 'error', 'error' => 'Wrong Method.']);
}

?>