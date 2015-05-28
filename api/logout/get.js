module.exports = function(req, res, next) {
	req.logout();
	req.session.destroy();

	res.json({msg: 'Logged Out'});
};