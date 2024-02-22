const slidePage = document.querySelector('.slide-page');
const indicator = document.querySelector('.indicator');
const nextBtn = document.querySelector('.next-btn');
const nextBtn2 = document.querySelector('.next-btn2');
const prevBtn = document.querySelector('.prev-btn');
const prevBtn2 = document.querySelector('.prev-btn2');
const submitBtn = document.querySelector('.submit-btn');
const circle = document.querySelectorAll('.circle');
const circleIcon1 = document.querySelector('.fas.fa-check.satu');
const circleIcon2 = document.querySelector('.fas.fa-check.dua');
const circleIcon3 = document.querySelector('.fas.fa-check.tiga');
const satu = document.querySelector('.satu');
const dua = document.querySelector('.dua');
const tiga = document.querySelector('.tiga');
let current = 1;

nextBtn.addEventListener('click', function () {
    current += 1;
    slidePage.style.marginLeft = "-25%";
    indicator.style.width = "50%";
    circle.forEach((circle, index) => {
        circle.classList[`${index < current ? "add" : "remove"}`]("active");
        circleIcon1.style.display = "block";
    });
    satu.style.display = "none";
});
nextBtn2.addEventListener('click', function () {
    current += 1;
    slidePage.style.marginLeft = "-50%";
    indicator.style.width = "100%";
    circle.forEach((circle, index) => {
        circle.classList[`${index < current ? "add" : "remove"}`]("active");
        circleIcon2.style.display = "block";
    });
    dua.style.display = "none";
});
prevBtn.addEventListener('click', function () {
    current -= 1;
    slidePage.style.marginLeft = "0%";
    indicator.style.width = "0%";
    circle.forEach((circle, index) => {
        circle.classList[`${index < current ? "add" : "remove"}`]("active");
        circleIcon1.style.display = "none";
    });
    satu.style.display = "block";
});
prevBtn2.addEventListener('click', function () {
    current -= 1;
    slidePage.style.marginLeft = "-25%";
    indicator.style.width = "50%";
    circle.forEach((circle, index) => {
        circle.classList[`${index < current ? "add" : "remove"}`]("active");
        circleIcon2.style.display = "none";
    });
    dua.style.display = "block";
});

$(".box-content.kebijakan").scroll(function () {
    if ($(".box-content.kebijakan").scrollTop() > 2000) {
        $("#privacy").removeAttr("disabled");
    }
});
$(".box-content.perjanjian").scroll(function () {
    if ($(".box-content.perjanjian").scrollTop() > 2000) {
        $("#subscriber").removeAttr("disabled");
    }
});

$("#privacy").click(function () {
    if ($('#privacy:checked').val() !== undefined) {
        $(".next-btn2").attr("disabled", false);
    } else {
        $(".next-btn2").attr("disabled", true);
    }
});
$("#subscriber").click(function () {
    if ($('#subscriber:checked').val() !== undefined) {
        $(".submit").attr("disabled", false);
    } else {
        $(".submit").attr("disabled", true);
    }
});