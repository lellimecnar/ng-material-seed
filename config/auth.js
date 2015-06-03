var LocalStrategy = require('passport-local').Strategy;

module.exports = function($app, $passport) {

	$passport.use(new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req, username, password, done) {
		req.app.db.connection.model('User')
			.findOne({
				username: username
			},
			function(err, user) {
				if (!err) {
					if (user) {
						user.verifyPassword(password, function(err, isMatch) {
							if (!err) {
								if (isMatch) {
									req.app.db.connection.model('User')
										.findOne({
											username: username
										}, {
											_id: false,
											__v: false,
											password: false
										}, function(err, safeUser) {
											if (!err) {
												done(null, safeUser);
											} else {
												done(err);
											}
										});
								} else {
									done(null, false);
								}
							} else {
								done(err);
							}
						})
					} else {
						done(null, false);
					}
				} else {
					done(err);
				}
			});
	}));

	$passport.serializeUser(function(user, done) {
		done(null, user.username);
	});

	$passport.deserializeUser(function(username, done) {
		$app.db.connection.model('User')
			.findOne({
				username: username
			}, {
				_id: false,
				__v: false,
				password: false
			}, done);
	});

	$app.use('/api', $passport.initialize());

	$app.use('/api', $passport.session());

};
