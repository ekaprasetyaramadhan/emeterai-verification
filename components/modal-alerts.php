<div class="modal fade" id="modalAlert" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
        <div class="modal-content bg-transparent">
            <div class="card">
                <div class="card-body">
                    <div class="text-center">
                        <?php if ($_SESSION['message']['code'] == '0') : ?>
                            <div class="my-3">
                                <img src="assets/images/image-success.png" alt="gambar" style="height: 100px;">
                            </div>
                            <h4 class="card-title">Berhasil</h4>
                        <?php elseif ($_SESSION['message']['code'] == '2') : ?>
                            <i class="mdi mdi-timer-sand text-warning" style="font-size: 100px;"></i>
                            <h4 class="card-title">Dalam Proses</h4>
                        <?php else : ?>
                            <div class="my-3">
                                <img src="assets/images/image-failed.png" alt="gambar" style="height: 100px;">
                            </div>
                            <h4 class="card-title">Gagal</h4>
                        <?php endif; ?>
                        <p class="card-subtitle mb-4"><?php echo $_SESSION['message']['body'] ?></p>
                        <div class="text-center">
                            <button type="button" class="btn btn-link" data-dismiss="modal" aria-label="Close">
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>