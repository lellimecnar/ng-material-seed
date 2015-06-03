module.exports = function(req, res, next) {
	require('passport').authenticate(
		'local',
	function(err, user, info) {
		if (!err) {
			if (user) {
				req.login(user, function(err) {
					if (!err) {
						res.json(user);
						next()
					} else {
						next(err);
					}
				});
			} else {
				res.json({error: 'Invalid Login'});
				next();
			}
		} else {
			next(err);
		}
	})(req, res, next);
};
