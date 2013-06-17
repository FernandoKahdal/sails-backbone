// Leaderboard App Start Here
var Leaderboard = {};

// Template Router
var template = function(name, context) {
    var template = _.template($('#'+name).html(), context);
    return template;
};

$(document).ready(function(){
    var app = new Leaderboard.Router();
    Leaderboard.Players = new Leaderboard.PlayerCollection();
    Leaderboard.socket = io.connect();
    Leaderboard.socket.request('/players',{},function(response) {
        _.each(response, function(player){
            Leaderboard.Players.create(player);
        });
    });
    Leaderboard.socket.on('message', function(message){
        Leaderboard.Players.update(message.data);
    });
    Backbone.history.start();
});