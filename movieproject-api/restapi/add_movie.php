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

    if(isset($data->id)) {
        $userId = $_SESSION["USER_ID"];
        $tmbdId = $data->id;
        $title = $data->title;
        $overview = $data->overview;
        $popularity = $data->popularity;
        $releaseDate = $data->releaseDate;
        $voteAverage = $data->voteAverage;
        $backdropPath = "https://image.tmdb.org/t/p/original" . $data->backdropPath;
        $posterPath = "https://image.tmdb.org/t/p/original" . $data->posterPath;

        $stmt = $conn->prepare("INSERT INTO movies (userId, tmdbId, title, overview, popularity, releaseDate, voteAverage, backdropPath, posterPath) VALUES (?, ?, ?, ?, ?, ? ,? ,? ,?)");
        $stmt->bind_param("iissdsdss", $userId, $tmbdId, $title, $overview, $popularity, $releaseDate, $voteAverage, $backdropPath, $posterPath);
        $stmt->execute();

        echo json_encode(['status' => 'success', 'message' => 'Movie Added Successfully!', 'tmbdId' => $tmbdId]);

        $stmt = $conn->prepare("Select movieId from movies where tmdbId = ?");
        $stmt->bind_param("i", $tmbdId);
        $stmt->execute();
        $result = $stmt->get_result(); // Get the result of the query

        $movieId = '';

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $movieId = $row['movieId'];
        }

        if(isset($data->cast)) {
            //$casts = json_decode($data->cast, True);
            $casts = $data->cast;
            foreach ($casts as $cast) {

                $name = $cast->name;
                $character = $cast->character;
                $url = $cast->profile_path;

                $stmt = $conn->prepare("INSERT INTO cast (movieId, userId, name, url, characterName) VALUES (?, ?, ?, ?, ?)");
                $stmt->bind_param("iisss", $movieId, $userId, $name, $url, $character);
                $stmt->execute();
            }
        }
    }




} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid Method.']);
}
?>