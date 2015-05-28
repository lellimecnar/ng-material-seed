var $express = require('express'),
	$app = $express(),
	$mongo = require('mongoose'),
	$passport = require('passport');

// $mongo.connect('mongodb://localhost:27017/ng-material-start');


process.on('uncaughtException', function (err) {
	console.error(err.stack);
});

require('./config/api')($app, $passport);

require('./config/app')($app, $passport);

require('./config/auth')($app, $passport);

require('./config/public')($app, $passport);

var server = $app.listen(8080, 'localhost', function() {
	var host = server.address().address,
		port = server.address().port;

	console.log('Listening at http://%s:%s', host, port);
});