// P2P poker

var util = require("util");
var $ = require("jquery-browserify");
var qrCode = require("qrcode-npm");
var qrCodeRead = require("./readQrCode.js");
var PeerJs = require("./peerx.js");

var apiKey = "ntq9engji39grpb9";
var sessionId = 1;
var peerIdDefaults = {
  debugMasterPeerId: 10001,
  debugSlavePeerId: 10002
};
var peer = PeerJs.makePeer(apiKey, peerIdDefaults);
var htmlLog = function (args) {
  if (arguments.length == 1) {
    $("#console").append(util.format("<li>%j</li>", args));
  }
  else {
    for (i in arguments) {
      var arg = arguments[i];
      $("#console").append(util.format("<li>%j</li>", arg));
    }
  }
};

var onData = function (dataCon, data) {
  var fmt = util.format("data: %s", data);
  console.log("onData", data);
};

// What to do when a data connection is opened
var onConOpen = function (dataCon, next) {
  console.log("onConOpen", dataCon);
  dataCon.on("data", function (data) { onData(dataCon, data); });
  if (next) { next(); }
};

// Receive a peerId and become the master or a slave via a QR
var start = function (peerId) {
  // Make a qr code of the ID so we can give it to the other user
  var qr = qrCode.qrcode(4, 'M');
  qr.addData(peerId);
  qr.make();
  $("#qrcode").html(qr.createImgTag(8));

  // Setup the camera to decode a QR code of the other side
  var abortCameraFn = qrCodeRead.capture(
    "vidCap",
    function (receivedQR) {
      $("#connect").toggle({duration: 400});
      var dataConn = peer.connect(receivedQR);
      dataConn.on('open', onConOpen, function () {
        dataConn.send({ session: sessionId, 
                        verb: "GET", 
                        uri: "master|check" });
      });
    }
  );

  // Listen from a connection from the QR decode side
  peer.on(
    "connection", 
    function(dataConn) { 
      $("#connect").toggle({duration: 400});
      abortCameraFn();
      dataConn.on("open", onConOpen);
    }
  );
  
  // Open the connect display
  $("#connect").toggle({duration: 400});
};


// Initiate the peer connection to get a peer-id or use the debug stuff
if (peer.id == peerIdDefaults.debugSlavePeerId) {
  var dataCon = peer.connect(peerIdDefaults.debugMasterPeerId);
  dataCon.on("open", function (dc) { 
    onConOpen(dataCon, function () {
      dataCon.send({ session: sessionId, 
                     verb: "GET", 
                     uri: "master|check" });
    });
  });
}
else if (peer.id == peerIdDefaults.debugMasterPeerId) {
  peer.on("connection", function (dc) { 
    dc.on("open", function () { onConOpen(dc); });
  });
}
else {
  peer.on('open', start);
}


// And now the cards
var bpg_cards = require ("./bpg-cards.js");
var PlayingCard = bpg_cards.card_init(document);


// example.js ends here
