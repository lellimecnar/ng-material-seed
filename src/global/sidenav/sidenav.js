export class SidenavCtrl {

	static $inject = ['$mdSidenav', '$state'];
	constructor($mdSidenav, $state) {
		this.$mdSidenav = $mdSidenav;
		this.$state = $state;
	}

	close() {
		this.$mdSidenav('left').close();
	}

	click(key) {
		this.close();
		this.$state.go(key);
	}
}