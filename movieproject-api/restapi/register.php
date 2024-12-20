<?php
session_start();

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, Cookie");
header("Access-Control-Allow-Credentials: true");
require("codes/connection.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the JSON data from the request body
    $data = json_decode(file_get_contents("php://input"));

    // Validate required fields
    if (isset($data->name, $data->email, $data->password, $data->conf_pass)) {
        // Base variables
        $name = $data->name;
        $email = $data->email;
        $password = $data->password;
        $conf_pass = $data->conf_pass;

        // Check if passwords match
        if ($password !== $conf_pass) {
            echo json_encode([
                "status" => "error",
                "message" => "Passwords do not match!"
            ]);
            exit;
        }

        // Check if the email already exists
        $e_stmt = $conn->prepare("SELECT * FROM users WHERE Email = ?");
        $e_stmt->bind_param("s", $email);
        $e_stmt->execute();
        $e_result = $e_stmt->get_result();

        if ($e_result->num_rows > 0) {
            echo json_encode([
                "status" => "error",
                "message" => "Email already registered!",
                "email" => $email
            ]);
            exit;
        }

        $role = "User";

        // Hash the password
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Insert new user into the database
        $insert_stmt = $conn->prepare("INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)");
        $insert_stmt->bind_param("ssss", $email, $hashed_password, $name, $role);

        if ($insert_stmt->execute()) {
            echo json_encode([
                "status" => "success",
                "message" => "Account created successfully!",
                "name" => $name,
                "email" => $email
            ]);
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "Failed to create account: " . $conn->error
            ]);
        }

        // Close statements
        $insert_stmt->close();
        $e_stmt->close();
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Required fields are missing!"
        ]);
    }
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid request method!"
    ]);
}
?>
