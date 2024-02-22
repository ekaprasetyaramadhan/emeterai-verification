$(".dial").knob({
  format: function (value) {
    return value + "%";
  },
});

// DIGITAL SIGN
var jumlahSign = document.getElementById("jumlah-sign");
var totalSign = document.getElementById("total-sign");
var hargaSign = document.getElementById("harga-sign");
var quantitySign = document.getElementById("qty-sign");
var incSign = document.getElementById("inc-sign");
var decSign = document.getElementById("dec-sign");
var qtySign = 10;
var countSign = 2000;

quantitySign.value = qtySign;
jumlahSign.innerText = qtySign.toLocaleString();
totalSign.innerText = qtySign.toLocaleString();
var hargaSign2 = qtySign * countSign;
hargaSign.innerText = hargaSign2.toLocaleString();

incSign.addEventListener("click", () => {
  qtySign = qtySign + 10;
  resultInc = countSign * qtySign;
  jumlahSign.innerText = qtySign.toLocaleString();
  totalSign.innerText = qtySign.toLocaleString();
  hargaSign.innerText = resultInc.toLocaleString();
  quantitySign.value = qtySign;
});
decSign.addEventListener("click", () => {
  qtySign = qtySign - 10;
  if (qtySign < 10) {
    qtySign = 10;
  }
  resultDec = countSign * qtySign;
  jumlahSign.innerText = qtySign.toLocaleString();
  totalSign.innerText = qtySign.toLocaleString();
  hargaSign.innerText = resultDec.toLocaleString();
  quantitySign.value = qtySign;
});
// Meterai
var jumlahMeterai = document.getElementById("jumlah-meterai");
var totalMeterai = document.getElementById("total-meterai");
var hargaMeterai = document.getElementById("harga-meterai");
var quantityMeterai = document.getElementById("qty-meterai");
var incMeterai = document.getElementById("inc-meterai");
var decMeterai = document.getElementById("dec-meterai");
var qtyMeterai = 1;
var countMeterai = 10000;

quantityMeterai.value = qtyMeterai;
jumlahMeterai.innerText = qtyMeterai.toLocaleString();
totalMeterai.innerText = qtyMeterai.toLocaleString();
var hargaMeterai2 = qtyMeterai * countMeterai;
hargaMeterai.innerText = hargaMeterai2.toLocaleString();

incMeterai.addEventListener("click", () => {
  qtyMeterai = qtyMeterai + 1;
  resultInc = countMeterai * qtyMeterai;
  jumlahMeterai.innerText = qtyMeterai.toLocaleString();
  totalMeterai.innerText = qtyMeterai.toLocaleString();
  hargaMeterai.innerText = resultInc.toLocaleString();
  quantityMeterai.value = qtyMeterai;
});
decMeterai.addEventListener("click", () => {
  qtyMeterai = qtyMeterai - 1;
  if (qtyMeterai < 1) {
    qtyMeterai = 1;
  }
  resultDec = countMeterai * qtyMeterai;
  jumlahMeterai.innerText = qtyMeterai.toLocaleString();
  totalMeterai.innerText = qtyMeterai.toLocaleString();
  hargaMeterai.innerText = resultDec.toLocaleString();
  quantityMeterai.value = qtyMeterai;
});
$(".btnSubmit").on("click", function () {
  $(".btnSubmit").css("display", "none");
  $(".btnLoading").css("display", "block");
  return true;
});
$("#btnAccountVerifyEmail").on("click", function () {
  $("#modalGetStarted").modal("hide");
  $("#modalAccountVerifyEmail").modal("show");
});
$("#btnquotaCheckCertificate").on("click", function () {
  $("#modalGetStarted").modal("hide");
  $("#modalSigning").modal("show");
});
$("#btnAccountVerificationAdditional").on("click", function () {
  $("#modalGetStarted").modal("hide");
  $("#modalAccountVerifyAdditional").modal("show");
});
$(".btnAccountVerification").on("click", function () {
  window.location.href = "account-verification";
});

$("#boxSign").on("click", function () {
  $("#panelSign").show(500);
  $("#panelMeterai").hide();
  $("#boxSign").hide();
  $("#boxMeterai").hide();
});

$("#boxMeterai").on("click", function () {
  $("#panelSign").hide();
  $("#panelMeterai").show(500);
  $("#boxSign").hide();
  $("#boxMeterai").hide();
});
$("#quotaCustom").on("click", function () {
  $("#quota10").hide();
  $("#quota50").hide();
  $("#quota100").hide();
  $("#quotaCustom").hide();
  $("#selectQuota10").hide();
  $("#selectQuota50").hide();
  $("#selectQuota100").hide();
  $("#selectQuotaCustom").show(500);
  $(".backPanel").hide();
});
$("#quota10").on("click", function () {
  $("#quota10").hide();
  $("#quota50").hide();
  $("#quota100").hide();
  $("#quotaCustom").hide();
  $("#selectQuota10").show(500);
  $("#selectQuota50").hide();
  $("#selectQuota100").hide();
  $("#selectQuotaCustom").hide();
  $(".backPanel").hide();
});
$("#quota50").on("click", function () {
  $("#quota10").hide();
  $("#quota50").hide();
  $("#quota100").hide();
  $("#quotaCustom").hide();
  $("#selectQuota10").hide();
  $("#selectQuota50").show(500);
  $("#selectQuota100").hide();
  $("#selectQuotaCustom").hide();
  $(".backPanel").hide();
});
$("#quota100").on("click", function () {
  $("#quota10").hide();
  $("#quota50").hide();
  $("#quota100").hide();
  $("#quotaCustom").hide();
  $("#selectQuota10").hide();
  $("#selectQuota50").hide();
  $("#selectQuota100").show(500);
  $("#selectQuotaCustom").hide();
  $(".backPanel").hide();
});
$(".backPanel").on("click", function () {
  $("#boxMeterai").show(500);
  $("#boxSign").show(500);
  $("#panelMeterai").hide();
  $("#panelSign").hide();
});
$(".backQuota").on("click", function () {
  $("#quota10").show(500);
  $("#quota50").show(500);
  $("#quota100").show(500);
  $("#quotaCustom").show(500);
  $("#selectQuota10").hide();
  $("#selectQuota50").hide();
  $("#selectQuota100").hide();
  $("#selectQuotaCustom").hide();
  $(".backPanel").show(500);
});

$("#additionalFile").dropify({
  messages: {
    default: "Seret dan lepas foto identitas di sini atau klik <br><span class='text-danger'>Ukuran Foto Maks: 1MB</span>",
    replace: "Seret dan lepas atau klik untuk mengganti",
    remove: "Hapus",
    error: "Upss",
  },
});
