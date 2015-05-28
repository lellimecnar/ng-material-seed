export class AppCtrl {
	$loading = true;

	static $inject = ['$rootScope', 'User', '$cookies'];
	constructor($rootScope, User, $cookies) {

		if ($cookies['connect.sid']) {
			User.profile();
		}

		$rootScope.$on('$stateChangeStart', () => {
			this.$loading = true;
		});

		$rootScope.$on('$stateChangeSuccess', () => {
			this.$loading = false;
		});
	}
}