
    <?php

    $table = [
        "header" =>[
            "Student ID",
            "Lastname",
            "Middlename",
            "Firstname",
            "Course",
            "Section"
        ],

        "body" => array(
            [
                "lastname" => "Lastname", //1
                "middlename" => "Middlename",
                "firstname" => "Firstname",
                "course" => "BSCS",
                "section" => "3A"
            ],
            [
                "lastname" => "Lastname", //1
                "middlename" => "Middlename",
                "firstname" => "Firstname",
                "course" => "BSCS",
                "section" => "3A"
            ],
            [
                "lastname" => "Lastname", //1
                "middlename" => "Middlename",
                "firstname" => "Firstname",
                "course" => "BSCS",
                "section" => "3A"
            ],
            [
                "lastname" => "Lastname", //1
                "middlename" => "Middlename",
                "firstname" => "Firstname",
                "course" => "BSCS",
                "section" => "3A"
            ],
            [
                "lastname" => "Lastname", //1
                "middlename" => "Middlename",
                "firstname" => "Firstname",
                "course" => "BSCS",
                "section" => "3A"
            ],
            [
                "lastname" => "Lastname", //1
                "middlename" => "Middlename",
                "firstname" => "Firstname",
                "course" => "BSCS",
                "section" => "3A"
            ],
            [
                "lastname" => "Lastname", //1
                "middlename" => "Middlename",
                "firstname" => "Firstname",
                "course" => "BSCS",
                "section" => "3A"
            ],
            [
                "lastname" => "Lastname", //1
                "middlename" => "Middlename",
                "firstname" => "Firstname",
                "course" => "BSCS",
                "section" => "3A"
            ],
            [
                "lastname" => "Lastname", //1
                "middlename" => "Middlename",
                "firstname" => "Firstname",
                "course" => "BSCS",
                "section" => "3A"
            ],
            [
                "lastname" => "Lastname", //1
                "middlename" => "Middlename",
                "firstname" => "Firstname",
                "course" => "BSCS",
                "section" => "3A"
            ],
            [
                "lastname" => "Lastname", //1
                "middlename" => "Middlename",
                "firstname" => "Firstname",
                "course" => "BSCS",
                "section" => "3A"
            ],
            ),
    ];


?>


<!DOCTYPE html>
<html>
    <style>
    table, tr, th, td {
    border:1px solid black;
    }
    </style>
    <body>
        <h1> Hands-on Activity </h1>

        <table>
            <?php 
                echo "<tr>"; 
                    foreach ($table['header'] as $key) {
                            echo "<th>", $key, "</th>";
                        };
                echo "</tr>";

                
            ?>  
        </table>
    </body>