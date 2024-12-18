<?php
session_start();

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, Cookie");
header("Access-Control-Allow-Credentials: true");

require("codes/connection.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $userId = $_GET['userId'] ?? null;

    if (!$userId) {
        echo json_encode(['error' => 'User ID is required']);
        exit;
    }

    try {
        $query = "SELECT m.* FROM Movies m 
                  INNER JOIN Favorites f ON m.movieId = f.movieId 
                  WHERE f.userId = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $result = $stmt->get_result();

        $favorites = [];
        while ($row = $result->fetch_assoc()) {
            $favorites[] = $row;
        }

        echo json_encode(['success' => true, 'favorites' => $favorites]);

    } catch (Exception $e) {
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }

    $conn->close();
}
?>
