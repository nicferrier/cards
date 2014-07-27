// Abstract usermedia stuff a little
var util = require("util");

// Find a camera, ideally an environment facing one, to capture the
// QR code.
//  
// Pass the id of the chosen stream to pickFn
function getEnvironmentCamera (pickFn) {
  try {
    var mediaTrackFunc = MediaStreamTrack.getSources;
    if (typeof(mediaTrackFunc) != "function") {
      pickFn();
    }
    else {
      mediaTrackFunc(
        function (sources) { 
          var cameras = sources.filter(
            function (e) { 
              return e.kind == "video";
            });

          // htmlLog("cameras:", cameras);

          var envFacing = cameras.filter(
            function (e) { 
              return e.facing == "environment";
            });

          // htmlLog("away cameras:", envFacing);
          // console.log("env facing ", envFacing, "cameras ", cameras);

          if (typeof(pickFn) == "function") {
            if (envFacing.length > 0) {
              pickFn(envFacing[0].id);
            }
            else {
              // If there are no cameras we should error
              pickFn(cameras[0].id);
            }
          }
        });
    }
  }
  catch (e) {
    console.log("userMedia.js ", e);
  }
}

function streamSuccess(stream, videoObject, browserType, successFn) {
  if(browserType == "webkit") {
    videoObject.src = window.webkitURL.createObjectURL(stream);
  }
  else {
    if(browserType == "moz") {
      videoObject.mozSrcObject = stream;
      videoObject.play();
    }
    else {
      videoObject.src = stream;
    }
  }
  if (typeof(successFn) == "function") {
    setTimeout (successFn, 500);
  }
}
		
function error(error) {
    return;
}

// Take a video DOM element and turn on user media for it
//
// Optionally an onSuccess function which is called when the user
// media stream works
function getUserMediaWithStream(videoObject, onSuccess, streamId) {
  var constraints 
    = ((streamId) ? 
       { video: { optional: [{ sourceId: streamId }]}, audio: false } 
       : { video: true, audio: false });
  // htmlLog(constraints);
  if(navigator.getUserMedia) {
    navigator.getUserMedia(
      constraints,
      function (stream) {
        streamSuccess(stream, videoObject, "", onSuccess);
      }, 
      error);
  }
  else {
    if(navigator.webkitGetUserMedia) {
      navigator.webkitGetUserMedia(
        constraints,
        function (stream) {
          streamSuccess(stream, videoObject, "webkit", onSuccess);
        },
        error);
    }    
    else {
      if(navigator.mozGetUserMedia) {
        navigator.mozGetUserMedia(
          constraints,
          function (stream) {
            streamSuccess(stream, videoObject, "moz", onSuccess);
          }, 
          error);
      }
    }
  }
}

function doGetUserMedia (videoObject, onSuccess) {
  getEnvironmentCamera(
    function (selectedCamera) {
      // htmlLog("getUserMedia selected", selectedCamera);
      getUserMediaWithStream(videoObject, onSuccess, selectedCamera);
    }
  );
}

function stopCapture (videoObject) {
  videoObject.pause();
  try {
    videoObject.mozSrcObject = null;
  }
  catch (e) {
    try {
      videoObject.src = "";
    }
    catch (e) {
    }
  }
};


exports.doGetUserMedia = doGetUserMedia;
exports.stopCapture = stopCapture;

// userMedia.js ends here
