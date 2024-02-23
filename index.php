<?php
include 'backend/functions.php';
$_SESSION['dokumen'] = null;
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <title>Verifikasi e-Meterai</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <link href="assets/plugins/dropify/dropify.min.css" rel="stylesheet" type="text/css" />
    <?php include 'components/styles.php' ?>
    <link href="assets/css/account-verification.css" rel="stylesheet" type="text/css" />
    <style>
        .separator-linethrough {
            position: relative;
            margin: 30px 0;
            text-align: center;
        }

        .separator-linethrough span {
            display: inline-block;
            vertical-align: middle;
            padding: 0 10px;
            position: inherit;
            font-size: 18px;
            background-color: #fff;
            z-index: 9;
        }

        .separator-linethrough:after {
            display: block;
            position: absolute;
            top: 50%;
            width: 100%;
            content: '';
            border-top: 1px solid #f0f0f0;
            z-index: 0;
        }
    </style>
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
</head>

<body class="custom">
    <div>
        <div class="container">
            <div class="row d-flex align-items-center justify-content-center">
                <div class="col-lg-6">
                    <div class="w-100 d-block bg-white shadow-lg rounded my-5">
                        <div class="p-3 p-md-5 box-custom">
                            <div class="d-flex align-items-center justify-content-between px-3 mb-5">
                                <img src="assets/images/logo-bumn.png" style="height: 20px;" alt="gambar">
                                <img src="assets/images/logo.png" style="height: 30px;" alt="gambar">
                            </div>
                            <form action="backend/signature-verification" method="post" enctype="multipart/form-data">
                                <div class="text-center mb-3">
                                    <img src="assets/images/logo-emeterai.png" style="height: 50px;" alt="gambar">
                                    <div class="separator-linethrough">
                                        <span>VERIFIKASI E-METERAI</span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <input type="file" name="file" id="file" accept="application/pdf" class="dropify" />
                                </div>
                                <div class="my-4">
                                    <div class="g-recaptcha" data-sitekey="6LdhJIEcAAAAAH2hVYlFRwT8X5kQAkgag_0Pu84L" data-callback="recaptchaCallback" data-expired-callback="recaptchaExpired" data-error-callback="recaptchaError"></div>
                                </div>
                                <div class="mb-3">
                                    <button type="submit" id="btnSubmit" class="btn btn-danger btn-block waves-effect waves-light">Kirim</button>
                                    <button id="btnLoading" class="btn btn-block btn-danger" type="button" disabled="" style="display:none ;">
                                        <span class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>
                                        Loading...
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php include 'components/modal-alerts.php' ?>
    <?php include 'components/scripts.php' ?>
    <script src="assets/plugins/dropify/dropify.min.js"></script>
    <script>
        $("#btnSubmit").attr("disabled", true);

        function recaptchaCallback() {
            $("#btnSubmit").attr("disabled", false);
        }

        function recaptchaExpired() {
            $("#btnSubmit").attr("disabled", true);
        }

        function recaptchaError() {
            $("#btnSubmit").attr("disabled", true);
            alert("Captcha error, please reload this page.");
        }

        $("#file").dropify({
            messages: {
                default: "<h5 class='h5 mb-0'>Unggah Dokumen</h5><p class='text-muted'>Seret dan lepas dokumen Anda disini atau klik cari</p>",
                replace: "Seret dan lepas atau klik untuk mengganti",
                remove: "Hapus",
                error: "Ukuran file terlalu besar",
            }
        });

        $("#btnSubmit").on("click", function() {
            $("#btnSubmit").css("display", "none");
            $("#btnLoading").css("display", "block");
            return true;
        });
    </script>
</body>

</html>