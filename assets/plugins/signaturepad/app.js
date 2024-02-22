var wrapper = document.getElementById("signature-pad");
var clearButton = wrapper.querySelector("[data-action=clear]");
var changeColorButton = wrapper.querySelector("[data-action=change-color]");
var undoButton = wrapper.querySelector("[data-action=undo]");
var savePNGButton = wrapper.querySelector("[data-action=save-png]");
var saveJPGButton = wrapper.querySelector("[data-action=save-jpg]");
var saveSVGButton = wrapper.querySelector("[data-action=save-svg]");
var canvas = wrapper.querySelector("canvas");
var signaturePad = new SignaturePad(canvas, {
  // It's Necessary to use an opaque color when saving image as JPEG;
  // this option can be omitted if only saving as PNG or SVG
  backgroundColor: 'transparent',
  penColor: 'rgb(41, 87, 165)'
});

// Adjust canvas coordinate space taking into account pixel ratio,
// to make it look crisp on mobile devices.
// This also causes canvas to be cleared.
function resizeCanvas() {
  // When zoomed out to less than 100%, for some very strange reason,
  // some browsers report devicePixelRatio as less than 1
  // and only part of the canvas is cleared then.
  var ratio = Math.max(window.devicePixelRatio || 1, 1);

  // This part causes the canvas to be cleared
  canvas.width = canvas.offsetWidth * ratio;
  canvas.height = canvas.offsetHeight * ratio;
  canvas.getContext("2d").scale(ratio, ratio);

  // This library does not listen for canvas changes, so after the canvas is automatically
  // cleared by the browser, SignaturePad#isEmpty might still return false, even though the
  // canvas looks empty, because the internal data of this library wasn't cleared. To make sure
  // that the state of this library is consistent with visual state of the canvas, you
  // have to clear it manually.
  signaturePad.clear();
}

// On mobile devices it might make more sense to listen to orientation change,
// rather than window resize events.
window.onresize = resizeCanvas;
resizeCanvas();

function download(dataURL, filename) {
  if (navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") === -1) {
    window.open(dataURL);
  } else {
    var blob = dataURLToBlob(dataURL);
    var url = window.URL.createObjectURL(blob);

    var a = document.createElement("a");
    a.style = "display: none";
    a.href = url;
    a.download = filename;

    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
  }
}

// One could simply use Canvas#toBlob method instead, but it's just to show
// that it can be done using result of SignaturePad#toDataURL.
function dataURLToBlob(dataURL) {
  // Code taken from https://github.com/ebidel/filer.js
  var parts = dataURL.split(';base64,');
  var contentType = parts[0].split(":")[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;
  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], {
    type: contentType
  });
}

function cropImageFromCanvas(ctx, canvas) {

  var w = canvas.width,
    h = canvas.height,
    pix = {
      x: [],
      y: []
    },
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height),
    x, y, index;

  for (y = 0; y < h; y++) {
    for (x = 0; x < w; x++) {
      index = (y * w + x) * 4;
      if (imageData.data[index + 3] > 0) {

        pix.x.push(x);
        pix.y.push(y);

      }
    }
  }
  pix.x.sort(function (a, b) {
    return a - b
  });
  pix.y.sort(function (a, b) {
    return a - b
  });
  var n = pix.x.length - 1;

  w = pix.x[n] - pix.x[0];
  h = pix.y[n] - pix.y[0];
  var cut = ctx.getImageData(pix.x[0], pix.y[0], w, h);

  canvas.width = w;
  canvas.height = h;
  ctx.putImageData(cut, 0, 0);

  var image = canvas.toDataURL();


}
clearButton.addEventListener("click", function (event) {
  signaturePad.clear();
});

undoButton.addEventListener("click", function (event) {
  var data = signaturePad.toData();

  if (data) {
    data.pop(); // remove the last dot or line
    signaturePad.fromData(data);
  }
});

// changeColorButton.addEventListener("click", function (event) {
//   var r = Math.round(Math.random() * 255);
//   var g = Math.round(Math.random() * 255);
//   var b = Math.round(Math.random() * 255);
//   var color = "rgb(" + r + "," + g + "," + b +")";

//   signaturePad.penColor = color;
// });

savePNGButton.addEventListener("click", function (event) {
  if (signaturePad.isEmpty()) {
    alert("Please provide a signature first.");
  } else {
    var ctx = canvas.getContext('2d');
    cropImageFromCanvas(ctx, canvas);
    var dataURL = signaturePad.toDataURL();
    var base64data = dataURL.split(',')[1];
    var inputFinish1 = document.getElementById('inputFinish1');
    var inputFinish2 = document.getElementById('inputFinish2');
    var signatureBase64 = document.getElementById('signatureBase64');
    var specimentImage = document.getElementById('specimentImage');

    inputFinish1.style.display = 'none';
    inputFinish2.style.display = 'block';
    signatureBase64.value = base64data;
    specimentImage.src = "data:image/png;base64," + base64data;

    // download(dataURL, "signature.png");
    // location.reload();
  }
});

// saveJPGButton.addEventListener("click", function (event) {
//   if (signaturePad.isEmpty()) {
//     alert("Please provide a signature first.");
//   } else {
//     var dataURL = signaturePad.toDataURL("image/jpeg");
//     download(dataURL, "signature.jpg");
//   }
// });

// saveSVGButton.addEventListener("click", function (event) {
//   if (signaturePad.isEmpty()) {
//     alert("Please provide a signature first.");
//   } else {
//     var dataURL = signaturePad.toDataURL('image/svg+xml');
//     download(dataURL, "signature.svg");
//   }
// });