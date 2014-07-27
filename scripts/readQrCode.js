// Read qr codes with the user-media web camera

var decode = require('jsqrcode-lite');
var video = require("./userMedia.js");

var FINDER_DELAY = 1000;

var initQRCanvas = function (receiveQR) {
  var canvasElement = document.createElement("canvas");
  canvasElement.id = "qr-canvas";
  document.body.appendChild(canvasElement);;
  // We could create this instead of refering to it
  var width = 800, height = 600;
  canvasElement.style.width = width + "px";
  canvasElement.style.height = height + "px";
  canvasElement.width = width;
  canvasElement.height = height;
  var gCtx = canvasElement.getContext("2d");
  gCtx.clearRect(0, 0, width, height);

  // This function maps the videoObject and the canvas together
  var captureFunc = function(videoObject, captureTestObj) {
    try {
      gCtx.drawImage(videoObject, 0, 0);
      try {
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
            video.stopCapture(videoObject);
            // Call the user function
            receiveQR(qrData);
          }
        );
      }
      catch(e){       
        console.log(e);
        if (captureTestObj.isOn) {
          setTimeout(function () { 
            captureFunc(videoObject, captureTestObj); 
          }, FINDER_DELAY);
        }
        else {
          video.stopCapture(videoObject);
        }
      };
    }
    catch(e){       
      console.log(e);
      if (captureTestObj.isOn) {
        setTimeout(function () { 
          captureFunc(videoObject, captureTestObj); 
        }, FINDER_DELAY);
      }
      else {
        video.stopCapture(videoObject);
      }
    };
  };
  return captureFunc;
}

// Capture the QR code by making a video in the videoId div and send
// the one argument to the receiveQR function
exports.capture = function (videoId, receiveQR) {
  var captureToCanvasFn = initQRCanvas(receiveQR);
  // Now initialise the camera and when the video works have the QR code
  // reader kick in
  var vidDiv = document.getElementById(videoId);
  vidDiv.innerHTML = "<video id=\"vid\" autoplay=\"0\"></video>"; 
  var videoObject = document.getElementById("vid");
  var captureOnObj = { isOn: true }; // closed var used to turn everything off
  video.doGetUserMedia(
    videoObject,
    // Success function is called when the video works
    function () {
      captureToCanvasFn(videoObject, captureOnObj);
    }
  );
  // Return a function to turn the capture off
  var stopFunc = function () {
    console.log("turn off function called");
    captureOnObj.isOn = false;
  };
  return stopFunc;
};

// readQrCode.js ends here
