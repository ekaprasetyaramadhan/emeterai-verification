<?php if (isset($_SESSION['peruriID']['message']) and is_array($_SESSION['peruriID']['message'])) : ?>
    <?php if ($_SESSION['peruriID']['message']['code'] != '0') : ?>
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong><?php echo $_SESSION['peruriID']['message']['body']; ?></strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">×</span>
            </button>
        </div>
    <?php else : ?>
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong><?php echo $_SESSION['peruriID']['message']['body']; ?></strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">×</span>
            </button>
        </div>
    <?php endif; ?>
    <?php $_SESSION['peruriID']['message'] = null; ?>
<?php endif; ?>