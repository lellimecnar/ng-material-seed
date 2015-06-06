user.$auth = true;
function user(req, res, next) {
	req.app.db.model('User')
		.findOneAndUpdate({
			username: req.session.passport.user
		}, {
			$set: req.body
		}, function(err, user) {
			if (!err) {
				req.app.db.model('User')
					.findById(user._id, {
						_id: false,
						__v: false,
						password: false
					}, function(err, newUser) {
						if (!err) {
							res.json(newUser);
						} else {
							next(err);
						}
					});
			} else {
				next(err);
			}
		});
}

module.exports = user;
