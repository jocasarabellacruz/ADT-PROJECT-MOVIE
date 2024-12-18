<?php
session_start();

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, Cookie");
header("Access-Control-Allow-Credentials: true");

require("codes/connection.php");

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $movieId = $_GET['movieId'] ?? null;
    $userId = $_GET['userId'] ?? null;

    if (!$movieId || !$userId) {
        echo json_encode(['error' => 'Movie ID and User ID are required']);
        exit;
    }

    try {
        $query = "DELETE FROM Favorites WHERE movieId = ? AND userId = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("ii", $movieId, $userId);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            echo json_encode(['success' => true, 'message' => 'Removed from favorites']);
        } else {
            echo json_encode(['error' => 'Favorite not found']);
        }

    } catch (Exception $e) {
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }

    $conn->close();
}
?>
