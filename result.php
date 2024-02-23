<?php
include 'backend/functions.php';
$data = $_SESSION['signatureVerification']['data']['signer'];
$SNValid = ['632184541438662478458946134058747031673774297695', '6186515079328007405'];
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <title>Verifikasi e-Meterai</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <?php include 'components/styles.php' ?>
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

        .widget-custom {
            border: 1px dashed #F8718C;
            border-radius: 10px;
            padding: 15px;
        }

        .right {
            text-align: right;
        }

        .card-header {
            background-color: #F8718C;
            padding: 10px 15px;
        }

        .file-text {
            font-size: 12px;
        }

        @media (max-width:768px) {
            .right {
                text-align: left;
            }

            .file-text {
                font-size: 8px;
            }
        }
    </style>
</head>

<body class="custom">
    <div>
        <div class="container">
            <div class="row d-flex align-items-center justify-content-center">
                <div class="col-lg-8">
                    <div class="w-100 d-block bg-white shadow-lg rounded my-5">
                        <div class="p-3 p-md-5 box-custom">
                            <div class="d-flex align-items-center justify-content-between px-3 mb-5">
                                <img src="assets/images/logo-bumn.png" style="height: 20px;" alt="gambar">
                                <img src="assets/images/logo.png" style="height: 30px;" alt="gambar">
                            </div>
                            <div class="text-center mb-3">
                                <img src="assets/images/logo-emeterai.png" style="height: 50px;" alt="gambar">
                                <div class="separator-linethrough">
                                    <span>VERIFIKASI E-METERAI</span>
                                </div>
                            </div>
                            <div class="widget-custom mb-4">
                                <div class="d-flex justify-content-between align-items-center flex-wrap">
                                    <div class="d-flex align-items-center" style="width: 70%;">
                                        <div class="mr-1">
                                            <i class="mdi mdi-file-pdf-outline text-danger" style="font-size:26px ;"></i>
                                        </div>
                                        <div class="file-text">
                                            <p class="text-muted mb-0"><?php echo ((strlen($_SESSION['dokumen']['name']) - 4) > 30) ? substr($_SESSION['dokumen']['name'], 0, 37) . '....pdf' :  $_SESSION['dokumen']['name'] ?></p>
                                            <small><?php echo formatBytes($_SESSION['dokumen']['size']) ?></small>
                                        </div>
                                    </div>
                                    <div>
                                        <button type="button" class="btn btn-danger btn-sm waves-effect waves-light" data-toggle="modal" data-target="#modalViewDocument" data-backdrop="static" data-keyboard="false">Lihat</button>
                                    </div>
                                </div>
                            </div>
                            <div id="accordion" class="custom-accordion mb-4">
                                <?php $i = 1; ?>
                                <?php foreach ($data as $signer) : ?>
                                    <?php $serialNumberIsNumeric = is_numeric($signer->serialNumber); ?>
                                    <?php $isMeterai = (in_array($signer->serialNumber, $SNValid)) ? true : false ?>
                                    <?php $subjectDn = explode(",", $signer->subjectDn); ?>
                                    <?php $subjectDnExplode = explode(":", $subjectDn[0]); ?>
                                    <div class="card" style="margin-bottom:1px !important ;">
                                        <div class="card-header" id="heading<?php echo $i; ?>">
                                            <h5 class="m-0 font-size-15">
                                                <a class="d-block pt-2 pb-2 text-white collapsed" data-toggle="collapse" href="#collapse<?php echo $i; ?>" aria-expanded="false" aria-controls="collapse<?php echo $i; ?>">
                                                    <?php echo ($isMeterai == true) ? "E-METERAI" : "TANDA TANGAN" ?>
                                                    #<?php echo $i; ?>
                                                    <?php if ($isMeterai == true) : ?>
                                                        <span class="badge badge-success ml-2">Valid</span>
                                                    <?php endif; ?>
                                                    <span class="float-right"><i class="mdi mdi-chevron-down accordion-arrow"></i></span>
                                                </a>
                                            </h5>
                                        </div>
                                        <div id="collapse<?php echo $i; ?>" class="collapse <?php echo $i == 1 ? 'show' : '' ?>" aria-labelledby="heading<?php echo $i; ?>" data-parent="#accordion">
                                            <div class="card-body" style="font-size:11px ;">
                                                <?php if ($isMeterai == true) : ?>

                                                    <div class="row">
                                                        <div class="col-12">
                                                            <small>Nomor Seri e-Meterai</small>
                                                            <?php $reason = explode("]", $signer->reason); ?>
                                                            <?php $reasonExplode = explode("[", $reason[0]); ?>
                                                            <p><?php echo $reasonExplode[1] ?></p>
                                                        </div>
                                                    </div>
                                                <?php endif; ?>
                                                <div class="row">
                                                    <div class="col-12 col-md-6">
                                                        <small>Ditandatangani oleh</small>
                                                        <p><?php echo $subjectDnExplode[1] ?></p>
                                                    </div>
                                                    <div class="col-12 col-md-6">
                                                        <small>Lokasi</small>
                                                        <p><?php echo $signer->location ?></p>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-12 col-md-6">
                                                        <small>Alasan</small>
                                                        <?php if ($isMeterai == true) : ?>
                                                            <p><?php echo substr($signer->reason, 25) ?></p>
                                                        <?php else : ?>
                                                            <p><?php echo $signer->reason ?></p>
                                                        <?php endif; ?>
                                                    </div>
                                                    <div class="col-12 col-md-6">
                                                        <small>Ditandatangani pada</small>
                                                        <p><?php echo $signer->signDate ?></p>
                                                    </div>
                                                </div>
                                                <div id="accordion1" class="custom-accordion mb-4">
                                                    <?php $j = 1; ?>
                                                    <?php $certificateInfos = ($isMeterai == false) ? array_reverse($signer->issuerInfos->certificateInfo) : $signer->issuerInfos->certificateInfo; ?>
                                                    <?php foreach ($certificateInfos as $certificateInfo) : ?>
                                                        <?php $serialNumberCertificateInfo = is_numeric($certificateInfo->serialNumber); ?>
                                                        <?php $issuerExplode = explode(",", $certificateInfo->issuer); ?>
                                                        <?php $subjectDnExplode = explode(",", $certificateInfo->subjectDn); ?>
                                                        <div class="card" style="margin-bottom:1px !important ;">
                                                            <div class="card-header" style="background-color: #fcc918 !important;" id="heading<?php echo $j; ?>">
                                                                <h5 class="m-0 font-size-15">
                                                                    <a class="d-block pt-2 pb-2 text-white" data-toggle="collapse" href="#collapseJ<?php echo $j; ?>" aria-expanded="true" aria-controls="collapseJ<?php echo $j; ?>">
                                                                        Sertifikat #<?php echo $j; ?> <span class="float-right"><i class="mdi mdi-chevron-down accordion-arrow"></i></span>
                                                                    </a>
                                                                </h5>
                                                            </div>
                                                            <div id="collapseJ<?php echo $j; ?>" class="collapse" aria-labelledby="heading<?php echo $j; ?>" data-parent="#accordion1">
                                                                <div class="card-body">
                                                                    <div class="row">
                                                                        <div class="col-12 col-md-6">
                                                                            <small>Serial</small>
                                                                            <?php if ($serialNumberCertificateInfo) : ?>
                                                                                <p><?php echo strtoupper(gmp_strval($certificateInfo->serialNumber, 16)) ?></p>
                                                                            <?php else : ?>
                                                                                <p><?php echo $certificateInfo->serialNumber ?></p>
                                                                            <?php endif; ?>
                                                                        </div>
                                                                        <div class="col-12 col-md-6">
                                                                            <small>Validity</small>
                                                                            <p><?php echo $certificateInfo->notValidBefore . " - " . $certificateInfo->notValidAfter ?></p>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-12 col-md-6">
                                                                            <small>Subject</small>
                                                                            <p><?php echo $certificateInfo->subjectDn ?></p>
                                                                        </div>
                                                                        <div class="col-12 col-md-6">
                                                                            <small>Issuer</small>
                                                                            <p><?php echo $certificateInfo->issuer ?></p>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col-12 col-md-6">
                                                                            <small>Signature Algorithm</small>
                                                                            <p><?php echo $certificateInfo->algorithm ?></p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <?php $j++; ?>
                                                    <?php endforeach; ?>
                                                    <div class="card" style="margin-bottom:1px !important ;">
                                                        <div class="card-header" style="background-color: #fcc918 !important;" id="heading<?php echo $j; ?>">
                                                            <h5 class="m-0 font-size-15">
                                                                <a class="d-block pt-2 pb-2 text-white" data-toggle="collapse" href="#collapseJ<?php echo $j; ?>" aria-expanded="true" aria-controls="collapseJ<?php echo $j; ?>">
                                                                    Sertifikat #<?php echo $j; ?> <span class="float-right"><i class="mdi mdi-chevron-down accordion-arrow"></i></span>
                                                                </a>
                                                            </h5>
                                                        </div>
                                                        <div id="collapseJ<?php echo $j; ?>" class="collapse" aria-labelledby="heading<?php echo $j; ?>" data-parent="#accordion1">
                                                            <div class="card-body">
                                                                <div class="row">
                                                                    <div class="col-12 col-md-6">
                                                                        <small>Serial</small>
                                                                        <?php if ($serialNumberIsNumeric) : ?>
                                                                            <p><?php echo strtoupper(gmp_strval($signer->serialNumber, 16)) ?></p>
                                                                        <?php else : ?>
                                                                            <p><?php echo $signer->serialNumber ?></p>
                                                                        <?php endif; ?>
                                                                    </div>
                                                                    <div class="col-12 col-md-6">
                                                                        <small>Validity</small>
                                                                        <p><?php echo $signer->notValidBefore . " - " . $signer->notValidAfter ?></p>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-12">
                                                                        <?php $subjectDnCert = explode(",", $signer->subjectDn); ?>
                                                                        <?php $cn = explode(":", $subjectDnCert[0]); ?>
                                                                        <?php $o = explode(":", $subjectDnCert[1]); ?>
                                                                        <?php $c = explode(":", $subjectDnCert[2]); ?>
                                                                        <small>Subject</small>
                                                                        <p><?php echo "CN = " . $cn[1] . ", " . "O = " . $o[1] . ", " . "C = " . $c[1] ?></p>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-12 col-md-6">
                                                                        <small>Issuer</small>
                                                                        <p><?php echo "CN = " . $cn[1] ?></p>
                                                                    </div>
                                                                    <div class="col-12 col-md-6">
                                                                        <small>Signature Algorithm</small>
                                                                        <p><?php echo $signer->algorithm ?></p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <?php $i++; ?>
                                <?php endforeach; ?>
                            </div>
                            <a href="index" class="btn btn-outline-danger btn-block waves-light waves-effect"><b>Kembali</b></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="modalViewDocument" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content bg-transparent">
                <div class="card card-pricing">
                    <div class="modal-header align-items-center" style="border-bottom: none;padding:1.25rem 1.25rem 0">
                        <h4 class="card-title file-text mb-0"><?php echo ((strlen($_SESSION['dokumen']['name']) - 4) > 30) ? substr($_SESSION['dokumen']['name'], 0, 37) . '....pdf' :  $_SESSION['dokumen']['name'] ?></h4>
                        <button type="button" class="close waves-effect waves-light" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="card-body">
                        <iframe src="viewer" frameborder="0" height="400px" width="100%"></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php include 'components/modal-alerts.php' ?>
    <?php include 'components/scripts.php' ?>
</body>

</html>