WebComponents for Playing Cards
===============================

This is an example of WebComponents elements for playing cards.

The cards can be defined in HTML thusly:

````
<playing-card value="1" suit="hearts"></playing-card>
<playing-card value="J" suit="clubs"></playing-card>
````

This will produce an Ace of Hearts and a Jack of Clubs.

This may be the beginning of a useful library.


## Running
Everything is packaged as a browserifyable node package.

`npm install` this and then use browserify to serve it.

To run browserify you need to use a server automatically running
browserify on any ".js" file. I use elnode with it's convienient
`elnode-js-make-webserver`.


## Using

Include the js in your page:

````
<html>
<body>
   <h1>Poker!</h1>
</body>
<script src="/scripts/example.js"></script>
</html>
````

Use from HTML like so:

````
<html>
<body>
   <h1>Poker!</h1>
   <playing-card value="1" suit="hearts"></playing-card>
   <playing-card value="J" suit="clubs"></playing-card>
</body>
<script src="/scripts/bpg-cards.js"></script>
</html>
````

You can also construct cards from JavaScript directly:

````
var bpg_cards = require ("./bpg-cards.js");
var PlayingCard = bpg_cards.card_init(document);
var card = new PlayingCard();
card.setAttribute("value", "1");
card.setAttribute("suit", "hearts");
document.body.appendChild(elem);
````

## What is this?

It's the beginnings of an open library of poker elements.
