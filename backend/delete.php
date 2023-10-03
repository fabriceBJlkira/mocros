<?php
require 'app/Connection.php';
require 'database/Table1.php';

$OBJ = new Connection();

$connection = $OBJ->Connect();

/**
 * function miteste ra en ajax ilay requete
 *
 * @return boolean
 */
function isAjax (){
    return  !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

// var_dump($_POST);
// die(var_dump($_GET));

if (IsAjax()) {
    $methode = $_SERVER['REQUEST_METHOD'];
    switch ($methode) {
        case 'GET':
            //  modification d'utilisateur
            
            $query = 'DELETE FROM users WHERE id = ?';
            $statement = $connection->prepare($query);

            if ($statement->execute(array($_GET['id']))) {
                $response = ['status' => 1, 'message' => 'Insert user successfuly'];
            } else {
                $response = ['status' => 0, 'message' => 'eror'];
            }
            echo json_encode($response);
            break;
    }
}