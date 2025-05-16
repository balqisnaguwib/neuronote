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



header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Vary: Origin');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once "db.php";
require_once "class/TTDetailsService.php";
require_once "class/TTDetailsData.php";
require_once "class/CustomerProfileService.php";

$tt = $_POST["_tt"];

#input:CTT number

#1.Calling ttdetailsRetrive service get CA siebel row id
#2.Check DB if exist, pull data from database sga_contact_prime hascontact=Y and pull data from sga_contact_data.response to ui
#3.else calling CustomerPRofile service using CA siebel row id
#4.If empty, update sga_contact_prime.hascontact = natcasesort
#5.Else insert into sga_contact_data
#6.show at UI

$novarow = new TTDetailsService();
$ctcObject = new TTDetailsData();
$contactlistObj = new CustomerProfileService();

$rowidres = $novarow->get_row_id($tt);
$isNotEmpty = (array) $rowidres;
//var_dump(empty($isNotEmpty));

if ($rowidres == "P10") {
	echo json_encode("Sila refer SAO untuk Contact");
}else{
	main_controller($rowidres,$isNotEmpty,$ctcObject,$contactlistObj,$tt);	
}


//functions

function main_controller($rowidres,$isNotEmpty,$ctcObject,$contactlistObj,$tt)
{
	include "db.php";
    if ($isNotEmpty) {
        $output = [];
        $dataresponse = "";
        $listcontacObj = "";
        $statement = $connection->prepare(
            "SELECT nova_row_id,hascontact FROM sga_contact_prime WHERE nova_row_id='" .
                $rowidres .
                "' LIMIT 1"
        );

        $statement->execute();
        $result = $statement->fetchAll();

        if (!empty($result)) {
            foreach ($result as $row) {
                $rowid = $row["nova_row_id"];
                $contactFlag = $row["hascontact"];

                if ($contactFlag == "Y") {
                    //echo "masok1" . $rowid;
                    $ctcObject = fetchContactData($rowid);
                    $dataresponse = $ctcObject;
                } else {
                    //callling customerprofilerteive

                    $listcontacObj = $contactlistObj->get_contact_list(
                        $rowidres
                    );
                    $responseINsertObj = insertDt($rowid, $listcontacObj);

                    if ($responseINsertObj == "true") {
                        $responseUpdate = updatePrime($rowid);
                        $ctcObject = fetchContactData($rowid);
                    } else {
                        $ctcObject =
                            "No Contact List. Please use contact in TMF";
                    }

                    $dataresponse = $ctcObject;
                }
            }

            echo json_encode($dataresponse);
        } else {
            $insertPrime = "INSERT INTO sga_contact_prime (ctt_number,nova_row_id,hascontact) VALUES ('{$tt}','{$rowidres}','N');";
            $connection->query($insertPrime);

            $listcontacObj = $contactlistObj->get_contact_list($rowidres);
            $responseINsertObj = insertDt($rowidres, $listcontacObj);
            if ($responseINsertObj == "true") {
                $responseUpdate = updatePrime($rowidres);
                $datadContactObj = fetchContactData($rowidres);
            } else {
                $ctcObject = "No Contact List. Please use contact in TMF";
            }
            echo json_encode($datadContactObj);
        }
    } else {
        echo "CTT not Found : TTDetailsRetrive empty";
        //return ui ctt not found
    }
}


function convert_object_to_array($data)
{
    if (is_object($data)) {
        $data = get_object_vars($data);
    }

    if (is_array($data)) {
        return array_map(__FUNCTION__, $data);
    } else {
        return $data;
    }
}

function fetchContactData($rowid)
{
    include "db.php";
    $dataObj = [];
    $outputObj = [];
    $statementData = $connection->prepare(
        "SELECT * FROM sga_contact_data WHERE nova_row_id='" . $rowid . "'"
    );
    $statementData->execute();
    $resultData = $statementData->fetchAll();
    foreach ($resultData as $rowdata) {
        $outputObj["id"] = $rowdata["id"];
        $outputObj["pc"] = $rowdata["primary_contact"];
        $outputObj["ds"] = $rowdata["designation"];
        $outputObj["cn"] = $rowdata["contact_name"];
        $outputObj["op"] = $rowdata["office_phone"];
        $outputObj["hp"] = $rowdata["home_phone"];
        $outputObj["mp"] = $rowdata["mobile_phone"];
        $dataObj[] = $outputObj;
    }

    return $dataObj;
}

function insertDt($rowid, $listcontacObj)
{
    include "db.php";
    $dataObj = [];
    foreach ($listcontacObj as $rowinsert) {
        $listcontacObj2 = $rowinsert;
        $emp = convert_object_to_array($listcontacObj2);
        foreach ($emp as $rowInit) {
            $nova_row_id = $rowid;
            $primary_contact = $rowInit["PrimaryContactIndicator"];
            $designation = $rowInit["Designation"];
            $contact_name = $rowInit["ContactName"];
            $office_phone = $rowInit["OfficePhone"];
            $home_phone = $rowInit["HomePhone"];
            $mobile_phone = $rowInit["MobilePhone"];
            $contact_id = $rowInit["ContactID"];

            if (empty($primary_contact)) {
                $primary_contact = "";
            }
            if (empty($contact_name)) {
                $contact_name = "";
            }
            if (empty($mobile_phone)) {
                $mobile_phone = "";
            }
            if (empty($contact_id)) {
                $contact_id = "";
            }
            if (empty($designation)) {
                $designation = "";
            }
            if (empty($office_phone)) {
                $office_phone = "";
            }
            if (empty($home_phone)) {
                $home_phone = "";
            }
            $insertData = "INSERT INTO sga_contact_data (nova_row_id,primary_contact,contact_id,designation,contact_name,office_phone,home_phone,mobile_phone) VALUES ('{$nova_row_id}','{$primary_contact}','{$contact_id}','{$designation}','{$contact_name}','{$office_phone}','{$home_phone}','{$mobile_phone}');";
            $connection->query($insertData);

            if ($insertData) {
                $dataObj = "true";
            } else {
                $dataObj = "false";
            }

            unset($nova_row_id);
            unset($primary_contact);
            unset($contact_id);
            unset($designation);
            unset($contact_name);
            unset($office_phone);
            unset($home_phone);
            unset($mobile_phone);
        }
    }

    return $dataObj;
}

function updatePrime($novarowid)
{
    include "db.php";
    $dataObj = [];
    $updatemain = "UPDATE sga_contact_prime SET hascontact='Y' where nova_row_id='{$novarowid}';";
    $connection->query($updatemain);

    if ($updatemain) {
        $dataObj = "true";
    } else {
        $dataObj = "false";
    }

    return $dataObj;
}

?>
