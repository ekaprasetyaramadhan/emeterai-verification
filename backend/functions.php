<?php
session_start();
date_default_timezone_set('Asia/Jakarta');

const BASE_URL      = "https://verification.e-meterai.live";


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
