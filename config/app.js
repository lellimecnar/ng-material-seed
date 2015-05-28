var $path = require('path'),
	$mkdir = require('mkdirp').sync,
	$express = require('express'),
	$favicon = require('express-favicon'),
	$multer = require('multer');

module.exports = function($app, $passport) {

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

};