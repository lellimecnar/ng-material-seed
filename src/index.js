import angular from 'angular';
import ngMaterial from 'angular-material';

import { AppCtrl } from 'global/app/app';
import config from 'global/app/config';
import run from 'global/app/run';
import routes from 'global/app/routes.json!';

import { SidenavCtrl } from 'global/sidenav/sidenav';
import { ToolbarCtrl } from 'global/toolbar/toolbar';

export var appModule = angular.module('app', [
		ngMaterial
	])
	.config(config(routes))
	.run(run())
	.controller('AppCtrl', AppCtrl)
	.controller('SidenavCtrl', SidenavCtrl)
	.controller('ToolbarCtrl', ToolbarCtrl);

angular.element(document).ready(function() {
	return angular.bootstrap(document, [appModule.name], {
		strictDi: true
	});
});