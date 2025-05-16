<?php

header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Vary: Origin');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}
class Trans {
  // Properties
  public $name;
  
  function get_trans_id($staff_id,$event_name) {
	  echo $staff_id;
	  echo $event_name;
    return "Test123";
  }

}


?>