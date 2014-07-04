// deal cards

// this clash detect algorithm sucks
// how about this idea instead?
// 
//   var d = {}; for(var i = 0; i < 12; i++) {d[i]=i;}
// 
// now choose d[random(d.length)]
// then delete that index from d
// keep one d for each suit
// 
// so gradually the options reduce instead of maintaining the same
// chance every time.


var util = require("util");

// Like Emacs Lisp random
function nic_random (n) {
  return Math.floor(n/100 * Math.floor(Math.floor(Math.random() * 100)));
}


// Function to capture a deck and return a dealer for the deck
function make_dealer () {
  var values = {
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "10",
    11: "J",
    12: "Q",
    13: "K"
  };

  var suits = {
    0: "clubs",
    1: "diamonds",
    2: "hearts",
    3: "spades"
  };

  var deck = {};
  // Fill the deck
  for (var i = 0; i < 4; i++) {
    for (var k in values) {
      deck[util.format("%s,%s", suits[i], k)] = { 
        "suit": suits[i], 
        "value": values[k]
      };
    }
  }

  var dealer = function () {
    var deck_keys = Object.keys(deck);
    if (deck_keys.length > 0) {
      var index = nic_random (deck_keys.length);
      var key = deck_keys [index];
      var card = deck [key];
      delete deck [key];
      return card;
    }
    else {
      return {};
    }
  };
  return dealer;
}

test_deal = function () {
  var dealer = make_dealer ();
  for (var i = 0; i < 60; i++) {
    var card = dealer();
    console.log(card);
  }
}

test_deal();

// End
