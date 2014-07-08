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
