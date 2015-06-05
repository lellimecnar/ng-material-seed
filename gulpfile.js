var $gulp = require('gulp'),
	$g = require('gulp-load-plugins')(),
	$del = require('del'),
	$glob = require('glob'),
	$fs = require('fs'),
	$path = require('path'),
	$sync = $g.sync($gulp).sync,

	server = $g.liveServer.new('./server.js');

$gulp.task('clean', function(done) {
	$del('./public', done);
});

$gulp.task('icons', function() {
	return $gulp.src([
		'./node_modules/material-design-icons/*/svg/production/ic_*_48px.svg'
	])
		.pipe($g.flatten())
		.pipe($g.rename(function(path) {
			path.basename = path.basename.match(/^ic_(.+)_48px/)[1];
		}))
		.pipe($gulp.dest('public/ico'));
});

$gulp.task('lib', ['icons'], $g.shell.task([
	'jspm update',
	'jspm install'
]));

$gulp.task('js', function() {
	return $gulp.src('**/*.js', {
		cwd: './src'
	})
		.pipe($g.babel({
			stage: 0,
			modules: 'system',
			moduleIds: true
		}))
		.pipe($g.addSrc('./config.js'))
		.pipe($g.addSrc('**/*.json', {
			cwd: './src'
		}))
		.pipe($gulp.dest('public'));
});

$gulp.task('html', function() {
	return $gulp.src('**/*.html', {
		cwd: './src'
	})
		.pipe($gulp.dest('public'));
});

$gulp.task('css', function(done) {
	$g.file('index.styl', '')
		.pipe($g.stylus({
			'include css': true,
			use: require('nib')(),
			import: [
				'nib',
				'./src/**/*.styl'
			]
		}))
		.pipe($gulp.dest('public'));
	done();
});

$gulp.task('serve', function(done) {
	server.start();
	done();
});

$gulp.task('alert', function(done) {
	process.stdout.write('\x07');
	done();
})

$gulp.task('watch', ['serve'], function(done) {
	$gulp.watch('./img/**/*', ['img']);
	$gulp.watch(['./src/**/*.js', './src/**/*.json'], $sync(['js', 'alert']));
	$gulp.watch('./src/**/*.styl', $sync(['css', 'alert']));
	$gulp.watch('./src/**/*.html', $sync(['html', 'alert']));

	$gulp.watch('./public/**/*', {
		readDealy: 1000
	}, server.notify);

	$gulp.watch('./server.js', server.start);
	$gulp.watch([
		'./api',
		'./db',
		'./config'
	], server.start);

	done();
});

$gulp.task('build', ['js', 'css', 'html']);

$gulp.task('dev', $sync(['clean', 'lib', 'build', 'watch']));

$gulp.task('default', $sync(['clean', 'lib', 'build', 'serve']));
