Anokafana terminal eo am le dosier backend de arahana ny etape :
    -startena ny serveur mysql

    -mamorona base de donner ze tinao

    -miditra am dossier app/Connection.php de arahana :
        *ra en local de avela am io 127.0.0.1 ilay variable server, sinon afaka solona nom de domaine afa
        *ilay variable user ra tsy root any am mysql de afaka ovana
        *ilay variable db_name soloana ilay anarana base de donner le noforoninao teo
        *ilay variable password afaka avela vide ra tsy misy, sinon afaka ovaina io

    -soranata eo am terminal : php -S 127.0.0.1:8000     //*(moin grand s io)

    -ny table miforona automatique fa efa misy query any manao anazy


Miditra am dosier frontend/public/index.html de alefa ilay index.html