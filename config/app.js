var $path = require('path'),
	$mkdir = require('mkdirp').sync,
	$express = require('express'),
	$favicon = require('express-favicon'),
	$multer = require('multer');

module.exports = function($app, $passport) {

	$app.use($favicon('./favicon.ico'));

	$app.use($multer({
		dest: './files',
		changeDest: function(dest, req, res) {
			dest = $path.join(dest, req.url);

			$mkdir(dest);
			return dest;
		}
	}));

};