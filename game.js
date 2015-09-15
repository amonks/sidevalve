// game.js

Game = {
  // this title shows up on the top of the page
  "title": "Working In Stencyl",

  // this text shows up in the `about` popup
  "about": "This is a *super* cool game about trying to use Stencyl.",

  // this theme is used in the game
  "theme": "8bitstyle",

  // this text shows up at the beginning of the game
  "intro": "Sup <span class='current-player-name'></span>! You're in Experimental Games class. You probably ought to download Stencyl. And Java.",

  "player": {
    // this is the default name, it can be changed
    "name": "dude",
    // this is the starting location
    "location": "notes",
    // this is the player's starting inventory
    "inventory": []
  },

  // this is a list of inventory-able objects in the game.
  "objects": {
    "stencyl": {
      "name": "Stencyl Game Maker",
      "image": "img/stencyl-logo.png",
      // this "acquisition" text will show up when you find the object
      "acquisition": "You successfully downoladed Stencyl.",
      "text": "wow this java shit sure isn't fun."
    },
    "java": {
      "name": "The Java Runtime",
      "image": "img/java-logo.png",
      "acquisition": "After an hour or so, you successfully download the JRE",
      "text": "Ouch. 90s, much?"
    },
    "backgrounds": {
      "name": "Some backgrounds you made in Stencyl.",
      "image": "img/backgrounds.png",
      "acquisition": "You guess you'll make some of this Stencyl bizness",
      "text": "Pretty high-effort stuff here"
    }
  },

  // This is a list of the places in the game.
  // Change them! Add some! Go crazy!
  "places": {
    // This keyword `concord` doesn't show up in the game.
    "notes": {
      // this name `Concord` does.
      "name": "Taking notes in class",
      "image": "img/notes.png",
      // you can use markdown formatting in text, *da conk* will be italicized.
      "text": "You're in class, aren't you?",
      // You can have many destinations
      "destinations": ["slack-chrome",  "slack-atom", "stencyl-website", "java-website", "in-stencyl-1"]
    },
    "slack-chrome": {
      "name": "Slackin' on the internet",
      "image": "img/slackin-chrome.png",
      "text": "so this is chrome.",
      // or just one..
      "destinations": ["stencyl-website", "notes", "slack-atom", "java-website", "in-stencyl-1"]
    },
    "slack-atom": {
      "name": "Slackin' in ur text editor",
      // You can use external images
      "image": "img/slackin-atom.png",
      "text": "You're typing or something. It's pretty fun. You should be making a game.",
      "destinations": ["slack-chrome", "notes",  "stencyl-website", "java-website", "in-stencyl-1"]
    },
    "stencyl-website": {
      "name": "Stencyl website",
      // Or you can put images right in the repository
      "image": "img/stencyl-website.png",
      "text": "time 2 download stencyl.",
      "get": ["stencyl"],
      "destinations": ["slack-atom", "notes",  "slack-chrome", "java-website", "in-stencyl-1"]
    },
    "java-website": {
      "name": "Java website",
      "image": "img/java-website.png",
      "text": "Time 4 sum java !!",
      "get": ["java"]
      "destinations": ["slack-atom", "notes",  "slack-chrome", "java-website", "in-stencyl-1"]
    },

    "in-stencyl-1": {
      "name": "Stencyl",
      "image": "img/in-stencyl.png",
      "text": "so *this* is stencyl? Isn't it... kinda bad?",
      "need": ["stencyl", "java"],
      "get": ["backgrounds"],
      "destinations": ["stencyl-crash", "notes",  "slack-chrome", "slack-atom"]
    },
    "stencyl-crash": {
      "name": "Stencyl",
      "need": ["backgrounds"],
      "image": "img/stencyl-crash.png",
      "text": "Stencyl crashed."
    }
  }
};
