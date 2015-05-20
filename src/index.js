import * as $services from 'global/services/services';
import * as $directives from 'global/directives/directives';
import * as $app from 'global/app/app';
import * as $components from 'components/components';

var app = angular.module('app', $app.dependencies)
			.config($app.config);

angular.forEach($services, function(service, name) {
	app.service(name, service);
});

angular.forEach($components, function(controller, name) {
	app.controller(name, controller);
});

angular.forEach($directives, function(directive) {
	app.directive(directive.$selector, directive);
});

app.controller('AppCtrl', $app.AppCtrl);