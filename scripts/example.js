var Platform = require("polyfill-webcomponents");
var playingCardType = Object.create(HTMLElement.prototype);
playingCardType.createdCallback = function ()  {
  if (this.getAttribute("suit") 
      && this.getAttribute("value")) {
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
      "diamonds": "red"
    }[this.getAttribute("suit")];

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
      "1": "<div class=\"spotB3\">" + suitEnt + "</div>",

      "2": "<div class=\"spotB2\">" + suitEnt + "</div>"
        + "<div class=\"spotB4\">" + suitEnt + "</div>",

      "3": "<div class=\"spotB2\">" + suitEnt + "</div>"
        + "<div class=\"spotB3\">" + suitEnt + "</div>"
        + "<div class=\"spotB4\">" + suitEnt + "</div>",

      "4": "<div class=\"spotA1\">" + suitEnt + "</div>"
        + "<div class=\"spotA5\">" + suitEnt + "</div>"
        + "<div class=\"spotC1\">" + suitEnt + "</div>"
        + "<div class=\"spotC5\">" + suitEnt + "</div>",

      "5": "<div class=\"spotA1\">" + suitEnt + "</div>"
        + "<div class=\"spotA5\">" + suitEnt + "</div>"
        + "<div class=\"spotB3\">" + suitEnt + "</div>"
        + "<div class=\"spotC1\">" + suitEnt + "</div>"
        + "<div class=\"spotC5\">" + suitEnt + "</div>",

      "6": "<div class=\"spotA1\">" + suitEnt + "</div>"
        + "<div class=\"spotA3\">" + suitEnt + "</div>"
        + "<div class=\"spotA5\">" + suitEnt + "</div>"
        + "<div class=\"spotC1\">" + suitEnt + "</div>"
        + "<div class=\"spotC3\">" + suitEnt + "</div>"
        + "<div class=\"spotC5\">" + suitEnt + "</div>",

      "7": "<div class=\"spotA1\">" + suitEnt + "</div>"
        + "<div class=\"spotA3\">" + suitEnt + "</div>"
        + "<div class=\"spotA5\">" + suitEnt + "</div>"
        + "<div class=\"spotB3\">" + suitEnt + "</div>"
        + "<div class=\"spotC1\">" + suitEnt + "</div>"
        + "<div class=\"spotC3\">" + suitEnt + "</div>"
        + "<div class=\"spotC5\">" + suitEnt + "</div>",

      "8": "<div class=\"spotA1\">" + suitEnt + "</div>"
        + "<div class=\"spotA3\">" + suitEnt + "</div>"
        + "<div class=\"spotA5\">" + suitEnt + "</div>"
        + "<div class=\"spotB2\">" + suitEnt + "</div>"
        + "<div class=\"spotB4\">" + suitEnt + "</div>"
        + "<div class=\"spotC1\">" + suitEnt + "</div>"
        + "<div class=\"spotC3\">" + suitEnt + "</div>"
        + "<div class=\"spotC5\">" + suitEnt + "</div>",

      "9": "<div class=\"spotA1\">" + suitEnt + "</div>"
        + "<div class=\"spotA2\">" + suitEnt + "</div>"
        + "<div class=\"spotA4\">" + suitEnt + "</div>"
        + "<div class=\"spotA5\">" + suitEnt + "</div>"
        + "<div class=\"spotB3\">" + suitEnt + "</div>"
        + "<div class=\"spotC1\">" + suitEnt + "</div>"
        + "<div class=\"spotC2\">" + suitEnt + "</div>"
        + "<div class=\"spotC4\">" + suitEnt + "</div>"
        + "<div class=\"spotC5\">" + suitEnt + "</div>",

      "10": "<div class=\"spotA1\">" + suitEnt + "</div>"
        + "<div class=\"spotA2\">" + suitEnt + "</div>"
        + "<div class=\"spotA4\">" + suitEnt + "</div>"
        + "<div class=\"spotA5\">" + suitEnt + "</div>"
        + "<div class=\"spotB2\">" + suitEnt + "</div>"
        + "<div class=\"spotB4\">" + suitEnt + "</div>"
        + "<div class=\"spotC1\">" + suitEnt + "</div>"
        + "<div class=\"spotC2\">" + suitEnt + "</div>"
        + "<div class=\"spotC4\">" + suitEnt + "</div>"
        + "<div class=\"spotC5\">" + suitEnt + "</div>",

      "J": "<img class=\"face\" src=\"/img/jack.gif\"></img>"
        + "<div class=\"spotA1\">" + suitEnt + "</div>"
        + "<div class=\"spotC5\">" + suitEnt + "</div>",
      "Q": "<img class=\"face\" src=\"/img/queen.gif\"></img>"
        + "<div class=\"spotA1\">" + suitEnt + "</div>"
        + "<div class=\"spotC5\">" + suitEnt + "</div>",
      "K": "<img class=\"face\" src=\"/img/king.gif\"></img>"
        + "<div class=\"spotA1\">" + suitEnt + "</div>"
        + "<div class=\"spotC5\">" + suitEnt + "</div>"
    }[value];

    this.innerHTML = "<div class=\"card\" style=\"" + this.getAttribute("style") + "\">"
      + "<div class=\"front " + color + "\">"
      + "<div class=\"index\">" + value + "</div>"
      + valueMarkup
      + "</div></div>";
  }
};

var PlayingCard = document.registerElement(
  "playing-card", { prototype: playingCardType }
);

// Another example...
//  var elem = new PlayingCard();
//  document.body.appendChild(elem);

// example.js ends here
