// sidevalve.js

// Here we're using Doug Crockford's constructor pattern
// http://javascript.crockford.com/private.html
var Sidevalve = function() {

  // the Sidevalve() constructor returns this API object,
  // so its members will be public.
  var API = {};

  // function to start the game
  // you'll need to create your own game object and feed it in
  // in this example, that happens in index.html
  API.start = function(game) {
    setup();
    // try to load the game
    var loadedGame = load();
    if (loadedGame) {
      API.game = loadedGame;
    } else {
      API.newGame();
    }

    API.render();
  };

  // function to start a new game
  API.newGame = function(game) {
    // this is kind of sneaky. If we set `API.game = Game`,
    // our new-game-state is tied to the playing game and starts changing.
    // we need to keep a clean new-game-state, so we'll clone it.
    // http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-clone-an-object
    API.game = JSON.parse(JSON.stringify(Game));

    API.setName();
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
    $("#text").text(place.text);

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
    debugger;
    getObjectsHere(id);

    API.render();

    save();
  };

  // function to set the player's name
  API.setName = function() {

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
          API.game.player.name = result;
        }
        // save and render the result
        save();
        API.render();
      }
    });
  };

  // these functions aren't members of the API object, so they're private.

  // function to set up the game
  // this should be called before start
  // put anything in here that has to happen first one time
  setup = function() {
    // activate new-game button
    $(".new-game").click(function() {
      API.newGame();
    });
  };

  // function to pick up any objects in a location
  // and add them to the player's inventory
  getObjectsHere = function(placeID) {
    var place = API.game.places[placeID];
    debugger;
    if (place.get) {
      debugger;
      // get everything in the place
      while (place.get.length > 0) {
        var newObject = place.get.pop();
        API.game.player.inventory.push(newObject);
      }
    }
  };


  // function to set up the destinations list for a place
  // argument: an array of new destination ids: ["concord", "worcester"]
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

  // function to load a saved game
  // returns false if there's no saved game
  load = function() {
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
  save = function() {
    console.log("saving!");
    // gotta convert it to a string first
    var gameState = JSON.stringify(API.game);
    localStorage.setItem("textGameState", gameState);
  };

  // the constructor needs to return the public API object
  return API;
};
