<?php

/**
 * 
 * JSON Web Token is a proposed Internet standard for creating data with 
 * optional signature and/or optional encryption whose payload holds JSON 
 * that asserts some number of claims. 
 * 
 * The tokens are signed either using a private secret or a public/private key.
 * 
 * More information about JSON Web Tokens
 * https://auth0.com/docs/secure/tokens/json-web-tokens
 * 
 * 1. Generate Token which is the unique identifier for API calls
 * base64url_encode - Encodes the given string with base64.
 * Reference: https://www.php.net/manual/en/function.base64-encode.php
 * 
 * base64_decode — Decodes data encoded with MIME base64
 * Reference: https://www.php.net/manual/en/function.base64-decode.php
 * 
 * hash_hmac — Generate a keyed hash value using the HMAC method
 *    algo - Name of selected hashing algorithm (i.e. "md5", "sha256", "haval160,4", etc..)
 *    data - Message to be hashed.
 *    key - Shared secret key used for generating the HMAC variant of the message digest.
 *    binary - When set to true, outputs raw binary data. false outputs lowercase hexits.
 * Reference: https://www.php.net/manual/en/function.hash-hmac.php
 * 
 * Code inspired from: https://github.com/hbahonar/hs-login-system
 * 
 */

function generate_jwt_token($headers, $payload, $secret = 'secret')
{
    $headers_encoded = base64url_encode(json_encode($headers));
    $payload_encoded = base64url_encode(json_encode($payload));
    $signature = hash_hmac(
        'SHA256',
        "$headers_encoded.$payload_encoded",
        $secret,
        true
    );
    $signature_encoded = base64url_encode($signature);
    $jwt = "$headers_encoded.$payload_encoded.$signature_encoded";
    return $jwt;
}

function getSignature($token){
    $_token=explode(".",$token);
    return $_token[2];
}

/**
 * 
 * Extract user ID from Payload
 *
 **/
function getPayload($token)
{
    $_token=explode(".",$token);
    $payload=json_decode(base64UrlDecode($_token[1]));
    return $payload;
}

function base64UrlDecode(string $base64Url): string
{
    return base64_decode(strtr($base64Url, '-_', '+/'));
}

/**
 * Validates the token
 *
 * fetch("http://localhost/capstone_vet_clinic/api.php/login", {
 *              method: 'POST',
 *              body: JSON.stringify({
 *                  username: this.state.username,
 *                  password: this.state.password
 *              })
 *          })
 *              .then(res => res.json())
 *              .then((data) => {
 *                  if (data.status) {
 *                      sessionStorage.setItem('token', data.status);
 *                      sessionStorage.setItem('authenticated', true);
 *                      this.setState({to_home :true});
 *                  } ...snipped...
 * 
 * === Fetch URL endpoint /login triggers generation of token and is sent back to client to be set as the token
 * 
 * fetch("http://localhost/capstone_vet_clinic/api.php/user", {
 *      headers: {
 *          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
 *      },
 *      })
 * 
 * === Fetch URL endpoint /user will send the token whenever it communicates with API, 
 * === valid_jwt_token validates the first one sent to the token sent along with every API request
 * 
 */
function valid_jwt_token($jwt, $secret = 'secret')
{
    // split the jwt
    $tokenParts = explode('.', $jwt);
    $header = base64_decode($tokenParts[0]);
    $payload = base64_decode($tokenParts[1]);
    $signature_provided = getSignature($jwt);

    // check the expiration time - note this will cause an error if there is no 'exp' claim in the jwt
    // $expiration = json_decode($payload)->exp;
    // $is_token_expired = $expiration - time() < 0;

    // build a signature based on the header and payload using the secret
    $base64_url_header = base64url_encode($header);
    $base64_url_payload = base64url_encode($payload);
    $signature = hash_hmac(
        'SHA256',
        $base64_url_header . '.' . $base64_url_payload,
        $secret,
        true
    );
    $base64_url_signature = base64url_encode($signature);

    // verify it matches the signature provided in the jwt
    $is_signature_valid = $base64_url_signature === $signature_provided;

    if (/*$is_token_expired || */!$is_signature_valid) {
        return false;
    } else {
        return true;
    }
}

function base64url_encode($data)
{
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function get_authorization_header()
{
    $headers = null;

    if (isset($_SERVER['Authorization'])) {
        $headers = trim($_SERVER['Authorization']);
    } elseif (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $headers = trim($_SERVER['HTTP_AUTHORIZATION']);
    } elseif (function_exists('apache_request_headers')) {
        $requestHeaders = apache_request_headers();
        $requestHeaders = array_combine(
            array_map('ucwords', array_keys($requestHeaders)),
            array_values($requestHeaders)
        );
        if (isset($requestHeaders['Authorization'])) {
            $headers = trim($requestHeaders['Authorization']);
        }
    }
    return $headers;
}

/**
 * 
 * Bearer token is retrieved from headers for future API requests
 * 
 * fetch("http://localhost/capstone_vet_clinic/api.php/user", {
 *      headers: {
 *          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
 *      },
 *      })
 * 
 * 
 */

function get_bearer_token()
{
    $headers = get_authorization_header();
    if (!empty($headers)) {
        if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
            return $matches[1];
        }
    }
    return null;
}