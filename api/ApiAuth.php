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
    
    switch ($action) {
        case 'login':
            @testEmptyIsset($json->email, 'email');
            @testEmptyIsset($json->password, 'password');
            $api->obj->result = $db->login($json->email, $json->password);
            break;
		case 'reg':
            @testEmptyIsset($json->email, 'email');
            @testEmptyIsset($json->password, 'password');
            $api->obj->result = $db->reg($json->email, $json->password);
            break;
		case 'activation':
            @testEmptyIsset($json->email, 'email');
            $api->obj->result = $db->activation($json->email);
            break;	
        case 'logout':
            $api->obj->result = $db->logout();
            break;
		case 'access':
            $api->obj->result = $db->access();
            break;
        default: 
            $api->add_error(ApiBase::ERROR_NO_ACTION);
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