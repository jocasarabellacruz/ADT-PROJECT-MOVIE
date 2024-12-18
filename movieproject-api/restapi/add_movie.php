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

        //DATAS

        $userId = $_SESSION["USER_ID"];
        $tmbdId = $data->id;
        $title = $data->title;
        $overview = $data->overview;
        $popularity = $data->popularity;
        $releaseDate = $data->releaseDate;
        $voteAverage = $data->voteAverage;
        $backdropPath = $data->backdropPath;
        $posterPath = $data->posterPath;
        $isFeatured = $data->isFeatured;

        //ADD MOVIES

        $stmt = $conn->prepare("INSERT INTO movies (userId, tmdbId, title, overview, popularity, releaseDate, voteAverage, backdropPath, posterPath, isFeatured) VALUES (?, ?, ?, ?, ?, ?, ? ,? ,? ,?)");
        $stmt->bind_param("iissdsdssi", $userId, $tmbdId, $title, $overview, $popularity, $releaseDate, $voteAverage, $backdropPath, $posterPath, $isFeatured);
        $stmt->execute();

        echo json_encode(['status' => 'success', 'message' => 'Movie Added Successfully!', 'tmbdId' => $tmbdId]);

        //FIND MOVIE ID

        $stmt = $conn->prepare("Select movieId from movies where tmdbId = ?");
        $stmt->bind_param("i", $tmbdId);
        $stmt->execute();
        $result = $stmt->get_result(); // Get the result of the query

        $movieId = '';

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $movieId = $row['movieId'];
        }

        //ADD CAST

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

        //ADD VIDEOS

        if(isset($data->videos)) {
            //$casts = json_decode($data->cast, True);
            $videos = $data->videos;
            foreach ($videos as $video) {

                $url = $video->key;
                $name = $video->name;
                $site = $video->site;
                $videoKey = $video->key;
                $videoType = $video->type;
                $official = $video->official;

                $stmt = $conn->prepare("INSERT INTO videos (movieId, userId, url, name, site, videoKey, videoType, official) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
                $stmt->bind_param("iisssssi", $movieId, $userId, $url, $name, $site, $videoKey, $videoType, $official);
                $stmt->execute();
            }
        }


        //ADD PHOTOS

        if(isset($data->photos)) {
            //$casts = json_decode($data->cast, True);
            $photos = $data->photos;
            foreach ($photos as $photo) {

                $url = $photo->file_path;
                $description = "photo";

                $stmt = $conn->prepare("INSERT INTO photos (movieId, userId, url, description) VALUES (?, ?, ?, ?)");
                $stmt->bind_param("iiss", $movieId, $userId, $url, $description);
                $stmt->execute();
            }
        }

    }

} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid Method.']);
}
?>