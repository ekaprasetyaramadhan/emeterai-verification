<?php
session_start();
date_default_timezone_set('Asia/Jakarta');

const BASE_URL      = "https://verification.e-meterai.live/";
// const BASE_URL      = "http://localhost/emeterai-verification/";


function curl_post_blob($url, $params, $filesize)
{
    $curl        = curl_init($url);

    $header = array();
    $header[] = 'Content-type: multipart/form-data';

    curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_INFILESIZE, $filesize);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $params);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($curl, CURLOPT_TIMEOUT, 3600);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);

    $resp        = curl_exec($curl);

    if ($resp === false) {
        $error        = '{"resultCode": "-1", "resultDesc": "' . curl_error($curl) . '"}';
        curl_close($curl);
        $response    = json_decode($error);
        return $response;
    } else {
        curl_close($curl);
        $response    = json_decode($resp);
        return $response;
    }
}

function formatBytes($bytes, $precision = 2)
{
    $units = array('Bytes', 'KB', 'MB', 'GB', 'TB');

    $bytes = intval($bytes);
    $bytes = max($bytes, 0);
    $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
    $pow = min($pow, count($units) - 1);
    $bytes /= pow(1024, $pow);

    return round($bytes, $precision) . ' ' . $units[$pow];
}
