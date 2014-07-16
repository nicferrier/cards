// Extensions to peer.js - this is just a grab bag utility extension module

var p = require("./peer.js");

// Create a Peer mocking the peer.id from the document query if supplied
var makePeerFromDocument = function (apiKey, peerIdValues) {
  if (document.location.search.indexOf("?master=") == 0) {
    peerIdValues.debugSlavePeerId 
      = /[?&]master=([0-9]+)/.exec(document.location.search)[1];
    return new p.Peer(
      peerIdValues.debugMasterPeerId, 
      { key: apiKey, debug: 1 }
    );
  }
  else if (document.location.search.indexOf("?slave") == 0) {
    peerIdValues.debugSlavePeerId 
      = /[?&]slave=([0-9]+)/.exec(document.location.search)[1];
    return new p.Peer(
      peerIdValues.debugSlavePeerId, 
      { key: apiKey, debug: 1 }
    );
  }
  else {
    return new p.Peer({ key: apiKey, debug: 1 });
  }
};

p.makePeer = makePeerFromDocument;
module.exports = p;

// peerx.js ends here
