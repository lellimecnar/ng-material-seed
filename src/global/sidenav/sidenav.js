export class SidenavCtrl {
	menuItems = [
		{
			label: 'Home',
			state: 'home',
			icon: 'home'
		}
	];

	static $inject = ['$mdSidenav'];
	constructor($mdSidenav) {
		this.$mdSidenav = $mdSidenav;
	}

	close() {
		this.$mdSidenav('left').close();
	}
}