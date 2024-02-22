var __PDF_DOC,
  __CURRENT_PAGE,
  __TOTAL_PAGES,
  __PAGE_RENDERING_IN_PROGRESS = 0,
  __CANVAS = $("#pdf-canvas").get(0),
  __CANVAS_CTX = __CANVAS.getContext("2d");

if (countSpecimen > 0) {
  $("#btnSessionJob").removeAttr("disabled");
} else {
  $("#btnSessionJob").attr("disabled", "disabled");
}

showPDF(base64);

$("input[name=mode]").change(function () {
  var mode = $("input[name=mode]:checked").val();

  if (mode == "SPECIMEN") {
    $("#digital_signature_path").val(url_specimen);
    $("#text-speciment").html("<b>Spesimen</b>: Untuk melakukan pembubuhan tanda tangan berupa spesimen tanda tangan pada dokumen");
    $("#type").val("SPECIMEN");
    $("#panelQRText").hide();
    $("#panelMeterai").hide();
    validateParameter();
  } else if (mode == "BOX") {
    $("#digital_signature_path").val(url_box);
    $("#text-speciment").html("<b>Signature Box</b>: Untuk melakukan pembubuhan tanda tangan berupa spesimen box pada dokumen");
    $("#type").val("BOX");
    $("#panelQRText").hide();
    $("#panelMeterai").hide();
    validateParameter();
  } else if (mode == "BOX-QR") {
    $("#digital_signature_path").val(url_box_qr);
    $("#text-speciment").html("<b>Signature Box QR</b>: Untuk melakukan pembubuhan tanda tangan berupa spesimen box QR pada dokumen");
    $("#type").val("BOX-QR");
    $("#panelQRText").show();
    $("#panelMeterai").hide();
    validateParameter();
  } else if (mode == "METERAI") {
    $("#digital_signature_path").val(url_meterai);
    $("#text-speciment").html("<b>Signature Box QR</b>: Untuk melakukan pembubuhan meterai elektronik pada dokumen");
    $("#type").val("METERAI");
    $("#panelQRText").hide();
    $("#panelMeterai").show();
    validateParameter();
  } else {
    $("#type").val("INVISIBLE");
    $("#text-speciment").html("<b>Invisible</b>: Untuk melakukan pembubuhan tanda tangan tanpa spesimen pada dokumen");
    $("#panelQRText").hide();
    $("#panelMeterai").hide();
    validateParameter();
  }

  showPage(__CURRENT_PAGE);
});

pdfjsLib.GlobalWorkerOptions.workerSrc = "../plugins/pdfpreview/2.3.200/pdf.worker.js";

function choosePage(page_no, llx = 0, lly = 0, urx = 0, ury = 0, mode) {
  // var mode = $("input[name=mode]:checked").val();

  if (mode == "SPECIMEN") {
    $("#digital_signature_path").val(url_specimen);
    $("#type").val("SPECIMEN");
    $("#radioBox").prop("checked", false);
    $("#radioBoxQR").prop("checked", false);
    $("#radioSpecimen").prop("checked", true);
    $("#radioInvisible").prop("checked", false);
    $("#radioMeterai").prop("checked", false);
  } else if (mode == "BOX") {
    $("#digital_signature_path").val(url_box);
    $("#type").val("BOX");
    $("#radioBox").prop("checked", true);
    $("#radioBoxQR").prop("checked", false);
    $("#radioSpecimen").prop("checked", false);
    $("#radioInvisible").prop("checked", false);
    $("#radioMeterai").prop("checked", false);
  } else if (mode == "BOX-QR") {
    $("#digital_signature_path").val(url_box_qr);
    $("#type").val("BOX-QR");
    $("#radioBox").prop("checked", false);
    $("#radioBoxQR").prop("checked", true);
    $("#radioSpecimen").prop("checked", false);
    $("#radioInvisible").prop("checked", false);
    $("#radioMeterai").prop("checked", false);
  } else if (mode == "METERAI") {
    $("#digital_signature_path").val(url_meterai);
    $("#type").val("METERAI");
    $("#radioBox").prop("checked", false);
    $("#radioBoxQR").prop("checked", false);
    $("#radioSpecimen").prop("checked", false);
    $("#radioInvisible").prop("checked", false);
    $("#radioMeterai").prop("checked", true);
  } else {
    $("#digital_signature_path").val("");
    $("#type").val("INVISIBLE");
    $("#radioBox").prop("checked", false);
    $("#radioBoxQR").prop("checked", false);
    $("#radioSpecimen").prop("checked", false);
    $("#radioInvisible").prop("checked", true);
    $("#radioMeterai").prop("checked", false);
  }

  showPage(page_no, llx, lly, urx, ury);
}

function showPDF(pdf_url) {
  $("#pdf-loader").show();

  var loadingTask = pdfjsLib.getDocument(pdf_url);
  loadingTask.promise
    .then(function (pdf) {
      __PDF_DOC = pdf;
      __TOTAL_PAGES = __PDF_DOC.numPages;

      // Hide the pdf loader and show pdf container in HTML
      $("#pdf-loader").hide();
      $("#pdf-contents").show();
      $("#pdf-total-pages2").text(__TOTAL_PAGES);

      // Show the first page
      showPage(1);
    })
    .catch(function (error) {
      // If error re-show the upload button
      $("#pdf-loader").hide();
      $("#upload-button").show();
    });
}

function showPage(page_no, llx = 0, lly = 0, urx = 0, ury = 0) {
  __PAGE_RENDERING_IN_PROGRESS = 1;
  __CURRENT_PAGE = page_no;

  $("#dokumen_page").val(page_no);

  // Disable Prev & Next buttons while page is being loaded
  $("#pdf-next2, #pdf-prev2, #pdf-first2, #pdf-last2").attr("disabled", "disabled", "disabled", "disabled");

  // While page is being rendered hide the canvas and show a loading message
  $("#pdf-canvas").hide();
  $("#page-loader").show();

  // Update current page in HTML
  $(".pdf-current-page").val(page_no);

  // Fetch the page
  __PDF_DOC.getPage(page_no).then(function (page) {
    // As the canvas is of a fixed width we need to set the scale of the viewport accordingly
    var scale_required = __CANVAS.width / page.getViewport(1).width;

    // Get viewport of the page at required scale
    var viewport = page.getViewport(scale_required);

    // Set canvas height
    __CANVAS.height = viewport.height;

    var renderContext = {
      canvasContext: __CANVAS_CTX,
      viewport: viewport,
    };
    $('input[name="dokumen_height"]').val(page.getViewport(1).height);
    $('input[name="dokumen_width"]').val(page.getViewport(1).width);

    var mode = $("#type").val();

    if (mode == "INVISIBLE") {
      // Render the page contents in the canvas
      page.render(renderContext).then(function () {
        __PAGE_RENDERING_IN_PROGRESS = 0;

        // Re-enable Prev & Next buttons
        $("#pdf-last2, #pdf-next2, #pdf-prev2, #pdf-first2").removeAttr("disabled", "disabled");

        // Show the canvas and hide the page loader
        $("#pdf-canvas").show();
        $("#page-loader").hide();

        if (coordinates !== null) {
          drawSpecimen(__CANVAS_CTX, __CANVAS, page_no, coordinates);
          drawBox(__CANVAS_CTX, __CANVAS, page_no, coordinates);
          drawBoxQR(__CANVAS_CTX, __CANVAS, page_no, coordinates);
          drawMeterai(__CANVAS_CTX, __CANVAS, page_no, coordinates);
        }

        var canvaspdf = $("#pdf-canvas");

        $(canvaspdf).imgAreaSelect({
          remove: true,
        });

        $('input[name="x1"]').val(1);
        $('input[name="x2"]').val(1);
        $('input[name="y1"]').val(1);
        $('input[name="y2"]').val(1);
        $('input[name="lower_left_x"]').val(1);
        $('input[name="lower_left_y"]').val(1);
        $('input[name="upper_right_x"]').val(1);
        $('input[name="upper_right_y"]').val(1);

        $(".imgareaselect-selection").css({
          background: "transparent",
        });
      });
    } else if (mode == "METERAI") {
      // Render the page contents in the canvas
      page.render(renderContext).then(function () {
        __PAGE_RENDERING_IN_PROGRESS = 0;

        // Re-enable Prev & Next buttons
        $("#pdf-last2, #pdf-next2, #pdf-prev2, #pdf-first2").removeAttr("disabled", "disabled");

        // Show the canvas and hide the page loader
        $("#pdf-canvas").show();
        $("#page-loader").hide();

        var canvasWidth = document.getElementById("pdf-canvas").clientWidth;
        var canvasHeight = document.getElementById("pdf-canvas").clientHeight;

        if (coordinates !== null) {
          drawSpecimen(__CANVAS_CTX, __CANVAS, page_no, coordinates);
          drawBox(__CANVAS_CTX, __CANVAS, page_no, coordinates);
          drawBoxQR(__CANVAS_CTX, __CANVAS, page_no, coordinates);
          drawMeterai(__CANVAS_CTX, __CANVAS, page_no, coordinates);
        }

        var canvaspdf = $("#pdf-canvas");
        var size = 92;
        if (signer == 0) {
          var imgmeterai = new Image();
          imgmeterai.onload = function () {
            var meteraiheight = imgmeterai.height;
            var meteraiwidth = imgmeterai.width;

            $(canvaspdf).imgAreaSelect({
              aspectRatio: "1:1",
              handles: true,
              show: true,
              resizable: false,
              persistent: true,
              maxHeight: size,
              maxWidth: size,
              minHeight: size,
              minWidth: size,
              onSelectEnd: function (img, selection) {
                var height = parseInt($('input[name="dokumen_height"]').val());
                var width = parseInt($('input[name="dokumen_width"]').val());
                var scale = width / (canvasWidth - 1);

                var lower_left_x = selection.x1 * scale,
                  lower_left_y = height - selection.y2 * scale,
                  upper_right_x = selection.x2 * scale,
                  upper_right_y = height - selection.y1 * scale;

                var diff_x = Math.abs(lower_left_x - upper_right_x),
                  diff_y = Math.abs(lower_left_y - upper_right_y);

                if (diff_x < 1 && diff_y < 1) {
                  $(canvaspdf).imgAreaSelect({
                    x1: $('input[name="x1"]').val(),
                    y1: $('input[name="y1"]').val(),
                    x2: $('input[name="x2"]').val(),
                    y2: $('input[name="y2"]').val(),
                  });
                } else {
                  $('input[name="x1"]').val(selection.x1);
                  $('input[name="x2"]').val(selection.x2);
                  $('input[name="y1"]').val(selection.y1);
                  $('input[name="y2"]').val(selection.y2);
                  $('input[name="lower_left_x"]').val(lower_left_x);
                  $('input[name="lower_left_y"]').val(lower_left_y);
                  $('input[name="upper_right_x"]').val(upper_right_x);
                  $('input[name="upper_right_y"]').val(upper_right_y);
                }
              },
              zIndex: -2,
              borderWidth: 4,
            });

            var is_visible_sign = $("#is_visible_sign").val();
            if (is_visible_sign == "True") {
              var wdth = (size / 658) * canvasWidth;
              var hgth = (meteraiheight * wdth) / meteraiwidth;

              var height = parseInt($('input[name="dokumen_height"]').val());
              var width = parseInt($('input[name="dokumen_width"]').val());
              var scale = width / (canvasWidth - 1);

              if (llx != 0 && lly != 0 && urx != 0 && ury != 0) {
                var lower_left_x = llx,
                  lower_left_y = lly,
                  upper_right_x = urx,
                  upper_right_y = ury;

                var x1 = lower_left_x / scale,
                  x2 = upper_right_x / scale,
                  y1 = (height - upper_right_y) / scale,
                  y2 = (height - lower_left_y) / scale;
              } else {
                var x1 = 30,
                  x2 = 30 + wdth,
                  y1 = canvasHeight - hgth - 30,
                  y2 = canvasHeight - 30;

                var lower_left_x = x1 * scale,
                  lower_left_y = height - y2 * scale,
                  upper_right_x = x2 * scale,
                  upper_right_y = height - y1 * scale;
              }

              $('input[name="x1"]').val(x1);
              $('input[name="x2"]').val(x2);
              $('input[name="y1"]').val(y1);
              $('input[name="y2"]').val(y2);
              $('input[name="lower_left_x"]').val(lower_left_x);
              $('input[name="lower_left_y"]').val(lower_left_y);
              $('input[name="upper_right_x"]').val(upper_right_x);
              $('input[name="upper_right_y"]').val(upper_right_y);

              $(canvaspdf).imgAreaSelect({
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2,
              });
            }

            var digital_signature_path = $("#digital_signature_path").val();
            $(".imgareaselect-selection").css({
              background: "url('" + digital_signature_path + "') center/100% 100% no-repeat",
            });
          };
          imgmeterai.src = $("#digital_signature_path").val();
        }
      });
    } else {
      // Render the page contents in the canvas
      page.render(renderContext).then(function () {
        __PAGE_RENDERING_IN_PROGRESS = 0;

        // Re-enable Prev & Next buttons
        $("#pdf-last2, #pdf-next2, #pdf-prev2, #pdf-first2").removeAttr("disabled", "disabled");

        // Show the canvas and hide the page loader
        $("#pdf-canvas").show();
        $("#page-loader").hide();

        var canvasWidth = document.getElementById("pdf-canvas").clientWidth;
        var canvasHeight = document.getElementById("pdf-canvas").clientHeight;

        if (coordinates !== null) {
          drawSpecimen(__CANVAS_CTX, __CANVAS, page_no, coordinates);
          drawBox(__CANVAS_CTX, __CANVAS, page_no, coordinates);
          drawBoxQR(__CANVAS_CTX, __CANVAS, page_no, coordinates);
          drawMeterai(__CANVAS_CTX, __CANVAS, page_no, coordinates);
        }

        var canvaspdf = $("#pdf-canvas");

        if (signer == 0) {
          var imgsign = new Image();
          imgsign.onload = function () {
            var signheight = imgsign.height;
            var signwidth = imgsign.width;
            $(canvaspdf).imgAreaSelect({
              aspectRatio: signwidth + ":" + signheight,
              handles: true,
              show: true,
              resizable: true,
              persistent: true,
              maxHeight: "unset",
              maxWidth: "unset",
              minHeight: "unset",
              minWidth: "unset",
              onSelectEnd: function (img, selection) {
                var height = parseInt($('input[name="dokumen_height"]').val());
                var width = parseInt($('input[name="dokumen_width"]').val());
                var scale = width / (canvasWidth - 1);

                var lower_left_x = selection.x1 * scale,
                  lower_left_y = height - selection.y2 * scale,
                  upper_right_x = selection.x2 * scale,
                  upper_right_y = height - selection.y1 * scale;

                var diff_x = Math.abs(lower_left_x - upper_right_x),
                  diff_y = Math.abs(lower_left_y - upper_right_y);

                if (diff_x < 1 && diff_y < 1) {
                  $(canvaspdf).imgAreaSelect({
                    x1: $('input[name="x1"]').val(),
                    y1: $('input[name="y1"]').val(),
                    x2: $('input[name="x2"]').val(),
                    y2: $('input[name="y2"]').val(),
                  });
                } else {
                  $('input[name="x1"]').val(selection.x1);
                  $('input[name="x2"]').val(selection.x2);
                  $('input[name="y1"]').val(selection.y1);
                  $('input[name="y2"]').val(selection.y2);
                  $('input[name="lower_left_x"]').val(lower_left_x);
                  $('input[name="lower_left_y"]').val(lower_left_y);
                  $('input[name="upper_right_x"]').val(upper_right_x);
                  $('input[name="upper_right_y"]').val(upper_right_y);
                }
              },
              zIndex: -2,
              borderWidth: 4,
            });

            var is_visible_sign = $("#is_visible_sign").val();
            if (is_visible_sign == "True") {
              var wdth = (200 / 658) * canvasWidth;
              var hgth = (signheight * wdth) / signwidth;

              var height = parseInt($('input[name="dokumen_height"]').val());
              var width = parseInt($('input[name="dokumen_width"]').val());
              var scale = width / (canvasWidth - 1);

              if (llx != 0 && lly != 0 && urx != 0 && ury != 0) {
                var lower_left_x = llx,
                  lower_left_y = lly,
                  upper_right_x = urx,
                  upper_right_y = ury;

                var x1 = lower_left_x / scale,
                  x2 = upper_right_x / scale,
                  y1 = (height - upper_right_y) / scale,
                  y2 = (height - lower_left_y) / scale;
              } else {
                var x1 = 30,
                  x2 = 30 + wdth,
                  y1 = canvasHeight - hgth - 30,
                  y2 = canvasHeight - 30;

                var lower_left_x = x1 * scale,
                  lower_left_y = height - y2 * scale,
                  upper_right_x = x2 * scale,
                  upper_right_y = height - y1 * scale;
              }

              $('input[name="x1"]').val(x1);
              $('input[name="x2"]').val(x2);
              $('input[name="y1"]').val(y1);
              $('input[name="y2"]').val(y2);
              $('input[name="lower_left_x"]').val(lower_left_x);
              $('input[name="lower_left_y"]').val(lower_left_y);
              $('input[name="upper_right_x"]').val(upper_right_x);
              $('input[name="upper_right_y"]').val(upper_right_y);

              $(canvaspdf).imgAreaSelect({
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2,
              });
            }

            var digital_signature_path = $("#digital_signature_path").val();
            $(".imgareaselect-selection").css({
              background: "url('" + digital_signature_path + "') center/100% 100% no-repeat",
            });
          };
          imgsign.src = $("#digital_signature_path").val();
        }
      });
    }
  });
}

function drawSpecimen(__CANVAS_CTX, __CANVAS, page_no, coordinates) {
  var image_specimen = new Image();
  image_specimen.src = url_specimen;
  image_specimen.onload = function () {
    for (var i in coordinates) {
      if (coordinates[i].page == page_no && coordinates[i].type == "SPECIMEN") {
        var height_doc = parseInt($('input[name="dokumen_height"]').val());
        var width_doc = parseInt($('input[name="dokumen_width"]').val());
        var scale_image = width_doc / (__CANVAS.width - 1);

        var lower_left_x_image = coordinates[i].lowerLeftX,
          lower_left_y_image = coordinates[i].lowerLeftY,
          upper_right_x_image = coordinates[i].upperRightX,
          upper_right_y_image = coordinates[i].upperRightY;

        var x1_image = lower_left_x_image / scale_image,
          x2_image = upper_right_x_image / scale_image,
          y1_image = (height_doc - upper_right_y_image) / scale_image,
          y2_image = (height_doc - lower_left_y_image) / scale_image;

        var width_image = x2_image - x1_image,
          height_image = y2_image - y1_image;

        __CANVAS_CTX.drawImage(image_specimen, x1_image, y1_image, width_image, height_image);
      }
    }
  };
}

function drawBox(__CANVAS_CTX, __CANVAS, page_no, coordinates) {
  var image_box = new Image();
  image_box.src = url_box;
  image_box.onload = function () {
    for (var i in coordinates) {
      if (coordinates[i].page == page_no && coordinates[i].type == "BOX") {
        var height_doc = parseInt($('input[name="dokumen_height"]').val());
        var width_doc = parseInt($('input[name="dokumen_width"]').val());
        var scale_image = width_doc / (__CANVAS.width - 1);

        var lower_left_x_image = coordinates[i].lowerLeftX,
          lower_left_y_image = coordinates[i].lowerLeftY,
          upper_right_x_image = coordinates[i].upperRightX,
          upper_right_y_image = coordinates[i].upperRightY;

        var x1_image = lower_left_x_image / scale_image,
          x2_image = upper_right_x_image / scale_image,
          y1_image = (height_doc - upper_right_y_image) / scale_image,
          y2_image = (height_doc - lower_left_y_image) / scale_image;

        var width_image = x2_image - x1_image,
          height_image = y2_image - y1_image;

        __CANVAS_CTX.drawImage(image_box, x1_image, y1_image, width_image, height_image);
      }
    }
  };
}

function drawBoxQR(__CANVAS_CTX, __CANVAS, page_no, coordinates) {
  var image_box_qr = new Image();
  image_box_qr.src = url_box_qr;
  image_box_qr.onload = function () {
    for (var i in coordinates) {
      if (coordinates[i].page == page_no && coordinates[i].type == "BOX-QR") {
        var height_doc = parseInt($('input[name="dokumen_height"]').val());
        var width_doc = parseInt($('input[name="dokumen_width"]').val());
        var scale_image = width_doc / (__CANVAS.width - 1);

        var lower_left_x_image = coordinates[i].lowerLeftX,
          lower_left_y_image = coordinates[i].lowerLeftY,
          upper_right_x_image = coordinates[i].upperRightX,
          upper_right_y_image = coordinates[i].upperRightY;

        var x1_image = lower_left_x_image / scale_image,
          x2_image = upper_right_x_image / scale_image,
          y1_image = (height_doc - upper_right_y_image) / scale_image,
          y2_image = (height_doc - lower_left_y_image) / scale_image;

        var width_image = x2_image - x1_image,
          height_image = y2_image - y1_image;

        __CANVAS_CTX.drawImage(image_box_qr, x1_image, y1_image, width_image, height_image);
      }
    }
  };
}

function drawMeterai(__CANVAS_CTX, __CANVAS, page_no, coordinates) {
  var image_meterai = new Image();
  image_meterai.src = url_meterai;
  image_meterai.onload = function () {
    for (var i in coordinates) {
      if (coordinates[i].page == page_no && coordinates[i].type == "METERAI") {
        var height_doc = parseInt($('input[name="dokumen_height"]').val());
        var width_doc = parseInt($('input[name="dokumen_width"]').val());
        var scale_image = width_doc / (__CANVAS.width - 1);

        var lower_left_x_image = coordinates[i].lowerLeftX,
          lower_left_y_image = coordinates[i].lowerLeftY,
          upper_right_x_image = coordinates[i].upperRightX,
          upper_right_y_image = coordinates[i].upperRightY;

        var x1_image = lower_left_x_image / scale_image,
          x2_image = upper_right_x_image / scale_image,
          y1_image = (height_doc - upper_right_y_image) / scale_image,
          y2_image = (height_doc - lower_left_y_image) / scale_image;

        var width_image = x2_image - x1_image,
          height_image = y2_image - y1_image;

        __CANVAS_CTX.drawImage(image_meterai, x1_image, y1_image, width_image, height_image);
      }
    }
  };
}

// Upon click this should should trigger click on the #file-to-upload file input element
// This is better than showing the not-good-looking file input element
$("#upload-button").on("click", function () {
  $("#file-to-upload").trigger("click");
});

// When user chooses a PDF file
$("#file-to-upload").on("change", function () {
  // Validate whether PDF
  if (["application/pdf"].indexOf($("#file-to-upload").get(0).files[0].type) == -1) {
    alert("Error : Not a PDF");
    return;
  }

  $("#upload-button").hide();

  // Send the object url of the pdf
  showPDF(URL.createObjectURL($("#file-to-upload").get(0).files[0]));
});

// Previous page of the PDF
$("#pdf-prev2").on("click", function () {
  if (__CURRENT_PAGE != 1) showPage(--__CURRENT_PAGE);
});

// First page of the PDF
$("#pdf-first2").on("click", function () {
  if (__CURRENT_PAGE != 1) showPage(1);
});

// Last page of the PDF
$("#pdf-last2").on("click", function () {
  if (__CURRENT_PAGE != __TOTAL_PAGES) showPage(__TOTAL_PAGES);
});

// Next page of the PDF
$("#pdf-next2").on("click", function () {
  if (__CURRENT_PAGE != __TOTAL_PAGES) showPage(++__CURRENT_PAGE);
  // console.log(__CURRENT_PAGE);
});

$(".pdf-current-page").on("change", function () {
  var page = parseInt(this.value);
  var total = parseInt($("#pdf-total-pages2").text());

  if (isNaN(page)) page = 1;
  else if (page < 1) page = 1;
  else if (page > total) page = total;
  else page = page;

  $(".pdf-current-page").val(page);
  showPage(page);
});
