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
var online   = new Array();
// var offline  = new Array();

// Get all channel and stream api links for every user
var len = users.length;

for (var i = 0; i < len; i++) {
  channels[i] = channel + users[i] + key;
  streams[i]  = stream + users[i] + key;
}

$(document).ready(function() {
  for (var i = 0; i < len; i++) {
    // Stream information
    $.getJSON(streams[i], function(json) {
      if (json.stream !== null) {
        $('.streams-wrapper').append("<div class=\"stream\"><img src='" + json.stream.channel.logo + "' alt='" + json.display_name + " logo'><div class=\"stream-info\"><p class=\"streamer-name\"><a href=" + json.stream.channel.url + ">" + json.stream.channel.display_name + "</a></p><p class=\"streamer-game\">" + json.stream.channel.game + "</p><p class=\"streamer-status\">" + json.stream.channel.status + "</p></div></div>");
        online[i] = json.stream.channel.display_name;
        // console.log(json);
        // console.log("game: " + json.stream.channel.game);
        // console.log("status: " + json.stream.channel.status);
      }
    });
    // Channel information
    $.getJSON(channels[i], function(json) {
      // TODO: Find a way to show only streams that are offline in here
      if(online[i] !== json.display_name) {
        $('.streams-wrapper').append("<div class=\"stream\"><img src='" + json.logo + "' alt='" + json.display_name + " logo'><div class=\"stream-info\"><p class=\"streamer-name\"><a href='" + json.url + "'>" + json.display_name + "</a></p></div></div>");
        offline[i] = json.display_name;
        // console.log(json);
        // console.log("name: " + json.display_name);
        // console.log("logo: " + json.logo);
        // console.log("channel link: " + "https://www.twitch.tv/" + json.name);
      }
    });
  }
});
