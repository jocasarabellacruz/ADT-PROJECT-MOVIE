<?php
session_start();

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, Cookie");
header("Access-Control-Allow-Credentials: true");
require("codes/others/connection.php");


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the JSON data from the request body
    $data = json_decode(file_get_contents("php://input"));

    // Validate required fields
    if (isset($data->username, $data->email, $data->password, $data->conf_pass)) {
        // Base variables
        $username = $data->username;
        $email = $data->email;
        $password = $data->password;
        $conf_pass = $data->conf_pass;

        #id generation

        $rand_id = random_int(10000000000, 99999999999);

        $r_stmt = $conn->prepare("SELECT * FROM users WHERE UserID = ?");
        $r_stmt->bind_param("i", $UserID);
        $r_stmt->execute();
        $r_result = $r_stmt->get_result();
        
        if ($r_result->num_rows > 0) {
            $rand_id = random_int(10000000000, 99999999999);
        }

        // Check if passwords match
        if ($password !== $conf_pass) {
            echo json_encode([
                "status" => "error",
                "message" => "Passwords do not match!"
            ]);
            exit;
        }

        // Check if the username already exists
        $u_stmt = $conn->prepare("SELECT * FROM users WHERE Username = ?");
        $u_stmt->bind_param("s", $username);
        $u_stmt->execute();
        $u_result = $u_stmt->get_result();

        if ($u_result->num_rows > 0) {
            echo json_encode([
                "status" => "error",
                "message" => "Username already exists!",
                "username" => $username
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

        // Insert new user into the database
        $insert_stmt = $conn->prepare("INSERT INTO users (Email, Username, Password, UserID) VALUES (?, ?, ?, ?)");
        $insert_stmt->bind_param("sssi", $email, $username, $password, $rand_id);

        if ($insert_stmt->execute()) {
            echo json_encode([
                "status" => "success",
                "message" => "Account created successfully!",
                "username" => $username,
                "email" => $email,
                "password" => $password // Include password in response if necessary
            ]);
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "Failed to create account: " . $conn->error
            ]);
        }

        // Close statements
        $insert_stmt->close();
        $u_stmt->close();
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
