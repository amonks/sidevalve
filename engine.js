// engine.js

var Engine = {};

// function to start the game
// you'll need to create your own game object and feed it in
// in this example, that happens in index.html
Engine.start = function(game) {
  Engine.setup();
  // try to load the game
  if (! Engine.load(game)) {
    // if you can't, start a new one
    Engine.newGame();
  }

  Engine.render();
};

// function to set up the game
// this should be called before start
// put anything in here that has to happen first one time
Engine.setup = function() {
  // activate new-game button
  $("#new-game").click(function() {
    Engine.newGame();
  });
};

// function to start a new game
Engine.newGame = function(game) {
    Engine.game = Game;
    Engine.setName();
};

// function to enter a place
Engine.enter = function(id) {
  console.log("entering " + id);

  // set the player location to the new place's id
  Engine.game.player.location = id;

  Engine.render();

  Engine.save();
};

// function to set up the destinations list for a place
// argument: an array of new destination ids: ["concord", "worcester"]
Engine.setUpDestinations = function(destinations) {
  // clear existing destinations from the list
  $("#destinations").empty();

  // add new destinations to the list
  for ( var d in destinations ) {
    var destinationID = destinations[d];
    var destinationPlace = Engine.game.places[destinationID];
    $("#destinations").append("<li><a class='destination' id ='" + destinationID + "' href='#'>" + destinationPlace.name);
  }

  // activate links
  $(".destination").click(function() {
    // `this` is the link itself: <a id='worcester' href='#'>
    Engine.enter(this.id);
  });
};

// function to draw the game window (images, text, ...)
Engine.render = function() {
  // create a newPlace variable for convenience
  var id = Engine.game.player.location;
  var newPlace = Engine.game.places[id];

  // load the new place name
  $(".current-place-name").text(newPlace.name);

  // load the new place image
  $("#image").attr("src", newPlace.image);

  // load the new place text
  $("#text").text(newPlace.text);

  // load the player's name
  $(".current-player-name").text(Engine.game.player.name);

  // load the new place destinations
  Engine.setUpDestinations(newPlace.destinations);
};

// function to load a saved game
// returns false if there's no saved game
Engine.load = function() {
  // try to load a saved game from localStorage
  var loadedGameState = localStorage.getItem("textGameState");

  // add that game to the engine so we can find it later
  if (loadedGameState) {
    console.log("loading game");
    Engine.game = JSON.parse(loadedGameState);
    return true;
  } else {
    return false;
  }
};

// function to save the game state into localstorage
Engine.save = function() {
  console.log("saving!");
  var gameState = JSON.stringify(Engine.game);
  localStorage.setItem("textGameState", gameState);
};

// function to set the player's name
Engine.setName = function() {

  bootbox.prompt({
    title: "What's your name?",
    value: Engine.game.player.name,
    callback: function(result) {
      if (result === null) {
        console.log("Prompt dismissed");
      } else {
        Engine.game.player.name = result;
      }
      Engine.render();
    }
  });
};
