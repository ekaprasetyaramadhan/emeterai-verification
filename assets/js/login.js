$('#btnSubmit').attr('disabled', true);

function recaptchaCallback() {
    $('#btnSubmit').attr('disabled', false);
}

function recaptchaExpired() {
    $('#btnSubmit').attr('disabled', true);
}

function recaptchaError() {
    $('#btnSubmit').attr('disabled', true);
    alert('Captcha error, please reload this page.');
}

$("#btnSubmit").on('click', function () {
    $("#btnSubmit").css("display", "none");
    $("#btnLoading").css("display", "block");
    return true;
});

function show() {
    if ($('.input-custom input').attr('type') == 'password') {
        $('.input-custom input').attr('type', 'text');
        $('.input-custom i').removeClass('mdi-eye');
        $('.input-custom i').addClass('mdi-eye-off');
    } else {
        $('.input-custom input').attr('type', 'password');
        $('.input-custom i').addClass('mdi-eye');
        $('.input-custom i').removeClass('mdi-eye-off');
    }
}