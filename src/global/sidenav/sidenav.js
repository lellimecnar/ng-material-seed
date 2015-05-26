export class SidenavCtrl {
	menuItems = [
		{
			label: 'Home',
			icon: 'home',
			click: this.homeClick.bind(this)
		},
		{
			label: 'Login/Register',
			icon: 'account_circle',
			click: this.loginClick.bind(this)
		}
	];

	static $inject = ['$mdSidenav', '$state'];
	constructor($mdSidenav, $state) {
		this.$mdSidenav = $mdSidenav;
		this.$state = $state;
	}

	close() {
		this.$mdSidenav('left').close();
	}

	homeClick() {
		this.$state.go('home');
	}

	loginClick() {
		this.$state.go('login');
	}
}