<?php

class Table1
{
    /**
     * Fonction mamorona table users izay
     * ampiasaina mandritra ilay projet
     *
     * @param  $connection
     * @return void
     */
    public static function createUser($connection)
    {
        try {
            $query = 'CREATE TABLE IF NOT EXISTS users (
                id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                nom VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                images TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )';
            $statement = $connection->prepare($query);
            $statement->execute();
        } catch (\Throwable $th) {
            die($th->getMessage());
        }
    }
}
