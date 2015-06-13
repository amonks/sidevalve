// engine.js

var Engine = {};

// function to start the game
Engine.start = function(game) {
  Engine.game = game;
  Engine.enter(Engine.game.startingPlace);
};

// function to enter a place
Engine.enter = function(id) {
  // enter the new place
  console.log("entering " + id);
  Engine.game.player.location = id;
  var newPlace = Engine.game.places[id];

  // load the new place image
  $("#image").attr("src", newPlace.image);

  // load the new place text
  $("#text").text(newPlace.text);

  // load the new place destinations
  Engine.setUpDestinations(newPlace.destinations);
};

// function to set up the destinations list for a place
Engine.setUpDestinations = function(destinations) {
  // clear existing destinations
  $("#destinations").empty();

  // add new destinations to list
  for ( var d in destinations ) {
    var destinationID = destinations[d];
    var destinationPlace = Engine.game.places[destinationID];
    $("#destinations").append("<li><a class='destination' id ='" + destinationID + "' href='#'>" + destinationPlace.name);
  }

  // activate links
  $(".destination").click(function() {
    Engine.enter(this.id);
  });
};
