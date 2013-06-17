// Router
Leaderboard.Router = Backbone.Router.extend({

    routes:{
        '':'index'
    },

    index:function(){

        players = Leaderboard.Players;
        var playerList = new Leaderboard.PlayersListView(players);
        var playerDetails = new Leaderboard.PlayerView();
        $('#content').append(playerList.el);
        $('#content').append(playerDetails.el);
    }
});