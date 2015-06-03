var $path = require('path'),
	$fs = require('fs'),
	$mkdir = require('mkdirp').sync;

upload.$auth = true;
function upload(req, res, next) {
	var oldPath = req.files.file.path,
		newPath = $path.join('files', req.session.passport.user, req.files.file.name);

	req.files.file.path = newPath;

	$mkdir($path.dirname(newPath));

	$fs.rename(oldPath, newPath);

	res.json(req.files.file);
}

module.exports = upload;