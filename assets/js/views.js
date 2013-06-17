// Views
Leaderboard.PlayersListView = Backbone.View.extend({

    tagName: 'div',
    className: 'players',

    initialize:function (players) {
        _.bindAll(this, 'render');
        this.players = players;
        this.players.bind("reset", this.render, this);
        this.players.bind("add", this.addPlayer, this);
        this.render();
    },

    render:function (eventName) {
        var self = this;
        this.players.each(function (player) {
            self.addPlayer(player);
        });
        return this;
    },

    addPlayer: function(player) {
        var pliv = new Leaderboard.PlayersListItemView(player);
        $(this.el).append(pliv.el);
    }

});

Leaderboard.PlayersListItemView = Backbone.View.extend({

    tagName: 'div',
    className: 'player',
    events: {
        'click': 'showPlayerDetails'
    },
    initialize: function (model) {
        _.bindAll(this, 'showPlayerDetails');
        this.model = model;
        this.model.bind("change", this.render, this);
        this.render();
    },
    render: function () {
        $(this.el).html(template('tpl-player-list-item',this.model.toJSON()));
        $(this.el).attr('id', this.model.id);
        return this;
    },
    showPlayerDetails: function (eventName) {
        $('.player').removeClass('active');
        $(this.el).addClass('active');
        var pv = new Leaderboard.PlayerView(this.model);
        $('.details').replaceWith(pv.el);
    }
});

Leaderboard.PlayerView = Backbone.View.extend({

    tagName: 'div',
    className: 'details',
    events: {
        'click input#addPoints': 'addPoints'
    },
    initialize: function (model) {
        _.bindAll(this, 'addPoints');
        this.model = model;
        this.render();
    },
    render: function () {
        if (!this.model) {
            $(this.el).html(template('tpl-player-details-default'));
        } else {
            $(this.el).html(template('tpl-player-details',this.model.toJSON()));
        }
        return this;
    },
    addPoints: function () {
        console.log(this.model);
        Leaderboard.socket.request('/players/update',{
            id: this.model.get('id'),
            score: +this.model.get('score') + 5
        },Leaderboard.Players.update);
    }
});