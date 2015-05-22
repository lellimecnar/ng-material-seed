export class AppCtrl {
	$loading = true;

	static $inject = ['$rootScope'];
	constructor($rootScope) {
		$rootScope.$on('$stateChangeStart', () => {
			this.$loading = true;
		});

		$rootScope.$on('$stateChangeSuccess', () => {
			this.$loading = false;
		});
	}
}