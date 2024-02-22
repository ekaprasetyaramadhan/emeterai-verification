var panelSatu = document.getElementById("panel-satu");
var panelDua = document.getElementById("panel-dua");

var submitKyc = document.getElementById("submitKyc");
var btnLoading = document.getElementById("btnLoading");
var resubmitKyc = document.getElementById("resubmitKyc");
var loadingText = document.getElementById("loadingText");

var captionContainer = document.getElementById("captionContainer");
var uploadIndicator = document.getElementById("uploadIndicator");
var messageText = document.getElementById("messageText");

var selfVideo = document.getElementById("selfVideo");
var replayVideo = document.getElementById("replayVideo");
var enableCamera = document.getElementById("enableCamera");
var videoContainer = document.getElementById("videoContainer");

var iosWarning = document.getElementById("iosWarning");
var macOsWarning = document.getElementById("macOsWarning");

var openMouth = document.getElementById("openMouth");
var closeMouth = document.getElementById("closeMouth");
var openEye = document.getElementById("openEye");
var openEye2 = document.getElementById("openEye2");
var saySentence1 = document.getElementById("saySentence1");
var saySentence2 = document.getElementById("saySentence2");

var startRecord = document.getElementById("startRecord");
var btnCancel = document.getElementById("btnCancel");
var restartRecord = document.getElementById("restartRecord");

var enableButton = false;
var recorder;

var responseText = document.getElementById("responseText");
var base64Video = document.getElementById("base64Video");

var imageFile;
var videoFile;
var imageFiles;
var videoFiles;

if (isSafari) {
  if (window.innerHeight < window.innerWidth) macOsWarning.style.display = "block";
  else iosWarning.style.display = "block";
}

enableCamera.onclick = function () {
  panelSatu.style.display = "none";
  panelDua.style.display = "block";

  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then(function (stream) {
        selfVideo.srcObject = stream;
      })
      .catch(function (error) {
        alert(
          "Kamera tidak terdeteksi. Mohon berikan izin saat web browser meminta akses ke kamera. Selain itu, mohon gunakan web browser versi terbaru, seperti: Safari untuk perangkat iOS, Google Chrome dan Mozila Firefox untuk perangkat lain."
        );
        window.location = "account-verification";
      });
  }
};

restartRecord.onclick = function () {
  restartRecord.style.display = "none";
  startRecord.style.display = "block";
  btnCancel.style.display = "block";
  videoContainer.style.display = "block";
  replayVideo.style.display = "none";
  selfVideo.style.display = "block";
  submitKyc.style.display = "none";
  btnLoading.style.display = "none";

  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then(function (stream) {
        selfVideo.srcObject = stream;
      })
      .catch(function (error) {
        alert(
          "Kamera tidak terdeteksi. Mohon berikan izin saat web browser meminta akses ke kamera. Selain itu, mohon gunakan web browser versi terbaru, seperti: Safari untuk perangkat iOS, Google Chrome dan Mozila Firefox untuk perangkat lain."
        );
        window.location = "account-verification";
      });
  }
};

startRecord.onclick = function (event) {
  startRecord.style.display = "none";
  btnCancel.style.display = "none";
  var button = this;

  var commonConfig = {
    onMediaCaptured: function (stream) {
      button.stream = stream;

      if (button.mediaCapturedCallback) {
        button.mediaCapturedCallback();
      }
    },
    onMediaCapturingFailed: function (error) {
      if (window.innerHeight < window.innerWidth)
        alert(
          "Kamera gagal merekam. Untuk perangkat MacOS harap mengaktifkan fitur MediaRecorder, melalui menu: Safari > Preferences > Advanced. Kemudian, aktifkan opsi 'Show Develop menu in menu bar'. Kemudian, pilih menu Develop > Experimental Features > MediaRecorder."
        );
      else alert("Kamera gagal merekam. Untuk perangkat iOS harap mengaktifkan fitur MediaRecorder, melalui menu: Settings > Safari > Advanced > Experimental Features > MediaRecorder.");

      window.location = "account-verification";
    },
  };

  captureVideo(commonConfig);

  button.mediaCapturedCallback = function () {
    button.recordRTC = RecordRTC(button.stream, {
      type: "video",
      mimeType: isSafari ? "video/mp4" : "video/webm;codecs=vp8",
      videoBitsPerSecond: 512000, //JRM ::  BitRate, ADjust with SAVE.PHP line 88 +
      bitrate: 512000, //JRM :: BitRate, ADjust with SAVE.PHP line 88 +
      canvas: {
        width: 480,
        height: 640,
      },
      frameRate: 24, // FPS
      frameInterval: 24, // FPS bagi CanvasRecord/WhammyRecorder
    });

    setTimeout(function () {
      openEye.style.display = "block";
    }, 1000);

    setTimeout(function () {
      openEye.style.display = "none";
      openEye2.style.display = "block";
    }, 3000);

    setTimeout(function () {
      openEye2.style.display = "none";
      openMouth.style.display = "block";
    }, 6000);

    setTimeout(function () {
      openMouth.style.display = "none";
      closeMouth.style.display = "block";
    }, 8000);

    button.recordRTC.setRecordingDuration(9 * 1000).onRecordingStopped(function () {
      closeMouth.style.display = "none";

      replayVideo.style.display = "block";
      selfVideo.style.display = "none";

      var blob = this.getBlob();

      window.fileName = getFileName(isSafari ? "mp4" : "webm");

      if (isSafari) {
        var v = navigator.appVersion.match(/Version\/(\d+).(\d+).?(\d+)?/);
        var iosVersion = parseInt(v[1] || 0, 10) + "." + parseInt(v[2] || 0, 10) + "." + parseInt(v[3] || 0, 10);

        var formData = new FormData();
        formData.append("orientation", window.innerHeight < window.innerWidth ? "landscape" : "potrait");
        formData.append("isSafari", isSafari);
        formData.append("filename", fileName);
        formData.append("blob", blob);
        formData.append("iosVersion", iosVersion);

        xhrUpload("https://webapp.peruri.co.id/ekyc/convert", formData, function (response) {
          var resp = response.split(",")[0];

          if (resp == "ERROR") {
            messageText.innerHTML = response.split(",")[1];
          } else {
            captionContainer.style.display = "block";
            videoContainer.style.display = "block";
            uploadIndicator.style.display = "none";

            //selfVideo.srcObject = null;
            replayVideo.src = null;
            replayVideo.src = response;
            replayVideo.load();

            setBase64Value(response.split(",")[1]);
          }
        });
      } else {
        replayVideo.src = null;
        replayVideo.src = URL.createObjectURL(blob);
        replayVideo.load();

        blobToBase64(blob).then((res) => {
          setBase64Value(res.split(",")[1]);
        });
      }
    });

    button.recordRTC.startRecording();
  };
};

submitKyc.onclick = function () {
  panelSatu.style.display = "none";
  panelDua.style.display = "block";
  submitKyc.style.display = "none";
  btnLoading.style.display = "block";
};

function setBase64Value(base64) {
  restartRecord.style.display = "block";
  submitKyc.style.display = "block";
  btnLoading.style.display = "none";
  base64Video.value = base64;
}

const blobToBase64 = (blob) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
};

function captureVideo(config) {
  captureUserMedia(
    {
      video: true,
      audio: false,
    },
    function (videoStream) {
      selfVideo.srcObject = videoStream;
      config.onMediaCaptured(videoStream);

      videoStream.onended = function () {
        config.onMediaStopped();
      };
    },
    function (error) {
      config.onMediaCapturingFailed(error);
    }
  );
}

function captureUserMedia(mediaConstraints, successCallback, errorCallback) {
  navigator.mediaDevices.getUserMedia(mediaConstraints).then(successCallback).catch(errorCallback);
}

function xhrUpload(url, data, callback) {
  var request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      callback(request.responseText);
      return;
    }
  };

  request.upload.onloadstart = function () {
    captionContainer.style.display = "none";
    videoContainer.style.display = "none";
    uploadIndicator.style.display = "block";
    messageText.innerHTML = "Sedang mengupload...";
  };

  request.upload.onprogress = function () {
    messageText.innerHTML = "Sedang mengupload... (" + Math.round((event.loaded / event.total) * 100) + "%)";
  };

  request.upload.onload = function () {
    messageText.innerHTML = "Upload selesai... sedang mengambil video...";
  };

  request.upload.onerror = function () {
    messageText.innerHTML = "Proses upload gagal dilakukan.";
  };

  request.upload.onabort = function () {
    messageText.innerHTML = "Proses upload dibatalkan.";
  };

  request.open("POST", url);
  request.send(data);
}

function getFileName(fileExtension) {
  var d = new Date();
  var year = d.getUTCFullYear();
  var month = d.getUTCMonth();
  var date = d.getUTCDate();
  return "WebRecord-" + year + month + date + "-" + getRandomString() + "." + fileExtension;
}

function getRandomString() {
  if (window.crypto && window.crypto.getRandomValues && navigator.userAgent.indexOf("Safari") === -1) {
    var a = window.crypto.getRandomValues(new Uint32Array(3)),
      token = "";
    for (var i = 0, l = a.length; i < l; i++) {
      token += a[i].toString(36);
    }
    return token;
  } else {
    return (Math.random() * new Date().getTime()).toString(36).replace(/\./g, "");
  }
}
