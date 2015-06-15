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
  // Go try it if you like: open the demo game, and type `sidevalve`
  // into your javascript console. See which functions show up?
  // The API.ones!
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

    // !!! this next bit is very important !!!
    // as explained above, API.stuff becomes a public, readable
    // part of the sidevalve instance in-browser.
    //
    // API.game is where we keep the game's *state*.
    // For a new game, the *state* is the `Game` object created
    // in `game.js`. As the game progresses, that object
    // changes: objects move into the player's inventory,
    // their location changes, etc.
    //
    // So, API.game is super important. It's what we save and load.
    // It's how we keep track of progress. It holds all this
    // game's possible locations, all the text, and all of
    // the player info. Everything.
    //
    // I'm not sure whether having API.game public is a good idea.
    // On one hand, it makes it real easy for external programming
    // to interact with a game in progress. (minigames anyone?)
    // On the other hand, it makes it real easy for players to cheat
    // Back to the first hand, this whole thing is running in their
    // browser anyway, so if someone want to cheat that bad I can't
    // really stop them.
    if (loadedGame) {
      API.game = loadedGame;
    } else {
      API.newGame(game);
    }

    // preload images
    preloadImages();

    // inject inventory if necessary
    // see https://github.com/sidevalve/sidevalve/issues/8
    if (API.game.objects) {
      $("#game-text").after(renderHandlebars('inventory-panel.html'));
    }


    API.render();
  };

  // function to (re)start a new game
  // see big comment in `API.start()` ^^^
  API.newGame = function(game) {
    alert("Starting a new game.", "success");
    // this is kind of sneaky. If we set `API.game = Game`,
    // our new-game-state is tied to the playing game and starts changing.
    // we need to keep a clean new-game-state, so we'll clone it.
    // http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-clone-an-object
    API.game = JSON.parse(JSON.stringify(game));

    alert(API.game.intro, "info");

    API.setNameFromPrompt();
  };

  // function to get a list of the places you can travel to
  API.getPossibleDestinations = function() {
    var currentPlace = API.game.places[ API.game.player.location ];

    // array to hold the output
    var possibleDestinations = [];

    for ( var d in currentPlace.destinations ) {
      var destinationID = currentPlace.destinations[d];
      var destinationPlace = API.game.places[destinationID];

      // if you don't need any things, add the place to the list
      if (! destinationPlace.need ) {
        possibleDestinations.push( destinationID );
      // otherwise, make sure you have the right things
      } else if ( arrayContainsAnotherArray(destinationPlace.need, API.game.player.inventory) ) {
        possibleDestinations.push( destinationID );
      }
    }

    return possibleDestinations;
  };

  // function to enter a place
  API.enter = function(id) {
    // check if we can get in
    if (API.getPossibleDestinations().indexOf(id) != -1) {
      // set the player location to the new place's id
      API.game.player.location = id;

      // now you can get to this place whenever
      API.game.places[id].need = null;

      // get any new objects here
      getObjectsHere(id);

      API.render();
      API.save();
    } else {
      alert("You can't get there from here!", "danger");
    }

  };

  // function to draw the game window (images, text, ...)
  API.render = function() {
    // create a place variable for convenience
    var placeID = API.game.player.location;
    var place = API.game.places[placeID];

    // load the new place image
    $("#image").attr("src", place.image);

    // load the new place text
    renderText(place.text);

    // load the new place destinations
    renderDestinations();

    // load the player's inventory
    renderInventory(API.game.player.inventory);

    // insert data
    renderInsertions();
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
        } else {
          // or update the name
          API.setName(result);
        }
      }
    });
  };

  // function to set the player's name to a given string
  API.setName = function(name) {
    alert("Name set to: `" + name + "`", "success");
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
      alert("loaded game", "success");
      // it's saved as a string so we gotta objectify it
      return JSON.parse(loadedGameState);
    } else {
      return false;
    }
  };

  // function to save the game state into localStorage
  API.save = function() {
    // gotta convert it to a string first
    var gameState = JSON.stringify(API.game);
    localStorage.setItem("textGameState", gameState);
  };




  // these functions aren't members of the API object, so they're private.

  // function to set up the game
  // this is called by `start()`
  // put anything in here that has to happen first one time
  var setup = function() {
    // activate new-game button
    $(".new-game").click(function() {
      clearAlerts();
      API.newGame(Game);
    });
    // activate change-name button
    $(".change-name").click(function() {
      clearAlerts();
      API.setNameFromPrompt();
    });
    // activate about button
    $(".about-game").click(function() {
      // for whatever reason it feels weird to clear the alerts here
      // clearAlerts();
      showAbout();
    });
  };

  // function to render a handlebars template
  var renderHandlebars = function(t, context) {
    var template = Handlebars.templates['src/handlebars/' + t + '.hbs'];
    return template(context);
  };

  // function to display an alert
  alert = function(text, type) {
    var alert = renderMarkdown(text);
    console.log("alert: " + alert);
    $("#alerts").append("<div class='alert alert-" + type + "'>" + alert );
  };

  // function to clear the alerts
  clearAlerts = function() {
    $("#alerts").empty();
  };

  // function to show the about box
  showAbout = function() {
    var aboutText = renderHandlebars('about-text.md');
    bootbox.alert(renderMarkdown(aboutText));
  };

  // function to pick up any objects in a location
  // and add them to the player's inventory
  // called by `API.enter()`
  var getObjectsHere = function(placeID) {
    var place = API.game.places[placeID];
    if (place.get) {
      // get everything in the place
      while (place.get.length > 0) {
        var newObject = place.get.pop();
        API.game.player.inventory.push(newObject);
        // show notice
        if (API.game.objects[newObject].acquisition) {
          alert(API.game.objects[newObject].acquisition, "success");
        }
      }
    }
    if (place.lose) {
      // lose everything you're supposed to
      while (place.lose.length > 0) {
        var lostObject = place.lose.pop();
        var lostObjectIndex = API.game.player.inventory.indexOf(lostObject);
        API.game.player.inventory.splice(lostObjectIndex, 1);
        // show notice
        if (API.game.objects[lostObject].acquisition) {
          alert(API.game.objects[lostObject].loss, "success");
        }
      }
    }
  };

  // function to insert data into properly classed span tags
  var renderInsertions = function() {
    // load the new place name
    $(".current-place-name").text(API.game.places[API.game.player.location].name);

    // load the player's name
    $(".current-player-name").text(API.game.player.name);

    // load the game's title
    $(".game-title").text(API.game.title);
  };

  // function to render the place text
  // argument: a markdown-formatted string
  // called by `render()`
  var renderText = function(markdown) {
    var placeText = renderMarkdown(markdown);
    $("#text").html(placeText);
  };

  // function to convert text from markdown format.
  // argument: a markdown-formatted string
  // returns: html
  var renderMarkdown = function(markdown) {
    // simple now, but maybe different later?
    return marked(markdown);
  };

  // function to set up the destinations list for a place
  // argument: an array of new destination ids: ["concord", "worcester"]
  // called by `render()`
  var renderDestinations = function() {
    // clear existing destinations from the list
    $("#destinations").empty();

    // add new destinations to the list
    var destinations = API.getPossibleDestinations();
    for (var d in destinations) {
      var destinationID = destinations[d];
      var destinationPlace = API.game.places[destinationID];
      addDestination(destinationID, destinationPlace);
    }

    // activate links
    $(".destination").click(function() {
      clearAlerts();
      // `this` is the link itself: <a id='worcester' href='#'>
      API.enter(this.id);
    });
  };

  // function to add a destination to the list
  var addDestination = function(destinationID, destination) {
    $("#destinations").append(renderHandlebars('destination.html', {
      destination: destination,
      destinationID: destinationID
    }));
  };

  // function to render the player's inventory
  // argument: an array of object ids: ["bong", "hat"]
  // called by `render()`
  var renderInventory = function(inventory) {
    // clear existing inventory from the list
    $("#inventory").empty();

    // add new inventory to the list
    for ( var i in inventory ) {
      var itemID = inventory[i];
      var item = API.game.objects[itemID];
      // apparently you can do a multiline string in javascript now enclosed in backticks
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings
      $("#inventory").append( renderHandlebars('inventory-object.html', item) );
    }
  };

  // function to check if an array contains all of the
  // contents of another array. For example, to check if
  // your inventory contains all of the objects you need
  // to go to a place.
  // returns true or false.
  // http://stackoverflow.com/a/15514976
  var arrayContainsAnotherArray = function(needle, haystack){
    for(var i = 0; i < needle.length; i++){
      if(haystack.indexOf(needle[i]) === -1)
         return false;
    }
    return true;
  };

  // function to preload all the images
  var preloadImages = function() {
    preloadObjectImages(API.game.places);
    preloadObjectImages(API.game.objects);
  };

  // function to preload all the images for an object
  // argument: something like API.game.places
  var preloadObjectImages = function(o) {
    for (var i in o) {
      var url = o[i].image;
      preloadImage(url);
    }
  };

  // function to preload an individual image
  var preloadImage = function(url) {
    console.log("preloading " + url);
    var image = new Image();
    image.src = url;
  };

  // the constructor needs to return the public API object
  return API;
};
