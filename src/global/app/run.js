import angular from 'angular';

export default function() {
	var app = angular.module('app');

	run.$inject = ['$rootScope', '$mdSidenav', '$state', '$location'];
	function run($rootScope, $mdSidenav, $state, $location) {
		$rootScope.$state = $state;

		$rootScope.$watch(function() {
			try {
				return $state.$current.locals['@'].$element.data('$ngControllerController').constructor.name;
			} catch(e) {}
		}, function(ctrlName) {
			if (ctrlName) {
				var state = $state.$current,
					ctrl = state.locals['@'].$element.data('$ngControllerController');

				$rootScope.$ctrl = ctrl;

				$rootScope.$emit('$stateControllerLoaded', ctrl, state);
			}
		});
	}

	return run;
}