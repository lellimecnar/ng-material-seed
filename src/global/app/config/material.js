import angular from 'angular';
import 'angular-material';
import 'ng-material-dropmenu';
import 'ng-material-dropmenu/ng-material-dropmenu.css!';

export default function(app) {
	app.requires = app.requires.concat([
		'ngMaterial',
		'ngMaterialDropmenu'
	]);

	config.$inject = [];
	function config() {

	}

	return config;
}