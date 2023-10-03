<?php
require 'app/Connection.php';
require 'database/Table1.php';

$OBJ = new Connection();

$connection = $OBJ->Connect();

// creation automatique du table
Table1::createUser($connection);

// action de notre backend

/**
 * function miteste ra en ajax ilay requete
 *
 * @return boolean
 */
function isAjax (){
    return  !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}


if (isAjax()) {
    $methode = $_SERVER['REQUEST_METHOD'];
    switch ($methode) {
        case 'GET':
            // get page
            $user_par_page = 3;
            $user_total_req = $connection->query('SELECT id FROM users');
            $user_total = $user_total_req->rowCount();
            $nombre_de_page = ceil($user_total / $user_par_page);//ceil permet d'arondir une nombre avec virgule

            // voir si la variable de page exist
            if (isset($_GET['page']) AND !empty($_GET['page']) AND $_GET['page'] > 0) {
                $_GET['page'] = intval($_GET['page']); //intval() pour empecher l'utilisateur d'entrer une lettre
                $page_courrant = $_GET['page'];
            } else{
                $page_courrant = 1;
            }
            // get nombre de depart de la page
            $depart = ($page_courrant - 1) * $user_par_page;

            // get user from database
            $query = 'SELECT * FROM users LIMIT '.$depart.','.$user_par_page;
            $statement = $connection->prepare($query);
            $statement->execute();

            // mretourne associative array ilay fetch_assoc
            $users = $statement->fetchAll(PDO::FETCH_ASSOC);

            // teste si la table users est vide ou pas
            if ($statement->rowCount() > 0) {
                // ra tsy vide
                echo json_encode(['data' => $users, 'page' => $nombre_de_page]);
            } else {
                // ra vide
                echo json_encode(['message' =>"Pas ds'utilisateur, veillez ajouter"]);
            }
            
            break;
        case 'POST':
            // post user into database
            $query = 'INSERT INTO users (nom, email, password, images) VALUES (?, ?, ?, ?)';
            $statement = $connection->prepare($query);

            if ($statement->execute(array($_POST['nom'], $_POST['email'], $_POST['password'], $_POST['images']))) {
                $response = ['status' => 1, 'message' => 'Insert user successfuly'];
            } else {
                $response = ['status' => 0, 'message' => 'eror'];
            }
            echo json_encode($response);
            break;
        default:
            # code...
            break;
    }
}