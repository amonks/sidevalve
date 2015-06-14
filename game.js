// game.js

Game = {
  "player": {
    // this is the default name, it can be changed
    "name": "Fenn",
    // this is the starting location
    "location": "worcester",
    // this is the player's starting inventory
    "inventory": ["hat"]
  },

  // this is a list of inventory-able objects in the game.
  "objects": {
    "hat": {
      "name": "cool hat",
      "image": "http://i.imgur.com/L75ItJ4.jpg",
      "text": "wow this must be the coolest hat ever."
    },
    "bong": {
      "name": "sweet bong",
      "image": "http://i.imgur.com/9duj9DV.jpg",
      "text": "This looks like a pretty sweet bong."
    },
    "weed": {
      "name": "fresh nugs",
      "image": "http://i.imgur.com/QXXXSlH.jpg",
      "text": "these are some real steezy nugs."
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
      "destinations": ["worcester", "andover", "monks"]
    },
    "monks": {
      "name": "Monks' House",
      "image": "http://i.imgur.com/ryi4rxg.jpg",
      "text": "ey bro wanna puff piff?",
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
      "destinations": ["concord", "andover", "clark"]
    },
    "clark": {
      "name": "Clark University",
      // Or you can put images right in the repository
      "image": "images/clark.jpg",
      "text": "time 2 learn bro",
      "get": ["bong"],
      "destinations": ["worcester"]
    },

    "andover": {
      "name": "Andover",
      "image": "http://i.imgur.com/CgctDuE.jpg",
      "text": "this is da AND",
      "destinations": ["worcester", "fenn"]
    },
    "fenn": {
      "name": "Fenn's House",
      "image": "http://i.imgur.com/3KlOVbd.jpg",
      "text": "eyyyyy",
      "destinations": ["andover"]
    }
  }
};
