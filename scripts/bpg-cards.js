var Platform = require("polyfill-webcomponents");
var util = require("util");

// A JS example of using this...
//  var elem = new PlayingCard();
//  document.body.appendChild(elem);


var bpg_cards = 
  (function () {
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
