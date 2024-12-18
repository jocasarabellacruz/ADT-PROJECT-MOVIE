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
    case "/get_movies":
        require("restapi/get_movies.php");
        break;
    case "/get_featured":
        require("restapi/get_featured.php");
        break;
    case "/admin_edit":
        require("restapi/admin_edit.php");
        break;
    case "/get_user":
        require("restapi/get_user.php");
        break;
    case "/search_movie":
        require("restapi/search_movie.php");
        break;
    case "/add_movie":
        require("restapi/add_movie.php");
        break;
    case "/delete_movie":
        require("restapi/delete_movie.php");
        break;
    case "/get_movie":
        require("restapi/get_movie.php");
        break;
    case "/update_movie":
        require("restapi/update_movie.php");
        break;
    case "/add_favorite":
        require("restapi/add_favorite.php");
        break;
    case "/remove_favorite":
        require("restapi/remove_favorite.php");
        break;
    case "/get_favorite":
        require("restapi/get_favorite.php");
        break;
    default:
        http_response_code(404);
        break;
}
?>