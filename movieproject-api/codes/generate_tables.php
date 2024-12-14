<?php

$host = "localhost";
$username = "root";
$password = "";
$dbname = "movieprojectdb";

// Connect to MySQL
$conn = new mysqli($host, $username, $password);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create the database if it doesn't exist
$sql_create_db = "CREATE DATABASE IF NOT EXISTS $dbname";
if ($conn->query($sql_create_db) === FALSE) {
    die("Error creating database: " . $conn->error);
}

// Select the database
if (!$conn->select_db($dbname)) {
    die("Error selecting database: " . $conn->error);
}

// Define the table creation queries
$table_queries = [
    "CREATE TABLE IF NOT EXISTS Users (
        userId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        role ENUM('Admin', 'User') NOT NULL
    )",
    
    "CREATE TABLE IF NOT EXISTS Movies (
        movieId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        tmdbId INT,
        title VARCHAR(255) NOT NULL,
        overview TEXT NOT NULL,
        popularity FLOAT,
        releaseDate DATE,
        voteAverage FLOAT,
        backdropPath VARCHAR(255),
        posterPath VARCHAR(255),
        dateCreated DATE NOT NULL DEFAULT CURRENT_DATE,
        dateUpdated DATE DEFAULT NULL,
        isFeatured BOOLEAN DEFAULT FALSE,
        FOREIGN KEY (userId) REFERENCES Users(userId)
    )",
    
    "CREATE TABLE IF NOT EXISTS Cast (
        castId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        movieId INT NOT NULL,
        userId INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        url VARCHAR(255),
        characterName VARCHAR(255),
        FOREIGN KEY (movieId) REFERENCES Movies(movieId),
        FOREIGN KEY (userId) REFERENCES Users(userId)
    )",
    
    "CREATE TABLE IF NOT EXISTS photos (
        photoId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        movieId INT NOT NULL,
        userId INT NOT NULL,
        url VARCHAR(255) NOT NULL,
        description TEXT,
        FOREIGN KEY (movieId) REFERENCES Movies(movieId),
        FOREIGN KEY (userId) REFERENCES Users(userId)
    )",
    
    "CREATE TABLE IF NOT EXISTS videos (
        videoId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        movieId INT NOT NULL,
        userId INT NOT NULL,
        url VARCHAR(255),
        name TEXT,
        site VARCHAR(255),
        videoKey VARCHAR(255),
        videoType VARCHAR(50),
        official BOOLEAN DEFAULT FALSE,
        FOREIGN KEY (movieId) REFERENCES Movies(movieId),
        FOREIGN KEY (userId) REFERENCES Users(userId)
    )"
];

// Execute each table creation query
foreach ($table_queries as $query) {
    if ($conn->query($query) === FALSE) {
        echo "Error creating table: " . $conn->error . "<br>";
    }
}

// Close the connection
$conn->close();

?>
