<?php
function testEmptyIsset ($val, $valStr) 
{	
    if (!isset($val)) {
        throw new e_validate_exception("$valStr is not set");
    }   
    if (empty($val)) {
        throw new e_validate_exception("$valStr is empty");
    }
}