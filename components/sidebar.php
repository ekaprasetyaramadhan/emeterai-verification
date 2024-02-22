<div data-simplebar class="h-100">
    <div class="navbar-brand-box">
        <img class="img-fluid" src="assets/images/logo-4.png" style="height:35px ;margin:20px 0 0 0;">
    </div>
    <div id="sidebar-menu">
        <ul class="metismenu list-unstyled" id="side-menu">
            <li class="menu-title">Menu</li>
            <li>
                <a href="index" class="waves-effect"><i class="mdi mdi-home-analytics"></i><span>Beranda</span></a>
            </li>
            <li>
                <a href="javascript: void(0);" class="has-arrow waves-effect"><i class="mdi mdi-wallet"></i><span>Pembelian</span></a>
                <ul class="sub-menu" aria-expanded="false">
                    <li>
                        <a href="buy-quota">Beli Kuota</a>
                        <?php if (isset($page) and $page == 'PAYMENT') : ?>
                            <ul class="sub-menu" aria-expanded="false">
                                <li><a href="payment">Pembayaran</a></li>
                            </ul>
                        <?php endif; ?>
                    </li>
                    <li>
                        <a href="payment-product-list">Riwayat Pembelian</a>
                        <?php if (isset($page) and $page == 'PAYMENT_INVOICE') : ?>
                            <ul class="sub-menu" aria-expanded="false">
                                <li><a href="payment-invoice">Cetak Invoice</a></li>
                            </ul>
                        <?php endif; ?>
                    </li>

                </ul>
            </li>
            <li>
                <a href="signing-create" class="waves-effect"><i class="mdi mdi-file-upload"></i><span>Unggah Dokumen</span></a>
                <?php if (isset($page) and $page == 'SIGNING_PREVIEW') : ?>
                    <ul class="sub-menu" aria-expanded="false">
                        <li><a href="signing-preview">Atur Posisi Pembubuhan</a></li>
                    </ul>
                <?php endif; ?>
                <?php if (isset($page) and $page == 'SIGNING_CHECK') : ?>
                    <ul class="sub-menu" aria-expanded="false">
                        <li><a href="signing-check">Proses Pembubuhan</a></li>
                    </ul>
                <?php endif; ?>
                <?php if (isset($page) and $page == 'SIGNING_DOWNLOAD') : ?>
                    <ul class="sub-menu" aria-expanded="false">
                        <li><a href="signing-download">Download Dokumen</a></li>
                    </ul>
                <?php endif; ?>
            </li>
            <li>
                <a href="javascript: void(0);" class="has-arrow waves-effect"><i class="mdi mdi-file-eye"></i><span>Lihat Dokumen</span></a>
                <ul class="sub-menu" aria-expanded="false">
                    <li><a href="signing-waiting-list">Perlu Diproses</a></li>
                    <li><a href="signing-signed-list">Selesai</a></li>
                    <li><a href="signing-expired-list">Kadaluarsa</a></li>
                    <li><a href="signing-canceled-list">Dibatalkan</a></li>
                    <!-- <li><a href="signing-rejected-list">Ditolak</a></li> -->
                </ul>
            </li>
            <li>
                <a href="javascript: void(0);" class="has-arrow waves-effect"><i class="mdi mdi-settings"></i><span>Pengaturan</span></a>
                <ul class="sub-menu" aria-expanded="false">
                    <li><a href="speciment">Atur Tanda Tangan</a></li>
                    <li>
                        <a href="keyla">
                            <?php if ($_SESSION['peruriID']['accountKeylaCheck']['resultCode'] == '0') : ?>
                                <span class="badge badge-pill badge-success float-right" style="margin-top: 2px;">ON</span>
                            <?php else : ?>
                                <span class="badge badge-pill badge-danger float-right" style="margin-top: 2px;">OFF</span>
                            <?php endif; ?>
                            Autentikasi KEYLA
                        </a>
                    </li>
                </ul>
            </li>
            <li><a href="logout" class="waves-effect"><i class="mdi mdi-logout"></i><span>Logout</span></a></li>
        </ul>
    </div>
</div>