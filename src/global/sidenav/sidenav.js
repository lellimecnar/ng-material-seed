export default class SidenavCtrl {

	static $inject = ['$mdSidenav', '$state', '$rootScope'];
	constructor($mdSidenav, $state, $rootScope) {
		this.$mdSidenav = $mdSidenav;
		this.$state = $state;
		this.$rootScope = $rootScope;
	}

	close() {
		this.$mdSidenav('left').close();
	}

	click(state) {
		this.close();

		switch (state) {
			case 'user':
				if (this.$rootScope.$user) {
					state = 'account';
				} else {
					state = 'login';
				}
				break;
		}
		this.$state.go(state);
	}

	coverImg(user) {
		if (user) {
			return 'url(' + (user.cover || '/img/default-cover.jpg') + ')';
		} else {
			return null;
		}
	}
}