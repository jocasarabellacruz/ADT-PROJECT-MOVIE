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
    $movieId = isset($_GET['movieId']) ? $_GET['movieId'] : null;

    if (!$movieId) {
        echo json_encode(['error' => 'Movie ID is required']);
        exit;
    }

    try {
        // Get main movie details
        $movieQuery = "SELECT * FROM Movies WHERE movieId = ?";
        $stmt = $conn->prepare($movieQuery);
        $stmt->bind_param("i", $movieId);
        $stmt->execute();
        $movieResult = $stmt->get_result();
        $movie = $movieResult->fetch_assoc();

        if (!$movie) {
            echo json_encode(['error' => 'Movie not found']);
            exit;
        }

        // Get cast members
        $castQuery = "SELECT * FROM Cast WHERE movieId = ?";
        $stmt = $conn->prepare($castQuery);
        $stmt->bind_param("i", $movieId);
        $stmt->execute();
        $castResult = $stmt->get_result();
        $cast = [];
        while ($castMember = $castResult->fetch_assoc()) {
            $cast[] = [
                'name' => $castMember['name'],
                'characterName' => $castMember['characterName'],
                'url' => $castMember['url']
            ];
        }

        // Get photos/posters
        $photosQuery = "SELECT * FROM photos WHERE movieId = ?";
        $stmt = $conn->prepare($photosQuery);
        $stmt->bind_param("i", $movieId);
        $stmt->execute();
        $photosResult = $stmt->get_result();
        $posters = [];
        while ($photo = $photosResult->fetch_assoc()) {
            $posters[] = [
                'url' => $photo['url']
            ];
        }

        // Get videos
        $videosQuery = "SELECT * FROM videos WHERE movieId = ?";
        $stmt = $conn->prepare($videosQuery);
        $stmt->bind_param("i", $movieId);
        $stmt->execute();
        $videosResult = $stmt->get_result();
        $videos = [];
        while ($video = $videosResult->fetch_assoc()) {
            $videos[] = [
                'name' => $video['name'],
                'videoKey' => $video['videoKey'],
                'site' => $video['site'],
                'videoType' => $video['videoType'],
                'official' => $video['official'],
                'url' => $video['url']
            ];
        }

        // Combine all data
        $movieData = [
            'movieId' => $movie['movieId'],
            'title' => $movie['title'],
            'overview' => $movie['overview'],
            'popularity' => $movie['popularity'],
            'release_date' => $movie['releaseDate'],
            'vote_average' => $movie['voteAverage'],
            'backdrop_path' => $movie['backdropPath'],
            'poster_path' => $movie['posterPath'],
            'isFeatured' => $movie['isFeatured'],
            'cast' => $cast,
            'posters' => $posters,
            'videos' => $videos
        ];

        echo json_encode($movieData);

    } catch (Exception $e) {
        echo json_encode([
            'error' => 'Database error: ' . $e->getMessage()
        ]);
    }

    $conn->close();
}
?>