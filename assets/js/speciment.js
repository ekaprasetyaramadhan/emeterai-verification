$("#btnUndo").tooltip({
  trigger: "hover",
  "data-placement": "top",
  title: "Undo",
});
$("#btnClear").tooltip({
  trigger: "hover",
  "data-placement": "top",
  title: "Hapus",
});
$("#specimenUpload").dropify({
  messages: {
    default: 'Drag and Drop Gambar disini atau klik <br><span class="text-danger">Ukuran File Maks: 1MB</span>',
    replace: "Seret dan lepas atau klik untuk mengganti",
    remove: "Hapus",
    error: "Ukuran file terlalu besar (maks 1MB)",
  },
  error: {
    fileSize: "Ukuran file terlalu besar (maks 1MB)",
  },
});

$("input[name=mode]").change(function () {
  var mode = $("input[name=mode]:checked").val();

  if (mode == "CANVAS") {
    $("#upload").hide();
    $("#canvas").show();
  } else {
    $("#upload").show();
    $("#canvas").hide();
  }
});

function readFile() {
  if (this.files && this.files[0]) {
    if (this.files[0].size > 1048576) {
      alert("Specimen file size is more than 1 MB");
      document.getElementById("speciment").value = "";
    } else {
      var FR = new FileReader();

      FR.addEventListener("load", function (e) {
        var getData = e.target.result.split(";")[0];
        var getExt = getData.split("/")[1];

        if (getExt == "jpg" || getExt == "jpeg" || getExt == "gif" || getExt == "png") {
          document.getElementById("specimentImage").src = e.target.result;
          document.getElementById("signatureBase64").value = e.target.result.split(",")[1];
          document.getElementById("inputFinish1").style.display = "none";
          document.getElementById("inputFinish2").style.display = "block";
        } else {
          alert("Forbidden file type.");
          document.getElementById("speciment").value = "";
        }
      });

      FR.readAsDataURL(this.files[0]);
    }
  }
}

document.getElementById("specimenUpload").addEventListener("change", readFile);

$("#btnSubmit").on("click", function () {
  $("#btnSubmit").css("display", "none");
  $("#btnLoading").css("display", "block");
  return true;
});
