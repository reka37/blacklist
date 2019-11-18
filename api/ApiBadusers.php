<?php
require_once('dbSettings.php');
require_once('Db.php');
require_once('ApiBase.php');
require_once('HelpFunction.php');
try {
    $api = new ApiBase();
    $db = new DbBase(DB_NAME, DB_USERNAME, DB_PASSWORD);
    $jsonRaw = file_get_contents('php://input');
    $json = json_decode($jsonRaw);
    $action = filter_input(INPUT_GET, 'action');
	
    if ($db->access()) {
		switch ($action) {                
				case 'getBadusers':
					$api->obj->results = $db->getBadusers();
					break;  
				case 'getBadusersSearch':
				/*
					testEmptyIsset($json->name, 'name');
					testEmptyIsset($json->surname, 'surname');
					testEmptyIsset($json->patronymic, 'patronymic');
					testEmptyIsset($json->city, 'city');
					testEmptyIsset($json->phone, 'phone');*/
					$api->obj->results = $db->getBadusersSearch($json->name, $json->surname, $json->patronymic, $json->city, $json->phone);
					break;	
				case 'addBadUser':
						/*		
					testEmptyIsset($json->name, 'name');
					testEmptyIsset($json->surname, 'surname');
					testEmptyIsset($json->patronymic, 'patronymic');
					testEmptyIsset($json->city, 'city');
					testEmptyIsset($json->phone, 'phone');
					testEmptyIsset($json->comment, 'comment');
					*/
					$api->obj->result = $db->addBadUser($json->name, $json->surname, $json->patronymic, $json->city, $json->phone, $json->comment);
					break; 
				case 'detail':		
					testEmptyIsset($json->phone, 'phone');     
					$api->obj->results = $db->detail($json->phone);
					break; 	
				default:
					$api->add_error(ApiBase::ERROR_NO_ACTION);	
		}
    } elseif (!$db->access()) {
		switch ($action) { 
			case 'detail':		
				testEmptyIsset($json->phone, 'phone');     
				$api->obj->results = $db->detail($json->phone);
				break; 
		}
	} else {
        $api->addError(ApiBase::ERROR_ACCESS_DENIDED, 'Ошибка доступа');
    }
} catch (e_validate_exception $e) {
    $api->obj->result = false;
    $api->addError(ApiBase::ERROR_VALIDATION, $e->getMessage());
} catch (e_db_exception $e) {
    $api->obj->result = false;
    $api->addError(ApiBase::ERROR_DB, $e->getMessage());
} catch (e_rights_exception $e) {
    $api->obj->result = false;
    $api->addError(ApiBase::ERROR_ACCESS_DENIDED, $e->getMessage());
} catch (Exception $e) {
    $api->obj->result = false;
    $api->addError(ApiBase::ERROR_UNKNOWN, $e->getMessage());
} finally {
    $api->out();
}