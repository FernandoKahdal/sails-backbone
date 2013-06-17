// Models
Leaderboard.Player = Backbone.Model.extend({});

Leaderboard.PlayerCollection =  Backbone.Collection.extend({
    model: Leaderboard.Player,
    url: '/players',
    initialize: function () {
        _.bindAll(this, 'update');
    },
    update: function (data) {
        // make sure no duplicates, just in case
        var exists = this.get(data.id);
        if (!exists) {
            this.add(data);
        } else {
            exists.set(data);
        }
    }
});