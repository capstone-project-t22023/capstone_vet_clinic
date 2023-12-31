<?php

function validateLength($input, $length){
    $test=strlen($input);
    if($test <= $length){
        return true;
    } else {
        return false;
    }
}

function validateNumeric($input){
    if(preg_match('/^[0-9]+$/', $input)){
        return true;
    } else {
        return false;
    }
}

function validateDecimal($input){
    if(preg_match('/^[0-9]+(\.[0-9]{1,2})?$/', $input)){
        return true;
    } else {
        return false;
    }
}

function validateAlpha($input){
    if(preg_match('/^[A-Za-z- ]+$/', $input)){
        return true;
    } else {
        return false;
    }
}

function validateAlphaNumeric($input){
    if(preg_match('/^[A-Za-z0-9 ]+$/', $input)){
        return true;
    } else {
        return false;
    }
}

function validateAddress($input){
    if(preg_match('/^[A-Za-z0-9-.,# ]+$/', $input)){
        return true;
    } else {
        return false;
    }
}

function validateDate($input){
    if($input){
        list($day, $month, $year) = explode('-', $input);
        if(checkdate($month, $day, $year)){
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
}

function validatePassword($input){
    if(preg_match('/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-#?!@$ %^&*_]).{8,20}$/', $input)){
        return true;
    } else {
        return false;
    }
}

function validateUsername($input){
    if(preg_match('/^[A-Za-z0-9_.]+$/', $input)){
        return true;
    } else {
        return false;
    }
}

function validateEmail($input){
    if(preg_match('/[a-z0-9._`{|}~-]+(?:\.[a-z0-9._`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/', $input)){
        return true;
    } else {
        return false;
    }
}


?>