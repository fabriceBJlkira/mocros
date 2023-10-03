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
            // get user into database
            $query = 'SELECT * FROM users WHERE id = ? LIMIT 1';
            $statement = $connection->prepare($query);
            $statement->execute(array($_GET['id']));

            $users = $statement->fetchAll(PDO::FETCH_ASSOC);

            if (!empty($users)) {
                $response = ['status' => 1, 'data' => $users];
            } else {
                $response = ['status' => 0, 'message' => 'eror, user not found'];
            }
            echo json_encode($response);
            break;
        case 'POST':
            //  modification d'utilisateur
            
            $query = 'UPDATE users SET nom = ?, email = ?, password = ?, images = ? WHERE id = ?';
            $statement = $connection->prepare($query);

            if ($statement->execute(array($_POST['nom'], $_POST['email'], $_POST['password'], $_POST['images'], $_POST['id']))) {
                $response = ['status' => 1, 'message' => 'Insert user successfuly'];
            } else {
                $response = ['status' => 0, 'message' => 'eror'];
            }
            echo json_encode($response);
            break;
    }
}