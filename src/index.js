import angular from 'angular';
import 'ng-file-upload';

import * as config from 'global/app/config';
import * as run from 'global/app/run';

import * as components from 'global/components';
import * as filters from 'global/app/filters';
import * as directives from 'global/app/directives';
import * as services from 'global/app/services';

export var app = angular.module('app', ['ngFileUpload']);

angular.forEach(config, function(fn) {
	app.config(fn(app));
});

angular.forEach(run, function(fn) {
	app.run(fn(app));
});

angular.forEach(components, function(ctrl, name) {
	app.controller(name, ctrl);
});

angular.forEach(filters, function(filter, name) {
	app.filter(name, filter);
});

angular.forEach(directives, function(factory) {
	app.directive(factory.$selector, factory);
});

angular.forEach(services, function(service, name) {
	app.service(name, service);
});

angular.element(document).ready(function() {
	return angular.bootstrap(document, [app.name], {
		strictDi: true
	});
});