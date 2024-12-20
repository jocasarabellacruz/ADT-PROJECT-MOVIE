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

    // Check if data is valid
    if (isset($data->email) && isset($data->password)) {
        $email = $data->email;
        $password = $data->password;

        $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result(); // Get the result of the query

        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            
            // Verify the password using password_verify()
            if (password_verify($password, $user["password"])) {
                $_SESSION["USER_ID"] = $user["userId"];
                $uid = $_SESSION["USER_ID"];
                echo json_encode([
                    "status" => "success",
                    "message" => "Login successful",
                    "email" => $email,
                    "user_id" => $uid
                ]);
            } else {
                echo json_encode([
                    "status" => "error",
                    "message" => "Username or password incorrect!"
                ]);
            }
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "Username or password incorrect!"
            ]);
        }

        // Close statement
        $stmt->close();
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Missing email or password"
        ]);
    }
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid request method"
    ]);
}
?>
