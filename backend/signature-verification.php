<?php

include "functions.php";

if (!isset($_FILES['file']) and ($_FILES['file']['name'] == '')) {
    $_SESSION['message']['code'] = '-1';
    $_SESSION['message']['body'] = 'Dokumen belum dipilih';
    header('location: ' . BASE_URL . 'index');
    die();
} else {
    $dokumen_size = $_FILES['file']['size'];
    $dokumen_tmp = $_FILES['file']['tmp_name'];

    $filetype = $_FILES['file']['type'];
    $fileext = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);

    if ($filetype != 'application/pdf' or strtolower($fileext) != 'pdf') {
        $_SESSION['message']['code'] = '-1';
        $_SESSION['message']['body'] = 'Tipe dokumen tidak didukung (bukan PDF)';
        header('location: ' . BASE_URL . 'index');
        die();
    }
}

$signingCreate_url = 'http://localhost:9055/gateway/digitalSignatureValidation/1.0/signatureVerification/v2';
// $signingCreate_url = 'http://e-meterai.live:9055/gateway/digitalSignatureValidation/1.0/signatureVerification/v2';
$signingCreate_param = array(
    'file' => new CURLFile($_FILES['file']['tmp_name'], $_FILES['file']['type'], $_FILES['file']['name']),
);
$signingCreate = curl_post_blob($signingCreate_url, $signingCreate_param, filesize($_FILES['file']['tmp_name']));

if ($signingCreate->resultCode == '0') {
    $_SESSION['signatureVerification']['data'] = (array) $signingCreate->data;
    $_SESSION['dokumen']['name'] = $_FILES['file']['name'];
    $_SESSION['dokumen']['size'] = $_FILES['file']['size'];
    $_SESSION['dokumen']['base64'] = base64_encode(file_get_contents($_FILES['file']['tmp_name']));
    header('location: ' . BASE_URL . 'result');
    die();
} else {
    $_SESSION['message']['code'] = $signingCreate->resultCode;
    $_SESSION['message']['body'] = $signingCreate->resultDesc;
    header('location: ' . BASE_URL . 'index');
    die();
}
