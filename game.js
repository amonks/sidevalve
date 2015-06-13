// game.js

Game = {
  "player": {
    // this is the default name, it can be changed
    "name": "Fenn",
    // this is the starting location
    "location": "worcester"
  },

  // This is a list of the places in the game.
  // Change them! Add some! Go crazy!

  "places": {
    // This keyword `concord` doesn't show up in the game.
    "concord": {
      // this name `Concord` does.
      "name": "Concord",
      "image": "http://i.imgur.com/dZzFBwc.jpg",
      "text": "this is da conk",
      // You can have many destinations
      "destinations": ["worcester", "andover", "monks"]
    },
    "monks": {
      "name": "Monks' House",
      "image": "http://i.imgur.com/ryi4rxg.jpg",
      "text": "ey bro wanna puff piff?",
      // or just one..
      "destinations": ["concord"]
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
      "image": "images/clark",
      "text": "time 2 learn bro",
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
