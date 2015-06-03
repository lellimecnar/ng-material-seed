module.exports = function($app, $passport) {
	var $lazyRest = require('lazy-rest')($app, null, $passport);

	$app.use('/api', $lazyRest.db({
		db: 'ng-material-start'
	}));

	$app.use('/api', $lazyRest.auth({
		oauth: false,
		authFn: function(req, res, next) {
			if (
				req.session &&
				req.session.passport &&
				req.session.passport.user
			) {
				req.app.db.model('User')
					.findOne({
						username: req.session.passport.user
					}, function(err, user) {
						if (!err) {
							if (user) {
								next();
							} else {
								res.json({error: 'Unauthorized'});
							}
						} else {
							next(err);
						}
					});
			} else {
				res.json({error: 'Unauthorized'});
			}
		},
		UserSchema: {
			firstName: {
				type: String,
				required: true
			},
			lastName: {
				type: String,
				required: true
			},
			joined: {
				type: Date,
				default: Date.now
			},
			cover: {
				type: String,
				default: '/img/default-cover.jpg'
			},
			avatar: {
				type: String,
				default: '/img/default-avatar.png'
			}
		}
	}));

	$app.use('/api', $lazyRest.router());

};
