var $gulp = require('gulp'),
	$g = require('gulp-load-plugins')(),
	$del = require('del'),
	$glob = require('glob'),
	$fs = require('fs'),
	$path = require('path'),
	$sync = $g.sync($gulp).sync,
	$ext = require('replace-ext'),
	$case = require('change-case');

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

$gulp.task('libs', ['icons'], function() {
	return $gulp.src([
		'angular*/*.min.js',
		'angular*/*.min.js.map',
		'angular*/dist/*.min.js',
		'angular*/dist/*.min.js.map',
		'angular*/build/*.min.js',
		'ui-router*/release/*.min.js',
		'systemjs/dist/system.js',
		'systemjs/dist/system.js.map',
		'systemjs/node_*/es6-*/dist/*-loader.js',
		'systemjs/node_*/es6-*/dist/*-loader.js.map'
	], {
		cwd: './node_modules'
	})
		.pipe($g.flatten())
		.pipe($gulp.dest('public/lib'));
});

$gulp.task('js', function() {
	return $gulp.src('**/*.js', {
		cwd: './src'
	})
		.pipe($g.babel({
			stage: 0,
			modules: 'system',
			moduleIds: true
		}))
		.pipe($gulp.dest('public'));
});

$gulp.task('html', function() {
	return $gulp.src('**/*.html', {
		cwd: './src'
	})
		.pipe($g.inject($gulp.src([
			'lib/angular.min.js',
			'lib/*.js'
		], {
			read: false,
			cwd: './public'
		})))
		.pipe($gulp.dest('public'));
});

$gulp.task('css', function(done) {
	$g.file('index.styl', '')
		.pipe($g.stylus({
			'include css': true,
			use: require('nib')(),
			include: [
				'./node_modules/angular-material'
			],
			import: [
				'nib',
				'angular-material.css',
				'./src/**/*.styl'
			]
		}))
		.pipe($gulp.dest('public'));
	done();
});

$gulp.task('serve', function(done) {
	$g.express.run(['./server.js']);
	done();
});

$gulp.task('watch', ['serve'], function(done) {
	$gulp.watch('./src/**/*.js', ['js']);
	$gulp.watch('./src/**/*.styl', ['css']);
	$gulp.watch('./src/**/*.html', ['html']);

	$gulp.watch('./public/**/*', $g.express.notify);

	done();
});

$gulp.task('build', ['js', 'css', 'html']);

$gulp.task('default', $sync(['clean', 'libs', 'build', 'serve']));