<?php
session_start();

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, Cookie");
header("Access-Control-Allow-Credentials: true");

require("codes/connection.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $movieId = $data['movieId'] ?? null;
    $userId = $data['userId'] ?? null;

    if (!$movieId || !$userId) {
        echo json_encode(['error' => 'Movie ID and User ID are required']);
        exit;
    }

    try {
        // Check if already favorited
        $checkQuery = "SELECT favoriteId FROM Favorites WHERE movieId = ? AND userId = ?";
        $stmt = $conn->prepare($checkQuery);
        $stmt->bind_param("ii", $movieId, $userId);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            echo json_encode(['error' => 'Movie already in favorites']);
            exit;
        }

        // Add to favorites
        $insertQuery = "INSERT INTO Favorites (movieId, userId) VALUES (?, ?)";
        $stmt = $conn->prepare($insertQuery);
        $stmt->bind_param("ii", $movieId, $userId);
        $stmt->execute();

        echo json_encode(['success' => true, 'message' => 'Added to favorites']);

    } catch (Exception $e) {
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }

    $conn->close();
}
?>
