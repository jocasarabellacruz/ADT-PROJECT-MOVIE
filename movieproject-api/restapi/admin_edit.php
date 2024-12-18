<?php
session_start();

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, Cookie");
header("Access-Control-Allow-Credentials: true");
require("codes/connection.php");
require 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

use GuzzleHttp\Client;

function getMovieDetails($tmbd_id) {
    $apiKey = $_ENV['TMDB_API_KEY']; 
    $client = new Client();

    $movie_url = "https://api.themoviedb.org/3/movie/{$tmbd_id}?api_key={$apiKey}";
    $photos_url = "https://api.themoviedb.org/3/movie/{$tmbd_id}/images?api_key={$apiKey}";
    $videos_url = "https://api.themoviedb.org/3/movie/{$tmbd_id}/videos?api_key={$apiKey}";
    $cast_url = "https://api.themoviedb.org/3/movie/{$tmbd_id}/credits?api_key={$apiKey}";

    $movie_response = $client->request('GET', $movie_url, [
        'headers' => [
            'accept' => 'application/json',
        ],
    ]);

    $photos_response = $client->request('GET', $photos_url, [
        'headers' => [
            'accept' => 'application/json',
        ],
    ]);

    $videos_response = $client->request('GET', $videos_url, [
        'headers' => [
            'accept' => 'application/json',
        ],
    ]);

    $cast_response = $client->request('GET', $cast_url, [
        'headers' => [
          'accept' => 'application/json',
        ],
    ]);

   
    $movie_details = json_decode($movie_response->getBody(), true);
    $photos_details = json_decode($photos_response->getBody(), true);
    $videos_details = json_decode($videos_response->getBody(), true);
    $cast_details = json_decode($cast_response->getBody(), true);

    return array_merge($movie_details, $photos_details, $videos_details, $cast_details);
}

if (isset($_GET['tmbd_id'])) {
    $tmbd_id = $_GET['tmbd_id'];
    $result = getMovieDetails($tmbd_id);
    echo json_encode($result);
} else {
    echo json_encode(['error' => 'No tmbd_id provided']);
}
?>