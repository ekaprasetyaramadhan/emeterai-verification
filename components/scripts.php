<script src="assets/js/jquery.min.js"></script>
<script src="assets/js/bootstrap.bundle.min.js"></script>
<script src="assets/js/metismenu.min.js"></script>
<script src="assets/js/waves.js"></script>
<script src="assets/js/simplebar.min.js"></script>
<script src="assets/js/theme.js"></script>
<?php if (isset($_SESSION['message']) and is_array($_SESSION['message'])) : ?>
    <script>
        $('#modalAlert').modal();
    </script>
    <?php $_SESSION['message'] = null; ?>
<?php endif; ?>