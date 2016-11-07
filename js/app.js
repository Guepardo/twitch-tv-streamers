var users     = ["nomadtv", "OgamingSC2", "chaotictabris", "freecodecamp", "nvidiafrance", "blizzard", "RobotCaleb", "unitlost"];
var key       = "?client_id=puyss7akb1pw4295zxh8m5bs2bxugrm";
var channel   = "https://api.twitch.tv/kraken/channels/";
var stream    = "https://api.twitch.tv/kraken/streams/";
var channels  = [];
var streams   = [];
var online    = [];
var populated = 0;
var len       = users.length;
var interval;

// TODO: Work on the search function

// Prints all channels information
function printAll(o) {
  printOnline(o);
  printOffline(o);
};

// Prints online channels
function printOnline(o) {
  for (var i = 0; i < len; i++) {
    if (online[i].status) {
      $('.streams-wrapper').append("<div class=\"stream\"><img src='" + o[i].data.channel.logo + "' alt='" + o[i].data.display_name + " logo'><div class=\"stream-info\"><p class=\"streamer-name\"><a href=" + o[i].data.channel.url + ">" + o[i].data.channel.display_name + " <i class=\"fa fa-circle-o\" aria-hidden=\"true\"></i></a></p><p class=\"streamer-game\">" + o[i].data.channel.game + "</p><p class=\"streamer-status\">" + o[i].data.channel.status + "</p></div></div>");
    }
  }
};

// Prints offline channels
function printOffline(o) {
  for (var i = 0; i < len; i++) {
    if (!o[i].status) {
      $.getJSON(channels[i], function(json) {
        $('.streams-wrapper').append("<div class=\"stream\"><img src='" + json.logo + "' alt='" + json.display_name + " logo'><div class=\"stream-info\"><p class=\"streamer-name\"><a href='" + json.url + "'>" + json.display_name + " <i class=\"fa fa-circle-o-notch\" aria-hidden=\"true\"></i></a></p></div></div>");
      });
    }
  }
};

// Prints all channels when 'all' link is clicked
function clickAll(o) {
  $(document).ready(function() {
    $('#all').click(function() {
      $('.stream').remove();
      printAll(o);
    });
  });
}

// Prints online channels when 'online' link is clicked
function clickOnline(o) {
  $(document).ready(function() {
    $('#online').click(function() {
      $('.stream').remove();
      printOnline(o);
    });
  });
}

// Prints offline channels when 'offline' link is clicked
function clickOffline(o) {
  $(document).ready(function() {
    $('#offline').click(function() {
      $('.stream').remove();
      printOffline(o);
    });
  });
}

// Checks if array is fully populated
interval = setInterval(function() {
  console.log('Testando o intervalo.');
  if (populated == len) {
    clickAll(online);
    clickOnline(online);
    clickOffline(online);
    printAll(online);
    clearInterval(interval);
  }
}, 100);

// Creates all api links needed
for (var i = 0; i < len; i++) {
  channels[i] = channel + users[i] + key;
  streams[i]  = stream + users[i] + key;
}

// Checks which streams are online/offline and create the corresponding object
$(document).ready(function() {
  for (var i = 0; i < len; i++) {
    $.getJSON(streams[i]).done(function(json) {
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
    }).always(function() {
      populated++;
    });
  }
});
