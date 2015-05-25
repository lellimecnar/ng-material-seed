import angular from 'angular';
import 'angular-ui-router';
import 'angular-ui-router-extras/release/modular/ct-ui-router-extras.core';
import 'angular-ui-router-extras/release/modular/ct-ui-router-extras.future';

import routes from '../routes.json!';

export default function(app) {
	app.requires = app.requires.concat([
		'ui.router',
		'ct.ui.router.extras.core',
		'ct.ui.router.extras.future'
	]);

	config.$inject = ['$locationProvider', '$httpProvider', '$urlRouterProvider', '$stateProvider', '$futureStateProvider'];
	function config($locationProvider, $httpProvider, $urlRouterProvider, $stateProvider, $futureStateProvider) {
		$locationProvider.html5Mode(true);
		$httpProvider.useApplyAsync(true);
		$urlRouterProvider.otherwise('/dashboard');

		$futureStateProvider.stateFactory('lazyLoad', [
			'$q',
			'futureState',
		function($q, futureState) {
			var defer = $q.defer(),
				parts, path;

			if (futureState.component) {
				parts = futureState.component.split('/');
			} else {
				parts = futureState.stateName.split('.').filter((part) => {
					return part;
				});
			}
			
			path = ['components'].concat(parts);

			if (parts.length === 1) {
				path.push(parts[0]);
			}

			path = path.join('/');

			System.import(path).then(function(result) {
				var ctrlAs = parts.map((part) => {
						return part[0].toUpperCase() + part.slice(1);
					}).join(''),
					ctrlName = ctrlAs + 'Ctrl',
					ctrl = result[ctrlName],
					stateConfig = {
						name: futureState.stateName,
						controller: ctrl, 
						controllerAs: ctrl.$controllerAs || ctrlAs,
						templateUrl: ctrl.$templateUrl || path + '.html'
					};

				if (futureState.url) {
					stateConfig.url = futureState.url;
				}

				angular.forEach(ctrl.$dependencies || [], function(dep) {
					if (app.requires.indexOf(dep) < 0) {
						app.requires.push(dep);
					} 
				});

				defer.resolve(stateConfig);
			});

			return defer.promise;
		}]);

		routes.forEach(function(route) {
			if (angular.isString(route)) {
				route = {
					stateName: route
				};
			}
			route.stateName = route.stateName || route.name;
			delete route.name;

			route.type = route.type || 'lazyLoad';

			route.url = route.url || '/' + route.stateName.replace('.', '/');
			$futureStateProvider.futureState(route);
		});
	}
	return config;
}