
const dotenv = require("dotenv").config();
const keys = require("./keys.js");
const fs = require("fs");

const Spotify = require("node-spotify-api");
const Twitter = require("twitter");
const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);

const input = process.argv[2];
// const command = {
//   twitter: "my-tweets",
//   spotify: "spotify-this-song",
//   movie: "movie-this",
//   random: "do-what-it-says"
// };

const liriFunctions = {
  twitterFunc: function() {

  },
  spotifyFunc: function() {

  },
  movieFunc: function() {

  },
  randomFunc: function() {

  }
}

//console.log("testing liri bot");
console.log(process.argv);

fs.writeFile('random.txt', 'spotify-this-song,"I Want it That Way"', function(error) {
  if (error) {
    return console.log(error);
  } else {
    //console.log('random.txt was updated!😏');
  }
});


switch (input) {
  case "my-tweets":
    console.log("Twitter command entered");
    break;

  case "spotify-this-song":
    console.log("Spotify command entered");
    break;

  case "movie-this":
    console.log("Movie command entered");
    break;

  case "do-what-it-says":
    console.log("Random command entered");
    break;

  default:
    console.log("Please choose one of these commands: " + command.twitter + " " + command.spotify + " " + command.movie + " or " + command.random);

}
