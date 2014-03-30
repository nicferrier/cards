var Platform = require("polyfill-webcomponents");
var playingCardType = Object.create(HTMLElement.prototype);
playingCardType.createdCallback = function ()  {
  if (this.getAttribute("suit")) {
    var suitEnt = {
      "clubs": "&clubs;",
      "diamonds": "&diams;",
      "hearts": "&hearts;",
      "spades": "&spades;"
    } [this.getAttribute("suit")];
    console.log ("suit " + this.getAttribute("suit"));
    this.innerHTML = "<div class=\"card\" style=\"" + this.getAttribute("style") + "\">"
      + "<div class=\"front\">" 
      + "<div class=\"spotA1\">" + suitEnt + "</div>"
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
