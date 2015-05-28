export class AccountCtrl {

	$actions = [
		{
			label: 'Logout',
			icon: 'exit_to_app',
			click: this.logout.bind(this)
		}
	];

	static $inject = ['$rootScope', '$state', 'User'];
	constructor($rootScope, $state, User) {
		this.$rootScope = $rootScope;
		this.$state = $state;
		this.User = User;

		if (!$rootScope.$user) {
			$state.go('login');
		}
	}

	logout() {
		this.User.logout()
			.then((result) => {
				this.$state.go('home');
			});
	}
}