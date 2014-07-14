// P2P poker

var util = require("util");
var $ = require("jquery-browserify");
var qrCode = require("qrcode-npm");
var qrCodeRead = require("./readQrCode.js");

var PeerJs = require("./peer.js");
var Peer = PeerJs.Peer;
var peer = (function () {
  if (document.location.search == "?master") {
    return new Peer(10001, { key: "ntq9engji39grpb9", debug: 1 });
  }
  else if (document.location.search == "?slave") {
    return new Peer(10002, { key: "ntq9engji39grpb9", debug: 1 });
  }
  else {
    return new Peer({ key: "ntq9engji39grpb9", debug: 1 });
  }
})();

function htmlLog(args) {
  if (arguments.length == 1) {
    $("#console").append(util.format("<li>%j</li>", args));
  }
  else {
    for (i in arguments) {
      var arg = arguments[i];
      $("#console").append(util.format("<li>%j</li>", arg));
    }
  }
}

var onData = function (dataCon, data, from) {
  var fmt = util.format("data (%s): %s", from, data);
  console.log(fmt);
  htmlLog("dataCon.on", fmt);
};

// What to do when a data connection is opened
var onConOpen = function (dataCon, from) {
  console.log("open from ", from);
  dataCon.on("data", function (data) { onData(dataCon, data, from); });
  dataCon.send(util.format( "some data from con open via %s", from));
};

// Receive the random peer-id then start the poker game with a peer
// 
// The peer communicates with us by sending us a communication,
// presumably after reading our peer-id-QR, or by us reading the peer-id
// with a QR detect.
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
      dataConn.on('open', function () { onConOpen(dataConn, "1");});
      dataConn.on("data", function (data) { onData(dataConn, data, "1"); });
      dataConn.send(util.format("some data from the QR side %s", receivedQR));
    }
  );

  // Receive a connection from the QR decode side
  peer.on(
    "connection", 
    function(dataConn) { 
      $("#connect").toggle({duration: 400});
      abortCameraFn();
      dataConn.on("open", function () { onConOpen(dataConn, "2"); });
      dataConn.on("data", function (data) { onData(dataConn, data, "2"); });
      dataConn.send(util.format("some data from the non-QR side %s", peer.id));
    }
  );
  
  $("#connect").toggle({duration: 400});
};

// Initiate the peer connection to get a peer-id
peer.on('open', start);

// And now the cards
var bpg_cards = require ("./bpg-cards.js");
var PlayingCard = bpg_cards.card_init(document);

// example.js ends here
