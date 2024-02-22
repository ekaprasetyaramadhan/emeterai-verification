$("#btnCert").on('click', function () {
    $("#btnCert").css("display", "none");
    $("#btnLoadingCert").css("display", "block");
    return true;
});
$("#btnSign").on('click', function () {
    $("#btnSign").css("display", "none");
    $("#btnLoadingSign").css("display", "block");
    return true;
});
// DIGITAL CERT 
var jumlahCert = document.getElementById('jumlah-cert');
var hargaCert = document.getElementById('harga-cert');
var quantityCert = document.getElementById('qty-cert');
var incCert = document.getElementById('inc-cert');
var decCert = document.getElementById('dec-cert');
var qtyCert = 1;
var countCert = 10000;

jumlahCert.innerText = qtyCert.toLocaleString();
hargaCert.innerText = countCert.toLocaleString();
quantityCert.value = qtyCert;

incCert.addEventListener("click", () => {
    qtyCert++;
    resultInc = countCert * qtyCert;
    jumlahCert.innerText = qtyCert.toLocaleString();
    hargaCert.innerText = resultInc.toLocaleString();
    quantityCert.value = qtyCert;
});
decCert.addEventListener("click", () => {
    qtyCert--;
    if (qtyCert < 1) {
        qtyCert = 1;
    }
    resultDec = countCert * qtyCert;
    jumlahCert.innerText = qtyCert.toLocaleString();
    hargaCert.innerText = resultDec.toLocaleString();
    quantityCert.value = qtyCert;
});

// DIGITAL SIGN
var jumlahSign = document.getElementById('jumlah-sign');
var hargaSign = document.getElementById('harga-sign');
var quantitySign = document.getElementById('qty-sign');
var incSign = document.getElementById('inc-sign');
var decSign = document.getElementById('dec-sign');
var qtySign = 1;
var countSign = 100;

quantitySign.value = qtySign;
jumlahSign.innerText = qtySign.toLocaleString();
hargaSign.innerText = countSign.toLocaleString();

incSign.addEventListener("click", () => {
    qtySign++;
    resultInc = countSign * qtySign;
    jumlahSign.innerText = qtySign.toLocaleString();
    hargaSign.innerText = resultInc.toLocaleString();
    quantitySign.value = qtySign;
});
decSign.addEventListener("click", () => {
    qtySign--;
    if (qtySign < 1) {
        qtySign = 1;
    }
    resultDec = countSign * qtySign;
    jumlahSign.innerText = qtySign.toLocaleString();
    hargaSign.innerText = resultDec.toLocaleString();
    quantitySign.value = qtySign;
});