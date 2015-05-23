import angular from 'angular';
import ngMaterial from 'angular-material';
import ngMaterialDropmenu from 'ng-material-dropmenu';
import 'ng-material-dropmenu/ng-material-dropmenu.css!';

import { AppCtrl } from 'global/app/app';
import config from 'global/app/config';
import run from 'global/app/run';
import routes from 'global/app/routes.json!';

import { SidenavCtrl } from 'global/sidenav/sidenav';
import { ToolbarCtrl } from 'global/toolbar/toolbar';

import * as directives from 'global/app/directives';
import * as services from 'global/app/services';

export var appModule = angular.module('app', [
		ngMaterial,
		'ngMaterialDropmenu'
	])
	.config(config(routes))
	.run(run())
	.controller('AppCtrl', AppCtrl)
	.controller('SidenavCtrl', SidenavCtrl)
	.controller('ToolbarCtrl', ToolbarCtrl);

angular.forEach(directives, function(factory) {
	appModule.directive(factory.$selector, factory);
});

angular.forEach(services, function(service, name) {
	appModule.service(name, service);
})

angular.element(document).ready(function() {
	return angular.bootstrap(document, [appModule.name], {
		strictDi: true
	});
});