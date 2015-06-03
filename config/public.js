var $express = require('express');

module.exports = function($app, $passport) {

	$app.use('/', $express.static('./public'));
	$app.use('/files', $express.static('./files'));
	$app.use('/img', $express.static('./img'));

	$app.all('/*', function(req, res, next) {
		if (req.path.split('/').indexOf('api') >= 0) {
			next();
		} else {
			if (req.headers.accept.indexOf('text/html') >= 0) {
			    res.sendFile('index.html', { root: './public' });
			} else {
				res.sendFile(req.path);
			}
		}
	});

};