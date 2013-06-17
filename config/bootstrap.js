// App bootstrap
// Code to run before launching the app
//
// Make sure you call cb() when you're finished.
module.exports.bootstrap = function (cb) {
	Players.countAll(function (err, count) {
		// Output 'No Players' if count is 0, or the value of count
		console.log(count ? count : 'No Players');
		if (count === 0) {
			var names = [
				'Mickey Mouse',
				'Minnie Mouse',
				'Donald Duck',
				'Daisey Duck',
				'Goofy',
				'Pluto'
			];
			for (var i = 0; i < names.length; i++) {
				Players.create({name: names[i], score: Math.floor(Math.random()*10)*5}).done(function(err, results){return console.log(results);});
			}
			console.log('Added Players');
		}
	});
	cb();
};