/*
Docs: https://dev.twitch.tv/docs
Channel info: https://api.twitch.tv/kraken/channels/nomadtv?client_id=puyss7akb1pw4295zxh8m5bs2bxugrm
Stream info: https://api.twitch.tv/kraken/streams/nomadtv?client_id=puyss7akb1pw4295zxh8m5bs2bxugrm
*/
// TODO: get all users to lower case, compare to input search in lower case, show channel if exists show notification if doesn't.
var users     = ["nomadtv", "OgamingSC2", "chaotictabris", "freecodecamp", "storbeck", "blizzard", "RobotCaleb", "noobs2ninjas"];
var key       = "?client_id=puyss7akb1pw4295zxh8m5bs2bxugrm";
var channel   = "https://api.twitch.tv/kraken/channels/";
var stream    = "https://api.twitch.tv/kraken/streams/";
var channels  = [];
var streams   = [];
var online    = [];
var populated = false;
var len       = users.length;
var interval;

// TODO: Finish these functions
function printAll(o) {
  console.log(o);
  console.log(o[1].status);
};

function printOnline(online) {

};

function printOffline(online) {

};

// Checks if array is fully populated
interval = setInterval(function(){
  if (populated) {
    printAll(online);
    clearInterval(interval);
  }
}, 100);

// Creates all api links needed
for (var i = 0; i < len; i++) {
  channels[i] = channel + users[i] + key;
  streams[i]  = stream + users[i] + key;
}

$(document).ready(function() {
  for (var i = 0; i < len; i++) {

    // Checks which streams are online/offline and create the corresponding object
    $.getJSON(streams[i], function(json) {
      if (json.stream === null) {
        var user = {
          status : false,
          data   : null
        };
        online.push(user);
      } else {
        var user = {
          status : true,
          data   : json.stream
        };
        online.push(user);
      }

      // TODO: Asynchronism is making this a nightmare
      if (i == len - 1) {
        populated = true;
        console.log('yes');
      }
    });

    // Channel information
    $.getJSON(channels[i], function(json) {
      // Offline stream element
      $('.streams-wrapper').append("<div class=\"stream\"><img src='" + json.logo + "' alt='" + json.display_name + " logo'><div class=\"stream-info\"><p class=\"streamer-name\"><a href='" + json.url + "'>" + json.display_name + "</a></p></div></div>");
      // console.log("channel link: " + "https://www.twitch.tv/" + json.name);
    });
  }
});


// This is the online stream element
// $('.streams-wrapper').append("<div class=\"stream\"><img src='" + json.stream.channel.logo + "' alt='" + json.display_name + " logo'><div class=\"stream-info\"><p class=\"streamer-name\"><a href=" + json.stream.channel.url + ">" + json.stream.channel.display_name + "</a></p><p class=\"streamer-game\">" + json.stream.channel.game + "</p><p class=\"streamer-status\">" + json.stream.channel.status + "</p></div></div>");
