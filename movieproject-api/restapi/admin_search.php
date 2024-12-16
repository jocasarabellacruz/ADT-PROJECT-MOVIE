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

function searchMovies($query) {
    $apiKey = $_ENV['TMDB_API_KEY']; 
    $client = new Client();
    
    // Construct the search URL
    $url = "https://api.themoviedb.org/3/search/movie?api_key={$apiKey}&query=" . urlencode($query);
    
    // Make the request
    $response = $client->request('GET', $url, [
        'headers' => [
            'accept' => 'application/json',
        ],
    ]);

    return json_decode($response->getBody(), true);
}

// Check if a search query is provided
if (isset($_GET['query'])) {
    $query = $_GET['query'];
    $result = searchMovies($query);
    echo json_encode($result);
} else {
    echo json_encode(['error' => 'No search query provided']);
}
?>