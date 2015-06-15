# sidevalve

js cyoa game engine

![Ford Sidevalve engine](http://i.imgur.com/sU1oAdw.jpg)

Sidevalve is a cool lil (< 1800 bytes, minified) engine for making choose-your-own-adventure games for the Internet without thinking too much about code.

## Really? Cool!

Yeah!

All you have to do is [fork](//github.com/amonks/sidevalve/tree/gh-pages#fork-destination-box) this repository, and edit `game.js`!

If you wanna get fancy, you can edit `index.html` too, but make sure you read the comments first.

## This HTML is pretty bootstrap-default lookin...

It sure is.

You can make your own if you want, but keep in mind that Sidevalve requires jQuery for everything, and Bootstrap modals with Bootbox for prompting for the player's name.

### tags

Make sure your html includes the following tags.

This stuff all gets updated as you play the game:

    <h1>Hi <span class="current-player-name">there</span>!</h1>

    Here you are in <span class="current-place-name">some place</span>

    <div id="text"></div>

    <ul id="destinations"><!-- don't put anything here --></ul>

This link resets the game:

    <a class="new-game" href="#">New Game</a>

## I wanna get fancy with the javascript...

Great! [Read it](https://github.com/amonks/sidevalve/blob/gh-pages/sidevalve.js)! It's more comments than code, so you shouldn't have much trouble. If you have any issues, send me an [email](mailto:a@monks.co)

Since you asked, though, here's some basic API documentation.

### Starting a game

You'll find the following in `index.html`:

    <!-- this script tag is necessary to start the game -->
    <script>
        sidevalve = new Sidevalve();
        sidevalve.start(Game);
    </script>

The first line of the script creates an instance of the Sidevalve engine. The second starts the game called `Game`.

`Game` is defined in `game.js`.

### The game object

Everything that makes this sidevalve game different from that one (from place descriptions to this-player's-name) ((anything that starts in `game.js`)) is stored in `sidevalve.game`.

In fact, when a player starts a new game, the `Game` object in `game.js` is *directly cloned* into `sidevalve.game`, but it updates as the game progresses. If you want to use javascript to interact with a game currently-in-progress, poke at `sidevalve.game`. Seriously.

### Public Functions

You can use the following functions to interact with the engine once it's instantiated:

*   `start(game)` starts the game: first trying to load a saved game, then starting a new one.
*   `newGame()` starts a new game right back at the name prompt.
*   `getPossibleDestinations()` returns an array of the places you can go from where you are.
*   `enter(placeID)` moves you to the specified place, if possible
*   `render()` re-updates your html tags. It's usually called automatically.
*   `setNameFromPrompt()` opens a modal dialogue in which the player can change their name, then rerenders and saves.
*   `setName(string)` changes the character's name to the given string, then rerenders and saves.
*   `load()` tries to load a saved game and returns it or false
*   `save()` saves the `game` object to localStorage
