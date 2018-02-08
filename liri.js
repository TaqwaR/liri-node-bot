const dotenv = require("dotenv").config();
const keys = require("./keys.js");
const fs = require("fs");

const request = require ("request");
const Spotify = require("node-spotify-api");
const Twitter = require("twitter");
const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);

const argsArray = process.argv;
let command = process.argv[2];
let input = process.argv[3];

function spotifyFunc() {

    if (input === undefined) {
      let input = "the+sign+ace+of+base";
      spotify.search({ type: 'track', query: input, limit: 1}).then(function(data){
        console.log("----------------------------------");
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song name: " + data.tracks.items[0].name);
        console.log("Preview URL: " + data.tracks.items[0].preview_url);
        console.log("Album name: " + data.tracks.items[0].album.name);
        console.log("----------------------------------");
      })

    }

    else {
      for (var i = 3; i < argsArray.length; i++) {
        input = input + " " + argsArray[i];
      }

      spotify.search({ type: 'track', query: input, limit: 1}).then(function(data) {
      console.log("----------------------------------");
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("Song name: " + data.tracks.items[0].name);
      console.log("Preview URL: " + data.tracks.items[0].preview_url);
      console.log("Album name: " + data.tracks.items[0].album.name);
      console.log("----------------------------------");
    });
  }
}

function tweetFunc() {
    var params = {iam_taqwa: 'nodejs'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        for (var i = 0; i < 19; i++) {
          console.log("----------------------------------");
          console.log("Created on: " + tweets[i].created_at);
          console.log("Text: " + tweets[i].text);
          console.log("----------------------------------");
        }
      }
    });
};

function movieFunc() {

  let movie = process.argv[3];
  let omdbQuery = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=226846d0";

  if (input === undefined) {
    omdbQuery = "http://www.omdbapi.com/?t=mr.nobody&y=&plot=short&apikey=226846d0";
    request(omdbQuery, function (error, response, body) {
      if (error) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
      } else {
        console.log("----------------------------------");
        console.log("If you haven't watched 'Mr. Nobody', then you should. ", "\nIt's on Netflix!");
        console.log("----------------------------------");
      }
    });

  } else {
    for (var i = 3; i < argsArray.length; i++) {
      input = input + " " + argsArray[i];
    }

    request(omdbQuery, function (error, response, body) {
      if (error) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
      } else {
        console.log("----------------------------------");
        console.log("Title: " + JSON.parse(body).Title +
                "\nYear: " + JSON.parse(body).Year +
                "\nIMDB Rating: " + JSON.parse(body).imdbRating +
                "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value +
                "\nProduction Country: " + JSON.parse(body).Country +
                "\nLanguage: " + JSON.parse(body).Language +
                "\nPlot: " + JSON.parse(body).Plot +
                "\nActors: "  + JSON.parse(body).Actors);
        console.log("----------------------------------");
      }

    });
  }
}

console.log(process.argv);

fs.writeFile('random.txt', 'spotify-this-song,"I Want it That Way"', function(error) {
  if (error) {
    return console.log(error);
  }
});


function doItFunc() {
  fs.readFile('random.txt', "utf8", function(error, data) {

    let dataArr = data.split(",");
    command = dataArr[0];
    input = dataArr[1];

    for (var i = 2; i < dataArr.length; i++) {
      input = input + "+" + dataArr[i];
    }

    commandCentral()
  })
};

function commandCentral() {

switch (command) {
  case "my-tweets":
    console.log("Twitter command entered");
    tweetFunc()
    break;

  case "spotify-this-song":
    console.log("Spotify command entered");
    spotifyFunc();
    break;

  case "movie-this":
    console.log("Movie command entered");
    movieFunc();
    break;

  case "do-what-it-says":
    console.log("Random command entered");
    doItFunc()
    break;

  default:
    console.log("Please type in 'node liri.js', followed by a space, and one of these commands: " +  "\nmy-tweets" + "\nspotify-this-song" + "\nmovie-this" + "\ndo-what-it-says");
  }

};

commandCentral()
