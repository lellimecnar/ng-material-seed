var $express = require('express'),
	$app = $express(),
	$passport = require('passport');

process.on('uncaughtException', function (err) {
	console.error(err.stack);
});

require('./config/app')($app, $passport);

require('./config/auth')($app, $passport);

require('./config/api')($app, $passport);

require('./config/public')($app, $passport);

var server = $app.listen(8080, 'localhost', function() {
	var host = server.address().address,
		port = server.address().port;

	console.log('Listening at http://%s:%s', host, port);
});
