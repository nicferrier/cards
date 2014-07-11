// P2P poker

var util = require("util");
var $ = require("jquery-browserify");
var qrCode = require("qrcode-npm");
var qrCodeRead = require("./readQrCode.js");

var PeerJs = require("./peer.js");
var Peer = PeerJs.Peer;
var peer = new Peer({
    key: "ntq9engji39grpb9",
    debug: 1
  }
);


// What to do when we a connection is opened
var onConOpen = function (con, remoteId) {
  con.on(
    'data', 
    function (data) {
      console.log(util.format("data from %s: %s", remoteId, data));
    }
  );
  var value = $("#peerid").text();
  con.send("my id is: " + value);
};

// Receive the random peer-id then start the poker game with a peer
// 
// The peer communicates with us by sending us a communication,
// presumably after reading our peer-id-QR, or by us reading the peer-id
// with a QR detect.
var start = function (id) {
  // Make a qr code of the ID so we can give it to the other user
  var qr = qrCode.qrcode(4, 'M');
  qr.addData(id);
  qr.make();
  $("#qrcode").html(qr.createImgTag(8));
  
  // Setup the camera to capture a QR code of the other side
  qrCodeRead.capture(
    "vidCap",
    function (receivedQR) {
      // alert(util.format("received the QR - %s", receivedQR));
      $("#connect").toggle({duration: 400});
      var con = peer.connect(receivedQR);
      con.on('open', function (rid) { onConOpen(con, rid);});
    }
  );
  $("#connect").toggle({duration: 400});
};

// Initiate the peer connection to get a peer-id
peer.on('open', start);

peer.on(
  'connection', 
  function(con) { con.on("open", function (rid) { onConOpen(con, rid);});}
);


var bpg_cards = require ("./bpg-cards.js");
var PlayingCard = bpg_cards.card_init(document);

// example.js ends here
