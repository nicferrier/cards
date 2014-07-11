// read qr codes with the user-media web camera

var decode = require('jsqrcode-lite');
var video = require("./userMedia.js");

var FINDER_DELAY = 500;

var initQRCanvas = function (width, height, receiveQR) {
  // We could create this instead of refering to it
  var gCanvas = document.getElementById("qr-canvas"); 
  gCanvas.style.width = width + "px";
  gCanvas.style.height = height + "px";
  gCanvas.width = width;
  gCanvas.height = height;
  var gCtx = gCanvas.getContext("2d");
  gCtx.clearRect(0, 0, width, height);

  // This function maps the videoObject and the canvas together
  var func = function(videoObject) {
    try {
      gCtx.drawImage(videoObject, 0, 0);
      try{
        var dataBytes = gCtx.getImageData(0, 0, width, height).data;
        // This is a sucky way to do this, it would be better to alter
        // jsqrcode-lite to export more
        var args = {
          height: height,
          width: width,
          data: dataBytes
        };
        decode(
          args,
          function (qrData)  {
            // Turn off the video
            videoObject.pause();
            // Call the user function
            receiveQR(qrData);
          }
        );
      }
      catch(e){       
        console.log(e);
        setTimeout(function () { func(videoObject); }, FINDER_DELAY);
      };
    }
    catch(e){       
      console.log(e);
      setTimeout(function () { func(videoObject); }, FINDER_DELAY);
    };
  };
  return func;
}

// Capture the QR code by making a video in the videoId div and send
// the one argument to the receiveQR function
exports.capture = function (width, height, videoId, receiveQR) {
  var captureToCanvas = initQRCanvas(width, height, receiveQR);
  
  // Now initialise the camera and when the video works have the QR code
  // reader kick in
  var vidDiv = document.getElementById(videoId);
  vidDiv.innerHTML = "<video id=\"vid\" autoplay=\"0\"></video>"; 
  var videoObject = document.getElementById("vid");
  video.doGetUserMedia(
    videoObject,
    // Success function is called when the video works
    function () {
      captureToCanvas(videoObject);
    }
  );
};

// readQrCode.js ends here
