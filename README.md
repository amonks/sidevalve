# contributing to sidevalve

js cyoa game engine

![Ford Sidevalve engine](http://i.imgur.com/sU1oAdw.jpg)

Sidevalve is a cool lil engine for making choose-your-own-adventure games for the Internet without thinking too much about code.

**This readme is about *developing sidevalve itself*, not *developing games using sidevalve*. If you're looking to make a game, visit the [gh-pages branch](https://github.com/sidevalve/sidevalve).**

## understanding sidevalve

This git repository has two main branches:

*   master, the *source branch* where development on sidevalve itself happens.
*   gh-pages, which is an automatically-generated demo game. Users can fork it to create a new game of their own.

If you're developing sidevalve itself, don't edit the gh-pages branch. Since it's automatically generated, any edits will be automatically deleted.

Instead, work in the source branch. Here's how it's set up:

*   `demo` is generated by grunt, and copied into the gh-pages branch. To test the generated game on your computer before pushing, open `demo/index.html`
*   `dist` is also generated by grunt. It contains the compiled sidevalve javascript file for users, minified and not. pages using sidevalve should src one of these files.
*   `pub` is a catch-all for files that need to be copied into `demo`. *It includes `game.js`, and `index.html`.* These files are safe to edit.
*   `src` is the source from which all the above-mentioned javascript is generated. These files are safe to edit.

## building sidevalve

sidevalve now uses Grunt to compile a bunch of files together into one file and generally keep things organized.

### the first time

We'll use NPM to install grunt and the grunt plugins we're using. NPM comes with node.js

If you use homebrew, try `brew install node`, otherwise try [their website](https://nodejs.org/)

TODO: maybe recommend io.js instead? does it even install npm? probably.

Once npm is installed, open up the sidevalve directory in a terminal and run `npm install`. It'll look through [package.json](https://github.com/sidevalve/sidevalve/blob/master/package.json), and install everything on the list into a new folder called node_modules.

You'll probably also need to run `npm install -g grunt-cli` to get the `grunt` command line tool.

TODO: check

I know that was a pain, but it pays off. I swear.

### every time

Now you can run our cool new grunt tasks!

In a terminal open to the master branch of sidevalve, you now have the following commands:

*   `grunt cleanup` will delete any currently-built stuff. It's automatically run before a `grunt build`
*   `grunt build` or just `grunt` will
    1. run `cleanup`
    2. create a `demo` folder. This folder is our website.
    2. copy anything in the folder `pub` (like index.html) into that `demo` folder
    4. compile any handlebars templates in the folder `src/handlebars/` into one file: `src/js/templates.js`
    5. combine all the javascript files in `src/js` into one file: `dist/sidevalve.js`
    6. minify that combined javascript file into `dist/sidevalve.min.js`
    7. copy those two javascript files into `demo`
*   `grunt push` will do all of the above, then push the demo folder into our gh-pages branch. *this does **not** push the master (source) branch*

So, `grunt` to build the website on your computer, `grunt push` to update the online game.

## how we use issues

If you have a thought, suggestion, question or plan, make an issue. It's fine if issues languish unclosed: if we don't feel like addressing it, it's probably not that important. Make the issue anyway.

If you need someone else to address something, assign them an issue.

If you start working on something, assign your self the issue so other people know not to work on that thing.

If you've addressed whatever an issue covers, close that issue.

### labels

* `back-end` `front-end` and `game-end` to tag parts of the codebase
* `question` for stuff that needs further discussion
* `bug` for stuff that is **currently broken** ie crashes the game

### milestones

we use the `SBRBN ADVNTR` milestone to track issues that need to be closed before the *BLGNMN SBRBN ADVNTR* game can come out.

### assignment

Assign yourself issues that you are *currently working on*. Assign other people issues where you *need their involvement*.

## how we use branches

[forthcoming](https://github.com/sidevalve/sidevalve/issues/7)
