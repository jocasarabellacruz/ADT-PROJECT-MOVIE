<?php

$user_link = parse_url($_SERVER['REQUEST_URI'])["path"];

switch($user_link){

    case "/":
        // require("API/home.php");
        break;
    case "/login":
        require("restapi/login.php");
        break;
    case "/register":
        require("restapi/register.php");
        break;
    case "/admin_search":
        require("restapi/admin_search.php");
        break;
    default:
        http_response_code(404);
        break;
}
?>