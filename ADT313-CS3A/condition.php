<h1>Condition</h1>

<?php  
    $number = 16;
    if($number%2){
        echo "Odd";
    } else {
        echo "Even";
    }

    #(condition) ? true : false

    $authenticated = true;
    $checkAccess = ($authenticated) ? "access granted" : "access denied";

    echo $checkAccess;

    $color = "red";

    switch ($color) {
        case 'red':
            # code...
            break;

        case 'black':
            # code...
            break;

        case 'blue':
            # code...
            break;
        
        default:
            # code...
            break;
    }

    


?>