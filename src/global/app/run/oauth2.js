import angular from 'angular';

export default function(app) {

	run.$inject = ['$rootScope', 'OAuth'];
	function run($rootScope, OAuth) {
		$rootScope.$on('oauth:error', function(e, err) {
			console.log(err);
		});
	}

	return run;
}