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
    } else {
      var userSong = ("The Sign");
      spotifySearch(userSong);
    }
}

// * Artist(s)
//
// * The song's name
//
// * A preview link of the song from Spotify
//
// * The album that the song is from
//
// * If no song is provided then your program will default to "The Sign" by Ace of Base.

// console.log(data);
// });
// var request = require('request');
// request('http://www.google.com', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });

// var request = require("request");

// // Store all of the arguments in an array
// var nodeArgs = process.argv;

// // Create an empty variable for holding the movie name
// var movieName = "";

// // Loop through all the words in the node argument
// // And do a little for-loop magic to handle the inclusion of "+"s
// for (var i = 2; i < nodeArgs.length; i++) {

//   if (i > 2 && i < nodeArgs.length) {

//     movieName = movieName + "+" + nodeArgs[i];

//   }

//   else {

//     movieName += nodeArgs[i];

//   }
// }

// // Then run a request to the OMDB API with the movie specified
// var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// // This line is just to help us debug against the actual URL.
// console.log(queryUrl);

// request(queryUrl, function(error, response, body) {

//   // If the request is successful
//   if (!error && response.statusCode === 200) {

//     // Parse the body of the site and recover just the imdbRating
//     // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
//     console.log("Release Year: " + JSON.parse(body).Year);
//   }
// });
