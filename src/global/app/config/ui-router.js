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

	function parseComponent(name) {
		var parts = name.split(/[\.\/]+/g),
			path = ['components'].concat(parts),
			ctrlAs = parts.map((part) => {
				return part[0].toUpperCase() + part.slice(1);
			}).join(''),
			ctrlName = ctrlAs + 'Ctrl',
			templateUrl;

		if (parts.length === 1) {
			path.push(parts[0]);
		}

		path = path.join('/');

		templateUrl = path + '.html';

		return {
			name: name,
			parts: parts,
			path: path,
			ctrlAs: ctrlAs,
			ctrlName: ctrlName,
			templateUrl: templateUrl
		}
	}

	config.$inject = ['$locationProvider', '$httpProvider', '$urlRouterProvider', '$stateProvider', '$futureStateProvider'];
	function config($locationProvider, $httpProvider, $urlRouterProvider, $stateProvider, $futureStateProvider) {
		$locationProvider.html5Mode(true);
		$httpProvider.useApplyAsync(true);
		$urlRouterProvider.otherwise('/');

		$futureStateProvider.stateFactory('lazyLoad', [
			'$q',
			'futureState',
		function lazyLoadStateFactory($q, futureState) {
			var defer = $q.defer(),
				config = {
					name: futureState.name,
					views: {}
				},
				imports = [],
				components = {};

			if (futureState.url) {
				config.url = futureState.url;
			}

			angular.forEach(futureState.components, (state, viewName) => {
				var name = state.component || state.name || state,
					component = parseComponent(name);

				if (viewName === 'default') {
					viewName = '@';
				}

				config.views[viewName] = {
					controller: component.ctrlName,
					controllerAs: component.ctrlAs,
					templateUrl: component.templateUrl
				};

				imports.push(System.import(component.path));

				component.viewName = viewName;
				components[component.ctrlName] = component;
			});

			$q.all(imports).then(function(controllers) {
				angular.forEach(controllers, function(result) {
					var ctrlName = Object.keys(result)[0],
						component = components[ctrlName],
						ctrl = result[ctrlName],
						viewConfig;

					if (angular.isDefined(component) && angular.isDefined(ctrl)) {
						viewConfig = config.views[component.viewName];
						viewConfig.controllerAs = ctrl.$controllerAs || viewConfig.controllerAs;
						
						if (ctrl.$template) {
							delete viewConfig.templateUrl;
							viewConfig.template = ctrl.$template;
						} else if (ctrl.$templateUrl) {
							viewConfig.templateUrl = ctrl.$templateUrl;
						}

						angular.forEach(ctrl.$dependencies || [], (dep) => {
							if (app.requires.indexOf(dep) < 0) {
								app.requires.push(dep);
							}
						});

						viewConfig.controller = ctrl;
					}
				});

				defer.resolve(config);
			});

			return defer.promise;
		}]);

		angular.forEach(routes, function(route, name) {
			if (route.component && route.components) {
				throw new Error('Cannot use component and components in a route');
			}

			route.name = name;

			if (route.component) {
				route.components = {
					'@': route.component
				};
				delete route.component;
			}

			route.type = route.type || 'lazyLoad';

			route.url = route.url || '^';

			$futureStateProvider.futureState(route);
		});
	}

	return config;
}