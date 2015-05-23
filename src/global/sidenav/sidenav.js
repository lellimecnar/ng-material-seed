export class SidenavCtrl {
	menuItems = [
		{
			label: 'Home',
			state: 'home',
			icon: 'home',
			click: this.homeClick.bind(this)
		}
	];

	static $inject = ['$mdSidenav'];
	constructor($mdSidenav) {
		this.$mdSidenav = $mdSidenav;
	}

	close() {
		this.$mdSidenav('left').close();
	}

	homeClick() {
		console.log('home clicked');
	}
}