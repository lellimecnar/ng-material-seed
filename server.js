var $express = require('express'),
	$app = $express(),
	$bodyParser = require('body-parser'),
	$multer = require('multer'),
	$mongoose = require('mongoose'),
	db = $mongoose.connect('mongodb://localhost:27017/ng-material-start'),
	$lazyRest = require('lazy-rest')($app, db),

	$path = require('path'),
	$mkdir = require('mkdirp').sync;

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});

$app.use($express.static('public'));
$app.use($bodyParser.json());
$app.use($multer({
	dest: './uploads',
	changeDest: function(dest, req, res) {
		dest = dest.replace(/^\/?api\//,'');
		var path = $path.join(dest, req.url);
		$mkdir(path);
		return path;
	}
}));

$app.use($bodyParser.urlencoded({
	extended: true
}));

$app.use($lazyRest());

$app.use($express.static('./public'));
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