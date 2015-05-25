var $express = require('express'),
	$app = $express(),
	$favicon = require('express-favicon'),
	$multer = require('multer'),
	$lazyRest = require('lazy-rest')($app);

	$path = require('path'),
	$mkdir = require('mkdirp').sync;

process.on('uncaughtException', function (err) {
	console.error(err.stack);
});

$app.use($favicon('./favicon.ico'));

$app.use($express.static('public'));

$app.use($multer({
	dest: './uploads',
	changeDest: function(dest, req, res) {
		dest = dest.replace(/^\/?api\//,'');
		var path = $path.join(dest, req.url);
		$mkdir(path);
		return path;
	}
}));

$app.use('/api', $lazyRest.db({
	db: 'ng-material-start'
}));

$app.use('/api', $lazyRest.auth({
	sessionSecret: 'Session Secret',
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
		}
	}
}));

$app.use('/api', $lazyRest.router());


$app.use('/', $express.static('./public'));
$app.use('/files', $express.static('./uploads/api'));

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

var server = $app.listen(8080, 'localhost', function() {
	var host = server.address().address,
		port = server.address().port;

	console.log('Listening at http://%s:%s', host, port);
});