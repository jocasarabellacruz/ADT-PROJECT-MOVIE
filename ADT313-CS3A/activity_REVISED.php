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

        "body" => [
            [
                "lastname" => "Lastname", //1
                "middlename" => "Middlename",
                "firstname" => "Firstname",
                "course" => "BSCS",
                "section" => "3A"
            ],
            [
                "lastname" => "Lastname", //2
                "middlename" => "Middlename",
                "firstname" => "Firstname",
                "course" => "BSCS",
                "section" => "3A"
            ],
            [
                "lastname" => "Lastname", //3
                "middlename" => "Middlename",
                "firstname" => "Firstname",
                "course" => "BSCS",
                "section" => "3A"
            ],
            [
                "lastname" => "Lastname", //4
                "middlename" => "Middlename",
                "firstname" => "Firstname",
                "course" => "BSCS",
                "section" => "3A"
            ],
            [
                "lastname" => "Lastname", //5
                "middlename" => "Middlename",
                "firstname" => "Firstname",
                "course" => "BSCS",
                "section" => "3A"
            ],
            [
                "lastname" => "Lastname", //6
                "middlename" => "Middlename",
                "firstname" => "Firstname",
                "course" => "BSCS",
                "section" => "3A"
            ],
            [
                "lastname" => "Lastname", //7
                "middlename" => "Middlename",
                "firstname" => "Firstname",
                "course" => "BSCS",
                "section" => "3A"
            ],
            [
                "lastname" => "Lastname", //8
                "middlename" => "Middlename",
                "firstname" => "Firstname",
                "course" => "BSCS",
                "section" => "3A"
            ],
            [
                "lastname" => "Lastname", //9
                "middlename" => "Middlename",
                "firstname" => "Firstname",
                "course" => "BSCS",
                "section" => "3A"
            ],
            [
                "lastname" => "Lastname", //10
                "middlename" => "Middlename",
                "firstname" => "Firstname",
                "course" => "BSCS",
                "section" => "3A"
            ],
            [
                "lastname" => "Lastname", //10
                "middlename" => "Middlename",
                "firstname" => "Firstname",
                "course" => "BSCS",
                "section" => "3A"
            ],
        ],
    ];

?>


<!DOCTYPE html>
<html>
    <style>
    table, tr, th {
    border:1px solid black;
    }
    </style>
    <body>
        <h1> Hands-on Activity </h1>

        <table>
            <?php 
                
                    for ($i=0; $i <= 5; $i++) { 
                        echo "<th>";
                        $newheaders = $table['header'][$i];
                        echo ($newheaders);
                        echo "</th>";
                    };

                    for ($i=0; $i <= 10; $i++) {
                        
                        $studentnum = rand(1000,9999);
                        echo "<tr>"; 
                        echo "<td> 2024", $studentnum, "</td>";
    
                            foreach ($table['body'][$i] as $key) {
                                echo "<td>";
                                    echo $key;
                                echo "</td>";
                            };
                            
                        echo "</tr>"; 
                        };
                
            ?>  
        </table>
    </body>