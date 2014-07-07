/*
 * BwinParty Playing Cards
 * 
 * Copyright (C) 2014 by bwinparty
 * 
 * This is an HTML5 WebComponent element for playing cards.
 * 
 * The styles required for the WebComponent are embedded in the
 * document by this library.
 */

var Platform = require("polyfill-webcomponents");
var util = require("util");

var cssText = ".card {\
    background-image: url('/img/cardback.gif');\
    border-color: #808080 #000000 #000000 #808080;\
    border-width: 1px;\
    border-style: solid;\
    color: #000000;\
    font-size: 20pt;\
    position: absolute;\
    width:  3.75em;\
    height: 5.00em;\
}\
\
.front {\
    background-color: #ffffff;\
    color: #000000;\
    position: absolute;\
    width: 100%;\
    height: 100%;\
}\
\
.face {\
    border: 1px solid #000000;\
    position: absolute;\
    left: 0.60em;\
    top:  0.45em;\
    width:  2.6em;\
    height: 4.0em;\
}\
\
.red { \
    color: #ff0000; \
}\
\
.index {\
    font-size: 50%;\
    font-weight: bold;\
    text-align: center;\
    position: absolute;\
    left: 0.25em;\
    top:  0.25em;\
}\
\
.ace {\
    font-size: 300%;\
    position: absolute;\
    left: 0.225em;\
    top:  0.250em;\
}\
\
.spotA1 { position: absolute; left: 0.60em; top: 0.5em; }\
.spotA2 { position: absolute; left: 0.60em; top: 1.5em; }\
.spotA3 { position: absolute; left: 0.60em; top: 2.0em; }\
.spotA4 { position: absolute; left: 0.60em; top: 2.5em; }\
.spotA5 { position: absolute; left: 0.60em; top: 3.5em; }\
.spotB1 { position: absolute; left: 1.55em; top: 0.5em; }\
.spotB2 { position: absolute; left: 1.55em; top: 1.0em; }\
.spotB3 { position: absolute; left: 1.55em; top: 2.0em; }\
.spotB4 { position: absolute; left: 1.55em; top: 3.0em; }\
.spotB5 { position: absolute; left: 1.55em; top: 3.5em; }\
.spotC1 { position: absolute; left: 2.50em; top: 0.5em; }\
.spotC2 { position: absolute; left: 2.50em; top: 1.5em; }\
.spotC3 { position: absolute; left: 2.50em; top: 2.0em; }\
.spotC4 { position: absolute; left: 2.50em; top: 2.5em; }\
.spotC5 { position: absolute; left: 2.50em; top: 3.5em; }\
";

// A JS example of using this...
//  var elem = new PlayingCard();
//  document.body.appendChild(elem);

var bpg_cards = 
  (function () {
     // Setup the styles
     var styleE = document.createElement("style");
     styleE.type = "text/css";
     if (styleE.styleSheet) {
       styleE.styleSheet.cssText = cssText;
     }
     else {
       styleE.appendChild(document.createTextNode(cssText));
     }
     (document.head || document.getElementsByTagName('head')[0]).appendChild(styleE);

     // Setup the element
     var playingCardType = Object.create(HTMLElement.prototype);
     playingCardType.createdCallback = function ()  {
       // Capture 'this'
       var self = this;

       // A quick access function
       var getAttr = function (name, defaultValue) {
         var val = self.getAttribute(name);
         return (val == null && defaultValue != null) ? defaultValue:val;
       };

       // We need to cope with nulls in these attributes
       if (this.getAttribute("suit") && this.getAttribute("value")) {
         var suitEnt = {
           "clubs": "&clubs;",
           "diamonds": "&diams;",
           "hearts": "&hearts;",
           "spades": "&spades;"
         } [this.getAttribute("suit")];

         var color = {
           "clubs": "black",
           "spades": "black",
           "hearts": "red",
           "diamonds": "red",
         }[this.getAttribute("suit")];

         var side = getAttr("side", "front");

         var value = {
           "1": "1",
           "2": "2",
           "3": "3",
           "4": "4",
           "5": "5",
           "6": "6",
           "7": "7",
           "8": "8",
           "9": "9",
           "10": "10",
           "11": "J",
           "12": "Q",
           "13": "K",
           "jack": "J",
           "queen": "Q",
           "king": "K",
           "J": "J",
           "Q": "Q",
           "K": "K"
         }[this.getAttribute("value")];

         var valueMarkup = {
           "1": util.format("<div class=\"spotB3\">%s</div>", suitEnt),

           "2": util.format("<div class=\"spotB2\">%s</div>", suitEnt)
             + util.format("<div class=\"spotB4\">%s</div>", suitEnt),

           "3": util.format("<div class=\"spotB2\">%s</div>", suitEnt)
             + util.format("<div class=\"spotB3\">%s</div>", suitEnt)
             + util.format("<div class=\"spotB4\">%s</div>", suitEnt),

           "4": util.format("<div class=\"spotA1\">%s</div>", suitEnt)
             + util.format("<div class=\"spotA5\">%s</div>", suitEnt)
             + util.format("<div class=\"spotC1\">%s</div>", suitEnt)
             + util.format("<div class=\"spotC5\">%s</div>", suitEnt),

           "5": util.format("<div class=\"spotA1\">%s</div>", suitEnt)
             + util.format("<div class=\"spotA5\">%s</div>", suitEnt)
             + util.format("<div class=\"spotB3\">%s</div>", suitEnt)
             + util.format("<div class=\"spotC1\">%s</div>", suitEnt)
             + util.format("<div class=\"spotC5\">%s</div>", suitEnt),

           "6": util.format("<div class=\"spotA1\">%s</div>", suitEnt)
             + util.format("<div class=\"spotA3\">%s</div>", suitEnt)
             + util.format("<div class=\"spotA5\">%s</div>", suitEnt)
             + util.format("<div class=\"spotC1\">%s</div>", suitEnt)
             + util.format("<div class=\"spotC3\">%s</div>", suitEnt)
             + util.format("<div class=\"spotC5\">%s</div>", suitEnt),

           "7": util.format("<div class=\"spotA1\">%s</div>", suitEnt)
             + util.format("<div class=\"spotA3\">%s</div>", suitEnt)
             + util.format("<div class=\"spotA5\">%s</div>", suitEnt)
             + util.format("<div class=\"spotB3\">%s</div>", suitEnt)
             + util.format("<div class=\"spotC1\">%s</div>", suitEnt)
             + util.format("<div class=\"spotC3\">%s</div>", suitEnt)
             + util.format("<div class=\"spotC5\">%s</div>", suitEnt),

           "8": util.format("<div class=\"spotA1\">%s</div>", suitEnt)
             + util.format("<div class=\"spotA3\">%s</div>", suitEnt)
             + util.format("<div class=\"spotA5\">%s</div>", suitEnt)
             + util.format("<div class=\"spotB2\">%s</div>", suitEnt)
             + util.format("<div class=\"spotB4\">%s</div>", suitEnt)
             + util.format("<div class=\"spotC1\">%s</div>", suitEnt)
             + util.format("<div class=\"spotC3\">%s</div>", suitEnt)
             + util.format("<div class=\"spotC5\">%s</div>", suitEnt),

           "9": util.format("<div class=\"spotA1\">%s</div>", suitEnt)
             + util.format("<div class=\"spotA2\">%s</div>", suitEnt)
             + util.format("<div class=\"spotA4\">%s</div>", suitEnt)
             + util.format("<div class=\"spotA5\">%s</div>", suitEnt)
             + util.format("<div class=\"spotB3\">%s</div>", suitEnt)
             + util.format("<div class=\"spotC1\">%s</div>", suitEnt)
             + util.format("<div class=\"spotC2\">%s</div>", suitEnt)
             + util.format("<div class=\"spotC4\">%s</div>", suitEnt)
             + util.format("<div class=\"spotC5\">%s</div>", suitEnt),

           "10": util.format("<div class=\"spotA1\">%s</div>", suitEnt)
             + util.format("<div class=\"spotA2\">%s</div>", suitEnt)
             + util.format("<div class=\"spotA4\">%s</div>", suitEnt)
             + util.format("<div class=\"spotA5\">%s</div>", suitEnt)
             + util.format("<div class=\"spotB2\">%s</div>", suitEnt)
             + util.format("<div class=\"spotB4\">%s</div>", suitEnt)
             + util.format("<div class=\"spotC1\">%s</div>", suitEnt)
             + util.format("<div class=\"spotC2\">%s</div>", suitEnt)
             + util.format("<div class=\"spotC4\">%s</div>", suitEnt)
             + util.format("<div class=\"spotC5\">%s</div>", suitEnt),

           "J": "<img class=\"face\" src=\"/img/jack.gif\"></img>"
             + util.format("<div class=\"spotA1\">%s</div>", suitEnt)
             + util.format("<div class=\"spotC5\">%s</div>", suitEnt),
           "Q": "<img class=\"face\" src=\"/img/queen.gif\"></img>"
             + util.format("<div class=\"spotA1\">%s</div>", suitEnt)
             + util.format("<div class=\"spotC5\">%s</div>", suitEnt),
           "K": "<img class=\"face\" src=\"/img/king.gif\"></img>"
             + util.format("<div class=\"spotA1\">%s</div>", suitEnt)
             + util.format("<div class=\"spotC5\">%s</div>", suitEnt)
         }[value];

         this.innerHTML = util.format(
           "<div class=\"card\" style=\"%s\">"
             + "<div class=\"%s %s\">"
             + "<div class=\"index\">%s</div>%s</div></div>",
           this.getAttribute("style"), 
           side, color, 
           (side == "back") ? "":value, (side=="back") ? "":valueMarkup);
       }
     };

     // initialize the playing card lib
     var init = function (doc) {
       var PlayingCard = doc.registerElement(
         "playing-card", { prototype: playingCardType }
       );
       return PlayingCard;
     };

     return {
       "init": init
     };
   })();

exports.card_init = bpg_cards.init;

// example.js ends here
