// sidevalve.js

var Sidevalve = function() {

  var API = {};

  // function to start the game
  // you'll need to create your own game object and feed it in
  // in this example, that happens in index.html
  API.start = function(game) {
    setup();
    // try to load the game
    if (! load(game)) {
      // if you can't, start a new one
      API.newGame();
    }

    API.render();
  };

  // function to start a new game
  API.newGame = function(game) {
    // this is kind of sneaky. If we set `API.game = Game`,
    // our new-game-state is tied to the playing game and starts changing.
    // we need to keep a clean new-game-state, so we'll clone it.
    // see http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-clone-an-object
    API.game = JSON.parse(JSON.stringify(Game));

    API.setName();
  };

  // function to draw the game window (images, text, ...)
  API.render = function() {
    // create a newPlace variable for convenience
    var id = API.game.player.location;
    var newPlace = API.game.places[id];

    // load the new place name
    $(".current-place-name").text(newPlace.name);

    // load the new place image
    $("#image").attr("src", newPlace.image);

    // load the new place text
    $("#text").text(newPlace.text);

    // load the player's name
    $(".current-player-name").text(API.game.player.name);

    // load the new place destinations
    setUpDestinations(newPlace.destinations);
  };

  // function to enter a place
  API.enter = function(id) {
    console.log("entering " + id);

    // set the player location to the new place's id
    API.game.player.location = id;

    API.render();

    save();
  };

  // function to set the player's name
  API.setName = function() {

    // http://bootboxjs.com/
    bootbox.prompt({
      title: "What's your name?",
      value: API.game.player.name,
      callback: function(result) {
        if (result === null) {
          console.log("Prompt dismissed");
        } else {
          API.game.player.name = result;
        }
        API.render();
      }
    });
  };

  // function to set up the game
  // this should be called before start
  // put anything in here that has to happen first one time
  setup = function() {
    // activate new-game button
    $(".new-game").click(function() {
      API.newGame();
    });
  };

  // function to set up the destinations list for a place
  // argument: an array of new destination ids: ["concord", "worcester"]
  setUpDestinations = function(destinations) {
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

  // function to load a saved game
  // returns false if there's no saved game
  load = function() {
    // try to load a saved game from localStorage
    var loadedGameState = localStorage.getItem("textGameState");

    // add that game to the sidevalve so we can find it later
    if (loadedGameState) {
      console.log("loading game");
      API.game = JSON.parse(loadedGameState);
      return true;
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

  return API;
};
