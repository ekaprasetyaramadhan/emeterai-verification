<div class="navbar-header">
    <div class="d-flex align-items-left">
        <button type="button" class="btn btn-sm mr-2 d-lg-none px-3 font-size-16 header-item waves-effect" id="vertical-menu-btn">
            <i class="fa fa-fw fa-bars"></i>
        </button>
    </div>
    <div class="d-flex align-items-center">
        <?php if (isset($_SESSION['peruriID']['accountProfile']['pid']) and  $_SESSION['peruriID']['accountProfile']['pid'] != '-') : ?>
            <div class="mr-4">
                <div class="ml-2">
                    <p class="mb-0 mt-0 font-size-custom">
                        <img src="assets/images/logo-6.png" style="width: 18px;height:18px">
                        Peruri ID
                    </p>
                    <p class="mb-0 mt-0 font-size-custom"><?php echo $_SESSION['peruriID']['accountProfile']['pid']  ?></p>
                </div>
            </div>
        <?php endif; ?>
        <div>
            <img class="header-profile-user" src="assets/images/icon-header.png">
            <span class="ml-1 font-size-custom"><?php if (isset($_SESSION['peruriID']['accountProfile']['name'])) echo $_SESSION['peruriID']['accountProfile']['name'] ?></span>
        </div>
    </div>
</div>