<?php
session_start();

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization, Cookie");
header("Access-Control-Allow-Credentials: true");
require("codes/connection.php");

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    $movieId = isset($_GET['movieId']) ? $_GET['movieId'] : null;

    if (!$movieId) {
        echo json_encode(['error' => 'Movie ID is required']);
        exit;
    }

    try {
        $conn->begin_transaction();

        // Update main movie details
        $movieQuery = "UPDATE Movies SET 
            userId = ?,
            title = ?,
            overview = ?,
            popularity = ?,
            releaseDate = ?,
            voteAverage = ?,
            backdropPath = ?,
            posterPath = ?,
            dateUpdated = ?,
            isFeatured = ?
            WHERE movieId = ?";
            
        $stmt = $conn->prepare($movieQuery);
        $currentDate = date('Y-m-d H:i:s');
        
        $stmt->bind_param("issdsssssis", 
            $data['userId'],
            $data['title'],
            $data['overview'],
            $data['popularity'],
            $data['releaseDate'],
            $data['voteAverage'],
            $data['backdropPath'],
            $data['posterPath'],
            $currentDate,
            $data['isFeatured'],
            $movieId
        );
        $stmt->execute();

        // Update cast
        $deleteCastQuery = "DELETE FROM Cast WHERE movieId = ?";
        $stmt = $conn->prepare($deleteCastQuery);
        $stmt->bind_param("i", $movieId);
        $stmt->execute();

        if (!empty($data['cast'])) {
            $insertCastQuery = "INSERT INTO Cast (movieId, userId, name, characterName, url) VALUES (?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($insertCastQuery);
            foreach ($data['cast'] as $castMember) {
                $stmt->bind_param("iisss", 
                    $movieId,
                    $data['userId'],
                    $castMember['name'],
                    $castMember['characterName'],
                    $castMember['url']
                );
                $stmt->execute();
            }
        }

        // Update photos
        $deletePhotosQuery = "DELETE FROM photos WHERE movieId = ?";
        $stmt = $conn->prepare($deletePhotosQuery);
        $stmt->bind_param("i", $movieId);
        $stmt->execute();

        if (!empty($data['posters'])) {
            $insertPhotoQuery = "INSERT INTO photos (movieId, userId, url, description) VALUES (?, ?, ?, ?)";
            $stmt = $conn->prepare($insertPhotoQuery);
            foreach ($data['posters'] as $poster) {
                $stmt->bind_param("iiss", 
                    $movieId,
                    $data['userId'],
                    $poster['url'],
                    $poster['description']
                );
                $stmt->execute();
            }
        }

        // Update videos
        $deleteVideosQuery = "DELETE FROM videos WHERE movieId = ?";
        $stmt = $conn->prepare($deleteVideosQuery);
        $stmt->bind_param("i", $movieId);
        $stmt->execute();

        if (!empty($data['videos'])) {
            $insertVideoQuery = "INSERT INTO videos (movieId, userId, url, name, site, videoKey, videoType, official) 
                               VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($insertVideoQuery);
            foreach ($data['videos'] as $video) {
                $stmt->bind_param("iissssss", 
                    $movieId,
                    $data['userId'],
                    $video['url'],
                    $video['name'],
                    $video['site'],
                    $video['videoKey'],
                    $video['videoType'],
                    $video['official']
                );
                $stmt->execute();
            }
        }

        $conn->commit();
        echo json_encode(['success' => true, 'message' => 'Movie updated successfully']);

    } catch (Exception $e) {
        $conn->rollback();
        echo json_encode([
            'error' => 'Database error: ' . $e->getMessage()
        ]);
    }

    $conn->close();
}
?> 