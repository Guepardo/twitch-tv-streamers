/*
Docs: https://dev.twitch.tv/docs
Channel info: https://api.twitch.tv/kraken/channels/nomadtv?client_id=puyss7akb1pw4295zxh8m5bs2bxugrm
Stream info: https://api.twitch.tv/kraken/streams/nomadtv?client_id=puyss7akb1pw4295zxh8m5bs2bxugrm
*/
// TODO: get all users to lower case, compare to input search in lower case, show channel if exists show notification if doesn't.
var users    = ["nomadtv", "OgamingSC2", "chaotictabris", "freecodecamp", "storbeck", "blizzard", "RobotCaleb", "noobs2ninjas"];
var key      = "?client_id=puyss7akb1pw4295zxh8m5bs2bxugrm";
var channel  = "https://api.twitch.tv/kraken/channels/";
var stream   = "https://api.twitch.tv/kraken/streams/";
var channels = new Array();
var streams  = new Array();

// Get all channel and stream api links for every user
var len = users.length;

for (var i = 0; i < len; i++) {
  channels[i] = channel + users[i] + key;
  streams[i]  = stream + users[i] + key;
}

$(document).ready(function() {
  // TODO: show channel and stream information on screen
  // Channel information
  for (var i = 0; i < len; i++) {
    $.getJSON(channels[i], function(json) {
      console.log("name: " + json.display_name);
      console.log("logo: " + json.logo);
      console.log("channel link: " + "https://www.twitch.tv/" + json.name);
    });
    // Stream information
    $.getJSON(streams[i], function(json) {
      if (json.stream !== null) {
        console.log("game: " + json.stream.channel.game);
        console.log("status: " + json.stream.channel.status);
      }
    });
  }
});
