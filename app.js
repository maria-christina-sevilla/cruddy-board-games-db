// require the modules we need
// STOP: what are these modules? Use online documentation to read up on them.
var express = require('express');
var path = require('path');
var fs = require('fs');
var ejsLayouts = require("express-ejs-layouts");
var bodyParser = require('body-parser');
var db = require("./models");
var app = express();

// this sets a static directory for the views
app.use(express.static(path.join(__dirname, 'static')));

// using the body parser module
app.use(bodyParser.urlencoded({ extended: false }));

app.use(ejsLayouts);
app.set('view engine', 'ejs');
// ---------------------------------------------------------
// your routes here
//homepage index.html
app.get('/', function(req, res) {
    res.redirect('/games');
});

// ------------------------------------------------------------
//the user is typing someting into form, once user hits submit
//the data will be retrieved from the database
//if data cannot be found, will spit out an error.
app.get('/games', function(req, res) {
    db.game.find().then(function(games) {
        res.render('games-index', { games: games });
    }).catch(function(error) {
        res.status(404).send(error);
    });
});

// ------------------------------------------------------------
//this is the /games/new route
//this is rendering the link for this page
app.get('/games/new', function(req, res) {
    res.render('games-new');
});

// _______________________________________________________________
app.post('/games', function(req, res) {
    console.log(req.body);

    db.game.findOrCreate({
        where: {
            name: req.body.name
        },
        defaults: { //the rest of the info you want to put in database
            description: req.body.description
        }
    }).spread(function(game, created) {
        res.send("your game was created.");
    })
    res.redirect('/games');
});
// _______________________________________________________________
// show page
app.get('/game/:name', function(req, res) {
    db.game.findOne({
        where: {
            name: req.params.name
        }
    }).then(function(game) {
        res.render('games-show', { game: game });
    }).catch(function(error) {
        res.status(404).send(error);
    });
});

//     var nameOfTheGame = req.params.name;
//     var game = getGame(games, nameOfTheGame);
//     res.render('games-show', game);
// _______________________________________________________________
//This should be an app.get() either index or read. We will 
app.get('/game/:name/edit', function(req, res) {
    db.game.findAll().then(function(games) {
        res.render('games-edit', { game: game });
    }).catch(function(error) {
        res.status(404).send(error);
    });
});
// _______________________________________________________________≥
app.put('/game/:name', function(req, res) {
    // var theNewGameData = req.body;

    // var nameOfTheGame = req.params.name;
    // var games = getGames();
    // var game = getGame(games, nameOfTheGame);

    // game.name = theNewGameData.name;
    // game.description = theNewGameData.description;

    // saveGames(games);
    console.log(req.body);

    db.game.update({
        //passing an arguement, first object
        //these are the where the updated changes are
        name: 'empty string',
        description: 'empty string',
    }, { //second object
        where: {
            //find the game you want to update
            //this is the one im looking for
            id: req.body.id

        }
    }).then(function(updatedGame) { //when you are done updating, give me the data and do what this function tells you do
        res.redirect('/game/' + updatedGame.name)
    });
});
// _______________________________________________________________

app.delete('/game/:name', function(req, res) {
    db.game.destroy({
        where: {
            //find the game you want to destroy/delete
            id: req.body.id
        }
    }).then(function(deletedGame) {
        res.send('Deleted', deletedGame)
    })
});

// helper functions

function getGame(games, nameOfTheGame) {
    var game = null;

    for (var i = 0; i < games.length; i++) {
        if (games[i].name.toLowerCase() == nameOfTheGame.toLowerCase()) {
            game = games[i];
            break;
        }
    }

    //     return game;
}

// // only need when you don't have a database: Read list of games from file.
// function getGames() {
//     var fileContents = fs.readFileSync('./games.json'); // :'(
//     var games = JSON.parse(fileContents);
//     return games;
// }

// // Write list of games to file.
// function saveGames(games) {
//     fs.writeFileSync('./games.json', JSON.stringify(games));
// }

// start the server
var port = 3000;
console.log("http://localhost:" + port);
app.listen(port);
