<?php
session_start();

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: DELETE, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, Cookie");
header("Access-Control-Allow-Credentials: true");
require("codes/connection.php");

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Get movieId from query string
    $movieId = isset($_GET['movieId']) ? $_GET['movieId'] : null;
    
    if (!$movieId) {
        echo json_encode(["success" => false, "error" => "movieId is required."]);
        exit;
    }

    $conn = new mysqli($host, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare and execute each DELETE statement separately
    $deleteVideos = $conn->prepare("DELETE FROM videos WHERE movieId = ?");
    $deletePhotos = $conn->prepare("DELETE FROM photos WHERE movieId = ?");
    $deleteCast = $conn->prepare("DELETE FROM Cast WHERE movieId = ?");
    $deleteMovies = $conn->prepare("DELETE FROM Movies WHERE movieId = ?");

    $deleteVideos->bind_param("i", $movieId);
    $deletePhotos->bind_param("i", $movieId);
    $deleteCast->bind_param("i", $movieId);
    $deleteMovies->bind_param("i", $movieId);

    // Execute each statement
    $success = true;
    $success &= $deleteVideos->execute();
    $success &= $deletePhotos->execute();
    $success &= $deleteCast->execute();
    $success &= $deleteMovies->execute();

    // Check if all deletions were successful
    if ($success) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => "Error deleting records."]);
    }

    // Close statements and connection
    $deleteVideos->close();
    $deletePhotos->close();
    $deleteCast->close();
    $deleteMovies->close();
    $conn->close();
}
?>