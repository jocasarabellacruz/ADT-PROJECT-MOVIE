<?php
session_start();

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, Cookie");
header("Access-Control-Allow-Credentials: true");
require("codes/connection.php");
require 'utils/JWTCodec.php'; // Include the JWTCodec class

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    if (isset($data->email) && isset($data->password)) {
        $email = $data->email;
        $password = $data->password;

        $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            
            if (password_verify($password, $user["password"])) {
                $uid = $user["userId"];
                $_SESSION["USER_ID"] = $uid;

                // Create JWT token using JWTCodec
                $jwtCodec = new JWTCodec();
                $payload = [
                    'iss' => 'http://localhost',
                    'aud' => 'http://localhost',
                    'iat' => time(),
                    'exp' => time() + (60 * 60),
                    'userId' => $uid
                ];

                $jwt = $jwtCodec->encode($payload);

                echo json_encode([
                    "status" => "success",
                    "message" => "Login successful",
                    "email" => $email,
                    "user_id" => $uid,
                    "token" => $jwt
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
