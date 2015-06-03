export class AccountCtrl {

	$actions = [
		{
			label: 'Edit Profile',
			icon: 'edit',
			click: this.edit.bind(this)
		},
		{
			label: 'Logout',
			icon: 'exit_to_app',
			click: this.logout.bind(this)
		}
	];

	static $inject = ['$rootScope', '$state', 'User'];
	constructor($rootScope, $state, User) {
		if (!$rootScope.$user) {
			$state.go('login');
		}

		this.$state = $state;
		this.User = User;
	}

	edit() {
		this.$state.go('account.edit');
	}

	logout() {
		this.User.logout()
			.then((result) => {
				this.$state.go('home');
			});
	}
}
