<?php
    function repondre($success,$message,$code=200){
        header('Content-Type:application/json');
        http_response_code($code);
        echo json_encode(["success" => $success,"message" => $message]);
        exit();
    }

?>