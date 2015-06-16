// game.js

Game = {
  // this title shows up on the top of the page
  "title": "Belgian Man Suburban Adventure!",

  // this is the css theme to use
  "theme": "8bitstyle",

  // this text shows up in the `about` popup
  "about": "Get to the gig!",

  // this text shows up at the beginning of the game
  "intro": "Sup <span class='current-player-name'></span>! There's a show at *Arjuntina* tonight!",

  "player": {
    // this is the default name, it can be changed
    "name": "dude",
    // this is the starting location
    "location": "worcester",
    // this is the player's starting inventory
    "inventory": []
  },

  // this is a list of inventory-able objects in the game.
  "objects": {
    "chain": {
      "name": "gold chain",
      "image": "http://www.sarraf.com/product_images/b/14k_yellow_gold_8_2mm_cuban_chain_necklace_24___91460.jpg",
      // this "acquisition" text will show up when you find the object
      "acquisition": "You remember that you're wearing your *gold chain*.",
      "text": "wow this must be the goldest chain ever."
    },
    "shades": {
      "name": "killer shades",
      "image": "http://images.vectorhq.com/images/previews/1a1/stunna-shades-psd-461143.png",
      "acquisition": "You finally get your shades back from your ex",
      "text": "these will never sit right again."
    },
    "weed": {
      "name": "fresh nugs",
      "image": "http://i.imgur.com/QXXXSlH.jpg",
      "acquisition": "You score some grass",
      "text": "these are some real steezy nugs."
    },
    "lighter": {
      "name": "Tom Foley's lighter",
      "image": "http://i.imgur.com/6xdP75w.jpg",
      "acquisition": "Fenn gives you Tom Foley's lighter",
      // this `loss` text will show up when you lose the object
      "loss": "You give Tom his stupid lighter back.",
      "text": "This lighter is really cool I guess."
    }
  },

  // This is a list of the places in the game.
  // Change them! Add some! Go crazy!
  "places": {
    // This keyword `concord` doesn't show up in the game.
    "concord": {
      // this name `Concord` does.
      "name": "Concord",
      "image": "http://i.imgur.com/dZzFBwc.jpg",
      // you can use markdown formatting in text, *da conk* will be italicized.
      "text": "this is *da conk*",
      // You can have many destinations
      "destinations": ["worcester", "andover", "monks", "stow"]
    },
    "monks": {
      "name": "Monks' House",
      "image": "http://i.imgur.com/ryi4rxg.jpg",
      "text": "ey <span class='current-player-name'></span> wanna puff piff?",
      // or just one..
      "destinations": ["concord"],
      // when the player arrives here, 'weed' will be added to their inventory
      "get": ["weed"]
    },

    "worcester": {
      "name": "Worcester",
      // You can use external images
      "image": "http://i.imgur.com/IKmHxjP.jpg",
      "text": "this b the woo",
      "destinations": ["concord", "andover", "clark", "stow"]
    },
    "clark": {
      "name": "Clark University",
      // Or you can put images right in the repository
      "image": "images/clark.jpg",
      "text": "time 2 learn bro",
      "get": ["shades"],
      "destinations": ["worcester", "tom"]
    },
    "tom": {
      "name": "Tom Foley's dorm",
      "image": "http://i.imgur.com/c88DS9v.png",
      "text": "sup <span class='current-player-name'></span>",
      // You need the lighter object to get here
      "need": ["lighter"],
      // but you lose it when you arrive
      "lose": ["lighter"],
      "destinations": ["clark"]
    },

    "stow": {
      "name": "Stow",
      "image": "images/travel.gif",
      "text": "What a beautiful town!",
      "need": ["shades", "chain", "weed"],
      "destinations": ["arjuntina", "worcester"]
    },
    "arjuntina": {
      "name": "Arjuntina",
      "image": "images/arjuntina.jpg",
      "text": "<span class='current-player-name'></span>, you made it!",
      "need": ["shades", "chain", "weed"],
      "destinations": ["worcester"]
    },


    "andover": {
      "name": "Andover",
      "image": "http://i.imgur.com/CgctDuE.jpg",
      "text": "this is da AND",
      "get": ["chain"],
      "destinations": ["worcester", "fenn"]
    },
    "fenn": {
      "name": "Fenn's House",
      // You can't go to fenn's house without your shades and some weed!
      // It won't even show up as an option. Maybe allude to that in text?
      "need": ["shades", "weed"],
      "get": ["lighter"],
      "image": "http://i.imgur.com/3KlOVbd.jpg",
      "text": "eyyyyy <span class='current-player-name'></span> get high with yourself or something",
      "destinations": ["andover"]
    }
  }
};
