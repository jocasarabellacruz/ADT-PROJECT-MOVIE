<?php 

    function checkAuth($user){
        if($user !== 'admin'){
            echo "go away!";
        } else {
            echo "welcome!";
        }
    }

    checkAuth('admin');

    $cars = array("bmw", "volvo", "toyota");

    echo ("<br> $cars[0]");
    echo ("<br> $cars[2]");

    $customCars =[
        "ford" => "mustang",
        "toyota" => "vios",
        "ferrari" => "unknown"
    ];

    echo ("<br> $customCars[ford]");

    $info = [
        "user" => [
            "firstname" => "Jocas",
            "middlename" => "Arabella",
            "lastname" => "Cruz"
        ],

        "address" => [
            "province" => "Bulacan",
            "municipality" => "Bocaue",
            "baranggay" => "Taal"
        ]
        ];

        echo $info["address"]["province"];

        $info["user"]["age"] = 21;

        
    ?>