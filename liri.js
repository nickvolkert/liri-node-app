require("dotenv").config();
var request = require("request");
var keys = require("./keys.js");
var spotify = Spotify(keys.spotify);
var client = Twitter(keys.twitter);
var fs = require("fs");
var SpotifyApp = require('node-spotify-api');
var movieTitle = ("space+jam");
var songQuery = ("./random.txt");

// Running the readFile module that's inside of fs.
// Stores the read information into the variable "data"
// fs.readFile("random.txt", "utf8", function(err, data) {
//   if (err) {
//     return console.log(err);
//   }

//   // Break the string down by comma separation and store the contents into the output array.
//   var output = data.split(",");

//   // Loop Through the newly created output array
//   for (var i = 0; i < output.length; i++) {

//     // Print each element (item) of the array/
//     console.log(output[i]);
//   }
// });

spotify.search({ type: 'track', songQuery: 'query' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
  console.log(this.songQuery);
  console.log("Artist: " + data.tracks.items[0].artists[0].name);
});

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
