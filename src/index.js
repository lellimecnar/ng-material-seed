import angular from 'angular';
import 'ng-file-upload';

import * as config from 'components/app/config';
import * as run from 'components/app/run';

import { AppCtrl } from 'components/app/app';
import * as filters from 'components/app/filters';
import * as directives from 'components/app/directives';
import * as services from 'components/app/services';

export var app = angular.module('app', ['ngFileUpload']);

angular.forEach(config, function(fn) {
	app.config(fn(app));
});

angular.forEach(run, function(fn) {
	app.run(fn(app));
});

app.controller('AppCtrl', AppCtrl);

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
