// sidevalve.js

// Here we're using Doug Crockford's constructor pattern
// http://javascript.crockford.com/private.html
// call `var sidevalve = new Sidevalve();` to construct a usable instance.
var Sidevalve = function() {

  // Since this Sidevalve function returns the below API object,
  // any members of API (like the `start()` function below)
  // will be available in the constructed `sidevalve` (lowercase)
  // instance.
  //
  // Someone using this script, once they constructed their
  // `sidevalve` instance, could call `sidevalve.start()`.
  // They couldn't, however, call `sidevalve.renderDestinations()`
  // because it *isn't* a child of API, as you'll see.
  //
  // `renderDestinations()` is used internally by `render()`, so
  // I can keep it private and only expose the `render()` function.
  //
  // By segregating API functions from private ones, I can make sure
  // the interface stays stable as I update the program. For example,
  // I can change how `renderDestinations()` works and add functions
  // willy-nilly, but as long as I make sure `render()` does what
  // it's supposed to, nobody need know or care.
  var API = {};



  // function to start the game
  // you'll need to create your own game object and feed it in
  // in this example, that happens in index.html
  API.start = function(game) {
    setup();
    // try to load the game
    var loadedGame = API.load();
    if (loadedGame) {
      API.game = loadedGame;
    } else {
      API.newGame();
    }

    API.render();
  };

  // function to (re)start a new game
  API.newGame = function(game) {
    // this is kind of sneaky. If we set `API.game = Game`,
    // our new-game-state is tied to the playing game and starts changing.
    // we need to keep a clean new-game-state, so we'll clone it.
    // http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-clone-an-object
    API.game = JSON.parse(JSON.stringify(Game));

    API.setNameFromPrompt();
  };

  // function to draw the game window (images, text, ...)
  API.render = function() {
    // create a place variable for convenience
    var placeID = API.game.player.location;
    var place = API.game.places[placeID];

    // load the new place name
    $(".current-place-name").text(place.name);

    // load the new place image
    $("#image").attr("src", place.image);

    // load the new place text
    renderText(place.text);

    // load the player's name
    $(".current-player-name").text(API.game.player.name);

    // load the new place destinations
    renderDestinations(place.destinations);

    // load the player's inventory
    renderInventory(API.game.player.inventory);
  };

  // function to enter a place
  API.enter = function(id) {
    console.log("entering " + id);

    // set the player location to the new place's id
    API.game.player.location = id;

    // get any new objects here
    getObjectsHere(id);

    API.render();

    API.save();
  };

  // function to set the player's name with a bootstrap modal prompt
  API.setNameFromPrompt = function() {
    // http://bootboxjs.com/
    // here we're creating a modal prompt to get the character's name
    bootbox.prompt({
      title: "What's your name?",
      value: API.game.player.name,
      callback: function(result) {
        // everything in here happens after the player submits the prompt
        if (result === null) {
          // either ignore it if they hit 'cancel'
          console.log("Prompt dismissed");
        } else {
          // or update the name
          API.setName(result);
        }
      }
    });
  };

  // function to set the player's name to a given string
  API.setName = function(name) {
    API.game.player.name = name;
    // save and render the result
    API.save();
    API.render();
  };

  // function to load a saved game state object and returns it
  // returns false if there's no saved game
  API.load = function() {
    // try to load a saved game from localStorage
    var loadedGameState = localStorage.getItem("textGameState");

    // add that game to the sidevalve so we can find it later
    if (loadedGameState) {
      console.log("loading game");
      // it's saved as a string so we gotta objectify it
      return JSON.parse(loadedGameState);
    } else {
      return false;
    }
  };

  // function to save the game state into localStorage
  API.save = function() {
    console.log("saving!");
    // gotta convert it to a string first
    var gameState = JSON.stringify(API.game);
    localStorage.setItem("textGameState", gameState);
  };




  // these functions aren't members of the API object, so they're private.

  // function to set up the game
  // this is called by `start()`
  // put anything in here that has to happen first one time
  setup = function() {
    // activate new-game button
    $(".new-game").click(function() {
      API.newGame();
    });
  };

  // function to pick up any objects in a location
  // and add them to the player's inventory
  // called by `enter()`
  getObjectsHere = function(placeID) {
    var place = API.game.places[placeID];
    if (place.get) {
      // get everything in the place
      while (place.get.length > 0) {
        var newObject = place.get.pop();
        API.game.player.inventory.push(newObject);
      }
    }
  };

  // function to render the place text
  // argument: a markdown-formatted string
  // called by `render()`
  renderText = function(markdown) {
    var placeText = marked(markdown);
    $("#text").html(placeText);
  };

  // function to set up the destinations list for a place
  // argument: an array of new destination ids: ["concord", "worcester"]
  // called by `render()`
  renderDestinations = function(destinations) {
    // clear existing destinations from the list
    $("#destinations").empty();

    // add new destinations to the list
    for ( var d in destinations ) {
      var destinationID = destinations[d];
      var destinationPlace = API.game.places[destinationID];
      $("#destinations").append("<li><a class='destination' id ='" + destinationID + "' href='#'>" + destinationPlace.name);
    }

    // activate links
    $(".destination").click(function() {
      // `this` is the link itself: <a id='worcester' href='#'>
      API.enter(this.id);
    });
  };

  // function to render the player's inventory
  // argument: an array of object ids: ["bong", "hat"]
  // called by `render()`
  renderInventory = function(inventory) {
    // clear existing inventory from the list
    $("#inventory").empty();

    // add new inventory to the list
    for ( var i in inventory ) {
      var itemID = inventory[i];
      var item = API.game.objects[itemID];
      $("#inventory").append("<li><h4>" + item.name + "</h4><img class='item img-responsive' id ='" + itemID + "' src='" + item.image + "'><p>" + item.text);
    }
  };



  // the constructor needs to return the public API object
  return API;
};
