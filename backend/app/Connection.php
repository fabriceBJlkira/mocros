<?php

require 'Cors.php';

/**
 * Ito class mampanao connection amm base de donner
 */
class Connection
{
    private $server = '127.0.0.1';
    private $user = 'root';
    private $db_name = 'micros';
    private $password = '';

    /**
     * Fonction akana an ilay connection,
     * refa mila connection de ito fona no alaina
     *
     */
    public function Connect()
    {
        try {
            $conect = new PDO('mysql:host='.$this->server.';dbname='.$this->db_name, $this->user, $this->password);
            $conect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            return $conect;

        } catch (\Throwable $th) {
            die($th->getMessage());
        }
    }
}
