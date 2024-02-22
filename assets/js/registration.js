$("#password").tooltip({
  trigger: "focus",
  "data-placement": "top",
  title: "Password minimal 8 karakter yang mengandung kombinasi huruf kapital, huruf kecil dan angka",
});
$("#passwordRepeat").tooltip({
  trigger: "focus",
  "data-placement": "top",
  title: "Password minimal 8 karakter yang mengandung kombinasi huruf kapital, huruf kecil dan angka",
});
$("#taxNumber").tooltip({
  trigger: "focus",
  "data-placement": "top",
  title: "Jika Anda mengisi Nomor NPWP, Wajib melampirkan foto NPWP",
});
$("#dateOfBirth").datepicker({
  format: "dd/mm/yyyy",
  autoclose: true,
});
$("#btnSubmit").on("click", function () {
  $("#btnSubmit").css("display", "none");
  $("#btnLoading").css("display", "block");
  return true;
});
$("#idFile").dropify({
  messages: {
    default: "Drag and Drop foto KTP di sini atau klik <br><span class='text-danger'>Ukuran File Maks: 1MB</span>",
    replace: "Seret dan lepas atau klik untuk mengganti",
    remove: "Hapus",
    error: "Ukuran file terlalu besar (maks 1MB)",
  },
  error: {
    fileSize: "Ukuran file terlalu besar (maks 1MB)",
  },
});
$("#taxFile").dropify({
  messages: {
    default: "<strong>Drag and Drop foto NPWP di sini atau klik <br>Ukuran File Maks: 1MB</strong>",
    replace: "Seret dan lepas atau klik untuk mengganti",
    remove: "Hapus",
    error: "Ukuran file terlalu besar (maks 1MB)",
  },
  error: {
    fileSize: "Ukuran file terlalu besar (maks 1MB)",
  },
});

// FORM WIZARD
// const slidePage = document.querySelector(".slide-page");
// const indicator = document.querySelector(".indicator");
// const nextBtn = document.querySelector(".next-btn");
// const nextBtn2 = document.querySelector(".next-btn2");
// const nextBtn3 = document.querySelector(".next-btn3");
// const prevBtn = document.querySelector(".prev-btn");
// const prevBtn2 = document.querySelector(".prev-btn2");
// const prevBtn3 = document.querySelector(".prev-btn3");
// const submitBtn = document.querySelector(".submit-btn");
// const circle = document.querySelectorAll(".circle");
// const circleIcon1 = document.querySelector(".fas.fa-check.satu");
// const circleIcon2 = document.querySelector(".fas.fa-check.dua");
// const circleIcon3 = document.querySelector(".fas.fa-check.tiga");
// const satu = document.querySelector(".satu");
// const dua = document.querySelector(".dua");
// const tiga = document.querySelector(".tiga");

// let current = 1;

// nextBtn.addEventListener("click", function () {
//   current += 1;
//   slidePage.style.marginLeft = "-25%";
//   indicator.style.width = "33%";
//   circle.forEach((circle, index) => {
//     circle.classList[`${index < current ? "add" : "remove"}`]("active");
//     circleIcon1.style.display = "block";
//   });
//   satu.style.display = "none";
// });
// nextBtn2.addEventListener("click", function () {
//   current += 1;
//   slidePage.style.marginLeft = "-50%";
//   indicator.style.width = "66%";
//   circle.forEach((circle, index) => {
//     circle.classList[`${index < current ? "add" : "remove"}`]("active");
//     circleIcon2.style.display = "block";
//   });
//   dua.style.display = "none";
// });
// nextBtn3.addEventListener("click", function () {
//   current += 1;
//   slidePage.style.marginLeft = "-75%";
//   indicator.style.width = "99%";
//   circle.forEach((circle, index) => {
//     circle.classList[`${index < current ? "add" : "remove"}`]("active");
//     circleIcon3.style.display = "block";
//   });
//   tiga.style.display = "none";
//   $("#notice-kyc").show(500);
// });
// prevBtn.addEventListener("click", function () {
//   current -= 1;
//   slidePage.style.marginLeft = "0%";
//   indicator.style.width = "0%";
//   circle.forEach((circle, index) => {
//     circle.classList[`${index < current ? "add" : "remove"}`]("active");
//     circleIcon1.style.display = "none";
//   });
//   satu.style.display = "block";
// });
// prevBtn2.addEventListener("click", function () {
//   current -= 1;
//   slidePage.style.marginLeft = "-25%";
//   indicator.style.width = "33%";
//   circle.forEach((circle, index) => {
//     circle.classList[`${index < current ? "add" : "remove"}`]("active");
//     circleIcon2.style.display = "none";
//   });
//   dua.style.display = "block";
// });
// prevBtn3.addEventListener("click", function () {
//   current -= 1;
//   slidePage.style.marginLeft = "-50%";
//   indicator.style.width = "66%";
//   circle.forEach((circle, index) => {
//     circle.classList[`${index < current ? "add" : "remove"}`]("active");
//     circleIcon3.style.display = "none";
//   });
//   tiga.style.display = "block";
// });

// var username = document.getElementById("username");
// var placeOfBirth = document.getElementById("placeOfBirth");
// var btnNext3 = document.getElementById("next-btn3");

// username.addEventListener("input", validateOne);
// placeOfBirth.addEventListener("input", validateOne);

// function validateOne() {
//   if (username.value == "" || placeOfBirth.value == "") {
//     btnNext3.setAttribute("disabled", "disabled");
//   } else {
//     btnNext3.removeAttribute("disabled");
//   }
// }

// var idNumber = document.getElementById("idNumber");
// var idFile = document.getElementById("idFile");
// var btnNext2 = document.getElementById("next-btn2");

// idNumber.addEventListener("input", validateTwo);
// idFile.addEventListener("input", validateTwo);

// function validateTwo() {
//   if (idNumber.value == "" || idFile.value == "") {
//     btnNext2.setAttribute("disabled", "disabled");
//   } else {
//     btnNext2.removeAttribute("disabled");
//   }
// }

// $(":input, a").attr("tabindex", "-1");
