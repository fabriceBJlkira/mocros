<?php

// eto no ilaina ny headers mampitohy anazy am frontend ngamba
// ataoko angamba satry tsy aiko, ary tsy mandeha le ajax ra tsy misy an headers anakiroa ito

header('Access-Control-Allow-Origin: *'); // nom de domaine, fa comme on utilise html brut de atao etoile
header('Access-Control-Allow-Headers: *'); // tsy aiko, mety le hoe content-type : application/json reny angamba
header('Access-Control-Allow-Methods: *'); // methode ampiasaina am ilay projet dia retraretra