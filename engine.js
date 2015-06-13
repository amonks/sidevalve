// engine.js

var Engine = {};

// function to start the game
// you'll need to create your own game object and feed it in
// in this example, that happens in index.html
Engine.start = function(game) {
  // add that game to the engine so we can find it later
  Engine.game = game;
  // start it off!
  Engine.enter(Engine.game.startingPlace);
};

// function to enter a place
Engine.enter = function(id) {
  console.log("entering " + id);

  // set the player location to the new place's id
  Engine.game.player.location = id;

  // create a newPlace variable for convenience
  var newPlace = Engine.game.places[id];

  // load the new place name
  $(".current-place-name").text(newPlace.name);

  // load the new place image
  $("#image").attr("src", newPlace.image);

  // load the new place text
  $("#text").text(newPlace.text);

  // load the new place destinations
  Engine.setUpDestinations(newPlace.destinations);
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
