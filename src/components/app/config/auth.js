import angular from 'angular';
import 'angular-resource';
import 'angular-cookies';

export default function(app) {
	app.requires = app.requires.concat([
		'ngResource',
		'ngCookies'
	]);

	config.$inject = ['$httpProvider'];
	function config($httpProvider) {
		$httpProvider.defaults.useXDomain = true;
		$httpProvider.defaults.withCredentials = true;
	}

	return config;
}