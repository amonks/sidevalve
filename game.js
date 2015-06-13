// game.js

Game = {
  "player": {
    "name": "Fenn",
    "age": "18",
    "location": "worcester"
  },

  "places": {
    "worcester": {
      "name": "Worcester",
      "image": "http://i.imgur.com/IKmHxjP.jpg",
      "text": "this b the woo",
      "destinations": ["concord", "andover", "clark"]
    },
    "clark": {
      "name": "Clark University",
      "image": "http://i.imgur.com/ksk2lF7.jpg",
      "text": "time 2 learn bro",
      "destinations": ["worcester"]
    },

    "concord": {
      "name": "Concord",
      "image": "http://i.imgur.com/dZzFBwc.jpg",
      "text": "this is da conk",
      "destinations": ["worcester", "andover", "monks"]
    },
    "monks": {
      "name": "Monks' House",
      "image": "http://i.imgur.com/ryi4rxg.jpg",
      "text": "ey bro wanna puff piff?",
      "destinations": ["concord"]
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
