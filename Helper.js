// platformLocations.forEach(function (location, image) {
//     ground = platforms.create(game, location, location, image);
//     game.add(ground);
// });

var Platform = {};

Platform.create = function() {
	    //  The platforms group contains the ground and ledges then we enable physics on platforms
    platforms = game.add.group();
    platforms.enableBody = true;
}