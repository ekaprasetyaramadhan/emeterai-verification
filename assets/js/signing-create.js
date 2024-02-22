const inputDocument = document.querySelector("#dokumen");
var listFiles = [];
var listLoadingUpload = [];

inputDocument.addEventListener("change", function () {
  var dokumen = $('[name="dokumen[]"]');
  var html = "";

  var i = 0;
  for (var no = 0; no < dokumen.length; no++) {
    var files = dokumen.eq(no)[0].files;

    if (files.length > 0) {
      for (var j = 0; j < files.length; j++) {
        listLoadingUpload[i] = false;
        listFiles[i] = files[j];
        var fileName = files[j].name.escape();
        var fileSize = files[j].size;

        var fileType = files[j].type;

        let fileSizeModif = Math.round(fileSize / 1024);

        if (fileName.length >= 12) {
          var splitName = fileName.split(".");
          fileName = splitName[0].substring(0, 40);
          fileName = fileName + "." + splitName[1];
        }

        if (fileSizeModif < 1024) {
          fileSize = fileSizeModif + " KB";
        } else {
          fileSize = (fileSizeModif / 1024).toFixed(2) + " MB";
        }

        html += `<li class="row-custom">
                    <div class="content-custom">
                      <div class="details-custom">
                          <span class="mb-2" id="message-${i}"></span>
                          <div class="name font-weight-bold">${fileName}</div>
                          <div class="size">Size ${fileSize}</div>
                      </div>
                      <div class="progress-custom">
                        <div class="progress">
                          <div id="bar-${i}" class="progress-bar" role="progressbar" style="width: 0%;">0%</div>
                        </div>
                        <div id="icon-progress-${i}">
                          <i class="fa fa-spinner fa-spin font-size-20"></i>
                        </div>
                      </div>
                    </div>
                  </li>`;
        i++;
      }
    }
  }
  $(".progress-area").html(html);
  $("#uploadFile").modal({
    backdrop: "static",
    keyboard: false,
  });

  if (listFiles.length > 0) {
    listFiles.forEach(function (item, no) {
      var uploadingFile = [];
      var fileName = listFiles[no].name.escape();
      var formData = new FormData();

      formData.append("fileName", fileName);
      formData.append("dokumen", listFiles[no]);

      var bar = $("#bar-" + no);
      var percentVal = "0%";
      bar.width(percentVal);
      bar.html(percentVal);

      $.ajax({
        async: true,
        crossDomain: true,
        url: "backend/signing-create",
        method: "POST",
        processData: false,
        contentType: false,
        data: formData,
        beforeSend: function () {
          $("#bar-" + no).show();
          $("#bar-" + no).width("0%");
        },
        xhr: function () {
          var xhr = new window.XMLHttpRequest();
          xhr.upload.addEventListener(
            "progress",
            function (evt) {
              if (evt.lengthComputable) {
                var percentComplete = evt.loaded / evt.total;
                percentComplete = Math.round(percentComplete * 100) + "%";
                bar.width(percentComplete);
                bar.html(percentComplete);
              }
            },
            false
          );

          return xhr;
        },
        success: function (data) {
          $("#bar-" + no).width("100%");
          $("#bar-" + no).html("100%");

          listLoadingUpload[no] = true;

          var nextUrl = $("#nextUrl").val();

          try {
            var response = JSON.parse(data);
            console.log(response.result);
            if (response.result) {
              $("#icon-progress-" + no).html('<i class="fas fa-check text-primary font-size-18"></i>');
              $("#message-" + no).html('<span class="badge badge-soft-success p-2" style="width:100%">Upload File Berhasil</span>');
              $("#nextBtn").show();
              $("#backBtn").show();
              $("#btnLoading").hide();
              if (listFiles.length === 1) {
                nextUrl = response.redirect;
              }
            } else {
              $("#icon-progress-" + no).html('<i class="fas fa-times text-danger font-size-18"></i>');
              $("#message-" + no).html('<span class="badge badge-soft-danger p-2" style="width:100%">' + response.message + "</span>");
              $("#nextBtn").hide();
              $("#backBtn").show();
              $("#btnLoading").hide();
            }
          } catch (e) {}

          var isSuccess = true;
          for (var i = 0; i < listLoadingUpload.length; i++) {
            if (listLoadingUpload[i] == false) {
              isSuccess = false;
            }
          }

          if (isSuccess) {
            $("#nextBtn").attr("href", nextUrl);
          }
        },
        error: function (data) {},
      });
    });
  }
});

String.prototype.escape = function () {
  var tagsToReplace = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return this.replace(/[&<>"']/g, function (tag) {
    return tagsToReplace[tag] || tag;
  });
};

$(".dropify").dropify({
  messages: {
    default: "Seret dan lepas file pdf disini atau klik <br><span class='text-danger'>Ukuran File Maks: 6 MB</span>",
    replace: "Seret dan lepas atau klik untuk mengganti",
    remove: "Hapus",
    error: "Ups, ada yang salah.",
  },
  error: {
    fileSize: "Ukuran file terlalu besar (maks 6MB).",
  },
});

$("#nextBtn").on("click", function () {
  $("#nextBtn").hide();
  $("#btnLoading").show();
  return true;
});
