require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var twitterApp = new Twitter(keys.twitter);
var spotifyApp = new Spotify(keys.spotify);

var movieTitle = ("space+jam");
var songQuery = ("./random.txt");
var argumentTwo = process.argv[2];
var argumentThree = process.argv[3];
var argumentFour = process.argv[4];

function logItPretty(){
  console.log("");
  console.log("--------------------------------------------------------------------------");
  console.log("");
}

//1. Twitter
if(argumentTwo === "my-tweets"){
    var params = { screen_name: "nickv47", count: 20 };
    twitterApp.get("statuses/user_timeline", params, function(error, tweets, response) {
      if (!error) {
        for (var i = 0; i < tweets.length; i++) {
          console.log('"' + tweets[i].text + '"');
          console.log("");
          console.log("Tweet Created: " + tweets[i].created_at);
          logItPretty();
        }
      }
    });
}

//Spotify Search Function
function spotifySearch(){
  var userSong = process.argv[3];
  // if (title){
  //   var userSong = title;
  // } else {
  //   var userSong = output ? output : "'The Sign' by Ace of Base";
  // }
  spotifyApp.search({ type: "track", query: userSong, count: 10 }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }
    var spotifyInfo = data.tracks.items;
    for (var i = 0; i < spotifyInfo.length; i++) {
      var artist = spotifyInfo[i].artists[0].name;
      var song = spotifyInfo[i].name;
      var prev = spotifyInfo[i].preview_url;
      var album = spotifyInfo[i].album.name;
      console.log("Artist: " + artist);
      console.log("Song: " + '"' + song + '"');
      console.log("Preview URL: " + prev);
      console.log("Album: " + '"' + album + '"');
      logItPretty();
    }
  });

}

// 2. Spotify this song
if(argumentTwo === "spotify-this-song"){
    if (process.argv[3]){
      spotifySearch();
    }
}

// 3. Movie This
if(argumentTwo === "movie-this"){
  var request = require("request");
  var nodeArgs = process.argv;
  var movieName = "Mr. Nobody";
  for (var i = 2; i < nodeArgs.length; i++) {
    if (i > 2 && i < nodeArgs.length) {
      movieName = movieName + "+" + nodeArgs[i];
    } else {
      movieName += nodeArgs[i];
    }
  }
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  request(queryUrl, function(error, response, body) {
    var parseThis = JSON.parse(body);
    if (!error && response.statusCode === 200) {
      console.log(JSON.parse(body));
      console.log("Title: " + parseThis.Title);
      console.log("Release Year: " + parseThis.Year);
      console.log("IMDB Rating: " + parseThis.Ratings[0].Value);
      console.log("Rotten Tomatoes Rating: " + parseThis.Ratings[1].Value);
      console.log("Production Country(ies): " + parseThis.Country);
      console.log("Language: " + parseThis.Language);
      console.log("Plot: " + parseThis.Plot);
      console.log("Actors: " + parseThis.Actors);
      logItPretty();
    }
  });
}

//4. Do What it Says
if(argumentTwo === "do-what-it-says"){
    var fs = require("fs");
    fs.readFile('random.txt', "utf8", function(err, data){
        console.log(data);
    });
}
